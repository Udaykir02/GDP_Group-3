import React, { useContext, useEffect } from 'react';
import { View } from 'react-native';
import { Text, Button } from 'react-native-paper'; // Import Button from react-native-paper

import { useAppTheme } from '../../styles/theme/theme';
import AppPageWrapper from '../../shared/AppPageWrapper';
import { useDispatch } from 'react-redux'; // Import useDispatch
import { logoutRequest } from '../../../actions/userActions'; // Import your logout action creator

const AccountContainer: React.FC = () => {

  const { colors } = useAppTheme();
  const dispatch = useDispatch(); // Get dispatch function from react-redux

  // Logout function
  const handleLogout = () => {
    dispatch(logoutRequest()); // Dispatch the logout action
    // Optionally, you can navigate to the login screen or perform any other action
  };

  return (
    <AppPageWrapper>
      <View>
        {/* Logout button */}
        <Button onPress={handleLogout}>Logout</Button>
      </View>
    </AppPageWrapper>
  );
};

export default AccountContainer;
