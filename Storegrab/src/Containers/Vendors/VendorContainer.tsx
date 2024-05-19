import React, { useContext, useEffect, useState } from 'react';
import { FlatList, Modal, TouchableOpacity, View } from 'react-native';
import { Card, Text, Button, Avatar } from 'react-native-paper';

import theme, { useAppTheme } from '../../styles/theme/theme';
import AppPageWrapper from '../../shared/AppPageWrapper';
import LocationContainer from '../../Components/Location/LocationContainer';
import { useDispatch, useSelector } from 'react-redux';
import { setModalVisible } from '../../../reducers/locationReducer';
import LoadingSpinner from '../../shared/LoadingSpinner';
import createToBeImplementedStyle from "./VendorContainerStyle";
import axios from 'axios';
const LeftContent = (props: any) => <Avatar.Icon {...props} icon="folder" />
const VendorContainer: React.FC = ({ navigation }: any) => {
  const { radius, vendorTypes } = useSelector((state: any) => state.vendor)
  const [isModalVisible, setIsModalVisible] = useState(true);
  const [hasMore, setHasMore] = useState(false)
  const [refreshing, setRefreshing] = useState(false);
  const [vendors, setVendors] = useState<any>([]);
  const styles = createToBeImplementedStyle();
  const { chosenLocation } = useSelector((state: any) => state.location)
  const { token, vendorAdmin, user } = useSelector((state: any) => state.auth)
  const { colors } = useAppTheme();
  const isReduxModalVisible = useSelector((state: any) => state.location.isModalVisible)
  const { defaultlocation } = useSelector((state: any) => state.location);
  const dispatch = useDispatch();
  const controlModal = (flag: boolean) => {
    dispatch(setModalVisible(flag));
    setIsModalVisible(flag)
  }

  useEffect(() => {
    if (vendorAdmin) {
      const requestData = {
        vendorIds: user?.vendors ? user.vendors : []
      };
      console.log('Request Data:', user?.vendors)
      // Define the request configuration
      const config = {
        method: 'post',
        url: 'http://localhost:3000/vendorapi/getVendorByIds',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}` // Add the token to the Authorization header
        },
        data: requestData // Add the request body
      };
      axios(config)
        .then(response => {
          setVendors(response.data)
          console.log('Response:', response.data);
        })
        .catch(error => {
          setVendors([])
        }); 
    } else {
      if (chosenLocation != undefined) {
        // Define the request data including the body and token
        const requestData = {
          longitude: chosenLocation.longitude, // Example longitude
          latitude: chosenLocation.latitude, // Example latitude
          miles: radius,
          vendor_types: vendorTypes
        };

        // Define the request configuration
        const config = {
          method: 'post',
          url: 'http://localhost:3000/vendorapi/nearest-vendor',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}` // Add the token to the Authorization header
          },
          data: requestData // Add the request body
        };
        axios(config)
          .then(response => {
            setVendors(response.data.nearestVendor)
            console.log('Response:', response.data.nearestVendor);
          })
          .catch(error => {
            setVendors([])
          });

      }
    }
  }, [chosenLocation, radius, vendorTypes.length, vendorAdmin])

  useEffect(() => {
    setIsModalVisible(isReduxModalVisible)
  }, [isReduxModalVisible])

  const renderHeader = () => {
    if (!vendors || vendors.length === 0)
      return (<></>);
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text style={styles.title}>{`${radius} miles radius`}</Text>
        <Button icon={'menu'} mode={'outlined'} onPress={handleResetPassword} >Filters</Button>
      </View>
    )
  }
  const handleResetPassword = () => {
    navigation.navigate('Filter')
  }

  const handleSelect = (index: any) => {
    navigation.navigate('Vendor', { vendor: vendors[index] })
  }
  return (
    <AppPageWrapper>

      <FlatList
        data={vendors}
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
        extraData={vendors}
        onEndReachedThreshold={0.1}
        ListFooterComponent={(hasMore) ? <LoadingSpinner /> : null}
        refreshing={refreshing}
        // onEndReached={fetchMore}
        // onRefresh={() => {algoliaRefreshing(true); renderPull();}}
        style={styles.articles}
        ListHeaderComponent={renderHeader}
      />
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
          <LocationContainer controlModal={controlModal} />
        </View>
      </Modal>
    </AppPageWrapper>
  );
};

export default VendorContainer;
