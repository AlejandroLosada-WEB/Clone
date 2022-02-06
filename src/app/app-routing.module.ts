import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

const routes:Routes=[
  {
    path:'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path:'feed',
    loadChildren: () => import('./feed/feed.module').then(m => m.FeedModule)
  },
  {
    path:'**', redirectTo:'auth'
  }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class AppRoutingModule { }
