import React, { useContext, useEffect } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Text, Button } from 'react-native-paper'; // Import Button from react-native-paper

import { useAppTheme } from '../../styles/theme/theme';
import AppPageWrapper from '../../shared/AppPageWrapper';
import { useDispatch } from 'react-redux'; // Import useDispatch
import { logoutRequest } from '../../../actions/userActions'; // Import your logout action creator
import { useNavigation } from '@react-navigation/native';

const AccountContainer: React.FC = () => {
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  // return <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />;

  const { colors } = useAppTheme();
  const dispatch = useDispatch(); // Get dispatch function from react-redux
  const navigation = useNavigation()
  // Logout function
  const handleLogout = () => {
    dispatch(logoutRequest()); // Dispatch the logout action
    // Optionally, you can navigate to the login screen or perform any other action
  };

  const handleNavigateToSubscription = () => {
    navigation.navigate('VendorSubscription');
  }

  return (
    <AppPageWrapper>
      <View>
        <TouchableOpacity onPress={handleNavigateToSubscription}>
          <Text style={{ marginTop: 10, color: colors.primary }}>Vendor Subscription</Text>
        </TouchableOpacity>
        {/* Logout button */}
        <Button onPress={handleLogout}>Logout</Button>
      </View>
    </AppPageWrapper>
  );
};

export default AccountContainer;
