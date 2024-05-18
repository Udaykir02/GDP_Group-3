import React, { useContext, useEffect, useState } from 'react';
import { FlatList, Modal, TouchableOpacity, View } from 'react-native';
import { Card, Text, Button, Avatar } from 'react-native-paper';

import theme, { useAppTheme } from '../../styles/theme/theme';
import AppPageWrapper from '../../shared/AppPageWrapper';
import LocationContainer from '../Location/LocationContainer';
import { useDispatch, useSelector } from 'react-redux';
import { setModalVisible } from '../../../reducers/locationReducer';
import LoadingSpinner from '../../shared/LoadingSpinner';
import createToBeImplementedStyle from "./VendorSearchStyle";
import axios from 'axios';
const LeftContent = (props: any) => <Avatar.Icon {...props} icon="folder" />
const VendorSearch: React.FC = ({ navigation }: any) => {
  const { radius, vendorTypes } = useSelector((state: any) => state.vendor)
  const [isModalVisible, setIsModalVisible] = useState(true);
  const [hasMore, setHasMore] = useState(false)
  const [refreshing, setRefreshing] = useState(false);
  const [vendors, setVendors] = useState<any>([]);
  const styles = createToBeImplementedStyle();
  const { chosenLocation } = useSelector((state: any) => state.location)
  const { token } = useSelector((state: any) => state.auth)
  const { colors } = useAppTheme();
  const isReduxModalVisible = useSelector((state: any) => state.location.isModalVisible)
  const { defaultlocation } = useSelector((state: any)=> state.location);
  const { inventoryData, vendorData } = useSelector((state: any) => state.search) 
  const dispatch = useDispatch();
  const controlModal = (flag: boolean) => {
    dispatch(setModalVisible(flag));
    setIsModalVisible(flag)
  }





  const renderHeader = () => {
    // if(!defaultlocation)
    //   return (<></>)
    return (
      <></>
    )
  }
  const handleResetPassword = () => {
    navigation.navigate('Filter')
  }

  const handleSelect = (index: any) => {
    navigation.navigate('Vendor', { vendor: vendorData[index] })
  }
  return (
    <AppPageWrapper>

      <FlatList
        data={vendorData}
        renderItem={({ item, index }) => (
          <Card mode='contained' style={{ marginVertical: 10 }}>
            <Card.Cover source={{ uri: item.website }} style={{ borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }} />
            <Card.Title title={item.vendor_name} titleStyle={{ fontWeight: 'bold' }} />
            <Card.Content>
              <Text variant="bodyMedium">{item.vendor_description}</Text>
            </Card.Content>
            <Card.Actions>
              <Button onPress={() => { handleSelect(index) }}>Select</Button>
            </Card.Actions>
          </Card>
        )}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.vendorId}
        extraData={vendorData}
        onEndReachedThreshold={0.1}
        ListFooterComponent={(hasMore) ? <LoadingSpinner /> : null}
        refreshing={refreshing}
        // onEndReached={fetchMore}
        // onRefresh={() => {algoliaRefreshing(true); renderPull();}}
        style={styles.articles}
        ListHeaderComponent={renderHeader}
      />
    </AppPageWrapper>
  );
};

export default VendorSearch;
