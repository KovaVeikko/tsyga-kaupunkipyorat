import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {TEXT_SECONDARY_COLOR} from "../../styles/colors"
const ABOUT_IMAGE = require('../../assets/img/about_icon.png');

const AboutScreen = () => (
  <View style={styles.container}>
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>Tsygä</Text>
    </View>
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
  headerContainer: {
    position: 'absolute',
    top: 40,
  },
  headerText: {
    fontSize: 20,
  },
  iconContainer: {
    alignItems: 'center',
  },
  icon: {
    width: '60%',
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