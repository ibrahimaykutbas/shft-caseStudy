import { SafeAreaView, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';

import { height } from '../../theme/units';
import styles from './Home.style';

import useApi from '../../hooks/useApi';
import intakeApi from '../../api/intake';

import CircularProgress from '../../components/CircularProgress/CircularProgress';
import Intakes from '../../components/Intakes/Intakes';

import { Menu } from '../../assets/svgs';

const Home = () => {
  const [intakes, setIntakes] = useState([]);
  const getIntakesApi = useApi(intakeApi.getIntakes);
  const updateIntakeApi = useApi(intakeApi.updateIntake);
  const deleteIntakeApi = useApi(intakeApi.deleteIntake);

  useEffect(() => {
    getIntakes();
  }, []);

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
      <CircularProgress />

      <Intakes intakes={intakes} updateIntake={updateIntake} deleteIntake={deleteIntake} />
    </SafeAreaView>
  );
};

export default Home;
