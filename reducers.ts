import { firebaseReducer, getFirebase } from 'react-redux-firebase';
import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import { UserAction } from './actions';
import { UserProfile } from './interfaces';

const defaultUserProfileState = {
  displayName: null,
  dueDate: null,
  email: null,
  height: null,
  initialWeight: null,
  loaded: false,
  photoUrl: null,
  uid: null,
}

const userProfileReducer = (userProfile: UserProfile = defaultUserProfileState, action: UserAction): UserProfile => {
  switch(action.type) {
    case 'LoadUpdatedUser':
      return { ...action.payload }
    case 'LoadUserProfile':
      return { ...action.payload }
    case 'SignOffUser': 
      return {... defaultUserProfileState}
    default: return userProfile;
  }
}

export const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  userProfile: userProfileReducer
});
