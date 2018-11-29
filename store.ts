import 'firebase/auth';
import 'firebase/database';
import { AsyncStorage } from "react-native";
import { getFirebase, reactReduxFirebase } from 'react-redux-firebase';
import { applyMiddleware, createStore } from 'redux';
import { reduxFirestore } from 'redux-firestore';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'remote-redux-devtools';
import { firebaseApp } from './firebase';
import { rootReducer } from './reducers';

// TODO: Try fetching initial state from local storage. You can crosscheck the UID after authing to be sure you have the correct user. And blow away the local store when they log out.
// const fetchUserState = async () => {
//   try {
//     const value = await AsyncStorage.getItem('BABYWEIGHT_CURRENT_USER');
//     return value;
//   } catch (error) {
//     // TODO: log this?
//     return {loaded: false}
//   }
// }

// redux-firebase options
const rrfConfig = {
  enableRedirectHandling: false, // Need to use this for react native
  useFirestoreForProfile: true, // Firestore for Profile instead of Realtime DB
  userProfile: 'users',
}

// Add redux Firebase to compose
// TODO: Only use `composeWithDevTools` in development.  Otherwise us `compose` from redux.
const createStoreWithFirebase = composeWithDevTools(
  applyMiddleware(
    thunk.withExtraArgument(getFirebase) // Pass getFirebase function as extra argument
  ),
  reduxFirestore(firebaseApp),
  reactReduxFirebase(firebaseApp, rrfConfig)
)(createStore)

// Create store with reducers.  No need for initial state at this time.
export const store = createStoreWithFirebase(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
