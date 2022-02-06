import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { User } from 'src/app/models/user';
import { FeedContainerComponent } from '../../feed-container/feed-container.component';
import jwt_decode from "jwt-decode";

@Component({
  selector: 'app-carousel-photos',
  templateUrl: './carousel-photos.component.html',
  styleUrls: ['./carousel-photos.component.css']
})
export class CarouselPhotosComponent extends FeedContainerComponent {
  users:User[];
  user:User;
  ngOnInit() {
    this.user = jwt_decode(sessionStorage.getItem('token'));
    super.userService.getAllUsuarios()
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(resp=>{
      console.log("USUARIOS")
      this.users=resp;
    })
  }

  refresh() : void{
    super.userService.getAllUsuarios()
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(resp=>{
      console.log("USUARIOS")
      this.users=resp;
    })
  }

  lookUser(token){
    super.router.navigateByUrl('/feed/home/'+token)
  }

}
