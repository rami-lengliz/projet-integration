import { Component } from '@angular/core';
import { SharedService } from '../shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(public _shared: SharedService,private router : Router){}


  logOut(){
    sessionStorage.clear();
    this.router.navigate(['']);
    this._shared.logOutvisibility=false;
  }

  checkSession(){
    if (sessionStorage.getItem('email')!=null) {
      return true
    }
    else{
      return false
    }
  }

}
