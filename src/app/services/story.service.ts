import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';
import {Story} from './story.model';
import {Observable} from 'rxjs';
import {first, map, switchMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StoryService {

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFirestore,
  ) { }

  /**
   * Create a new story
   * @param data: Story
   */
  async createStory(data: Story) {
    const user = await this.afAuth.currentUser;
    const alreadyPosted = await this.db.collection<Story>('stories', ref => ref.where('uid', '==', user.uid))
      .snapshotChanges()
      .pipe(first())
      .toPromise();
    if (alreadyPosted.length === 0) {
      return this.db.collection('stories').add({
        ...data,
        uid: user.uid
      });
    } else {
      return null;
    }
  }

  deleteStory(storyId: string) {
    return this.db.collection('stories').doc(storyId).delete();
  }

  updateStory(storyId: string, data: Story) {
    return this.db.collection('stories').doc(storyId).update({ data });
  }

  getReviewedBoards(): Observable<Array<Story>> {
    return this.db.collection<Story>('stories', ref => ref.where('reviewed', '==', 'true')).valueChanges();
  }
}
