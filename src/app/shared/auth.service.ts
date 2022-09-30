import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import Swal from 'sweetalert2';


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
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // ...
        this.router.navigate(['/dashboard']);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // Swal.fire({
        //   position: 'top-end',
        //   icon: 'warning',
        //   title: error.message,
        //   showConfirmButton: false,
        //   timer: 2000
        // })
        console.log(errorMessage);
        console.log(errorMessage);
      });
  }


  register(email: string, password: string) {
    this.fireAuth.createUserWithEmailAndPassword(email, password).then(() => {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Registration succesfull',
        showConfirmButton: false,
        timer: 1500
      })
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


}
