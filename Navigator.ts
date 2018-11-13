import { createStackNavigator } from 'react-navigation';
import { Home } from './Home';
import { Loading } from './Loading';
import { LogIn } from './LogIn';

export const Navigator = createStackNavigator({
  Home: { screen: Home },
  Loading: { screen: Loading},
  LogIn: { screen: LogIn }
},
{
  initialRouteName: 'Loading'
});
