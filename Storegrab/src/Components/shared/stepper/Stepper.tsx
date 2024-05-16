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
  par: number;
  quantity: number;
  deal: boolean;
  isCase: boolean;
  handleTextInputFocus: () => void,
  inventory: UserCartType
}
const Stepper = ({ par = 10, quantity = 0, deal = true, isCase, handleTextInputFocus, inventory }: IProps) => {
  const theme: AppTheme = useTheme();

  const styles = createStepperStyle(theme)


  const [productQuantityCase, setProductQuantityCase] = useState<String>("Each");
  const [shadowColor, setShadowColor] = useState('transparent');
  const [borderColor, setBorderColor] = useState(theme.colors.primary);
  const animationMinus = useRef(new Animated.Value(0)).current;
  const animationPlus = useRef(new Animated.Value(0)).current;
  const { user, token } = useSelector((state: any)=> state.auth)
  const { selectedVendor} = useSelector((state:any)=>state.vendor)
  const [ inventoryQty, setInventoryQty] = useState(inventory.qty)
  const [count, setCount] = useState(user?.cart?.find((element:any)=>element.skuId === inventory.skuId)?.qty ?user?.cart?.find((element:any)=>element.skuId === inventory.skuId)?.qty:0);
  const dispatch = useDispatch();

  useEffect(()=>{
    const config = {
      method: 'post',
      url: 'http://localhost:3000/inventory/getInventoryQty',
      data: { skuid: inventory.skuId} // Add the request body
    };
    axios(config)
      .then(response => {
        setInventoryQty(response.data.data.qty)
        console.log('Response:', response.data.data.qty);
      })
      .catch(error => {
        // setVendors([])
      });
  },[])

  useEffect(()=>{
    console.log("new log")
    const product = user?.cart?.find((element:string)=> element === inventory.skuId)
    console.log("new log"+product)
    if(product){
      setCount(product.qty)
    }

  },[user?.cart])

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
    console.log(change+"--->")
    console.log(inventoryQty+"inventoryQty")
    console.log(JSON.stringify(user?.userId)+"-->");
    dispatch(addToCartRequest(user?.userId,inventory?.skuId, change,token ));
    const animation = change > 0 ? animationPlus : animationMinus;
    if (change > 0) {
      setInventoryQty(Number(inventoryQty)-change)
      setShadowColor(theme.colors.primary)
      setBorderColor(theme.colors.primary)
    }
    else {
      setInventoryQty(Number(inventoryQty)+change)
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
    console.log("skjde" + number)
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
      {productQuantityCase === '' ? <ProductStepper handleProductCase={handleProductCase} price={5.96} deal={true} /> : <View style={{ ...styles.outerContainer, ...dynamicShadowStyle, borderColor: borderColor }}>
        {Platform.OS === 'android' && <View style={{ ...styles.androidShadow, borderColor: shadowColor }} />}

        <View style={{ ...styles.innerContainer, backgroundColor: count > 0 ? theme.colors.primarySuperLight : theme.colors.backgroundDefault }}>

          {(count === 0) ? <><TouchableOpacity onPress={() => handlePress(1)}><View style={styles.inputContainer}>
            <Text style={{ ...styles.countInput, marginBottom: 0, height: 20 }} >{'Add'}</Text>
          </View></TouchableOpacity>
            <TouchableOpacity onPress={() => handlePress(1)}>
              <Animated.View style={[styles.button, animatedPlusButtonStyle]}>
                <Text style={styles.buttonText}><MaterialCommunityIcons name="plus" size={32} /></Text>
              </Animated.View>
            </TouchableOpacity></> : <><TouchableOpacity onPress={() => handlePress(-1)} disabled={count === 0}>
              <Animated.View style={[styles.button, animatedMinusButtonStyle]}>
                <Text style={{ ...styles.buttonText, color: count > 0 ? theme.colors.primary : "#C1C7CD" }}><MaterialCommunityIcons name="minus" size={32} /></Text>
              </Animated.View>
            </TouchableOpacity>
            <View style={styles.inputContainer}>
              <Text style={{ ...styles.countInput, marginBottom: 0, height: 20 }} >{count}</Text>
            </View>
            <TouchableOpacity onPress={() => handlePress(1)} disabled={inventoryQty === 0}>
              <Animated.View style={[styles.button, animatedPlusButtonStyle]}>
                <Text style={styles.buttonText}><MaterialCommunityIcons name="plus" size={32} /></Text>
              </Animated.View>
            </TouchableOpacity></>}
        </View>
      </View>}
    </View>
  );
};


export default Stepper;
