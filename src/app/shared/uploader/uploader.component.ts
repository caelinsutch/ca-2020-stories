import {Component, EventEmitter, Input, Output} from '@angular/core';
import {SnackService} from '../../services/snack.service';

@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.scss']
})
export class UploaderComponent {

  constructor(private snackService: SnackService) {
  }

  @Output() file: EventEmitter<File> = new EventEmitter<File>();
  @Input() id = 'upload';
  imageUrl;

  onUpload(event) {
    this.snackService.error('Heads up, this may take a while :)');
    const reader = new FileReader();
    const imageFile = event.target.files[0];
    reader.onload = () => this.imageUrl = reader.result;
    reader.readAsDataURL(imageFile);
    this.file.emit(imageFile);
  }
}
