import React, { useContext, useEffect } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';

import { useAppTheme } from '../../styles/theme/theme';
import AppPageWrapper from '../../shared/AppPageWrapper';

const AccountContainer: React.FC = () => {

  const { colors } = useAppTheme();
  return (
    <AppPageWrapper>
      <View>
        <Text variant="displayLarge" style={{ color: colors.textDefault }}>
          Account
        </Text>
      </View>
    </AppPageWrapper>
  );
};

export default AccountContainer;
