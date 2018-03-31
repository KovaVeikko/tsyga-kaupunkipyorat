import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {ACCENT_COLOR, LIGHT_PRIMARY_COLOR} from '../../styles/colors';
import {toggleSorted} from '../AppState';


const OrderingButton = ({dispatch, stations}) => {
  const handlePress = () => {
    dispatch(toggleSorted());
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePress}>
        <Icon name='sort-alpha-asc' size={20} color={stations.sorted ? ACCENT_COLOR : LIGHT_PRIMARY_COLOR} />
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 26,
    height: 26,
    borderRadius: 13,
    marginRight: 20,
  }
});

OrderingButton.propTypes = {
  dispatch: PropTypes.func.isRequired,
  stations: PropTypes.object.isRequired,
};

export default connect(state => ({
  stations: state.app.stations,
}))(OrderingButton);