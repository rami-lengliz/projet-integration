import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasketComponent } from './basket/basket.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ContactComponent } from './contact/contact.component';
import { SignupComponent } from './signup/signup.component';
import { AboutComponent } from './about/about.component';
import { AddComponent } from './add/add.component';
import { ProductComponent } from './product/product.component';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  {path:'basket',component:BasketComponent, canActivate:[authGuard]},
  {path:'home',component:HomeComponent },
  {path:'',component:LoginComponent},
  {path:'contact',component:ContactComponent},
  {path:'signup',component:SignupComponent},
  {path:'about',component:AboutComponent},
  {path:'product',component:ProductComponent},
  {path:'add',component:AddComponent},

  { path: '**', redirectTo: ''}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
