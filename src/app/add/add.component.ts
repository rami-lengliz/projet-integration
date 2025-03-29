import { Component } from '@angular/core';
import { SharedService } from '../shared.service';
import { Dar } from '../models/dar.interface';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent {



  dar={
    id:Date.now(),
    img:'assets/property-1.jpg',
    price:0,
    name:'',
    location:'',
    rooms:'',
    baths:'',
    measure:'',
  }
  

  add(){
    
  this._shared.createDar(this.dar).subscribe((dar) => {
    this._shared.dars.push(dar);
    this.dar = {
      id:Date.now(),
      img: 'assets/property-1.jpg',
      price: 0,
      name: '',
      location: '',
      rooms: '',
      baths: '',
      measure: '',
    };
  });



  }

  updatebtn=false;

  edit(dar:Dar){
    this.dar=dar;
    this.updatebtn=true;
    scroll({
      top:0,
      behavior:'smooth',
    })
  }

  // for update dar

  update(){
    this._shared.updateDar(this.dar).subscribe(mydar => {
      this.dar = {
        id:Date.now(),
        img: 'assets/property-1.jpg',
        price: 0,
        name: '',
        location: '',
        rooms: '',
        baths: '',
        measure: '',
      };
      this.updatebtn=false;

    })
  }


  InputsFilled(): boolean {
    return (
      !!this.dar.img && 
      !!this.dar.rooms && 
      !!this.dar.baths && 
      !!this.dar.name && 
      !!this.dar.price && 
      !!this.dar.location && 
      !!this.dar.measure
    );
  }
  constructor(public _shared:SharedService){}

}
