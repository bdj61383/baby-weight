import { firebaseReducer } from 'react-redux-firebase';
import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';

// TODO: define interfaces for users and actions
const userReducer = (user={loaded: false}, action) => {
  switch(action.type) {
    case 'LoadUser':
      // Check to see if User already exists in state? How would that be possible?
      return {
        displayName: action.payload.displayName,
        email: action.payload.email,
        // height: user.height,
        loaded: true,
        photoUrl: action.payload.photoURL,
        uid: action.payload.uid,
      }
    default: return user;
  }
}

export const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  user: userReducer
});
