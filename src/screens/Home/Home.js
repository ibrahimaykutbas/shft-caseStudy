import { SafeAreaView, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';

import { height } from '../../theme/units';
import styles from './Home.style';

import useApi from '../../hooks/useApi';
import intakeApi from '../../api/intake';
import goalApi from '../../api/goal';

import CircularProgress from '../../components/CircularProgress/CircularProgress';
import Intakes from '../../components/Intakes/Intakes';

import { Menu } from '../../assets/svgs';

const Home = () => {
  const [intakes, setIntakes] = useState([]);
  const [goal, setGoal] = useState({});

  // Intake API
  const getIntakesApi = useApi(intakeApi.getIntakes);
  const addIntakeApi = useApi(intakeApi.createIntake);
  const updateIntakeApi = useApi(intakeApi.updateIntake);
  const deleteIntakeApi = useApi(intakeApi.deleteIntake);

  // Goal API
  const getGoalApi = useApi(goalApi.getGoal);

  useEffect(() => {
    getIntakes();
    getGoal();
  }, []);

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

      let sortedIntakes = response?.data.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });

      setIntakes(sortedIntakes);
    } catch (error) {}
  };

  const addIntake = async data => {
    try {
      const response = await addIntakeApi.request(data);
      if (response.status != 201) return;

      getIntakes();
    } catch (error) {}
  }

  const updateIntake = async (id, data) => {
    try {
      const response = await updateIntakeApi.request(id, data);
      if (response.status !== 200) return;

      getIntakes();
    } catch (error) {}
  }

  const deleteIntake = async id => {
    try {
      const response = await deleteIntakeApi.request(id);
      if (response.status !== 200) return;
      
      getIntakes();
    } catch (error) {}
  };

  return (
    <SafeAreaView style={styles.container}>
      <Pressable
        style={styles.menu}
        onPress={() => console.log('Menu clicked')}>
        <Menu width={height / 30} height={height / 30} />
      </Pressable>
      <CircularProgress intakes={intakes} goal={goal} />

      <Intakes intakes={intakes} addIntake={addIntake} updateIntake={updateIntake} deleteIntake={deleteIntake} />
    </SafeAreaView>
  );
};

export default Home;
