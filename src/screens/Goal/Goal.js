import { SafeAreaView, View, Text, Pressable } from 'react-native';
import React from 'react';

import styles from './Goal.style';
import { height } from '../../theme/units';
import { Back } from '../../assets/svgs';

const Goal = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={styles.backButton}
          hitSlop={height / 30}>
          <Back width={height / 40} height={height / 40} />
        </Pressable>

        <Text style={styles.title}>Goal</Text>

        <View />
      </View>
    </SafeAreaView>
  );
};

export default Goal;
