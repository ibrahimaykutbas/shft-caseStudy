import { View, Text, FlatList, Pressable, Alert, PanResponder, Animated } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';

import { height } from '../../theme/units';
import styles from './Intakes.style';

import Dialog from "react-native-dialog";

const Intakes = ({ intakes, updateIntake, deleteIntake }) => {
  const [scrollOffset, setScrollOffset] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [operationVisible, setOperationVisible] = useState(false);
  const [updateVisible, setUpdateVisible] = useState(false);
  const [selectedData, setSelectedData] = useState({});
  const [value, setValue] = useState('');

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gestureState) => {
        // Y eksenindeki hareketi takip ederek büyütme işlemi yap
        if (gestureState.dy < -50) return setExpanded(true);

        setExpanded(false);
      },
    })
  ).current;

  const containerHeight = useRef(new Animated.Value(200)).current;

  // Animasyonlu büyüme işlemini gerçekleştirmek için Animated kullanımı
  Animated.timing(containerHeight, {
    toValue: expanded ? height / 1.2 : height / 2.7,
    duration: 150,
    useNativeDriver: false,
  }).start();

  const handleScroll = (event) => {
    const { contentOffset } = event.nativeEvent;
    setScrollOffset(contentOffset.y);
  };

  useEffect(() => {
    if (scrollOffset > 200) return setExpanded(true);
  }, [scrollOffset]);

  const openAlert = (id) => {
    Alert.alert(
      "Title",
      "Description of the alert",
      [
        {
          text: 'Update',
          onPress: () => setModalVisible(true),
        },
        {
          text: 'Delete',
          onPress: () => deleteIntake(id),
        }
      ]
    )
  }

  // Günlük - Haftalık - Aylık olarak gruplama işlemini gerçekleştirmek için
  const groupDataByType = (type) => {
    const groupedData = {};
  
    intakes.forEach((item) => {
      const createdAt = new Date(item.createdAt);
      let key;
  
      if (type === 'daily') {
        key = createdAt.toLocaleDateString();
      } else if (type === 'weekly') {
        const firstDayOfWeek = new Date(createdAt.setDate(createdAt.getDate() - createdAt.getDay()));
        const lastDayOfWeek = new Date(createdAt.setDate(createdAt.getDate() - createdAt.getDay() + 6));
        key = `${firstDayOfWeek.toLocaleDateString()} - ${lastDayOfWeek.toLocaleDateString()}`;
      } else if (type === 'monthly') {
        key = createdAt.toLocaleString('default', { month: 'long', year: 'numeric' });
      }
  
      if (!groupedData[key]) {
        groupedData[key] = [];
      }
  
      groupedData[key].push(item);
    });
  
    return groupedData;
  };

/*   const dailyData = groupDataByType('monthly');
  console.log('Günlük Gruplama:', dailyData); */

  const renderItem = ({ item }) => {
    let parseDate = item?.createdAt.split('T');

    return (
      <Pressable style={styles.intakeContainer} onLongPress={() => {
        setOperationVisible(true);
        setSelectedData(item);
      }} >
        <Text> {item?.amount} {item?.unit} </Text>
        <Text> {parseDate[1].slice(0, 5)} {parseDate[0]} </Text>
      </Pressable>
    );
  };

  // Update - Delete seçimi için açılacak olan alert
  const operationModal = () => {
    return (
      <Dialog.Container visible={operationVisible}>
        <Dialog.Title>Edit</Dialog.Title>
        <Dialog.Description>
          Select choose
        </Dialog.Description>

        <Dialog.Button label="Update" onPress={() => {
          setOperationVisible(false);
          setUpdateVisible(true);
          setValue(selectedData.amount.toString());
        }} />
        <Dialog.Button label="Delete" onPress={() => {
          deleteIntake(selectedData?.id);
          setOperationVisible(false);
        }} />
      </Dialog.Container>
    )
  }

  // Update işlemini yapacak alert
  const updateWater = () => {
    return (
      <Dialog.Container visible={updateVisible}>
        <Dialog.Title>Update</Dialog.Title>
        <Dialog.Description>
          Update the amount of water you drink.
        </Dialog.Description>

        <Dialog.Input value={value} onChangeText={text => setValue(text)}  placeholder='250' autoFocus={true} keyboardType='numeric' />

        <Dialog.Button label="Cancel" onPress={() => {
          setUpdateVisible(false);
          setValue('');
        }} />
        <Dialog.Button label="Save" onPress={() => {
          // Veri güncelleniyor diye gözüküyor fakat yeniden başlatınca eski haline dönüyor.
          // Ama manuel olarak güncellersem sorun olmuyor?
          let coppyData = selectedData;
          coppyData.amount = value;
          updateIntake(selectedData?.id, coppyData);
          setUpdateVisible(false);
          setValue('');
        }} />
      </Dialog.Container>
    )
  }

  return (
    <Animated.View style={[styles.container, { height: containerHeight }]} {...panResponder.panHandlers}>
      <View style={styles.line} />

      <FlatList data={intakes} renderItem={renderItem} onScroll={handleScroll}/>

      {/* Ekstra visible kontrolü yapılmasının sebebi değerler çakışıyor sanırım ve ikinci paket görünmüyor */}
      { operationVisible ? operationModal() : null}
      { updateVisible ? updateWater() : null}
      
    </Animated.View>
  );
};

export default Intakes;
