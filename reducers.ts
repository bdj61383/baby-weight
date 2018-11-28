import { firebaseReducer } from 'react-redux-firebase';
import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import { LoadUser } from './actions';
import { User } from './interfaces';

const defaultUserState = {
  displayName: '',
  dueDate: '',
  email: '',
  height: '',
  initialWeight: '',
  loaded: false,
  photoUrl: '',
  uid: '',
}

const userReducer = (user: User = defaultUserState, action: LoadUser): User => {
  switch(action.type) {
    case 'LoadUser':
      const firebaseUser:firebase.User = action.payload;
      // Use merge here?
      return {
        displayName: firebaseUser.displayName,
        dueDate: user.dueDate,
        email: firebaseUser.email,
        height: user.height,
        initialWeight: user.initialWeight,
        loaded: true,
        photoUrl: firebaseUser.photoURL,
        uid: firebaseUser.uid,
      }
    default: return user;
  }
}

export const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  user: userReducer
});
