import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { BnNgIdleService } from 'bn-ng-idle';
import Swal from 'sweetalert2';
import { PhotosUserService } from 'src/app/services/photos-user.service';
import { PhotosCommentsService } from 'src/app/services/photos-comments.service';


@Component({
  selector: 'app-feed-container',
  templateUrl: './feed-container.component.html',
  styleUrls: ['./feed-container.component.css']
})
export class FeedContainerComponent implements OnInit {
 
  
  token:string;
  public ngUnsubscribe = new Subject();

  public get userService(): UserService {
    return this._userService;
  }
  public set userService(value: UserService) {
    this._userService = value;
  }

  public get photosUserService(): PhotosUserService {
    return this._photosUserService;
  }
  public set photosUserService(value: PhotosUserService) {
    this._photosUserService = value;
  }

  public get photoCommentsService(): PhotosCommentsService {
    return this._photoCommentsService;
  }
  public set photoCommentsService(value: PhotosCommentsService) {
    this._photoCommentsService = value;
  }

  public get route(): ActivatedRoute {
    return this._route;
  }
  public set route(value: ActivatedRoute) {
    this._route = value;
  }

  public get router(): Router {
    return this._router;
  }
  public set router(value: Router) {
    this._router = value;
  }



  constructor(private _router: Router,private _userService: UserService,private bnIdle: BnNgIdleService,private _photosUserService:PhotosUserService,private _photoCommentsService:PhotosCommentsService,private _route: ActivatedRoute) { 
    this.token = sessionStorage.getItem('token');
    if(!this.token){
      this.router.navigateByUrl('/login');
    }
    //var decoded = jwt_decode(this.token);
    //console.log(decoded);
    this.verifyToken()
    this.bnIdle.startWatching(10000).subscribe((res) => {
      if(res) {
          Swal.fire({icon: 'info',title: 'La sesión ha expirado',showConfirmButton: false,timer: 1500})
          setTimeout(()=>{ this.router.navigateByUrl('/login'); }, 1600);
          sessionStorage.clear()
          console.log("session expired");
      }
    })
  }

  ngOnInit() {
  }

  verifyToken(){
    
    this.userService.verifyToken(this.token)
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(resp=>{
      switch(resp["Message"]) { 
        case "Token no autorizado": { 
          this.router.navigateByUrl('/login');
          break;
        } 
        case "Token autorizado": { 
          break;
        } 
        default: { 
          this.router.navigateByUrl('/login');
          break;
        } 
     }
      
    })
  }

  public refrescarComponente(){
    this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
        this.router.navigate([window.location.pathname]);
    });
  } 
}
