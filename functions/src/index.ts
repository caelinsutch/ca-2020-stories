import * as functions from 'firebase-functions';
import {User} from '../../src/app/user/user.model';

const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

const auth = admin.auth();

const db = admin.firestore();

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
 * When a users displayName is updated in the userid document, update the fireauth doc as well
 */
exports.changeAuthDisplayName = functions.firestore
  .document('users/{userId}')
  .onWrite(change => {
    const newData: User = change.after.data() as User;
    const oldData: User = change.before.data() as User;

    // tslint:disable-next-line:triple-equals
    if (newData.uid != null && newData.displayName != null) {
      if (newData.displayName !== oldData.displayName) {
        auth.updateUser(newData.uid, {displayName: newData.displayName})
      }
    }
  })

