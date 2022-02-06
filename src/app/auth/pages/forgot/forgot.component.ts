import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { User } from 'src/app/models/user';
import Swal from 'sweetalert2';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent implements OnInit {
  user:User;
  token:String;
  private ngUnsubscribe = new Subject();

  formPassword = new FormGroup({
    password : new FormControl('',[Validators.maxLength(50),Validators.minLength(7),Validators.required]),
    passwordRepeat : new FormControl('',[Validators.maxLength(50),Validators.minLength(7),Validators.required]),
  });
  

  constructor(private route: ActivatedRoute,private userService:UserService,private router:Router) {
    this.route.params.subscribe(params=>{
      this.token=params.token;
    })
  }

  ngOnInit() {
  }

  changePasswordUser() : boolean{
    
    if(!this.errorControllerChangePassword()){
      return false;
    }
    this.createUser();
    this.changePasswordBbdd();  
  }

  errorControllerChangePassword() : boolean{
    if(this.formPassword.invalid){
      if(this.formPassword.controls.password.invalid){Swal.fire({icon: 'error',title: 'ERROR',text: 'El password debe tener al menos 7 carácteres',});return false;}
      if(this.formPassword.controls.passwordRepeat.invalid){Swal.fire({icon: 'error',title: 'ERROR',text: 'El password debe tener al menos 7 carácteres',});return false;}
    }
    if(this.formPassword.controls.passwordRepeat.value!=this.formPassword.controls.password.value){Swal.fire({icon: 'error',title: 'ERROR',text: 'Los passwords deben ser iguales',});return false;}
    return true
  }

  changePasswordBbdd(){
    this.userService.changePassword(this.user)
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(resp=>{
      //console.log(resp)
      switch(resp["Message"]) { 
        case "Error al crear al actualizar el registro": { 
          Swal.fire({icon: 'error',title: 'ERROR',text: 'Error al crear al actualizar el registro',});
          break;
        } 
        case "Registro actualizado": { 
          Swal.fire({icon: 'success',title: 'El cambio de contraseña ha sido efectuado',showConfirmButton: false,timer: 1500})
          setTimeout(()=>{ this.router.navigateByUrl('/login'); }, 1600);
          break;
        }  
        default: { 
          Swal.fire({icon: 'error',title: 'ERROR',text: 'Ha ocurrido un error inesperado',});
          break;
        } 
     }

    })
   
  }  
  

  createUser() : void{
    this.user=new User();
    this.user._id=this.token;
    this.user.password=this.formPassword.controls.password.value;
  }

}
