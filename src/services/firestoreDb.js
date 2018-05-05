import firebase from 'firebase';
require('firebase/firestore');
import {firebaseData, firebasePrivateKey, firebaseServiceAccount} from '../../secrets';
firebase.initializeApp(firebaseData);


// const admin = require('firebase-admin');
// var db = admin.firestore();
// const settings = {
//   timestampsInSnapshots: true};
// db.settings(settings);
// export default db;


export default db;
