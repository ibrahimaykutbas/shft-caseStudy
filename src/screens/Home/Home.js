import { SafeAreaView, Pressable } from 'react-native';
import React, { useEffect } from 'react';

import { height } from '../../theme/units';
import styles from './Home.style';

import useApi from '../../hooks/useApi';
import intakeApi from '../../api/intake';

import CircularProgress from '../../components/CircularProgress/CircularProgress';
import Intakes from '../../components/Intakes/Intakes';

import { Menu } from '../../assets/svgs';

const Home = () => {
  const getIntakesApi = useApi(intakeApi.getIntakes);

  useEffect(() => {
    //getIntakes();
  }, []);

  const getIntakes = async () => {
    try {
      const response = await getIntakesApi.request();
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

      <Intakes />
    </SafeAreaView>
  );
};

export default Home;
