import { createStackNavigator } from 'react-navigation';
import { HomeContainer } from './Home';
import { Loading } from './Loading';
import { LogInContainer } from './LogIn';

export const Navigator = createStackNavigator({
  Home: { screen: HomeContainer },
  Loading: { screen: Loading},
  LogIn: { screen: LogInContainer }
},
{
  initialRouteName: 'Loading'
});
