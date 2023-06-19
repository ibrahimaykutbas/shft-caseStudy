import { View, Text, Pressable } from 'react-native';
import React, { useState } from 'react';

import { width, height } from '../../theme/units';
import { colors } from '../../theme/colors';
import styles from './CircularProgress.style';

import { AnimatedCircularProgress } from 'react-native-circular-progress';

const CircularProgress = () => {
  const [type, setType] = useState('daily');

  return (
    <View>
      <AnimatedCircularProgress
        style={styles.container}
        size={height / 3}
        width={height * 0.05}
        fill={90}
        tintColor={colors.POWDER_BLUE}
        onAnimationComplete={() => console.log('onAnimationComplete')}
        backgroundColor="#3d5875">
        {fill => (
          <View style={styles.circle}>
            <Text style={styles.percent}>{fill}%</Text>
            <Text style={styles.info}> 700 / 1850 ml</Text>
          </View>
        )}
      </AnimatedCircularProgress>

      <View style={styles.line} />

      <View style={styles.labels}>
        <Pressable style={styles.label} onPress={() => setType('daily')}>
          <View style={[ styles.choose, type === 'daily' ? styles.activeChoose : '' ]} />
          <Text style={[ styles.labelText, type === "daily" ? styles.activeLabelText : '' ]}>Daily</Text>
        </Pressable>

        <Pressable style={styles.label} onPress={() => setType('weekly')}>
          <View style={[ styles.choose, type === 'weekly' ? styles.activeChoose : '' ]} />
          <Text style={[ styles.labelText, type === "weekly" ? styles.activeLabelText : '' ]}>Weekly</Text>
        </Pressable>

        <Pressable style={styles.label} onPress={() => setType('monthly')}>
          <View style={[ styles.choose, type === 'monthly' ? styles.activeChoose : '' ]} />
          <Text style={[ styles.labelText, type === "monthly" ? styles.activeLabelText : '' ]}>Monthly</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default CircularProgress;
