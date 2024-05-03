import React, { useContext, useEffect, useState } from 'react';
import { Modal, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';

import { useAppTheme } from '../../styles/theme/theme';
import AppPageWrapper from '../../shared/AppPageWrapper';
import LocationContainer from '../../Components/Location/LocationContainer';
import DeliveryCard from '../../Components/DeliveryCard';

const OrderContainer: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(true);

  const { colors } = useAppTheme();
  return (
    <AppPageWrapper>
        <DeliveryCard />
    </AppPageWrapper>
  );
};

export default OrderContainer;
