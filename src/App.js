import React from 'react';
import {connect} from 'react-redux';
import {
  View,
  StyleSheet,
  StatusBar,
} from 'react-native';
import NavigatorContainer from './modules/navigator/NavigatorContainer';
import {DARK_PRIMARY_COLOR} from "./styles/colors"

class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={DARK_PRIMARY_COLOR} barStyle='light-content' />
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

export default connect()(App);