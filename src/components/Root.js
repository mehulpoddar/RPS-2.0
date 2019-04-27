import { StackNavigator } from 'react-navigation';
import LoginForm from './screens/LoginForm';
import MainFrameLocal from './screens/MainFrameLocal';
import MainFrameOnline from './screens/MainFrameOnline';
import StatsPage from './screens/StatsPage';
import Guide from './screens/Guide';
import Friends from './screens/Friends';
import HomePage from './screens/HomePage';

const Root = StackNavigator({
    login: {
      screen: LoginForm
    },
    homePage: {
      screen: HomePage
    },
    guide: {
      screen: Guide
    },
    friends: {
      screen: Friends
    },
    mainFrameLocal: {
      screen: MainFrameLocal
    },
    mainFrameOnline: {
      screen: MainFrameOnline
    },
    statsPage: {
      screen: StatsPage
    }
  },
  {
    headerMode: 'none'
  }
);

export default Root;
