import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import { User } from '../../../models/user';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})





export class LoginComponent implements OnInit {
  private user:User;
  formSwitch=1;
  private ngUnsubscribe = new Subject();
  selectedIndex=0;
  formLogin = new FormGroup({
    email : new FormControl('',[Validators.email,Validators.required]),
    password : new FormControl('',[Validators.maxLength(50),Validators.minLength(7),Validators.required]),
    recordar : new FormControl(),
  });

  formRegistro = new FormGroup({
    emailRegister : new FormControl('',[Validators.email,Validators.required]),
    passwordRegister : new FormControl('',[Validators.maxLength(50),Validators.minLength(7),Validators.required]),
    passwordRepeat : new FormControl('',[Validators.maxLength(50),Validators.minLength(7),Validators.required]),
    nameUser : new FormControl('',[Validators.maxLength(50),Validators.minLength(1),Validators.required]),
  });

  formForgot = new FormGroup({
    emailForgot : new FormControl('',[Validators.email,Validators.required]),
  });

  constructor(private userService:UserService,private router:Router) { }


  ngOnInit() {
    
  }

  register() : boolean{
    
    if(!this.errorControllerRegister()){
      return false;
    }
    this.displayNoneElements();
    this.createUser('register');
    this.createUserBbdd();    
  }

  login() : boolean{
    
    if(!this.errorControllerLogin()){
      return false;
    }
    this.displayNoneElements();
    this.createUser('login');
    this.loginUser();
     
  }

  errorControllerRegister() : boolean{
    if(this.formRegistro.invalid){
      if(this.formRegistro.controls.emailRegister.invalid){Swal.fire({icon: 'error',title: 'ERROR',text: 'Email mal introducido',});return false;}
      if(this.formRegistro.controls.passwordRegister.invalid){Swal.fire({icon: 'error',title: 'ERROR',text: 'El password debe tener al menos 7 carácteres',});return false;}
      if(this.formRegistro.controls.passwordRepeat.invalid){Swal.fire({icon: 'error',title: 'ERROR',text: 'El password debe tener al menos 7 carácteres',});return false;}
      if(this.formRegistro.controls.nameUser.invalid){Swal.fire({icon: 'error',title: 'ERROR',text: 'Nombre mal introducido',});return false;}
    }
    if(this.formRegistro.controls.passwordRepeat.value!=this.formRegistro.controls.passwordRegister.value){Swal.fire({icon: 'error',title: 'ERROR',text: 'Los passwords deben ser iguales',});return false;}
    return true
  }

  errorControllerLogin() : boolean{
    if(this.formLogin.invalid){
      if(this.formLogin.controls.email.invalid){Swal.fire({icon: 'error',title: 'ERROR',text: 'Email mal introducido',});return false;}
      if(this.formLogin.controls.password.invalid){Swal.fire({icon: 'error',title: 'ERROR',text: 'El password debe tener al menos 7 carácteres',});return false;}
    }
    return true
  }

  loginUser(){
    this.userService.login(this.user)
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(resp=>{
      switch(resp["Message"]) { 
        case "Error inesperado": { 
          this.displayElements('error','Error inesperado');
          break;
        } 
        case "Email no encontrado": { 
          this.displayElements('info','Email no encontrado');
          break;
        } 
        case "Email o password erroneos": { 
          this.displayElements('error','Email o password erroneos');
          break;
       } 
        case "Usuario encontrado": { 
          sessionStorage.setItem('token',resp['token']);
          
          this.router.navigateByUrl('/feed/home');
          break;
        } 
        default: { 
          this.displayElements('error','Error inesperado');
          break;
        } 
     }

    })
  }
  
  createUser(type) : void{
    this.user=new User();
    if(type=="register"){
      this.user.email=this.formRegistro.controls.emailRegister.value;
      this.user.password=this.formRegistro.controls.passwordRegister.value;
      this.user.name=this.formRegistro.controls.nameUser.value;
      this.user.active=false;
      this.user.photoProfile="";
    }
    if(type=="login"){
      this.user.email=this.formLogin.controls.email.value;
      this.user.password=this.formLogin.controls.password.value;
      
    }
    if(type=="forgot"){
      this.user.email=this.formForgot.controls.emailForgot.value;
    }
  }

  createUserBbdd(){
    this.userService.createUser(this.user)
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(resp=>{
      //console.log(resp)
      switch(resp["Message"]) { 
        case "Email ya registrado": { 
          this.displayElements('info','Email ya registrado');
          break;
        } 
        case "Registro completado": { 
          this.formRegistro.reset()
          Swal.fire({icon:'success',title:'Registro completado',text:'Te hemos enviado un email, verifica tu correo electrónico y revisa en SPAM'});
          this.formSwitch=1;
          document.getElementById("tabGroup").style.display="block";
          break;
        } 
        default: { 
          this.displayElements('error','Ha ocurrido un error inesperado');
          break;
        } 
     }
      
    })
  }
  
  forgotMailUser(){
    if(!this.errorControllerForgot()){
      return false;
    }
    this.displayNoneElements();
    this.createUser('forgot')
    this.forgotMailUserBbdd();
  }

  forgotMailUserBbdd(){
    this.userService.forgotMailUser(this.user.email)
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(resp=>{
      switch(resp["Message"]) { 
        case "Email no encontrado": { 
          this.displayElements('info','Email no encontrado');
          break;
        }
        case "Error inesperado": { 
          this.displayElements('info','Error inesperado');
          break;
        } 
        case "Email de recuperación enviado": { 
          this.formForgot.reset()
          this.displayElements('','Email de recuperación enviado, revisa en SPAM');
          break;
        } 
        default: { 
          this.displayElements('error','Ha ocurrido un error inesperado');
          break;
        } 
     }
      
    })
  }

  errorControllerForgot() : boolean{
    if(this.formForgot.invalid){
      if(this.formForgot.controls.emailForgot.invalid){Swal.fire({icon: 'error',title: 'ERROR',text: 'Email mal introducido',});return false;}
    }
    return true
  }

  displayElements(icon,text) : void{
    Swal.fire({icon:icon,title:text});
    this.formSwitch=1;
    document.getElementById("tabGroup").style.display="block";
  }

  displayNoneElements() : void{
    this.formSwitch=2;
    document.getElementById("tabGroup").style.display="none";
  }

}

