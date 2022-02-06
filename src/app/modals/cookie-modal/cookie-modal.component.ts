import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-cookie-modal',
  templateUrl: './cookie-modal.component.html',
  styleUrls: ['./cookie-modal.component.css']
})
export class CookieModalComponent implements OnInit {
  cookieValue:String;

  constructor(private cookieService: CookieService) {}

  ngOnInit() : void {
    this.cookieValue = this.cookieService.get('Entendido');
    if(this.cookieValue==""){
      document.getElementById('modalButtom').click();
    }
  }

  dismiss() : void{
    this.cookieService.set('Entendido','Si');
    document.getElementById('modalButtom').click();
  }


}
