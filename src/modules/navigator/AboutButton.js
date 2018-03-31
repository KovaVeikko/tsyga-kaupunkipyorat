import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {View, TouchableOpacity, Image, StyleSheet, Platform} from 'react-native';
import * as NavigationActions from 'react-navigation/src/NavigationActions';
const HEADER_IMAGE = require('../../assets/img/header_logo.png');


const AboutButton = ({dispatch}) => {
  const handlePress = () => {
    dispatch(NavigationActions.default.push({routeName: 'About'}));
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePress}>
        <Image source={HEADER_IMAGE} style={{width: 35}} resizeMode='contain' />
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    //alignItems: Platform.OS === 'ios' ? 'center' : 'flex-start',
  }
});

AboutButton.propTypes = {
  dispatch: PropTypes.func.isRequired,
  navigator: PropTypes.object.isRequired,
};

export default connect(state => ({
  navigator: state.navigator,
}))(AboutButton);