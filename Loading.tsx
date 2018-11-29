import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { connect, DispatchProp } from 'react-redux';
import { loadUserAction } from './actions';
import { auth } from './firebase';
import { AppState, User } from './interfaces';

interface Props {
  dispatch: DispatchProp["dispatch"],
  navigation: NavigationScreenProp<{}>,
  onUserLoaded: any,
  user: User,
}

export class Loading extends React.Component<Props, {}> {
  redirectUser = (user: User) => {
    if (!user.loaded) {
      this.props.navigation.navigate('LogIn');
    } else if (user.height && user.initialWeight && user.dueDate) {
      this.props.navigation.navigate('Home'); 
    } else {
      this.props.navigation.navigate('Profile'); 
    }
  };

  handleAuthStateChange = (firebaseUser: firebase.User | null) => {
    // Are we Authed?
    if (firebaseUser) {
      this.props.dispatch(loadUserAction(firebaseUser));   
    } else {
      // We are not authed. Proceed to auth page.
      this.props.navigation.navigate('LogIn');
    }
  }

  componentDidMount() {
    auth.onAuthStateChanged(firebaseUser => {
      this.handleAuthStateChange(firebaseUser)
    })
    // this.redirectUser(this.props.user);
  }

  componentWillUnmount() {
    console.log("UNMOUNTED");
  }

  // To handle the update to User state that occurs after loadUserAction is dispatched.
  componentDidUpdate() {
    this.redirectUser(this.props.user);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Loading</Text>
        <ActivityIndicator size="large" />
      </View>
    )
  }
}

const mapStateToProps = (state: AppState) => {
  return {user: state.user}
}

export const LoadingContainer = connect(mapStateToProps)(Loading);


const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',    
  }
})
