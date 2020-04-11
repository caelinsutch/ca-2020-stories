import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SnackService} from '../../services/snack.service';
import {ImageUploadService} from '../image-upload.service';
import {Observable} from 'rxjs';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize, tap} from 'rxjs/operators';

@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.scss']
})
export class UploaderComponent {

  @Output() file: EventEmitter<File | string> = new EventEmitter<File|string>();
  @Input() id = Date.now();
  @Input() path = '';
  @Input() handleUpload = false;
  imageBlob;
  percentage: Observable<number>;
  task; AngularFireUploadTask;
  snapshot: Observable<any>;
  downloadLink: string;

  constructor(private snackService: SnackService, private storage: AngularFireStorage) {
  }

  onUpload(event) {
    this.snackService.error('Heads up, this may take a while :)');
    const reader = new FileReader();
    const imageFile = event.target.files[0];
    reader.onload = () => this.imageBlob = reader.result;
    reader.readAsDataURL(imageFile);
    if (!this.handleUpload) {
      this.file.emit(imageFile);
    } else {
      console.log("uploading");
      const ref = this.storage.ref(this.path);
      this.task = this.storage.upload(this.path, imageFile);
      this.percentage = this.task.percentageChanges();
      this.snapshot = this.task.snapshotChanges().pipe(
        tap(console.log),
        finalize(async () => {
          this.downloadLink = await ref.getDownloadURL().toPromise();
          console.log(this.downloadLink);
          this.file.emit(this.downloadLink);
        })
      );
    }
  }

  isActive(snapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes;
  }
}
