import { SafeAreaView } from 'react-native';
import React, { useState, useRef } from 'react';

import styles from './Camera.style';

import { RNCamera } from 'react-native-camera';

import useApi from '../../hooks/useApi';
import barcodeApi from '../../api/barcode';

import { useSelector, useDispatch } from 'react-redux';
import { setData } from '../../redux/dataProcess';

import { useNavigation } from '@react-navigation/native';

import CheckProduct from '../../components/Alerts/CheckProduct/CheckProduct';

const Camera = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [isVisible, setIsVisible] = useState(false);

  const cameraRef = useRef(null);

  const getBarcodeApi = useApi(barcodeApi.getProductInfo);

  const { product } = useSelector(state => state.dataProcess);

  const calculateQuantity = (quantity, type) => {
    switch (type) {
      case 'mL':
        return quantity;
      case 'cL':
        return quantity * 10;
      case 'L':
        return quantity * 1000;
      default:
        return quantity;
    }
  };
  const handleBarcodeScan = async ({ data }) => {
    try {
      if (data.length == 0) return;

      const response = await getBarcodeApi.request("asdasdasd");

      if (response.data.status == 0) return console.log('Product not found');

      const { product_name, quantity, image_url } = response.data.product;

      let product = { name: product_name, amount: '' };

      let quantityData = quantity.split(' ');

      const quantityValue = calculateQuantity(quantityData[0], quantityData[1]);
      product.amount = quantityValue;

      dispatch(setData(product));
      setIsVisible(true);
    } catch (error) {
      console.log('ERROR', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <RNCamera
        ref={cameraRef}
        style={styles.camera}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.auto}
        captureAudio={false} // Sesli video kaydetmek istemiyorsanız
        onBarCodeRead={handleBarcodeScan}
      />

      { isVisible && <CheckProduct product={product} isVisible={isVisible} closeAlert={() => setIsVisible(false)} /> }
    </SafeAreaView>
  );
};

export default Camera;

//8697432370041
//8690723183504
//8690558027974

//3274080005003
//5449000214911

//https://images.openfoodfacts.org/images/products/544/900/021/4911/front_en.119.400.jpg
