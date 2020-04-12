import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SnackService} from '../../services/snack.service';
import {Observable} from 'rxjs';
import {AngularFireStorage, AngularFireUploadTask} from '@angular/fire/storage';
import {finalize, tap} from 'rxjs/operators';

@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.scss']
})
export class UploaderComponent {
  @Output() file: EventEmitter<File> = new EventEmitter<File>();
  @Output() uploadLink: EventEmitter<string> = new EventEmitter<string>();
  @Input() id = 'upload';
  @Input() handleUpload = false;
  @Input() path: string;
  imageBlob;
  percentage: Observable<number>;
  task: AngularFireUploadTask;
  snapshot: Observable<any>;
  downloadUrl: string;

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
      const ref = this.storage.ref(this.path);
      this.task = this.storage.upload(this.path, imageFile);
      this.percentage = this.task.percentageChanges();
      this.snapshot = this.task.snapshotChanges().pipe(
        finalize(async () => {
          this.downloadUrl = await ref.getDownloadURL().toPromise();
          this.uploadLink.emit(this.downloadUrl);
        })
      );
    }
  }

  isActive(snapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes;
  }
}
