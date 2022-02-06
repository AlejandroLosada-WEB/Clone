import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-email-verify',
  templateUrl: './email-verify.component.html',
  styleUrls: ['./email-verify.component.css']
})
export class EmailVerifyComponent implements OnInit {
  private ngUnsubscribe = new Subject();
  public token:string;

  constructor(private userService:UserService,private router:Router,private route: ActivatedRoute) { 
    this.route.params.subscribe(params=>{
      this.token=params.token;
      
        if(!this.token){
          this.router.navigateByUrl('/login');
        }else{
          this.userService.activateUser(this.token)
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe(resp=>{
              //console.log(resp)
            })
        }
        
      });
  }

  ngOnInit() {
  }

}
