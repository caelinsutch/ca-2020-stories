import * as functions from 'firebase-functions';

const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

const db = admin.firestore();

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

