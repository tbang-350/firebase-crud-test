import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements AfterViewInit {

  email :string = '';
  password: string = '';

  createForm!: FormGroup;

  constructor(private auth: AuthService) { }

  ngAfterViewInit(): void {
    // this.formConfiguration();
    // this.register()
  }

  // ngOnInit(): void {
  //   this.formConfiguration();
  //   this.register()
  // }

  formConfiguration(){
    this.createForm = new FormGroup({
      email:new FormControl(null,Validators.required),
      password: new FormControl(null,Validators.required)
    })
  }

  // register(){

  //   console.log(this.createForm.value)
  //   console.log(this.createForm.get('email')?.value)
  //   console.log(this.createForm.controls['email'].value)

    
  //   this.auth.register(this.createForm.controls['email'].value,this.createForm.controls['password'].value);
    
  // }

  register(){
    if(this.email == ''){
      alert('enter email');
      return;
    }

    if(this.password == ''){
      alert('enter password');
      return;
    }

    this.auth.register(this.email,this.password);

    // this.email = '';
    // this.password = '';

    console.log(this.email,this.password)
  }

}
