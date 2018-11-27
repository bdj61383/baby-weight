import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { connect } from 'react-redux';
import { loadUserAction } from './actions';
import { auth } from './firebase';

interface Props {
  navigation: NavigationScreenProp<{}>
}

export class Loading extends React.PureComponent<Props, {}> {
  componentDidMount() {
    auth.onAuthStateChanged(user => {
      // TODO: find out if the user has a profile and redirect accordingly
      // Should I dispatch an action here (User_Logged_In) with a payload that is that user's data?
      
      if (user) {
        // Isn't this always going to return false?  I suppose not if we can grab the user data from the localStorage or something like that
        if (this.props.user.loaded) {
          console.log('user loaded')
          this.props.navigation.navigate('Home');
        } else {       
          console.log('user NOT loaded')   
          this.props.dispatch(loadUserAction(user));
          this.props.navigation.navigate('Profile');          
        }
      } else {
        this.props.navigation.navigate('Auth');
      }



      this.props.navigation.navigate(user ? 'App' : 'Auth')
    })
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

const mapStateToProps = (state) =>
  ({user: state.user})

export const LoadingContainer = connect(mapStateToProps)(Loading);


const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',    
  }
})
