import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {
  

  constructor(public _shared: SharedService) {}

  ngOnInit() {
    this._shared.getDars();
  }

  commandeSucced(){
    alert("youre comande has been valited");
  }
  
}