import { View, Text, Pressable } from 'react-native';
import React, { useState ,useEffect } from 'react';

import { width, height } from '../../theme/units';
import { colors } from '../../theme/colors';
import styles from './CircularProgress.style';

import { AnimatedCircularProgress } from 'react-native-circular-progress';

import { useSelector, useDispatch } from 'react-redux';
import { setFilterType } from '../../redux/dataProcess';

const CircularProgress = ({ intakes, goal }) => {
  const dispatch = useDispatch();

  const [goalAmount, setGoalAmount] = useState(0);
  const [totalIntake, setTotalIntake] = useState([]);
  const [percent, setPercent] = useState(0);

  const { filterType } = useSelector(state => state.dataProcess);

  useEffect(() => {
    let _goal = filterType === 'daily' ? goal?.dailyGoal : filterType === 'weekly' ? goal?.weeklyGoal : goal?.monthlyGoal;
    let totalIntake = intakes?.reduce((total, intake) => { return Number(total) + Number(intake.amount) }, 0);

    let result = totalIntake / _goal * 100

    !Number.isNaN(_goal) && setGoalAmount(_goal);
    !Number.isNaN(totalIntake) && setTotalIntake(totalIntake);
    !Number.isNaN(result) && setPercent(result > 100 ? 100 : result);

  },[intakes, goal, filterType])

  return (
    <View>
      <AnimatedCircularProgress
        style={styles.container}
        size={height / 3}
        width={height * 0.05}
        fill={Number(percent.toFixed(0))}
        lineCap='round'
        prefill={100}
        fillLineCap='round'
        rotation={0}
        tintColor={colors.TURQUOISE}
        backgroundColor={colors.POWDER_BLUE}>
        {fill => (
          <View style={styles.circle}>
            <Text style={styles.percent}>{fill.toFixed(0)}%</Text>
            <Text style={styles.info}> {totalIntake} / {goalAmount} ml</Text>
          </View>
        )}
      </AnimatedCircularProgress>

      <View style={styles.line} />

      <View style={styles.labels}>
        <Pressable style={styles.label} onPress={() => dispatch(setFilterType("daily"))}>
          <View style={[ styles.choose, filterType === 'daily' ? styles.activeChoose : '' ]} />
          <Text style={[ styles.labelText, filterType === "daily" ? styles.activeLabelText : '' ]}>Daily</Text>
        </Pressable>

        <Pressable style={styles.label} onPress={() => dispatch(setFilterType("weekly"))}>
          <View style={[ styles.choose, filterType === 'weekly' ? styles.activeChoose : '' ]} />
          <Text style={[ styles.labelText, filterType === "weekly" ? styles.activeLabelText : '' ]}>Weekly</Text>
        </Pressable>

        <Pressable style={styles.label} onPress={() =>  dispatch(setFilterType("monthly"))}>
          <View style={[ styles.choose, filterType === 'monthly' ? styles.activeChoose : '' ]} />
          <Text style={[ styles.labelText, filterType === "monthly" ? styles.activeLabelText : '' ]}>Monthly</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default CircularProgress;
