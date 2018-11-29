import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { createAppContainer, createDrawerNavigator, createStackNavigator, createSwitchNavigator, DrawerItems, SafeAreaView } from 'react-navigation';
import { HomeContainer } from './Home';
import { LoadingContainer } from './Loading';
import { LogInContainer } from './LogIn';
import { LogOutButtonContainer } from './LogOutButton';
import { ProfileContainer } from './Profile';

const CustomDrawerContentComponent = (props) => (
  <ScrollView>
    <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
      <DrawerItems {...props} />
        <LogOutButtonContainer />
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
const AuthStack = createStackNavigator({
  Loading: LoadingContainer,
  LogIn: LogInContainer 
});

export const Navigator = createAppContainer(createSwitchNavigator(
  {
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'Auth',
  }
));
