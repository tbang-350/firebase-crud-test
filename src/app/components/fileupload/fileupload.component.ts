import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs';
import { FileMetaData } from 'src/app/models/file-meta-data';
import { AuthService } from 'src/app/shared/auth.service';
import { FileService } from 'src/app/shared/file.service';

@Component({
  selector: 'app-fileupload',
  templateUrl: './fileupload.component.html',
  styleUrls: ['./fileupload.component.css']
})
export class FileuploadComponent implements OnInit {

  selectedFile! : FileList;
  currentUploadFile! : FileMetaData;
  percentage : number = 0; 

  constructor(private fileService : FileService, 
    private fireStorage :AngularFireStorage, 
    private auth : AuthService ) { }

  ngOnInit(): void {
  }

  selectFile(event : any){
    this.selectedFile = event.target.files; 

  }

  uploadFile(){
    this.currentUploadFile = new FileMetaData(this.selectedFile[0]);

    const path = 'Files/'+this.currentUploadFile;

    const storageRef = this.fireStorage.ref(path);
    const uploadTask = storageRef.put(this.selectedFile[0]);

    uploadTask.snapshotChanges().pipe(finalize(()=>{

      storageRef.getDownloadURL().subscribe(downloadLink => {

        this.currentUploadFile.url = downloadLink;
        this.currentUploadFile.size = this.currentUploadFile.file.size;
        this.currentUploadFile.name = this.currentUploadFile.file.name;

        this.fileService.saveMetadata(this.currentUploadFile);

      })
    })).subscribe((res : any)=>{

      this.percentage = (res.bytesTransferred * 100 / res.res.totalBytes)

    })
  }

  getAllFiles(){

  }

  deleteFile(){

  }

  logout() {
    this.auth.logout();
  }

}
