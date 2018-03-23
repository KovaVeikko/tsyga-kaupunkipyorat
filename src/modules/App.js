import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {
  View,
  StyleSheet,
  StatusBar,
} from 'react-native';
import NavigatorContainer from './navigator/NavigatorContainer';
import {DARK_PRIMARY_COLOR} from "../styles/colors"
import {fetchStations, getLocation} from "./AppState"

class App extends React.Component {

  componentWillMount() {
    this.props.dispatch(getLocation());
    this.props.dispatch(fetchStations());
  }

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

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  app: PropTypes.object.isRequired,
}

export default connect(state => ({
  app: state.app,
}))(App);