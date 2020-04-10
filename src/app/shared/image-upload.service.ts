import { Injectable } from '@angular/core';
import {AngularFireStorage} from '@angular/fire/storage';
import {first} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {

  constructor(
    private afStorage: AngularFireStorage,
  ) {
  }

  /**
   * Uplooad a single file
   * @param fileLocation folder for file
   * @param fileName name
   * @param file File blob
   * @returns Promise<string> URL of file
   */
  async uploadFile(fileLocation: string, fileName = Date.now().toString(), file: File): Promise<string> {
    await this.afStorage.ref(fileLocation + '/' + fileName).put(file);
    return this.afStorage.ref(fileLocation + '/' + fileName).getDownloadURL().pipe(first()).toPromise();
  }

}
