import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { connect, DispatchProp } from 'react-redux';
import { findOrCreateUserProfileAction } from './actions';
import { auth } from './firebase';
import { AppState, UserProfile } from './interfaces';

interface Props {
  dispatch: DispatchProp["dispatch"],
  navigation: NavigationScreenProp<{}>,
  onUserLoaded: any,
  userProfile: UserProfile,
}

export class Loading extends React.Component<Props, {}> {
  redirectUser = (user: UserProfile) => {
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
      this.props.dispatch(findOrCreateUserProfileAction(firebaseUser));   
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

  // To handle the update to User state that occurs after loadUserAction is dispatched.
  componentDidUpdate() {
    this.redirectUser(this.props.userProfile);
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
  return {userProfile: state.userProfile}
}

export const LoadingContainer = connect(mapStateToProps)(Loading);


const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',    
  }
})
