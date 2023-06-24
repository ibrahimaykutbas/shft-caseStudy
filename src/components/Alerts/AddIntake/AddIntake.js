import React, { useState } from 'react';

import Dialog from 'react-native-dialog';

import { useNavigation } from '@react-navigation/native';

const AddIntake = ({ addIntake, isVisible, closeAlert }) => {
  const [value, setValue] = useState('');

  const navigation = useNavigation();

  if (!isVisible) return null;

  return (
    <Dialog.Container visible={isVisible}>
      <Dialog.Title>Add Intake</Dialog.Title>
      <Dialog.Description>
        Please enter the amount of water you drink.
      </Dialog.Description>

      <Dialog.Input
        value={value}
        onChangeText={text => setValue(text)}
        placeholder="250"
        autoFocus={true}
        keyboardType="numeric"
      />

      <Dialog.Button
        label="Cancel"
        onPress={() => {
          closeAlert();
          setValue('');
        }}
      />

      <Dialog.Button
        label="Save"
        onPress={() => {
          if (value == '' && value == 0) return;

          addIntake(value);
          setValue('');
        }}
      />

      <Dialog.Button
        label="Use Camera"
        onPress={() => {
            navigation.navigate("Camera"); 
            closeAlert();
        }}
      />
    </Dialog.Container>
  );
};

export default AddIntake;
