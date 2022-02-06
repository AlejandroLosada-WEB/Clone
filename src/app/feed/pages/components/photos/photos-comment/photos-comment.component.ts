import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/models/user';
import Swal from 'sweetalert2';
import { FeedContainerComponent } from '../../../feed-container/feed-container.component';
import jwt_decode from "jwt-decode";
import { PhotosComments } from 'src/app/models/photos-comments';
import { takeUntil } from 'rxjs/operators';



@Component({
  selector: 'app-photos-comment',
  templateUrl: './photos-comment.component.html',
  styleUrls: ['./photos-comment.component.css']
})
export class PhotosCommentComponent extends FeedContainerComponent {
  @Input() id_photo: String;
  @Input() id_user_photo: String;
  user:User;
  photosComment:PhotosComments;
  comments:PhotosComments[];
  

  ngOnInit() {
    this.user = jwt_decode(sessionStorage.getItem('token'));
    this.photosComment=new PhotosComments();
    
  }

  comment(){
    this.photosComment=new PhotosComments();
    this.photosComment._id_user_photo=this.id_user_photo;
    this.photosComment._id_photo=this.id_photo;
    this.photosComment._id_user_comment=this.user._id;
    this.photosComment.name_user_comment=this.user.name;
    let date=new Date();
    let day = String(date.getDate());
    let month = String(date.getMonth()+1);
    
    
    (Number(month) < 10)?month="0"+month:month=month;
    (Number(day) < 10)?day="0"+day:day=day;

    let fullDate=day+"/"+month+"/"+date.getFullYear();
    this.photosComment.fecha=fullDate;
    this.photosComment.date=date;
    this.photosComment.hora=date.getHours()+":"+date.getMinutes();
    this.photosComment.path_avatar_user_comment=this.user.photoProfile;
    
 


    this.comment
    Swal.fire({
      title: 'Comentar',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Comentar',
      showLoaderOnConfirm: true,
      preConfirm: (comment) => {
        this.photosComment.comment=comment;
        
        super.photoCommentsService.createPhotosComments(this.photosComment)
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(resp=>{
          switch(resp["Message"]) { 
            case "Error al crear el registro": { 
              Swal.fire({icon:'error',title:'Operación no realizado',text:'Ha habido un error al realizar la operación'});
              break;
            } 
            case "Registro completado": { 
              Swal.fire({icon:'success',title:'Comentario creado',text:'El comentario ha sido creado'});
              this.getPhotoComments(this.id_photo)
              break;
            } 
            default: { 
              Swal.fire({icon:'error',title:'Operación no realizado',text:'Ha habido un error inesperado'});
              break;
            } 
         }
        });
      },
      
    })
  }


  getPhotoComments(id) : void{
    
    super.photoCommentsService.getPhotosComments(id)
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(resp=>{
      switch(resp["Message"]) { 
        case "Error en la busqueda": { 
          this.comments=[];
          break;
        } 
        case "Busqueda completada": { 
          this.comments=resp['comments'];
          console.log("COMENTARIOS")
          console.log(this.comments)
          break;
        } 
        default: { 
          this.comments=[];
          break;
        } 
     }
    });

  }

  commentDelete(id){
    Swal.fire({
      title: 'Borrar comentario',
      text: "¿Estás seguro de que deseas borrar este comentario?",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Borrar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteCommentBbdd(id);
      }
    })
  }


  deleteCommentBbdd(id) : void{
    
    super.photoCommentsService.deletePhotosComment(id)
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(resp=>{
      switch(resp["Message"]) { 
        case "Error al crear al borrar el registro": { 
          Swal.fire({icon:'error',title:'Comentario no borrado',text:'No se ha podido borrar el comentario'});
          break;
        } 
        case "Registro borrado": { 
          Swal.fire(
            'Comentario borrado',
            'El comentario ha sido borrado.',
            'success'
          )
          this.getPhotoComments(this.id_photo)
          break;
        } 
        default: { 
          Swal.fire({icon:'error',title:'Operación no realizado',text:'Ha habido un error al realizar la operación'});
          break;
        } 
     }
    });

  }

}
