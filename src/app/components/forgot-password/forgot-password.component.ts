import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  forgotForm!: FormGroup
  email!: string;

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    // this.formConfiguration();
    // this.forgotPassword();
  }

  formConfiguration(){
    this.forgotForm = new FormGroup({
      email : new FormControl(null,Validators.required)
    })
  }

  forgotPassword(){
    this.auth.forgotPassword(this.email);
  }

}
