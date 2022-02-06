import { Component, OnInit, ViewChild } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { User } from 'src/app/models/user';
import { FeedContainerComponent } from '../../feed-container/feed-container.component';
import jwt_decode from "jwt-decode";
import { PhotosUser } from 'src/app/models/photos-user';
import { PhotoFeed } from 'src/app/models/photo-feed';
import { PhotosCommentComponent } from '../../components/photos/photos-comment/photos-comment.component';



@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})



export class PhotosComponent extends FeedContainerComponent {
  @ViewChild(PhotosCommentComponent, {static: false }) photosCommentsServiceChild: PhotosCommentComponent;
  
  user:User;
  photos:PhotosUser[];
  photofeed:PhotoFeed[]=[];
  modalObject= new PhotosUser();

  id_user_photos:String;
  ngOnInit() {
    this.user = jwt_decode(sessionStorage.getItem('token'));
    super.route.params.subscribe(params => {
      console.log(params.token);
      if(params.token){
        this.id_user_photos=params.token
        this.getPhotosUser(params.token);
      }else{
        this.id_user_photos=this.user._id
        this.getPhotosUser(this.user._id);
      }
      
    });
    //this.getPhotosUser(this.user._id);
    
  }


  private getPhotosUser(token) :void{
    super.photosUserService.getAllPhotoUser(token)
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(resp=>{
      this.photos=resp;
      this.createObjectPhotos();
      
    })
  }

  createObjectPhotos() : void {
    this.photofeed=[];
    let photosObject=new PhotoFeed();
      console.log(this.photos.length)
      console.log(this.photos)
      
      console.log(this.photofeed);
    for(let i=0; i<this.photos.length;i++){
      console.log(i)
      if(i<this.photos.length){
        photosObject.one=this.photos[i];
      }
      i++;
      if(i<this.photos.length){
        photosObject.two=this.photos[i];
      }
      i++;
      if(i<this.photos.length){
        photosObject.three=this.photos[i];
      }
      this.photofeed.push(photosObject);
      photosObject=new PhotoFeed();
    }
  }
  

  createObjectModal(photo : PhotosUser) : void{ 
    console.log(photo)
    this.modalObject=photo;
    this.photosCommentsServiceChild.comments=[];
    this.photosCommentsServiceChild.getPhotoComments(photo._id);
  }

  photosWithComments() : void{
    super.photosUserService.photosWithCommentsBbdd(this.id_user_photos)
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(resp=>{
      this.photos=resp;
      console.log(this.photos)
      this.createObjectPhotos();
      
    })
    
  }
  
  photosWithOutComments() : void{
    super.photosUserService.photosWithOutCommentsBbdd(this.id_user_photos)
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(resp=>{
      this.photos=resp;
      console.log(this.photos)
      this.createObjectPhotos();
    })
  }




}
