import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { PhotosUser } from '../models/photos-user';


@Injectable({
  providedIn: 'root'
})
export class PhotosUserService {

  rute:string;
  constructor(private http:HttpClient) { 
    if(window.location.port=='4200'){
      this.rute="http://localhost:3000";
      //this.rute=`${window.location.protocol}//${window.location.host}`;
    }else{
      this.rute=`${window.location.protocol}//${window.location.host}`;
    }
    this.rute=this.rute+"/v1/photos";
  }

  createPhoto(photo:PhotosUser){
    return this.http.post<PhotosUser>(`${this.rute}/create`,photo)
    .pipe(map(res=>res));
  }

  getAllPhotoUser(token){
    return this.http.get<PhotosUser[]>(`${this.rute}/getAllPhotosUser/${token}`)
    .pipe(map(res=>res));
  }

  photosWithCommentsBbdd(token){
    return this.http.get<PhotosUser[]>(`${this.rute}/getPhotosWithComments/${token}`)
    .pipe(map(res=>res));
  }

  photosWithOutCommentsBbdd(token){
    return this.http.get<PhotosUser[]>(`${this.rute}/getPhotosWithOutComments/${token}`)
    .pipe(map(res=>res));
  }
  
  
}
