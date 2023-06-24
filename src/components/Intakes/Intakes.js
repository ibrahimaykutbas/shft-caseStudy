import { View, Text, FlatList, Pressable, PanResponder, Animated } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';

import { height } from '../../theme/units';
import { colors } from '../../theme/colors';
import styles from './Intakes.style';

import useApi from '../../hooks/useApi';
import intakeApi from '../../api/intake';

import { groupDataByType } from '../../utils/groupDataByType';

import { useSelector } from 'react-redux';

import ReactNativeModal from 'react-native-modal';

import { Add } from '../../assets/svgs';

import Popup from '../Popup/Popup';
import AddIntake from '../Alerts/AddIntake/AddIntake';
import UpdateIntake from '../Alerts/UpdateIntake/UpdateIntake';
import OperationModal from '../Alerts/OperationModal/OperationModal';
import ActivityIndicator from '../ActivityIndicator/ActivityIndicator';

const Intakes = ({ intakes, getIntakes, route }) => {
  const [data, setData] = useState([]);
  const [scrollOffset, setScrollOffset] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [addVisible, setAddVisible] = useState(false);
  const [operationVisible, setOperationVisible] = useState(false);
  const [updateVisible, setUpdateVisible] = useState(false);
  const [selectedData, setSelectedData] = useState({});
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');

  const { filterType } = useSelector(state => state.dataProcess);

  const addIntakeApi = useApi(intakeApi.createIntake);
  const updateIntakeApi = useApi(intakeApi.updateIntake);
  const deleteIntakeApi = useApi(intakeApi.deleteIntake);

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
    toValue: expanded ? height / 1.2 : height / 2.4,
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
    const { message } = route?.params || "";

    if (message) setPopupVisible(true), setPopupMessage(message);


  },[route]);
  
  // APIs
  const addIntake = async amount => {
    try {
      const response = await addIntakeApi.request(amount);
      
      if (response.status != 201) return setPopupMessage(true), setPopupMessage('Unexpected error occured');

      setAddVisible(false);
      setPopupVisible(true);
      setPopupMessage('Intake added successfully.');

      getIntakes();
    } catch (error) {}
  }

  const updateIntake = async (id, amount) => {
    try {
      const response = await updateIntakeApi.request(id, amount);
      if (response.status !== 200) return setPopupMessage(true), setPopupMessage('Unexpected error occured');

      setPopupVisible(true);
      setPopupMessage('Intake updated unsuccessfully.');

      getIntakes();
    } catch (error) {}
  }

  const deleteIntake = async id => {
    try {
      const response = await deleteIntakeApi.request(id);
      if (response.status !== 200) return setPopupMessage(true), setPopupMessage('Unexpected error occured');

      setPopupVisible(true);
      setPopupMessage('Intake deleted successfully.');
      
      getIntakes();
    } catch (error) {}
  };

  const renderItem = ({ item }) => {
    let newDate = new Date(item?.createdAt);
    let parseTime = newDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    let parseDate = newDate.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).split("/").join(".");
    
    return (
      <Pressable style={styles.intakeContainer} onLongPress={() => {
        setOperationVisible(true);
        setSelectedData(item);
      }} >
        <Text> {item?.amount} {item?.unit} </Text>
        {
          filterType == "daily" ? <Text> {`${parseTime} - ${parseDate}`} </Text> : <Text> {item?.createdAt} </Text>
        }
      </Pressable>
    );
  };

  return (
    <>
      <ActivityIndicator visible={addIntakeApi.loading || deleteIntakeApi.loading || updateIntake.loading} />

      <Animated.View style={[styles.container, { height: containerHeight }]} {...panResponder.panHandlers}>
        <View style={styles.line} />

        <Pressable style={styles.addButton} onPress={() => setAddVisible(true)}>
          <Add width={height / 22} height={height / 22} style={styles.add} fill={colors.WHITE} />
        </Pressable> 

        <FlatList data={intakes} renderItem={renderItem} onScroll={handleScroll}/>

        <AddIntake addIntake={addIntake} isVisible={addVisible} closeAlert={() => setAddVisible(false)} />
        <UpdateIntake updateIntake={updateIntake} isVisible={updateVisible} closeAlert={() => setUpdateVisible(false)} selectedData={selectedData} />
        <OperationModal deleteIntake={deleteIntake} isVisible={operationVisible} closeAlert={() => setOperationVisible(false)} selectedData={selectedData} openUpdate={() => setUpdateVisible(true)} />
        
        <ReactNativeModal visible={popupVisible} swipeDirection={["left", "up"]} onSwipeComplete={() => setPopupVisible(false)}>
          <Popup visible={popupVisible} closePopup={() => setPopupVisible(false)} message={popupMessage} />
        </ReactNativeModal>

      </Animated.View>
    </>
  );
};

export default Intakes;
