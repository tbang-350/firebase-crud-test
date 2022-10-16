import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/models/student';
import { AuthService } from 'src/app/shared/auth.service';
import { DataService } from 'src/app/shared/data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  studentList: Student[] = [];

  studentObj: Student = {
    id: '',
    first_name: '',
    last_name: '',
    email: '',
    phone: ''
  }

  id: string = '';
  first_name: string = '';
  last_name: string = '';
  email: string = '';
  phone: string = '';

  constructor(private auth: AuthService, private data: DataService) { }

  ngOnInit(): void {
    this.getAllStudents();
  }

  logout() {
    this.auth.logout();
  }

  getAllStudents() {
    this.data.getAllStudents().subscribe(res => {
      this.studentList = res.map((e: any) => {
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;
        return data;
      })
    })
  }

  resetForm() {
    this.first_name = '',
      this.last_name = '',
      this.email = '',
      this.phone = ''
  }

  addStudent() {
    if (this.first_name == '' || this.last_name == '' || this.email == '' || this.phone == '') {
      alert("Fill the required fields")
    } else {
      this.studentObj.id = '';
      this.studentObj.email = this.email
      this.studentObj.first_name = this.first_name;
      this.studentObj.last_name = this.last_name;
      this.studentObj.phone = this.phone

      this.data.createStudent(this.studentObj);
      this.resetForm();
    }

    this.studentObj.id = '';
    this.studentObj.email = this.email
    this.studentObj.first_name = this.first_name;
    this.studentObj.last_name = this.last_name;
    this.studentObj.phone = this.phone

    this.data.createStudent(this.studentObj);
    this.resetForm();

  }

  updateStudent() {

  }

  deleteStudent(student: Student) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.data.deleteStudent(student);
        Swal.fire(
          'Deleted!',
          'Student has been deleted.',
          'success'
        )
      }
    })

  }

}
