import { View, Text, FlatList, Pressable, PanResponder, Animated } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';

import { height } from '../../theme/units';
import { colors } from '../../theme/colors';
import styles from './Intakes.style';

import { groupDataByType } from '../../utils/groupDataByType';

import { useSelector } from 'react-redux';

import Dialog from "react-native-dialog";

import { Add } from '../../assets/svgs';

const Intakes = ({ intakes, addIntake, updateIntake, deleteIntake }) => {
  const [data, setData] = useState([]);
  const [scrollOffset, setScrollOffset] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [addVisible, setAddVisible] = useState(false);
  const [operationVisible, setOperationVisible] = useState(false);
  const [updateVisible, setUpdateVisible] = useState(false);
  const [selectedData, setSelectedData] = useState({});
  const [value, setValue] = useState('');

  const { filterType } = useSelector(state => state.dataProcess);

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
    toValue: expanded ? height / 1.2 : height / 2.3,
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

  useEffect(() => {
    if(intakes.length > 0){
      const filteredData = groupDataByType(intakes, filterType);
      
      let sortedIntakes = filteredData?.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });

      setData(sortedIntakes);
    }
  },[intakes, filterType])

  // Ekleme işlemini yapacak alert
  const addWater = () => {
    return (
      <Dialog.Container visible={addVisible}>
        <Dialog.Title>Add Intake</Dialog.Title>
        <Dialog.Description>
          Please enter the amount of water you drink.
        </Dialog.Description>

        <Dialog.Input value={value} onChangeText={text => setValue(text)}  placeholder='250' autoFocus={true} keyboardType='numeric' />

        <Dialog.Button label="Cancel" onPress={() => {
          setAddVisible(false);
          setValue('');
        }} />
        <Dialog.Button label="Save" onPress={() => {    
          addIntake(value);
          setAddVisible(false);
          setValue('');
        }} />
      </Dialog.Container>
    )
  }

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
          updateIntake(selectedData?.id, value);
          setUpdateVisible(false);
          setValue('');
        }} />
      </Dialog.Container>
    )
  }

  const renderItem = ({ item }) => {
    let newDate = new Date(item?.createdAt);
    let parseTime = newDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    let parseDate = newDate.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
    
    return (
      <Pressable style={styles.intakeContainer} onLongPress={() => {
        setOperationVisible(true);
        setSelectedData(item);
      }} >
        <Text> {item?.amount} {item?.unit} </Text>
        {
          filterType == "daily" ? <Text> {`${parseTime} / ${parseDate}`} </Text> : <Text> {item?.createdAt} </Text>
        }
      </Pressable>
    );
  };

  return (
    <>
      
    
      <Animated.View style={[styles.container, { height: containerHeight }]} {...panResponder.panHandlers}>
        <View style={styles.line} />

        <Pressable style={styles.addButton} onPress={() => setAddVisible(true)}>
          <Add width={height / 22} height={height / 22} style={styles.add} fill={colors.WHITE} />
        </Pressable> 

        <FlatList data={data} renderItem={renderItem} onScroll={handleScroll}/>

        {/* Ekstra visible kontrolü yapılmasının sebebi değerler çakışıyor sanırım ve ikinci paket görünmüyor */}
        { addVisible ? addWater() : null }
        { operationVisible ? operationModal() : null }
        { updateVisible ? updateWater() : null }
        
      </Animated.View>
    </>
  );
};

export default Intakes;
