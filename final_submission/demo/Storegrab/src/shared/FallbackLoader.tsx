import React from 'react';
import { View } from 'react-native';
import { ProgressBar } from 'react-native-paper';

const FallbackLoader: React.FC = () => (
  <View style={{ width: '100%' }}>
    <ProgressBar indeterminate={true} />
  </View>
);

export default FallbackLoader;
