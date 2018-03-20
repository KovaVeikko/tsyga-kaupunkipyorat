import {Provider} from 'react-redux';
import {AppRegistry, View} from 'react-native';
import React from 'react';
import App from './src/App';
import store from './src/redux/store';

class Tsyga extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <App/>
      </Provider>
    )

  }
}

AppRegistry.registerComponent('Tsyga', () => Tsyga);
