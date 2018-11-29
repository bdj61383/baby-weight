import React from 'react';
import { Provider } from "react-redux";
import { Navigator } from './Navigator';
import { store } from './store';

export default class App extends React.Component {
  // TODO: go ahead and fetch the historic weights here.  No need to wait on the response.
  // someEvent() {
  //   // call navigate for AppNavigator here:
  //   this.navigator &&
  //     this.navigator.dispatch(
  //       NavigationActions.navigate({ routeName: someRouteName })
  //     );
  // }

  handleAuthStateChange = (firebaseUser: firebase.User | null) => {
    // Are we Authed?
    if (firebaseUser) {
      this.props.dispatch(loadUserAction(firebaseUser));   
    } else {
      // We are not authed. Proceed to auth page. 
      this.props.navigation.navigate('Auth');
    }
  }

  render() {
    return (
      <Provider store={store}>
        <Navigator/>
      </Provider>
    );
  }
}
