import { Google } from 'expo';
import React from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, View } from 'react-native';
import { withFirebase } from 'react-redux-firebase'
import { AppConfig } from './config';
import { GoogleAuthProvider } from './firebase';

// TODO: figure out the real typing for the firebase prop.
interface Props {
  firebase: {
    login: (options: object) => void
  }
}

interface State {
  requesting: boolean
}

class LogIn extends React.Component<Props, State> {
  state = {
    requesting: false
  };

  render() {
    return (
      <View style={styles.container}>
      { this.state.requesting ?
        <React.Fragment>
          <Text>Loading</Text>
          <ActivityIndicator size="large" />
        </React.Fragment>
      :
        <Button title="Open Google Auth" onPress={this.handleAuth} />
      }
        
      </View>
    );
  }

  handleAuth = async () => {
    try {
      this.setState({requesting: true})
      const result = await Google.logInAsync({
        iosClientId: AppConfig.oauth.google.ios,
        scopes: ["profile", "email"]
      });
      if (result.type === "success") {
        // TODO: Build credential to sign user in to firebase
        if (result.idToken) {
          const credential = GoogleAuthProvider.credential(result.idToken);          
          await this.props.firebase.login({ credential });
          // Don't need to set the `requesting` state back to false here, as we redirect as soon as we login.  Perhaps you want to catch errors here.
          // TODO: Are there any other paths besides the happy path?          
        } else {
          // TODO: Is this even a real edge?
        }
      } else {
        // tslint:disable-next-line:no-console
        console.log("cancelled")
        this.setState({requesting: false});
      }
    } catch(e) {
      // tslint:disable-next-line:no-console
      console.log("error", e);
      this.setState({requesting: false});
    }
  };
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,    
    justifyContent: 'center',
  },
});

export const LogInContainer = withFirebase(LogIn);
