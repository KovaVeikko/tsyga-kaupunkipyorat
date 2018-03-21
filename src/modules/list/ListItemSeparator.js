import React from 'react';
import {View, StyleSheet} from 'react-native';

const ListItemSeparator = () => {
  return (
    <View style={styles.style}/>
  )
};

const styles = StyleSheet.create({
  style: {
    height: 1,
    width: '100%',
    backgroundColor: '#ccc',
  }
});


export default ListItemSeparator