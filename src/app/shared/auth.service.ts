import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import Swal from 'sweetalert2';
import { GoogleAuthProvider, GithubAuthProvider,FacebookAuthProvider } from 'firebase/auth';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireAuth: AngularFireAuth, private router: Router) { }

  // login(email: string, password: string) {
  //   this.fireAuth.signInWithEmailAndPassword(email, password).then(() => {
  //     Swal.fire({
  //       position: 'top-end',
  //       icon: 'success',
  //       title: 'login succesfull',
  //       showConfirmButton: false,
  //       timer: 2000
  //     })
  //     localStorage.setItem('token', 'true');
  //     this.router.navigate(['/dashboard']);
  //   }, err => {
  //     Swal.fire({
  //       position: 'top-end',
  //       icon: 'warning',
  //       title: err.message,
  //       showConfirmButton: false,
  //       timer: 2000
  //     })
  //     this.router.navigate(['/login']);
  //   });
  // }

  login(email: string, password: string) {

    this.fireAuth.signInWithEmailAndPassword(email,password).then(res => {
      
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Login succesfull',
        showConfirmButton: false,
        timer: 1500
      });
      localStorage.setItem('token','true');

      if(res.user?.emailVerified == true){
        this.router.navigate(['/dashboard']);
      }else{
        this.router.navigate(['/verify-email']);
      }

      
    })


    // const auth = getAuth();
    // signInWithEmailAndPassword(auth, email, password)
    //   .then((userCredential) => {
    //     // Signed in 
    //     const user = userCredential.user;
    //     // ...
    //     Swal.fire({
    //       position: 'top-end',
    //       icon: 'success',
    //       title: 'Login succesfull',
    //       showConfirmButton: false,
    //       timer: 1500
    //     })
    //     localStorage.setItem('token', 'true');

    //     this.router.navigate(['/dashboard']);
    //   })
    //   .catch((error) => {
    //     const errorCode = error.code;
    //     const errorMessage = error.message;
    //     // Swal.fire({
    //     //   position: 'top-end',
    //     //   icon: 'warning',
    //     //   title: error.message,
    //     //   showConfirmButton: false,
    //     //   timer: 2000
    //     // })
    //     console.log(errorMessage);
    //     console.log(errorMessage);
    //   });
  }


  register(email: string, password: string) {
    this.fireAuth.createUserWithEmailAndPassword(email, password).then(res => {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Registration succesfull',
        showConfirmButton: false,
        timer: 1500
      })
      this.sendEmailForVerification(res.user);
      console.log(res.user);
      this.router.navigate(['/login']);
    }, err => {
      Swal.fire({
        position: 'top-end',
        icon: 'warning',
        title: err.message,
        showConfirmButton: false,
        timer: 2000
      })
      this.router.navigate(['/register']);
    })
  }

  logout() {
    this.fireAuth.signOut().then(() => {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    }, err => {
      Swal.fire({
        position: 'top-end',
        icon: 'warning',
        title: err.message,
        showConfirmButton: false,
        timer: 2000
      })
    })
  }

  forgotPassword(email: string){
    this.fireAuth.sendPasswordResetEmail(email).then(()=>{
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'email sent succesfully',
        showConfirmButton: false,
        timer: 2000
      })
      this.router.navigate(['/verify-email'])
    },err => {
      Swal.fire({
        position: 'top-end',
        icon: 'warning',
        title: err.message,
        showConfirmButton: false,
        timer: 2000
      })
    })
  }

  sendEmailForVerification(user:any){
    user.sendEmailVerification().then((res:any)=>{
      this.router.navigate(['verify-email'])
    },(err:any)=>{
      Swal.fire({
        position: 'top-end',
        icon: 'warning',
        title: err.message,
        showConfirmButton: false,
        timer: 2000
      })
    })
  }

googleSignIn(){
  return this.fireAuth.signInWithPopup(new GoogleAuthProvider).then( res =>{

    this.router.navigate(['/dashboard'])
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'login succesful',
      showConfirmButton: false,
      timer: 2000
    })
    localStorage.setItem('token',JSON.stringify(res.user?.uid))

  },err => {
    Swal.fire({
      position: 'top-end',
      icon: 'warning',
      title: err.message,
      showConfirmButton: false,
      timer: 2000
    })

  })
}


}
