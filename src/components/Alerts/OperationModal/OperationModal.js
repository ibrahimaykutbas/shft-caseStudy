import React, { useState } from 'react';

import Dialog from 'react-native-dialog';

const OperationModal = ({
  deleteIntake,
  isVisible,
  closeAlert,
  selectedData,
  openUpdate
}) => {
  const [value, setValue] = useState('');

  if (!isVisible) return null;

  return (
    <Dialog.Container visible={isVisible}>
      <Dialog.Title>Edit</Dialog.Title>
      <Dialog.Description>Select choose</Dialog.Description>

      <Dialog.Button
        label="Update"
        onPress={() => {
          closeAlert();
          openUpdate();
          setValue(selectedData.amount.toString());
        }}
      />
      <Dialog.Button
        label="Delete"
        onPress={() => {
          closeAlert();
          deleteIntake(selectedData?.id);
        }}
      />
    </Dialog.Container>
  );
};

export default OperationModal;
