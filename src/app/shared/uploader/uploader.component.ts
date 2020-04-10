import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import { Subscription} from 'rxjs';
import {AngularFireStorage} from '@angular/fire/storage';
import {AngularFireAuth} from '@angular/fire/auth';

@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.scss']
})
export class UploaderComponent {

  @Output() file: EventEmitter<File> = new EventEmitter<File>();
  imageUrl;

  onUpload(event) {
    // const mimeType = event.target.files[0].type;
    // if (mimeType.match(/image\/*/) == null) {
    //   this.message = 'Only images are supported.';
    //   return;
    // }

    const reader = new FileReader();
    reader.onload = e => this.imageUrl = reader.result;
    reader.readAsDataURL(event.target.files[0]);
    this.file.emit(event.target.files[0]);
    // this.uploading = true;
    // const hash = Date.now();
    // await this.afStorage.ref(this.fileLocation + '/' + hash).put(event.target.files[0]);
    // this.sub = this.afStorage.ref(this.fileLocation + '/' + hash).getDownloadURL().subscribe(v => {
    //   this.uploading = false;
    //   this.downloadURL = v;
    //   this.url.emit(this.downloadURL);
    // });
  }
}
