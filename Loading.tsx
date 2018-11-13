import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { auth } from './firebase';

interface Props {
  authSubscription: any, // TODO: Figure out this type
  navigation: NavigationScreenProp<{}>
}

export class Loading extends React.PureComponent<Props, {}> {
  componentDidMount() {
    auth.onAuthStateChanged(user => {
      this.props.navigation.navigate(user ? 'Home' : 'LogIn')
    })
  }

  componentWillUnmount() {
    this.props.authSubscription();
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
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',    
  }
})
