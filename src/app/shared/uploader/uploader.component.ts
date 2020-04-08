import {Component, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import { Subscription} from 'rxjs';
import {AngularFireStorage} from '@angular/fire/storage';

@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.scss']
})
export class UploaderComponent implements OnDestroy{

  @Input() fileLocation: string;
  @Input() fileName: string;
  @Output() url: EventEmitter<string> = new EventEmitter<string>();
  downloadURL: string;
  sub: Subscription;
  uploading = false;

  constructor(private afStorage: AngularFireStorage) { }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }


  async onUpload(event) {
    this.uploading = true;
    await this.afStorage.upload(this.fileLocation + '/' + this.fileName ?? '-' + '/' + Date.now(), event.target.files[0]);
    this.sub = this.afStorage.ref(this.fileLocation + '/' + this.fileName).getDownloadURL().subscribe(v => {
      this.uploading = false;
      this.downloadURL = v;
      this.url.emit(this.downloadURL);
    });
  }
}
