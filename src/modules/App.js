import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {
  View,
  StyleSheet,
  StatusBar,
} from 'react-native';
import NavigatorContainer from './navigator/NavigatorContainer';
import {DARK_PRIMARY_COLOR} from '../styles/colors';
import {fetchStations, getLocation} from './AppState';
import store from '../redux/store';
import {getSnapshot, saveSnapshot} from "../utils/localStorage";
import {loadSnapshot} from "./session/SessionState"

class App extends React.Component {

  componentWillMount() {
    getSnapshot().then((snapshot) => {
      this.props.dispatch(loadSnapshot(snapshot));
    });
    this.props.dispatch(getLocation());
    this.props.dispatch(fetchStations());
  }

  componentDidMount() {
    store.subscribe(() => {
      saveSnapshot(store.getState());
    });
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