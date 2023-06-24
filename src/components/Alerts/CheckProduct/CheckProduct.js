import React, { useState } from 'react';

import Dialog from 'react-native-dialog';

import { useNavigation } from '@react-navigation/native';

import useApi from '../../../hooks/useApi';
import intake from '../../../api/intake';

import ActivityIndicator from '../../ActivityIndicator/ActivityIndicator';

const CheckProduct = ({ product, isVisible, closeAlert }) => {
  if (!isVisible) return null;

  const navigation = useNavigation();

  const addIntakeApi = useApi(intake.createIntake);

  const addIntake = async amount => {
    try {
      const response = await addIntakeApi.request(amount);

      if (response.status != 201) return console.log('Başarısız');

      navigation.navigate('Home', { message: 'Product added successfully' });
    } catch (error) {
      console.log('HATA', error);
    }
  };

  return (
    <>
      <ActivityIndicator visible={addIntakeApi.loading} />
      <Dialog.Container visible={isVisible}>
        <Dialog.Title>Check Product</Dialog.Title>
        <Dialog.Description>
          Did you want to add product {product?.name}?
        </Dialog.Description>

        <Dialog.Button
          label="No"
          onPress={() => {
            closeAlert();
          }}
        />

        <Dialog.Button
          label="Yes"
          onPress={() => {
            addIntake(product.amount.toString());
          }}
        />
      </Dialog.Container>
    </>
  );
};

export default CheckProduct;
