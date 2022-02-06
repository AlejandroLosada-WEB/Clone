import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import randomInteger from 'random-int';
import jwt_decode from "jwt-decode";
import { Subject } from 'rxjs';
import { FileUploader } from 'ng2-file-upload';
import { FeedContainerComponent } from '../../feed-container/feed-container.component';
import { User } from 'src/app/models/user';
import { PhotosUser } from 'src/app/models/photos-user';
import { FormControl, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { PhotosComponent } from '../../components/photos/photos.component';



@Component({
  selector: 'app-boton-menu',
  templateUrl: './boton-menu.component.html',
  styleUrls: ['./boton-menu.component.css']
})
export class BotonMenuComponent extends FeedContainerComponent {
  ngUnsubscribe = new Subject();
  user:User;
  public uploader:FileUploader;
  
  //URL ="http://localhost:3000/v1/users/imagen/photos";
  URL ="/v1/users/imagen/photos";
  
  maxFileSize = 10 * 1024 * 1024;

  photoUploadForm = new FormGroup({
    photo : new FormControl(),
  });

  ngOnInit() {
    this.user = jwt_decode(sessionStorage.getItem('token'));
    this.uploader=new FileUploader({url:this.URL,maxFileSize: this.maxFileSize});
    
  }

  clickToUpload(){
    document.getElementById('uploadPhotoButton').click()
  }


  modelChangePhoto(){
    //console.log(this.uploader)
    //console.log(this.photoUploadForm.controls.photo.value)

    Swal.fire({
      title: '¿Deseas subir la foto?',
      imageWidth: 400,
      imageHeight: 200,
      showDenyButton: true,
      confirmButtonText: 'Subir foto',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        document.getElementById("matSpinner").style.visibility="visible";
        this.photoUpload();
        //Swal.fire('¡Foto subida!', '', 'success')
      } else if (result.isDenied) {
        this.uploader=new FileUploader({url:this.URL,maxFileSize: this.maxFileSize});
        //console.log(this.uploader)
        Swal.fire('Foto no subida', '', 'info')
      }
    })

    
  }

  photoUpload(){
    
    if(this.photoUploadForm.controls.photo && this.photoUploadForm.controls.photo.value!=''){
      //SUBE IMAGEN AL SERVIDOR
      let cod=randomInteger(1000000,9999999);
      
      if(this.uploader.queue[0]){
        let extension=this.uploader.queue[0].file.name.split(".");
        
        if(extension[extension.length-1]!="jpg" && extension[extension.length-1]!="png" && extension[extension.length-1]!="jfif"){
          Swal.fire({icon:'error',title:'Archivo no valido',text:'Debe ser un archivo jpg o png'});
          document.getElementById("matSpinner").style.visibility="hidden";
        }else{
            let nombre_archivo=this.user._id+"-photo-"+cod+""+"."+extension[extension.length-1];
            this.uploader.queue[0].file.name=nombre_archivo;
            console.log(this.uploader.queue[0])
            
            this.uploader.queue[0].upload();
        
            this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
            //console.log(response);
              
              //console.log("IMAGEN "+response);
              
              
              this.updateNewPhotoBbdd(response)
        }
        };
      }
      
    }
  }

  updateNewPhotoBbdd(path){
    let photo=new PhotosUser()
    photo._id_user=this.user._id;
    photo.path=path;
    super.photosUserService.createPhoto(photo)
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(resp=>{
      super.refrescarComponente()
      Swal.fire({icon:'success',title:'Datos actualizados',text:'Has actualizado tu perfil'});
      document.getElementById("matSpinner").style.visibility="hidden";
    })
  }

}
