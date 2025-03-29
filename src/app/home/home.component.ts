import { Component,OnInit } from '@angular/core';
import { SharedService } from '../shared.service';
import { Dar } from '../models/dar.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  constructor(public _shared:SharedService){}

  searchLocation: string = '';
  filteredDars: Dar[] = [];

  ngOnInit() {
    this.getDars();
    this._shared.getDars();
  }

  

  getDars(){
    this._shared.getAll().subscribe(data => {
      this._shared.dars=data;
      this.filteredDars=data; 
    })
  }

 

  detalis(dar : Dar){
    console.log(dar)
    this._shared.detailObj.img=dar.img;
    this._shared.detailObj.price=dar.price;
    this._shared.detailObj.location=dar.location;
    this._shared.detailObj.name=dar.name;
    this._shared.detailObj.measure=dar.measure;
    this._shared.detailObj.baths=dar.baths;
    this._shared.detailObj.rooms=dar.rooms;
  }

}
