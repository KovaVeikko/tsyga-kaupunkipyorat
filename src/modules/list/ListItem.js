import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {DEFAULT_PRIMARY_COLOR} from "../../styles/colors"

const ListItem = ({item, handlePress, isFavorite}) => {
  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={styles.container}>
        <View style={styles.left}>
          <Icon name={isFavorite ? 'star' : 'star-o'} size={20} color={DEFAULT_PRIMARY_COLOR} />
        </View>
        <View style={styles.right}>
          <View style={styles.top}>
            <Text>1.01 km</Text>
          </View>
          <View style={styles.bottom}>
            <View style={styles.name}>
              <Text>{item.name}</Text>
            </View>
            <View style={styles.status}>
              <Text>{item.bikesAvailable + '/' + (item.bikesAvailable + item.spacesAvailable)}</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
};

ListItem.propTypes = {
  item: PropTypes.object.isRequired,
  handlePress: PropTypes.func.isRequired,
  isFavorite: PropTypes.bool.isRequired,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    padding: 20,
  },
  left: {
    marginRight: 20,
    justifyContent: 'center',
  },
  right: {
    flex: 1,
  },
  top: {
    flex: 1,
  },
  bottom: {
    flex: 1,
    flexDirection: 'row',
  },
  name: {
    flex: 1,
  },
  status: {

  }
});

export default ListItem;