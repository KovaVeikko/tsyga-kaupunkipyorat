import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import NavigatorContainer from './modules/navigator/NavigatorContainer';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <NavigatorContainer/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
  }
});