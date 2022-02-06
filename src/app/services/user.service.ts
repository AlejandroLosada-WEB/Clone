import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  rute:string;
  constructor(private http:HttpClient) { 
    if(window.location.port=='4200'){
      this.rute="http://localhost:3000";
      //this.rute=`${window.location.protocol}//${window.location.host}`;
    }else{
      this.rute=`${window.location.protocol}//${window.location.host}`;
    }
    this.rute=this.rute+"/v1/users";
  }

  login(user:User){
    return this.http.post<User>(`${this.rute}/login`,user)
    .pipe(map(res=>res));
  }

  createUser(user:User){
    return this.http.post<User>(`${this.rute}/create`,user)
    .pipe(map(res=>res));
  }

  changePassword(user:User){
    return this.http.post<User>(`${this.rute}/password`,user)
    .pipe(map(res=>res));
  }

  photoUpload(photo,token){
    return this.http.post<User>(`${this.rute}/photoprofile/${token}`,photo)
    .pipe(map(res=>res));
  }

  updateUser(user:User,token){
    return this.http.put<User>(`${this.rute}/update/${token}`,user)
    .pipe(map(res=>res));
  }

  forgotMailUser(token){
    return this.http.get<User>(`${this.rute}/forgot/${token}`)
    .pipe(map(res=>res));
  }

  verifyToken(token){
    return this.http.get<User>(`${this.rute}/verify/${token}`)
    .pipe(map(res=>res));
  }

  getToken(user){
    return this.http.post<User>(`${this.rute}/gettoken`,user)
    .pipe(map(res=>res));
  }

  activateUser(token){
    return this.http.get<User>(`${this.rute}/activate/${token}`)
    .pipe(map(res=>res));
  }

  deleteUser(token){
    return this.http.delete<User>(`${this.rute}/delete/${token}`)
    .pipe(map(res=>res));
  }

  getUser(token){
    return this.http.get<User>(`${this.rute}/get/${token}`)
    .pipe(map(res=>res));
  }
  
  getAllUsuarios(){
    return this.http.get<User[]>(`${this.rute}/getAll`)
    .pipe(map(res=>res));
  }

}
