import * as firebase from 'firebase/app';
import { AppConfig } from './config';

// For side-effects only.
import 'firebase/auth';
import 'firebase/firestore'; 

firebase.initializeApp(AppConfig.firebase);

const firestore = firebase.firestore();

firestore.settings({
  timestampsInSnapshots: true
});

export const auth = firebase.auth();
export const GoogleAuthProvider = firebase.auth.GoogleAuthProvider;
export const db = firestore;
