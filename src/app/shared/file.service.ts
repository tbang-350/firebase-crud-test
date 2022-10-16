import { Injectable } from '@angular/core';
import {AngularFireStorage} from '@angular/fire/compat/storage';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FileMetaData } from '../models/file-meta-data';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private fireStore : AngularFirestore, private fireStorage : AngularFireStorage) { }

  saveMetadata(fileObj : FileMetaData){
    const fileMeta = {
      id : '',
      name : fileObj.name,
      url : fileObj.url,
      size : fileObj.size
    }

    fileMeta.id = this.fireStore.createId();

    this.fireStore.collection('/Files').add(fileMeta)
  }


  getAllFiles(){
    this.fireStore.collection('/Files').snapshotChanges();
  }

  deleteFile(fileMeta : FileMetaData){
    this.fireStore.collection('/Files').doc(fileMeta.id).delete();
    this.fireStorage.ref('/Files/'+fileMeta.name).delete();
  }


}
