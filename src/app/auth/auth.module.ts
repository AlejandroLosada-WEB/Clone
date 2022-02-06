import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './pages/login/login.component';
import { ForgotComponent } from './pages/forgot/forgot.component';
import { AuthRoutingModule } from './auth-routing.module';
import {MaterialModule} from '../material';
import { EmailVerifyComponent } from './pages/email-verify/email-verify.component';
import {RouterModule} from '@angular/router';
import { AuthContainerComponent } from './pages/auth-container/auth-container.component';



@NgModule({
  declarations: [
    LoginComponent,
    ForgotComponent,
    EmailVerifyComponent,
    AuthContainerComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MaterialModule,
    RouterModule
  ],
  exports:[
    RouterModule
  ]
})
export class AuthModule { }
