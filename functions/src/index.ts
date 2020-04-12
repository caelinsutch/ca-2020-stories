import * as functions from 'firebase-functions';

const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

const auth = admin.auth();

const db = admin.firestore();


interface User {
  zipCode?: string;
  verificationStatus?: 'verified' | 'flagged' | 'waiting verification' | 'rejected';
  verificationImage?: string;
  school?: string;
  stories?: string[]; // List of names of stories
  latitude?: string[];
  longitude?: string[];
  role?: string;
  uid?: string;
  displayName?: string;
  profileImage?: string;
  email?: string;
  permissions?: {
    emailOptIn?: boolean;
  };
}

/**
 * When a zipcode is added or changed to a user document, add the lat and long coordinates of the zipcode
 */
exports.zipCodeToLatLng = functions.firestore
  .document('users/{userId}')
  .onWrite((change) => {
    const ref = change.after.ref;
    const newData = change.after.data();
    const oldData = change.before.data();
    if (newData?.zipCode === oldData?.zipCode) {
      return;
    }
    const newZipCode = newData?.zipCode;
    // console.log('New Zipcode type', newZipCode.type);
    // console.log('New Zipcode length', newZipCode.length);
    // console.log('New Zipcode length', newZipCode.toString());
    return db.collection('zipcode').doc(newZipCode.toString()).get().then((v: any) => {
      return ref.update({
        latitude: v.data().Latitude,
        longitude: v.data().Longitude,
      });
    });
  })

/**
 * Handle displayName updates
 * Changes display name in FireAuth
 * Updates users stories with new display name
 */
exports.displayNameUpdated = functions.firestore
  .document('users/{userId}')
  .onWrite(change => {
    const newData: User = change.after.data() as User;
    const oldData: User = change.before.data() as User;

    // tslint:disable-next-line:triple-equals
    if (newData.uid != null && newData.displayName != null) {
      if (newData.displayName !== oldData.displayName) {
        auth.updateUser(newData.uid, {displayName: newData.displayName})
        db.collection('stories')
          .where('uid', '==', newData.displayName)
          .get().then((res: any) => {
            const batch = db.batch();
            res.docs.forEach((doc: any) => {
              const docRef = db.collection('stories').doc(doc.id);
              batch.update(docRef, {author: newData.displayName});
            })
          batch.commit();
        })
      }
    }
  })
