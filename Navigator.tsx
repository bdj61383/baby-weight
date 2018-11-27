import React from 'react';
import { Button, NativeSyntheticEvent, NativeTouchEvent, ScrollView, StyleSheet } from 'react-native';
import { createAppContainer, createDrawerNavigator, createStackNavigator, createSwitchNavigator, DrawerItems, SafeAreaView } from 'react-navigation';
import { HomeContainer } from './Home';
import { Loading, LoadingContainer } from './Loading';
import { LogInContainer } from './LogIn';
import { ProfileContainer } from './Profile';
import * as firebase from 'firebase';

const handleLogout = (event: NativeSyntheticEvent<NativeTouchEvent>) =>         {    
  firebase.logout();
}

// TODO: style logout button 
const CustomDrawerContentComponent = (props) => (
  <ScrollView>
    <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
      <DrawerItems {...props} />
      <Button title="Logout" onPress={handleLogout} />
    </SafeAreaView>
  </ScrollView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const AppStack = createDrawerNavigator(
  { 
    Home: HomeContainer,
    Profile: ProfileContainer,
  },
  {contentComponent: CustomDrawerContentComponent}
);
const AuthStack = createStackNavigator({ LogIn: LogInContainer });

export const Navigator = createAppContainer(createSwitchNavigator(
  {
    App: AppStack,
    Auth: AuthStack,
    AuthLoading: LoadingContainer,
  },
  {
    initialRouteName: 'AuthLoading',
  }
));
