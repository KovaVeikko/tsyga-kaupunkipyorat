import {TabNavigator, StackNavigator} from 'react-navigation';
import ListScreen from '../list/ListScreen';
import MapScreen from "../map/MapScreen";

const MainNavigator = TabNavigator({
  List: {
    screen: ListScreen,
  },
  Map: {
    screen: MapScreen,
  }
});

const AppNavigator = StackNavigator({
  Main: {
    screen: MainNavigator
  }
});

export default AppNavigator;