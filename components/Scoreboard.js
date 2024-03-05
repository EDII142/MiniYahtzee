import React from 'react';
import { Text, View } from 'react-native';
import styles from '../styles/styles';
import Header from './Header';
import Footer from './Footer';

export default function Scoreboard() {
  return (
    <>
      <Header/>
        <View style={styles.container}>
          <Text style={styles.text}>Scoreboard is here</Text>
        </View>
      <Footer/>
    </>
  )
}