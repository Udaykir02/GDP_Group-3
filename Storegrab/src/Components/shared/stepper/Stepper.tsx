import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, TextInput, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useTheme } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { AppTheme } from '../../../styles/theme/theme';


import StepperCase from './StepperCase';
import ProductStepper from './ProductStepper';

import createStepperStyle from './StepperStyle';
import { UserCartType } from '../../../../reducers/users/types';
import { useDispatch, useSelector } from 'react-redux';
import { addToCartRequest } from '../../../../actions/userActions';
import axios from 'axios';
interface IProps {
  handleChange?: (change: number) => void;
  quantity: number;
}
const Stepper = ({ handleChange, quantity }: IProps) => {
  const theme: AppTheme = useTheme();

  const styles = createStepperStyle(theme)


  const [shadowColor, setShadowColor] = useState('transparent');
  const [borderColor, setBorderColor] = useState(theme.colors.primary);
  const animationMinus = useRef(new Animated.Value(0)).current;
  const animationPlus = useRef(new Animated.Value(0)).current;


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



  const handlePress = (change: any) => {
    // dispatch(addToCartRequest(user?.userId,inventory?.skuId, change,token ));
    const animation = change > 0 ? animationPlus : animationMinus;
    handleChange && handleChange(change)
    if (change > 0) {
      setShadowColor(theme.colors.primary)
      setBorderColor(theme.colors.primary)
    }
    else {
      setShadowColor(theme.colors.coreMarkOrange)
      setBorderColor(theme.colors.coreMarkOrange)
    }

    if (quantity>= 9999 && change > 0) {
      // setCount(9999)
      return;
    }

    Animated.sequence([
      Animated.timing(animation, {
        toValue: 1,
        duration: 100,
        useNativeDriver: false,
      }),
      Animated.timing(animation, {
        toValue: 0,
        duration: 100,
        useNativeDriver: false,
      }),
    ]).start();

    
    // setCount((prevCount) => Math.max(0, prevCount + change));
  };



  const animatedMinusButtonStyle = {
    backgroundColor: animationMinus.interpolate({
      inputRange: [0, 1],
      outputRange: ['rgba(255,255,255,0)', 'rgba(0,0,0,.32)'],
    }),
    borderWidth: animationMinus.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 2],
    }),
    borderColor: theme.colors.black,
    borderStyle: 'dotted' as const,
  };


  const animatedPlusButtonStyle = {
    backgroundColor: animationPlus.interpolate({
      inputRange: [0, 1],
      outputRange: ['rgba(255,255,255,0)', 'rgba(0,0,0,.32)'],
    }),
    borderWidth: animationPlus.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 2],
    }),
    borderColor: theme.colors.black,
    borderStyle: 'dotted' as const,
  };

  const formatNumber = (number: any) => {
    return new Intl.NumberFormat().format(number);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShadowColor('transparent');
      setBorderColor(theme.colors.primary);
    }, 500)
    return () => {
      clearTimeout(timer);
    }
  }
    , [quantity]);


  return (
    <View style={[styles.mainContainer]}>
      
      <View style={{ ...styles.outerContainer, ...dynamicShadowStyle, borderColor: borderColor }}>
        {Platform.OS === 'android' && <View style={{ ...styles.androidShadow, borderColor: shadowColor }} />}

        <View style={{ ...styles.innerContainer, backgroundColor: quantity> 0 ? theme.colors.primarySuperLight : theme.colors.backgroundDefault }}>

          {(quantity=== 0) ? <><TouchableOpacity onPress={() => handlePress(1)}><View style={styles.inputContainer}>
            <Text style={{ ...styles.countInput, marginBottom: 0, height: 20 }} >{'Add'}</Text>
          </View></TouchableOpacity>
            <TouchableOpacity onPress={() => handlePress(1)}>
              <Animated.View style={[styles.button, animatedPlusButtonStyle]}>
                <Text style={styles.buttonText}><MaterialCommunityIcons name="plus" size={32} /></Text>
              </Animated.View>
            </TouchableOpacity></> : <><TouchableOpacity onPress={() => handlePress(-1)} disabled={quantity=== 0}>
              <Animated.View style={[styles.button, animatedMinusButtonStyle]}>
                <Text style={{ ...styles.buttonText, color: quantity> 0 ? theme.colors.primary : "#C1C7CD" }}><MaterialCommunityIcons name="minus" size={32} /></Text>
              </Animated.View>
            </TouchableOpacity>
            <View style={styles.inputContainer}>
              <Text style={{ ...styles.countInput, marginBottom: 0, height: 20 }} >{quantity}</Text>
            </View>
            <TouchableOpacity onPress={() => handlePress(1)}>
              <Animated.View style={[styles.button, animatedPlusButtonStyle]}>
                <Text style={styles.buttonText}><MaterialCommunityIcons name="plus" size={32} /></Text>
              </Animated.View>
            </TouchableOpacity></>}
        </View>
      </View>
    </View>
  );
};


export default Stepper;
