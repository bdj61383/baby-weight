import 'firebase/auth';
import 'firebase/database';
import { reactReduxFirebase } from 'react-redux-firebase';
import { createStore } from 'redux';
import { reduxFirestore } from 'redux-firestore';
import { composeWithDevTools } from 'remote-redux-devtools';
import { firebaseApp } from './firebase';
import { rootReducer } from './reducers';

// redux-firebase options
const rrfConfig = {
  enableRedirectHandling: false, // Need to use this for react native
  useFirestoreForProfile: true, // Firestore for Profile instead of Realtime DB
  userProfile: 'users',
}

// Add redux Firebase to compose
// TODO: Only use `composeWithDevTools` in development.  Otherwise us `compose` from redux.
const createStoreWithFirebase = composeWithDevTools(
  reduxFirestore(firebaseApp),
  reactReduxFirebase(firebaseApp, rrfConfig)
)(createStore)

// Create store with reducers.  No need for initial state at this time.
export const store = createStoreWithFirebase(
  rootReducer
)
