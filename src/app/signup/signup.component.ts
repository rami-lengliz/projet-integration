import { Component } from '@angular/core';
import { FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { SharedService } from '../shared.service';
import { User } from '../models/user.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {


  


  isPasswordVisible: boolean = false;

  togglePasswordVisibility(): void {
    const passwordField = document.getElementById('input7') as HTMLInputElement;
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

  constructor(private fb:FormBuilder,private _shared: SharedService,private router:Router){};

  signupForm=this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{8,15}$')]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    },
    
    {validators: passwordMatchValidator}
  );



  get name(){
    return this.signupForm.controls['name'];
  }

  get phone(){
    return this.signupForm.controls['phone'];
  }  

  get email(){
    return this.signupForm.controls['email'];
  }

  get password(){
    return this.signupForm.controls['password'];
  }  

  get confirmPassword(){
    return this.signupForm.controls['confirmPassword'];
  }  
  

  submitDetails(){
    const postData = {...this.signupForm.value};
    delete postData.confirmPassword;
    this._shared.signUpUser(postData as User).subscribe(
      response => {
        console.log(response);
        this.router.navigate(['login'])
      },
      error => console.log(error)
    );
  }







}


export function passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password')?.value;
  const confirmPassword = control.get('confirmPassword')?.value;

  if (password !== confirmPassword) {
    control.get('confirmPassword')?.setErrors({ passwordMismatch: true });
    return { passwordMismatch: true };
  } else {
    return null;
  }
}
