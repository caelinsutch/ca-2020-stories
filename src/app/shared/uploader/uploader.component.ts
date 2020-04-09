import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import { Subscription} from 'rxjs';
import {AngularFireStorage} from '@angular/fire/storage';
import {AngularFireAuth} from '@angular/fire/auth';

@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.scss']
})
export class UploaderComponent implements OnDestroy{

  @Input() fileLocation: string;
  @Output() url: EventEmitter<string> = new EventEmitter<string>();
  downloadURL: string;
  sub: Subscription;
  uploading = false;

  constructor(private afStorage: AngularFireStorage, private afAuth: AngularFireAuth) { }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }


  async onUpload(event) {
    this.uploading = true;
    const hash = Date.now();
    await this.afStorage.ref(this.fileLocation + '/' + hash).put(event.target.files[0]);
    this.sub = this.afStorage.ref(this.fileLocation + '/' + hash).getDownloadURL().subscribe(v => {
      this.uploading = false;
      this.downloadURL = v;
      this.url.emit(this.downloadURL);
    });
  }
}
