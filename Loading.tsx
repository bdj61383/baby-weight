import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { connect, DispatchProp } from 'react-redux';
import { loadUserAction } from './actions';
import { auth } from './firebase';
import { State, User } from './interfaces';

interface Props {
  dispatch: DispatchProp["dispatch"],
  navigation: NavigationScreenProp<{}>,
  onUserLoaded: any,
  user: User,
}

export class Loading extends React.PureComponent<Props, {}> {
  redirectUser = (user: User) => {
    if (!user.loaded) {
      auth.onAuthStateChanged(firebaseUser => {
        this.handleAuthStateChange(firebaseUser)
      })
    } else if (user.height && user.initialWeight && user.dueDate) {
      this.props.navigation.navigate('Home'); 
    } else {
      this.props.navigation.navigate('Profile'); 
    }
  };

  handleAuthStateChange = (firebaseUser: firebase.User | null) => {
    if (firebaseUser) {
      // Isn't this always going to return false?  I suppose not if we can grab the user data from the localStorage or something like that
      if (this.props.user.loaded) {
        this.redirectUser(this.props.user);
      } else {
        this.props.dispatch(loadUserAction(firebaseUser));     
      }
    } else {
      this.props.navigation.navigate('Auth');
    }
  }

  componentDidMount() {
    this.redirectUser(this.props.user);
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

const mapStateToProps = (state: State) =>
  ({user: state.user})

export const LoadingContainer = connect(mapStateToProps)(Loading);


const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',    
  }
})
