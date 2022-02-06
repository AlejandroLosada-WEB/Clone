import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/models/user';
import { FeedContainerComponent } from '../../feed-container/feed-container.component';
import jwt_decode from "jwt-decode";
import Swal from 'sweetalert2';
import { FormControl, FormGroup } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { FileUploader } from 'ng2-file-upload';
import { CarouselPhotosComponent } from '../carousel-photos/carousel-photos.component';


@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent extends FeedContainerComponent {
  @ViewChild(CarouselPhotosComponent, {static: false }) carouselPhotosServiceChild: CarouselPhotosComponent;

  user:User;
  ruta:string;
  photoProfile:String;
  changeUploadPhoto:boolean=false;
  ngUnsubscribe = new Subject();
  public uploader:FileUploader;
  //URL ="http://localhost:3000/v1/users/imagen/photos";
  URL ="/v1/users/imagen/photos";
  maxFileSize = 10 * 1024 * 1024;

  profileUploadForm = new FormGroup({
    avatar : new FormControl(),
  });

  ngOnInit() {
    this.user = jwt_decode(sessionStorage.getItem('token'));
    this.uploader=new FileUploader({url:this.URL,maxFileSize: this.maxFileSize});
    setTimeout(()=>{
      this.photoProfile=this.user.photoProfile;
    },5000)
    
  }

  modelChangeFn(){
    if(this.profileUploadForm.controls.avatar && this.profileUploadForm.controls.avatar.value!=''){
      setTimeout(()=>{
        if(this.uploader.queue[0].file.type!="image/png" && this.uploader.queue[0].file.type!="image/jpeg" && this.uploader.queue[0].file.type!="image/jpg"){
          this.photoButtonOn();
          Swal.fire({icon:'error',title:'Archivo no permitido',text:'Solo son permitidos los formatos JPG y PNG'});
        }else{
          this.photoButtonOff();
        }
      },300);
      
    }else{
      this.photoButtonOn();
    }
  }

  photoButtonOff(){
    document.getElementById("photoUploadButton").style.background="black";
    document.getElementById("photoUploadButton").innerText="Foto subida";
    document.getElementById("photoUploadButtonDelete").style.visibility="visible";
  }

  photoButtonOn(){
    this.uploader= new FileUploader({url: this.URL,maxFileSize: this.maxFileSize});
    document.getElementById("photoUploadButton").style.background="transparent";
    document.getElementById("photoUploadButton").innerText="Subir foto de perfil";
    document.getElementById("photoUploadButtonDelete").style.visibility="hidden";
  }

  deletePhoto(){
    this.profileUploadForm.controls.avatar.setValue("")
    this.modelChangeFn()
  }

  profileUpload(){
    document.getElementById("matSpinnerNav").style.visibility="visible";
    if(this.profileUploadForm.controls.avatar && this.profileUploadForm.controls.avatar.value!=''){
      //SUBE IMAGEN AL SERVIDOR
      if(this.uploader.queue[0]){
        let extension=this.uploader.queue[0].file.name.split(".");
        let nombre_archivo=this.user._id+"-avatar"+"."+extension[extension.length-1];
        this.uploader.queue[0].file.name=nombre_archivo;
        //console.log(this.uploader.queue[0])
        
        this.uploader.queue[0].upload();
    
        this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
         //console.log(response);
          
          //console.log("IMAGEN "+response);
          this.user.photoProfile=response;
          
          
          this.updateUserBbdd();
          this.photoButtonOn()
          document.getElementById("matSpinnerNav").style.visibility="hidden";
        };
      }
      
    }else{
      this.updateUserBbdd();
      this.photoButtonOn()
      document.getElementById("matSpinnerNav").style.visibility="hidden";
    }
    
    
  }


  updateUserBbdd(){
    console.log("AKI ABAJO")
    console.log(this.user)
    super.userService.updateUser(this.user,this.user._id)
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(resp=>{
      console.log(resp)
      //this.photoProfile=this.user.photoProfile
      super.userService.getToken(this.user)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(resp=>{
        sessionStorage.removeItem('token');
        sessionStorage.setItem('token',resp['token']);
        Swal.fire({icon:'success',title:'Datos actualizados',text:'Has actualizado tu perfil'});
        setTimeout(()=>{
          super.refrescarComponente();
        },2000)
        
        //this.carouselPhotosServiceChild.refresh()
        
      })
    })
  }
  
 
  logOut() : void{
    Swal.fire({
      title: '¿Quieres cerrar tu sesión?',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Cerrar sesión',
      showLoaderOnConfirm: true,
      preConfirm: (comment) => {
        sessionStorage.clear();
        super.router.navigateByUrl("/login")
      },
      
    })
  }

}
