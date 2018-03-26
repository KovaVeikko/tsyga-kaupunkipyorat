import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
const ABOUT_IMAGE = require('../../assets/img/about_icon.png');

const AboutScreen = () => (
  <View style={styles.container}>
    <View style={styles.iconContainer}/>
      <Image source={ABOUT_IMAGE} style={styles.icon} resizeMode='contain' />
    <View/>
    <View style={styles.footer}>
      <Text>Veikko Kovanen, 2018</Text>
    </View>
  </View>
);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    alignItems: 'center',
  },
  icon: {
    width: '70%',
  },
  footer: {
    position: 'absolute',
    bottom: 20,
  }
});

export default AboutScreen;