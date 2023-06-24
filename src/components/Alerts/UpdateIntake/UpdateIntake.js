import React, { useEffect, useState } from 'react';

import Dialog from 'react-native-dialog';

const UpdateIntake = ({
  updateIntake,
  isVisible,
  closeAlert,
  selectedData
}) => {
  const [value, setValue] = useState('');

  useEffect(() => {
    if(selectedData?.amount) setValue(selectedData?.amount.toString());
  },[selectedData])

  if(!isVisible) return null;

  return (
    <Dialog.Container visible={isVisible}>
      <Dialog.Title>Update</Dialog.Title>
      <Dialog.Description>
        Update the amount of water you drink.
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
          if (value == '') return;

          updateIntake(selectedData?.id, value);
          closeAlert();
          setValue('');
        }}
      />
    </Dialog.Container>
  );
};

export default UpdateIntake;
