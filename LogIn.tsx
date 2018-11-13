import { Google } from 'expo';
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { AppConfig } from './config';
import { auth, GoogleAuthProvider } from './firebase';

export class LogIn extends React.Component {
  state = {
    result: null,
  };

  render() {
    return (
      <View style={styles.container}>
        <Button title="Open Google Auth" onPress={this.handleAuth} />
        {this.state.result ? (
          <Text>{JSON.stringify(this.state.result)}</Text>
        ) : null}
        </View>
    );
  }

  handleAuth = async () => {
    try {
      const result = await Google.logInAsync({
        iosClientId: AppConfig.oauth.google.ios,
        scopes: ["profile", "email"]
      });
      if (result.type === "success") {
        // TODO: Build credential to sign user in to firebase
        if (result.idToken) {
          const credential = GoogleAuthProvider.credential(result.idToken);
          auth.signInAndRetrieveDataWithCredential(credential).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            // const credential = error.credential;
            // ...
          });
        } else {
          // TODO: Is this even a real edge?
        }
      } else {
        // tslint:disable-next-line:no-console
        console.log("cancelled")
      }
    } catch(e) {
      // tslint:disable-next-line:no-console
      console.log("error", e)
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
