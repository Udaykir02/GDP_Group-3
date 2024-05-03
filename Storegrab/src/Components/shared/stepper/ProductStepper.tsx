import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, TextInput, Platform } from 'react-native';
import { useTheme } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { AppTheme } from '../../../styles/theme/theme';
import createStepperStyle from './StepperStyle';

interface ProductStepperProps {
  handleProductCase: (caseType: String) => void
  price: number
  deal: boolean
}



const ProductStepper = ({ handleProductCase, price, deal }: ProductStepperProps) => {
    const theme: AppTheme = useTheme();
   
  const [shadowColor, setShadowColor] = useState('transparent');
  const [borderColor, setBorderColor] = useState(theme.colors.primary);
  const [count, setCount] = useState(0);
  const styles = createStepperStyle(theme)
  const dynamicShadowStyle = {
    ...Platform.select({
      ios: {
        shadowColor: shadowColor,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
      },
      android: {

      },
    }),
  };
  return (
    <View style={{ ...styles.productStepperContainer, ...dynamicShadowStyle, borderColor: borderColor }}>
        {Platform.OS === 'android' && <View style={{ ...styles.androidShadowProdStepper, borderColor: shadowColor }} />}
    <View style={{ ...styles.innerContainerProdStepper }}>
        <TouchableOpacity onPress={() => {
          handleProductCase("Each")
        }} style={styles.productCaseContainer}>
          <Text style={styles.priceProdStepper}>{`$${price}`}</Text>
          <Text style={styles.buttonTextProdStepper}>EACH</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          handleProductCase("Case")
        }} style={styles.productCaseContainer}>
          <Text style={styles.priceProdStepper}>{`$${price}`}</Text>
          <Text style={styles.buttonTextProdStepper}>CASE</Text>
        </TouchableOpacity>
      <View><Text></Text></View>
    </View>
    </View>)
}

export default ProductStepper;
