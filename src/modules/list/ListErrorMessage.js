import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {DIVIDER_COLOR, TEXT_PRIMARY_COLOR} from '../../styles/colors';

const ListErrorMessage = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Loading stations failed</Text>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: DIVIDER_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: TEXT_PRIMARY_COLOR,
  }
});


export default ListErrorMessage;