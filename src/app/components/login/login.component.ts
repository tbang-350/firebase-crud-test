import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // email!: string;
  // password!: string;
  loginForm!:FormGroup

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.formConfiguration();
    this.login();
  }

  formConfiguration(){
    this.loginForm = new FormGroup({
      email:new FormControl(null,Validators.required),
      password: new FormControl(null,Validators.required)
    })
  }

  login(){

    this.auth.login(this.loginForm.controls['email'].value,this.loginForm.controls['password'].value);

  }


  // login(){
  //   if(this.email == ''){
  //     alert('enter email');
  //     return
  //   }

  //   if(this.password == ''){
  //     alert('enter password');
  //     return
  //   }

  //   this.auth.login(this.email,this.password);
  // }

}
