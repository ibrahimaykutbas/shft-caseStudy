import { View, Text } from 'react-native';
import React from 'react';

import styles from './Popup.style';

const Popup = ({ visible, closePopup, message }) => {
  if (visible) {
    setTimeout(() => {
        closePopup();
    }, 2000);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}> {message} </Text>
    </View>
  );
};

export default Popup;
