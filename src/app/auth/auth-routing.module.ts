import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthContainerComponent } from './pages/auth-container/auth-container.component';
import { EmailVerifyComponent } from './pages/email-verify/email-verify.component';
import { ForgotComponent } from './pages/forgot/forgot.component';
import { LoginComponent } from './pages/login/login.component';


const routes:Routes=[
  {
    path:'',
    component:AuthContainerComponent,
    children:[
      {path:'login',component:LoginComponent},
      {path:'forgot/:token',component:ForgotComponent},
      {path:'emailverify/:token',component:EmailVerifyComponent},
      {path:'**',redirectTo:'login'},
    ]
  }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class AuthRoutingModule { }
