import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Dar } from './models/dar.interface';
import { User } from './models/user.interface';
import { Observable } from 'rxjs';
import { ProductDar } from './models/product-dar.interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  logOutvisibility=false

  // for products

  dars: any[]=[];

  constructor(private http:HttpClient,private router:Router) { }

  private url='http://localhost:3000/Products';

  getAll(){
    return this.http.get<Dar[]>(this.url);
  }

  createDar(dar:any){
    return this.http.post<Dar>(this.url,dar);
  }

  deleteDar(id:any){
    return this.http.delete(`${this.url}/${id}`);
  }

  updateDar(Products:any){
    return this.http.put<Dar>(`${this.url}/${Products.id}`, Products);
  }





  delete(id:any){
    this.deleteDar(id).subscribe(()=>{
      this.dars=this.dars.filter((dar) => dar.id !== id);
    });
  }



  detailObj={
    id:0,
    img:'',
    price:0,
    name:"",
    location:'',
    rooms:'',
    baths:'',
    measure:'',
    UserID:0,
  }

  //for signup/login
  private urlUser='http://localhost:3000/Users';


  signUpUser(user: User){
    return this.http.post(`${this.urlUser}`, user)
  }


  getUserByEmail(email:string): Observable<User[]>{
    return this.http.get<User[]>(`${this.urlUser}?email=${email}`)
  }


  adminAcc(){
    if (sessionStorage.getItem('email')==='admin' && sessionStorage.getItem('password')==='admin') {
      return true;
    }else{
      return false;
    }
  }

  //for basket


  private urlBasket='http://localhost:3000nb/basket';


  getAllBasket(){
    return this.http.get<ProductDar[]>(this.urlBasket);
  }

  createDarBasket(dar:any){
    return this.http.post<ProductDar>(this.urlBasket,dar);
  }

  deleteDarBasket(id:any){
    return this.http.delete(`${this.urlBasket}/${id}`);
  }


  filteredBasketDars: any[] = [];



  add(){
    if (sessionStorage.getItem('email')!=null) {
      const userId = sessionStorage.getItem('id');
    if (userId !== null) {
      this.detailObj.UserID = Number(userId);
    } else {
      console.error('User ID is not found in session storage');
    }
  this.createDarBasket(this.detailObj).subscribe((dar) => {
    this.getTotalItems();
  });
    }
    else{
      this.router.navigate(['login']);
    }
    

  
  }


  
  // basket ts code

  getDars() {
    const userId = Number(sessionStorage.getItem('id'));
    this.getAllBasket().subscribe((data) => {
      this.filteredBasketDars = data.filter((dar) => dar.UserID === userId);
      this.getTotalItems()
    });
  }

  deletee(id: any) {
    this.deleteDarBasket(id).subscribe(() => {
      this.filteredBasketDars = this.filteredBasketDars.filter((dar) => dar.id !== id);
      this.getTotalItems()
    });
  }

  getTotalItems(): number {
    return this.filteredBasketDars.length;
  }

  getTotalPrice(): number {
    return this.filteredBasketDars.reduce((total, dar) => total + parseInt(dar.price, 10), 0);
  }


}
