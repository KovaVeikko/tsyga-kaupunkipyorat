import React from 'react';
import PropTypes from 'prop-types';
import {addNavigationHelpers} from 'react-navigation';
import AppNavigator from './Navigator';
import {addNavigationListener} from "./NavigatorHelpers";

const NavigatorView = ({dispatch, navigator}) => {
  return <AppNavigator navigation={addNavigationHelpers({
    dispatch: dispatch,
    state: navigator,
    addListener: addNavigationListener,
  })}/>
};

NavigatorView.propTypes = {
  dispatch: PropTypes.func.isRequired,
  navigator: PropTypes.object.isRequired,
};

export default NavigatorView;