import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '../screens/Home/Home';
import Goal from '../screens/Goal/Goal';
import Camera from '../screens/Camera/Camera';

const RootNavigator = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Goal" component={Goal} />
        <Stack.Screen name="Camera" component={Camera} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
