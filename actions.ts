import { getFirebase } from 'react-redux-firebase';
import { Dispatch } from 'redux';
import { db } from './firebase';
import { UserProfile } from './interfaces';

export interface LoadUserProfile {
  payload: UserProfile,
  type: 'LoadUserProfile'
}

export interface SignOffUser {
  payload: UserProfile,
  type: 'SignOffUser'
}

export interface LoadUpdatedUser {
  payload: UserProfile,
  type: 'LoadUpdatedUser'
}

export const loadUserProfileAction = (payload: UserProfile): LoadUserProfile => (
  {
    payload,
    type: 'LoadUserProfile',
  }
)

function buildUserProfile(rawData: (firebase.firestore.DocumentData | undefined )): UserProfile {
  const data = rawData || {};
  return {
    displayName: data.displayName || null,
    dueDate: data.dueDate || null,
    email: data.email || null,
    height: data.height || null,
    initialWeight: data.initialWeight || null,
    loaded: true,
    photoUrl: data.photoURL || null,
    uid: data.uid || null,
  }
}

export function findOrCreateUserProfileAction(user: firebase.User) {
  const userProfileRef = db.collection('userProfiles').doc(user.uid);
  let userProfile: UserProfile;
  return (dispatch: Dispatch) => {
    userProfileRef.get().then(doc => {
      if (doc.exists) {
        userProfile = buildUserProfile(doc.data());     
        dispatch(loadUserProfileAction(userProfile)); 
      } else {
          // doc.data() will be undefined in this case
          userProfile = buildUserProfile(user); // Why isn't this throwing an error?  firebase.User is not firebase.firestore.DocumentData or undefined       
          userProfileRef.set(userProfile).then( () => {
            dispatch(loadUserProfileAction(userProfile));
          }).catch(console.log);
      }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
  }
}

export function signOffUserAction(user: UserProfile) {
  return (dispatch: Dispatch) => {
    getFirebase().logout().then(() => dispatch(unloadUserAction(user)));
  }
}

export function updateUserAction(user: UserProfile) {
  return (dispatch: Dispatch) => {
    db.collection('userProfiles').doc(user.uid || undefined).set(user, {merge: true}) // Don't overwrite the user's document.  Just update it.
    .then(dispatch(loadUpdatedUserAction(user)));
  }
}

export const loadUpdatedUserAction = (payload: UserProfile): LoadUpdatedUser => (
  {
    payload,
    type: 'LoadUpdatedUser'
  }
)

export const unloadUserAction = (payload: UserProfile): SignOffUser => (
  {
    payload,
    type: 'SignOffUser'
  }
)

export type UserAction =
  LoadUserProfile |
  SignOffUser |
  LoadUpdatedUser