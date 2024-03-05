import React from 'react';
import { Text, View } from 'react-native';
import styles from '../styles/styles';

export default function Footer() {
  return (
    <View style={styles.footer}>
      <Text style={styles.author}>Author: Eetu Huotari</Text>
    </View>
  )
}