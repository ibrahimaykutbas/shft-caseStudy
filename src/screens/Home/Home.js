import { SafeAreaView, Pressable, Share } from 'react-native';
import React, { useEffect, useState } from 'react';

import { height } from '../../theme/units';
import styles from './Home.style';

import useApi from '../../hooks/useApi';
import intakeApi from '../../api/intake';
import goalApi from '../../api/goal';

import { groupDataByType } from '../../utils/groupDataByType';

import CircularProgress from '../../components/CircularProgress/CircularProgress';
import Intakes from '../../components/Intakes/Intakes';
import ActivityIndicator from '../../components/ActivityIndicator/ActivityIndicator';

import { Share as ShareIcon} from '../../assets/svgs';

import { useIsFocused } from '@react-navigation/native';

import { useSelector } from 'react-redux';

const Home = ({ navigation, route }) => {
  const [intakes, setIntakes] = useState([]);
  const [goal, setGoal] = useState({});

  const { filterType } = useSelector(state => state.dataProcess);

  // Intake API
  const getIntakesApi = useApi(intakeApi.getIntakes);

  // Goal API
  const getGoalApi = useApi(goalApi.getGoal);

  const isFocused = useIsFocused();

  useEffect(() => {
    getIntakes();
    getGoal();
  }, [isFocused, filterType]);

  const getGoal = async () => {
    try {
      const response = await getGoalApi.request(1);
      if (response.status !== 200) return;

      setGoal(response.data);
    } catch (error) {}
  }

  const getIntakes = async () => {
    try {
      const response = await getIntakesApi.request();
      if (response.status !== 200) return;

  const filteredData = groupDataByType(response?.data, filterType);

     /*  let sortedIntakes = response?.data.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }); */

      setIntakes(filteredData);
    } catch (error) {
      console.log("ERROR", error);
    }
  };

  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          'Water Intake | I drank 200 ml of water today!',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  return (
    <>
      <ActivityIndicator visible={getIntakesApi.loading || getGoalApi.loading} />

      <SafeAreaView style={styles.container}>
      <Pressable
        style={styles.share}
        onPress={() => onShare()}>
        <ShareIcon width={height / 30} height={height / 30} />
      </Pressable>
      <CircularProgress intakes={intakes} goal={goal} />

      <Intakes intakes={intakes} getIntakes={getIntakes} route={route} />

    </SafeAreaView>
    </>
  );
};

export default Home;
