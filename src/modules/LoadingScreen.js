import React from 'react';
import {View, Image, StyleSheet, Platform} from 'react-native';
import {DARK_PRIMARY_COLOR} from "../styles/colors"
const WELCOME_IMAGE = require('../assets/img/bike_icon_grey_small.png');

const LoadingScreen = () => (
  <View style={styles.container}>
    {Platform.OS !== 'ios' &&
      <Image source={WELCOME_IMAGE} style={styles.image} resizeMode='contain' />
    }
  </View>
);


const styles = StyleSheet.create({
  container: {
    backgroundColor: DARK_PRIMARY_COLOR,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '60%',
    maxWidth: 160,
  },
});

export default LoadingScreen;