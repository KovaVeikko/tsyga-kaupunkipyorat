import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {TEXT_SECONDARY_COLOR} from "../../styles/colors"
const ABOUT_IMAGE = require('../../assets/img/about_icon.png');

const AboutScreen = () => (
  <View style={styles.container}>
    <View style={styles.iconContainer}/>
      <Image source={ABOUT_IMAGE} style={styles.icon} resizeMode='contain' />
    <View/>
    <View style={styles.footer}>
      <Text style={styles.footerText}>Veikko Kovanen</Text>
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
  },
  footerText: {
    color: TEXT_SECONDARY_COLOR,
  }
});

export default AboutScreen;