import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeedRoutingModule } from './feed-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { FeedContainerComponent } from './pages/feed-container/feed-container.component';
import { RouterModule } from '@angular/router';
import { BnNgIdleService } from 'bn-ng-idle';
import {MaterialModule} from '../material';
import { BotonMenuComponent } from './pages/components/boton-menu/boton-menu.component';
import { SidenavComponent } from './pages/components/sidenav/sidenav.component';
import { CarouselPhotosComponent } from './pages/components/carousel-photos/carousel-photos.component';
import { PhotosComponent } from './pages/components/photos/photos.component';


import { FileUploadModule } from 'ng2-file-upload';
import { PhotosCommentComponent } from './pages/components/photos/photos-comment/photos-comment.component';
import { LazyLoadImageModule } from 'ng-lazyload-image';

@NgModule({
  declarations: [
    HomeComponent,
    FeedContainerComponent,
    BotonMenuComponent,
    SidenavComponent,
    CarouselPhotosComponent,
    PhotosComponent,
    PhotosCommentComponent,
  ],
  imports: [
    CommonModule,
    FeedRoutingModule,
    RouterModule,
    MaterialModule,
    FileUploadModule,
    LazyLoadImageModule
    
  ],
  providers: [
    BnNgIdleService
  ],
  exports:[
    RouterModule
  ]
})
export class FeedModule { }
