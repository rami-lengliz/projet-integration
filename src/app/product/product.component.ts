import { Component,OnInit } from '@angular/core';
import { SharedService } from '../shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit{
  constructor(public _shared:SharedService,private router:Router){}

  
  
  ngOnInit() {
    this._shared.getDars();
  }

  

  add(){
    if (sessionStorage.getItem('email')!=null) {
      const userId = sessionStorage.getItem('id');
    if (userId !== null) {
      this._shared.detailObj.UserID = Number(userId);
    } else {
      console.error('User ID is not found in session storage');
    }
  this._shared.createDarBasket(this._shared.detailObj).subscribe((dar) => {
    this._shared.getTotalItems();
    this.ngOnInit();
  });
    }
    else{
      this.router.navigate(['login']);
    }
    

  
  }
}
