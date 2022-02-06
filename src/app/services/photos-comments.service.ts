import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { PhotosComments } from '../models/photos-comments';

@Injectable({
  providedIn: 'root'
})
export class PhotosCommentsService {

  rute:string;
  constructor(private http:HttpClient) { 
    if(window.location.port=='4200'){
      this.rute="http://localhost:3000";
      //this.rute=`${window.location.protocol}//${window.location.host}`;
    }else{
      this.rute=`${window.location.protocol}//${window.location.host}`;
    }
    this.rute=this.rute+"/v1/comments";
  }

 
  createPhotosComments(PhotoComment:PhotosComments){
    return this.http.post<PhotosComments>(`${this.rute}/create`,PhotoComment)
    .pipe(map(res=>res));
  }


  updatePhotosComments(PhotoComment:PhotosComments,id_photo){
    return this.http.put<PhotosComments>(`${this.rute}/update/${id_photo}`,PhotoComment)
    .pipe(map(res=>res));
  }


  deletePhotosComment(id_comment){
    return this.http.delete<PhotosComments>(`${this.rute}/delete/${id_comment}`)
    .pipe(map(res=>res));
  }

  getPhotosComments(id_photo){
    return this.http.get<PhotosComments>(`${this.rute}/get/${id_photo}`)
    .pipe(map(res=>res));
  }
  
  
}
