import { View } from 'react-native';
import React from 'react';

import styles from './ActivityIndicator.style';

import loading from '../../assets/animations/loading.json';

import Lottie from 'lottie-react-native';

const ActivityIndicator = ({ visible = false }) => {
  if (!visible) return null;

  return (
    <View style={styles.container}>
      <Lottie style={styles.animation} source={loading} autoPlay loop />
    </View>
  );
};

export default ActivityIndicator;
