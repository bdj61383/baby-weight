import 'firebase/auth';
import 'firebase/database';
import { reactReduxFirebase } from 'react-redux-firebase';
import { compose, createStore } from 'redux';
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

const initialState = {firebase: { authError: null }};

// Create store with reducers and initial state
export const store = createStoreWithFirebase(
  rootReducer, 
  initialState, 
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
  )
