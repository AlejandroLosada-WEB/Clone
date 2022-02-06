import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FeedContainerComponent } from './pages/feed-container/feed-container.component';
import { HomeComponent } from './pages/home/home.component';



const routes:Routes=[
  {
    path:'',
    component:FeedContainerComponent,
    children:[
      {path:'home',component:HomeComponent},
      {path:'home/:token',component:HomeComponent},
      {path:'**',redirectTo:'home'},
    ]
  }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class FeedRoutingModule { }
