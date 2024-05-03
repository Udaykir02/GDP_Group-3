import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, TextInput, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useTheme } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { AppTheme } from '../../../styles/theme/theme';


import StepperCase from './StepperCase';
import ProductStepper from './ProductStepper';

import createStepperStyle from './StepperStyle';
interface IProps {
  par: number;
  quantity: number;
  deal: boolean;
  isCase: boolean;
  handleTextInputFocus: () => void
}
const Stepper = ({ par = 10, quantity = 0, deal = true, isCase, handleTextInputFocus }: IProps) => {
  const theme: AppTheme = useTheme();

  const styles = createStepperStyle(theme)

  const [count, setCount] = useState(quantity);
  const [productQuantityCase, setProductQuantityCase] = useState<String>(isCase ? '' : "Each");
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

  const handlePress = (change) => {
    const animation = change > 0 ? animationPlus : animationMinus;
    if (change > 0) {
      setShadowColor(theme.colors.primary)
      setBorderColor(theme.colors.primary)
    }
    else {
      setShadowColor(theme.colors.coreMarkOrange)
      setBorderColor(theme.colors.coreMarkOrange)
    }

    if (count >= 9999 && change > 0) {
      setCount(9999)
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


    setCount((prevCount) => Math.max(0, prevCount + change));
  };

  const updateCount = (text) => {
    const value = parseInt(text) > par ? count : parseInt(text);
    if (value) {
      if (count > value) {
        setShadowColor(theme.colors.coreMarkOrange)
        setBorderColor(theme.colors.coreMarkOrange)
      }
      else {
        setShadowColor(theme.colors.primary)
        setBorderColor(theme.colors.primary)
      }


    }

    setCount(value || 0);
  }


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

  const formatNumber = (number) => {
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
    , [count]);

  const handleProductCase = (caseType: String) => {
    setProductQuantityCase(caseType);
  }

  return (
    <View style={[styles.mainContainer]}>
      {productQuantityCase === '' ? <View style={{
        flexDirection: 'row',
        alignItems: 'center',
      }}>
        <Text style={{ fontSize: 16 }}>Select</Text>
        <MaterialCommunityIcons
          name="chevron-right"
          size={25}
        />

      </View> : <StepperCase productQuantityCase={productQuantityCase} handleProductCase={handleProductCase} isCase={isCase} />}
      {productQuantityCase === '' ? <ProductStepper handleProductCase={handleProductCase} price={5.96} deal={true} /> : <View style={{ ...styles.outerContainer, ...dynamicShadowStyle, borderColor: borderColor }}>
        {Platform.OS === 'android' && <View style={{ ...styles.androidShadow, borderColor: shadowColor }} />}

        <View style={{ ...styles.innerContainer, backgroundColor: count > 0 ? theme.colors.primarySuperLight : theme.colors.backgroundDefault }}>

          <TouchableOpacity onPress={() => handlePress(-1)} disabled={count === 0}>
            <Animated.View style={[styles.button, animatedMinusButtonStyle]}>
              <Text style={{ ...styles.buttonText, color: count > 0 ? theme.colors.primary : "#C1C7CD" }}><MaterialCommunityIcons name="minus" size={32} /></Text>
            </Animated.View>
          </TouchableOpacity>

          <View style={styles.inputContainer}>
            <TouchableWithoutFeedback onPress={() => {
              Keyboard.dismiss();
              handleTextInputFocus();
            }}>
              <TextInput
                style={{ ...styles.countInput, marginBottom: par ? 12 : 0 }}
                value={formatNumber(count.toString())}
                onChangeText={(text) => updateCount(text)}
                keyboardType="number-pad"
                maxLength={5}
              />
            </TouchableWithoutFeedback>
          </View>
          {par ? <View style={styles.parContainer}>
            <Text style={styles.par}>PAR {par}</Text>
          </View> : null}
          <TouchableOpacity onPress={() => handlePress(1)}>
            <Animated.View style={[styles.button, animatedPlusButtonStyle]}>
              <Text style={styles.buttonText}><MaterialCommunityIcons name="plus" size={32} /></Text>
            </Animated.View>
          </TouchableOpacity>
        </View>
      </View>}
    </View>
  );
};


export default Stepper;
