import { createAppContainer, createStackNavigator, createSwitchNavigator } from 'react-navigation';
import { HomeContainer } from './Home';
import { Loading } from './Loading';
import { LogInContainer } from './LogIn';

const AppStack = createStackNavigator({ Home: HomeContainer });
const AuthStack = createStackNavigator({ LogIn: LogInContainer });

export const Navigator = createAppContainer(createSwitchNavigator(
  {
    App: AppStack,
    Auth: AuthStack,
    AuthLoading: Loading,
  },
  {
    initialRouteName: 'AuthLoading',
  }
));
