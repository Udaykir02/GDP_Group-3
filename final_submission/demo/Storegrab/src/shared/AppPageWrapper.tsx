import React from 'react';
import { View, ViewProps } from 'react-native';
import { useTheme } from 'react-native-paper';
import { AppTheme } from '@/styles/theme/theme';

const AppPageWrapper: React.FC<ViewProps> = ({ children, ...props }) => {
  const { colors }: AppTheme = useTheme();
  return (
    <View
      {...props}
      style={{
        flexDirection: 'column',
        width: '100%',
        padding: 16,
        backgroundColor: colors.backgroundDefault
      }}
    >
      {children}
    </View>
  );
};

export default AppPageWrapper;
