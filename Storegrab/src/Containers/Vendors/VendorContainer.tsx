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
let vendors = [
  {
    "vendorId": "vendor123",
    "vendor_name": "Electronics Emporium",
    "vendor_description": "Your one-stop shop for all things electronic!",
    "vendor_location": "123 Tech Blvd, San Francisco, CA",
    "vendor_contact_info": "contact@electronics.com",
    "website": "https://picsum.photos/700",
    "rating": 4.5,
    "founded_year": 2010,
    "employees": 50,
    "products": [
      "sku123"
    ],
    "geopoint": {
      "latitude": 40.3589776,
      "longitude": 94.883186
    }
  },
  {
    "vendorId": "vendor456",
    "vendor_name": "Fashion Trends",
    "vendor_description": "Stay stylish with our trendy clothing!",
    "vendor_location": "456 Fashion Ave, New York, NY",
    "vendor_contact_info": "contact@fashion.com",
    "website": "https://picsum.photos/700",
    "rating": 4.2,
    "founded_year": 2005,
    "employees": 30,
    "products": [
      "sku456"
    ],
    "geopoint": {
      "latitude": 40.3589776,
      "longitude": -94.883186
    }
  },
  {
    "vendorId": "vendor789",
    "vendor_name": "Tech Gadgets",
    "vendor_description": "Discover the latest tech gadgets!",
    "vendor_location": "789 Innovation St, Seattle, WA",
    "vendor_contact_info": "contact@gadgets.com",
    "website": "https://picsum.photos/700",
    "rating": 4.0,
    "founded_year": 2015,
    "employees": 20,
    "products": [
      "sku789"
    ],
    "geopoint": {
      "latitude": 40.3301162,
      "longitude": -94.8885764
    }
  }
];
const LeftContent = (props: any) => <Avatar.Icon {...props} icon="folder" />
const VendorContainer: React.FC = ({ navigation }: any) => {
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
  const dispatch = useDispatch();
  const controlModal = (flag: boolean) => {
    dispatch(setModalVisible(flag));
    setIsModalVisible(flag)
  }

  useEffect(() => {
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
          'Authorization': `Bearer ${token}` // Add the token to the Authorization header
        },
        data: requestData // Add the request body
      };
      axios(config)
        .then(response => {
          const array = []
          array.push(response.data.nearestVendor)
          setVendors(array)
          console.log('Response:', response.data.nearestVendor);
        })
        .catch(error => {
          setVendors([])
        });


    }

    console.log(JSON.stringify(chosenLocation) + "Hi")
  }, [chosenLocation,radius,vendorTypes.length])

  useEffect(() => {
    setIsModalVisible(isReduxModalVisible)
  }, [isReduxModalVisible])

  const renderHeader = () => {
    return (
        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
        <Text style={styles.title}>{`${radius} miles radius`}</Text>
        <Button icon={'menu'} mode={'outlined'} onPress={handleResetPassword} >Filters</Button>
        </View>
    )
  }
  const handleResetPassword = () => {
    navigation.navigate('Filter')
  }

  return (
    <AppPageWrapper>
      
      <FlatList
        data={vendors}
        renderItem={({ item }) => (
          <Card mode='contained' style={{ marginVertical: 10 }}>
            <Card.Cover source={{ uri: item.website }} style={{ borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }} />
            <Card.Title title={item.vendor_name} titleStyle={{ fontWeight: 'bold' }} />
            <Card.Content>
              <Text variant="bodyMedium">{item.vendor_description}</Text>
            </Card.Content>
            <Card.Actions>
              <Button>Select</Button>
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
