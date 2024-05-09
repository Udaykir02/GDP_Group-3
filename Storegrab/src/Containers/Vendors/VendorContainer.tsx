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
const VendorContainer: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(true);
  const [hasMore, setHasMore] = useState(false)
  const [refreshing, setRefreshing] = useState(false);
  const styles = createToBeImplementedStyle();

  const { colors } = useAppTheme();
  const isReduxModalVisible = useSelector((state: any) => state.location.isModalVisible)
  const dispatch = useDispatch();
  const controlModal = (flag: boolean) => {
    dispatch(setModalVisible(flag));
    setIsModalVisible(flag)
  }

  useEffect(() => {
    setIsModalVisible(isReduxModalVisible)
  }, [isReduxModalVisible])

  return (
    <AppPageWrapper>

      <FlatList
        data={vendors}
        renderItem={({ item }) => (
          <Card mode='contained' style={{marginVertical: 10}}>
          <Card.Cover source={{ uri: item.website }} style={{ borderBottomLeftRadius:0, borderBottomRightRadius: 0 }} />
          <Card.Title title={item.vendor_name} titleStyle={{fontWeight: 'bold'}}/>
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
        ListFooterComponent={(hasMore)?<LoadingSpinner/>:null}
        refreshing={refreshing}
        // onEndReached={fetchMore}
        // onRefresh={() => {algoliaRefreshing(true); renderPull();}}
        style={styles.articles}
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
