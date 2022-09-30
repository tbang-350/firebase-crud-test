import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements AfterViewInit {

  // email :string = '';
  // password: string = '';

  registerForm!: FormGroup;

  constructor(private auth: AuthService) { }

  ngAfterViewInit(): void {
    this.formConfiguration();
    this.register()
  }

  // ngOnInit(): void {
  //   this.formConfiguration();
  //   this.register()
  // }

  formConfiguration(){
    this.registerForm = new FormGroup({
      email:new FormControl(null,Validators.required),
      password: new FormControl(null,Validators.required)
    })
  }

  register(){

    console.log(this.registerForm.value)
    console.log(this.registerForm.get('email')?.value)
    console.log(this.registerForm.controls['email'].value)

    
    this.auth.register(this.registerForm.controls['email'].value,this.registerForm.controls['password'].value);
    // this.email = '';
    // this.password = '';
  }

}
