import React, { useContext, useEffect } from 'react';
import { ScrollView, TouchableOpacity, View, StyleSheet } from 'react-native';
import { Text, Button, Switch } from 'react-native-paper'; // Import Button from react-native-paper

import { useAppTheme } from '../../styles/theme/theme';
import AppPageWrapper from '../../shared/AppPageWrapper';
import { useDispatch, useSelector } from 'react-redux'; // Import useDispatch
import { logoutRequest, resetRequest } from '../../../actions/userActions'; // Import your logout action creator
import { useNavigation } from '@react-navigation/native';
import MyIcon from '../../Components/MyIcon';
import { updateVendorAdmin } from '../../../reducers/users/slice';
import { resetCart } from '../../../reducers/cartReducer';
import { clearOrders } from '../../../reducers/orderReducer';
import { clearVendor } from '../../../reducers/vendorReducer';
import { clearState } from '../../../reducers/searchReducer';
import { clearLocation } from '../../../reducers/locationReducer';


const AccountContainer: React.FC = () => {
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);

  const { user, vendorAdmin } = useSelector((state: any) => state.auth)

  // return <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />;

  const { colors } = useAppTheme();
  const dispatch = useDispatch(); // Get dispatch function from react-redux
  const navigation = useNavigation()
  // Logout function
  const handleLogout = () => {
    dispatch(logoutRequest()); // Dispatch the logout action
    // Optionally, you can navigate to the login screen or perform any other action
  };

  // const handleNavigateToSubscription = () => {
  //   navigation.navigate('VendorSubscription');
  // }

  const handleSubscriptions = () => {
    navigation.navigate('VendorSubscription')
  }

  const onToggleSwitch = () => {
    dispatch(updateVendorAdmin(!vendorAdmin))
    dispatch(resetCart());
    dispatch(clearOrders());
    dispatch(clearVendor());
    dispatch(clearState());
    dispatch(clearLocation());
  };

  return (
    <AppPageWrapper>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          {/* <Image
          source={{ uri: 'https://via.placeholder.com/150' }}
          style={styles.profileImage}
        /> */}
          <Text style={styles.name}>{user?.fname + " " + user?.lname}</Text>
          <Text style={styles.username}>@{user?.userId}</Text>
        </View>
        <View style={styles.details}>
          <Text style={styles.sectionTitle}>Contact Information</Text>
          <View style={styles.contactInfo}>
            <MyIcon name='Entypo|email' />
            <Text style={styles.contactText}>{user?.username}</Text>
          </View>
          <View style={styles.contactInfo}>

            <MyIcon name='Entypo|phone' />
            <Text style={styles.contactText}>not provided</Text>
          </View>
          <View style={styles.contactInfo}>

            <MyIcon name='Entypo|location-pin' />

            <Text style={styles.contactText}>San Francisco, CA</Text>
          </View>

        </View>
        <View style={styles.buttons}>
          <TouchableOpacity style={styles.button} onPress={() => { navigation.navigate('EditProfile') }}>
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleSubscriptions}>
            <Text style={styles.buttonText}>Subscriptions</Text>
          </TouchableOpacity>

        </View>
        <View style={[styles.contactInfo, { justifyContent: 'space-around', alignItems: 'center', alignContent: 'center' }]}>
          <Text style={[styles.sectionTitle, { alignSelf: 'center', marginTop: 7 }]}>Vendor Admin: </Text>
          <Switch value={vendorAdmin} onValueChange={onToggleSwitch} />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleLogout}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>

      </ScrollView>
    </AppPageWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f4f4f4',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  username: {
    fontSize: 18,
    color: '#888',
  },
  details: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  sectionContent: {
    fontSize: 16,
    marginBottom: 20,
  },
  contactInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  contactText: {
    fontSize: 16,
    marginLeft: 10,
  },
  socialLinks: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  socialText: {
    fontSize: 16,
    marginLeft: 10,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default AccountContainer;
