import React from 'react';
import {TabNavigator, StackNavigator} from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import ListScreen from '../list/ListScreen';
import MapScreen from "../map/MapScreen";
import {
  DEFAULT_PRIMARY_COLOR,
  ICON_COLOR,
  LIGHT_PRIMARY_COLOR,
} from "../../styles/colors"

const headerColor = DEFAULT_PRIMARY_COLOR;
const activeColor = ICON_COLOR;
const inactiveColor = LIGHT_PRIMARY_COLOR;

const MainNavigator = TabNavigator({
  List: {
    screen: ListScreen,
    navigationOptions: {
      tabBarIcon: ({tintColor}) => <Icon name='list' size={20} color={tintColor}/>,
      headerStyle: {
        backgroundColor: headerColor,
        elevation: 3,
      }
    },
  },
  Map: {
    screen: MapScreen,
    navigationOptions: {
      tabBarIcon: ({tintColor}) => <Icon name='map' size={20} color={tintColor}/>,
      headerStyle: {
        backgroundColor: headerColor,
        elevation: 3,
      }
    },
  }
}, {
  animationEnabled: false,
  swipeEnabled: true,
  tabBarPosition: 'bottom',
  tabBarOptions: {
    showIcon: true,
    showLabel: false,
    activeTintColor: activeColor,
    inactiveTintColor: inactiveColor,
    indicatorStyle: {backgroundColor: activeColor},
    style: {backgroundColor: headerColor},
  }
});

const AppNavigator = StackNavigator({
  Main: {
    screen: MainNavigator
  }
});

export default AppNavigator;