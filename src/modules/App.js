import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {
  View,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
  AppState,
} from 'react-native';
import NavigatorContainer from './navigator/NavigatorContainer';
import {DARK_PRIMARY_COLOR, ICON_COLOR} from '../styles/colors';
import {fetchStations, getLocation} from './AppState';
import store from '../redux/store';
import {getSnapshot, saveSnapshot} from "../services/localStorageServices";
import {loadSnapshot} from "./session/SessionState"

class App extends React.Component {

  componentWillMount() {
    getSnapshot().then((snapshot) => {
      this.props.dispatch(loadSnapshot(snapshot));
    });
    this.props.dispatch(getLocation());
    this.props.dispatch(fetchStations());

    // Update data every 20 second
    const interval = __DEV__ ? 60000 : 20000;
    setInterval(() => {
      if (AppState.currentState === 'active') {
        this.props.dispatch(getLocation());
        this.props.dispatch(fetchStations());
      }
    }, interval);

  }

  componentDidMount() {
    store.subscribe(() => {
      saveSnapshot(store.getState());
    });
  }

  render() {
    if (!this.props.session.isReady) {
      return (
        <View style={styles.loadingScreen}>
          <StatusBar backgroundColor={DARK_PRIMARY_COLOR} barStyle='light-content' />
          <ActivityIndicator color={ICON_COLOR}/>
        </View>
      )
    }
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
  },
  loadingScreen: {
    backgroundColor: DARK_PRIMARY_COLOR,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  app: PropTypes.object.isRequired,
  session: PropTypes.object.isRequired,
}

export default connect(state => ({
  app: state.app,
  session: state.session,
}))(App);