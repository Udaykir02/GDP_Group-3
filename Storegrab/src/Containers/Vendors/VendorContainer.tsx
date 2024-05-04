import React, { useContext, useEffect, useState } from 'react';
import { Modal, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';

import { useAppTheme } from '../../styles/theme/theme';
import AppPageWrapper from '../../shared/AppPageWrapper';
import LocationContainer from '../../Components/Location/LocationContainer';
import { useDispatch, useSelector } from 'react-redux';
import { setModalVisible } from '../../../reducers/locationReducer';

const VendorContainer: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(true);

  const { colors } = useAppTheme();
  const isReduxModalVisible = useSelector((state:any)=> state.location.isModalVisible)
  const dispatch = useDispatch();
  const controlModal = (flag: boolean) => {
    dispatch(setModalVisible(flag));
    setIsModalVisible(flag)
  }

  useEffect(()=>{
    setIsModalVisible(isReduxModalVisible)
  },[isReduxModalVisible])

  return (
    <AppPageWrapper>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => {
          setIsModalVisible(false)
        }}>
        <View
          style={{
            height: '50%',
            marginTop: 'auto',
            backgroundColor: 'blue'
          }}>
          <LocationContainer controlModal={controlModal}/>
        </View>
      </Modal>
    </AppPageWrapper>
  );
};

export default VendorContainer;
