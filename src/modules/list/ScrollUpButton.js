import React from 'react';
import PropTypes from 'prop-types';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {DARK_PRIMARY_COLOR, ICON_COLOR} from '../../styles/colors';


const ScrollUpButton = ({onPress}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress} style={styles.button}>
        <Icon name='angle-up' size={35} color={ICON_COLOR} />
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    elevation: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: DARK_PRIMARY_COLOR,
  },
  button: {
    marginBottom: 5,
  }
});

ScrollUpButton.propTypes = {
  onPress: PropTypes.func.isRequired,
}

export default ScrollUpButton;