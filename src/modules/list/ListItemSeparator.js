import React from 'react';
import {View, StyleSheet} from 'react-native';
import {DIVIDER_COLOR} from "../../styles/colors"

const ListItemSeparator = () => {
  return (
    <View style={styles.style}/>
  )
};

const styles = StyleSheet.create({
  style: {
    height: 1,
    width: '100%',
    backgroundColor: DIVIDER_COLOR,
  }
});


export default ListItemSeparator;