import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SharedService } from '../shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isPasswordVisible: boolean = false;

  togglePasswordVisibility(): void {
    const passwordField = document.getElementById('input2') as HTMLInputElement;
    const eyeIcon = document.querySelector('.eye') as HTMLElement;
    const eyeSlashIcon = document.querySelector('.eyeSlashed') as HTMLElement;

      this.isPasswordVisible = !this.isPasswordVisible;
      if (this.isPasswordVisible) {
        passwordField.type = 'text';
        eyeIcon.style.display = 'inline';
        eyeSlashIcon.style.display = 'none';
      } else {
        passwordField.type = 'password';
        eyeIcon.style.display = 'none';
        eyeSlashIcon.style.display = 'inline';
      }
  }
  constructor(private fb:FormBuilder,private _shared:SharedService,private router : Router){}

  loginForm=this.fb.group({
    email:['',[Validators.required]],
    password:['',Validators.required]
  })

  get email(){
    return this.loginForm.controls['email'];
  }

  get password(){
    return this.loginForm.controls['password'];
  }  


  loginUser(){
    const { email, password }=this.loginForm.value;
    this._shared.getUserByEmail(email as string).subscribe(
      response => {
        if(response.length>0 && response[0].password === password ){
          const user = response[0];
          sessionStorage.setItem('email', email as string);
          sessionStorage.setItem('password', password as string);
          sessionStorage.setItem('id', user.id);
          this.router.navigate(['home']);
          this._shared.logOutvisibility=true;
        }
      }
    )
  } 
}
