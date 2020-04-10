import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.scss']
})
export class UploaderComponent {

  @Output() file: EventEmitter<File> = new EventEmitter<File>();
  @Input() id = 'upload';
  imageUrl;

  onUpload(event) {
    const reader = new FileReader();
    reader.onload = () => this.imageUrl = reader.result;
    reader.readAsDataURL(event.target.files[0]);
    this.file.emit(event.target.files[0]);
  }
}
