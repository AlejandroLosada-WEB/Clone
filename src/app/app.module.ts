import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {MaterialModule} from './material';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { CookieModalComponent } from './modals/cookie-modal/cookie-modal.component';
import { CookieService  } from 'ngx-cookie-service';
import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';



@NgModule({
  declarations: [
    AppComponent,
    CookieModalComponent,
    
  ],
  imports: [
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
