import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';
import {User} from './user.model';
import {Observable, of} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import UserCredential = firebase.auth.UserCredential;

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // TODO combine this with afAuth to get a full user, with both firebase user parts and custom

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFirestore,
  ) { }

  async createUser(email: string, password: string, displayName: string, verificationImage: string, zipCode: string): Promise<any> {
    const cred: UserCredential = await this.afAuth.createUserWithEmailAndPassword(email, password);
    await cred.user.updateProfile({displayName});
    return this.db.collection(environment.database.users).doc<User>(cred.user.uid).set({
      verificationImage,
      zipCode,
      verified: false,
    });
  }

  getUserById(id: string): Observable<User> {
    return this.db.collection(environment.database.users).doc<User>(id).get() as Observable<User>;
  }

  getCurrentUser(): Observable<User> {
    return this.afAuth.user.pipe(
      switchMap(user => {
        if (user) {
          return this.db.collection<User>(environment.database.users).doc(user.uid).valueChanges();
        } else {
          return of(undefined);
        }
      })
    );
  }

  async updateUser(newUser: User): Promise<any> {
    const currentUser = await this.afAuth.currentUser;
    return this.db.collection(environment.database.users).doc(currentUser.uid).update(newUser);
  }

  async loginUser(email, password) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }
}
