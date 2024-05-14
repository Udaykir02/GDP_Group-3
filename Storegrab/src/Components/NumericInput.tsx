import React, { useState, useRef, useEffect } from 'react';
import { View, TextInput, Platform, TouchableOpacity, TouchableNativeFeedback, StyleSheet } from 'react-native';

// import { Text } from 'galio-framework';
// import { Ionicons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import MyIcon from './MyIcon';
import Stepper from './shared/stepper/Stepper';
// import { create, PREDEF_RES } from 'react-native-pixel-perfect';

// let calcSize = create(PREDEF_RES.iphone7.px);

function _handlePress(callback: () => void) {
  requestAnimationFrame(callback);
}

const Button: React.FC<{ onPress: () => void; disabled?: boolean; style?: any }> = (props:any) => {
  return Platform.OS === 'ios' ? (
    <TouchableOpacity disabled={props.disabled} style={props.style} onPress={() => _handlePress(props.onPress)}>
      {props.children}
    </TouchableOpacity>
  ) : (
    <TouchableNativeFeedback disabled={props.disabled} onPress={() => _handlePress(props.onPress)}>
      <View style={props.style}>{props.children}</View>
    </TouchableNativeFeedback>
  );
};

Button.defaultProps = {
  onPress: () => {},
};

interface NumericInputProps {
  iconSize?: number;
  borderColor?: string;
  iconStyle?: any;
  totalWidth?: number;
  totalHeight?: number;
  separatorWidth?: number;
  type?: 'up-down' | 'plus-minus';
  valueType?: 'real' | 'integer';
  rounded?: any;
  textColor?: string;
  containerStyle?: any;
  inputStyle?: any;
  initValue?: number;
  onChange: (value: number) => void;
  onLimitReached?: (isMax: boolean, msg: string) => void;
  value?: number;
  minValue?: number;
  maxValue?: number;
  step?: number;
  upDownButtonsBackgroundColor?: string;
  rightButtonBackgroundColor?: string;
  leftButtonBackgroundColor?: string;
  editable?: boolean;
  validateOnBlur?: boolean;
  reachMaxIncIconStyle?: any;
  reachMaxDecIconStyle?: any;
  reachMinIncIconStyle?: any;
  reachMinDecIconStyle?: any;
  extraTextInputProps?: any;
  onBlur?: () => void;
  onFocus?: () => void;
  renderOptions?: () => void;
  decrease: any,
  inventory?: any
}

const NumericInput: React.FC<NumericInputProps> = (props:any) => {
  const [value, setValue] = useState<number>(props.initValue || 0);
  const [stringValue, setStringValue] = useState<string>((props.initValue || 0).toString());
  const inputRef = useRef<TextInput>(null);

  const inc = () => {
    let newValue = value + (props.step || 1);
    if (props.maxValue === null || newValue < props.maxValue!) {
      setValue(newValue);
      setStringValue(newValue.toString());
    } else if (props.maxValue !== null) {
      props.onLimitReached && props.onLimitReached(true, 'Reached Maximum Value!');
      setValue(props.maxValue);
      setStringValue(props.maxValue.toString());
    }
    if (newValue !== props.value) props.onChange(newValue);
  };

  const dec = () => {
    let newValue = value - (props.step || 1);
    if (props.minValue === null || newValue > props.minValue!) {
      setValue(newValue);
      setStringValue(newValue.toString());
    } else if (props.minValue !== null) {
      props.onLimitReached && props.onLimitReached(false, 'Reached Minimum Value!');
      setValue(props.minValue);
      setStringValue(props.minValue.toString());
    }
    if (newValue !== props.value) props.onChange(newValue);
  };

  const onChange = (value: string) => {
    setStringValue(value);
    let parsedValue = props.valueType === 'real' ? parseFloat(value) : parseInt(value);
    parsedValue = isNaN(parsedValue) ? 0 : parsedValue;
    setValue(parsedValue);
    if (parsedValue !== props.value) props.onChange(parsedValue);
  };

  const onBlur = () => {
    let legal = !isNaN(parseFloat(stringValue)) && isFinite(parseFloat(stringValue)) && ((props.maxValue === null || parseFloat(stringValue) <= props.maxValue!) && (props.minValue === null || parseFloat(stringValue) >= props.minValue!));
    if (!legal) {
      if (props.minValue !== null && parseFloat(stringValue) <= props.minValue!) {
        props.onLimitReached && props.onLimitReached(true, 'Reached Minimum Value!');
      }
      if (props.maxValue !== null && parseFloat(stringValue) >= props.maxValue!) {
        props.onLimitReached && props.onLimitReached(false, 'Reached Maximum Value!');
      }
      inputRef.current!.blur();
      setTimeout(() => {
        inputRef.current!.clear();
        setTimeout(() => {
          props.onChange && props.onChange(value);
          setStringValue(value.toString());
        }, 10);
      }, 15);
      setTimeout(() => inputRef.current!.focus(), 50);
    }
    props.onBlur && props.onBlur();
  };

  const onFocus = () => {
    props.onFocus && props.onFocus();
  };

  const handleTextInputFocus = () =>{ 
    
  }

  useEffect(()=>{
    console.log("This-is-a-check"+props.inventory)
  },[])

  return (
    <View style={[styles.inputContainerPlusMinus, props.containerStyle]}>
        <Stepper par={10} quantity={0} deal={true} isCase={true} handleTextInputFocus={handleTextInputFocus} inventory={props.inventory}/>
      {/* <Button onPress={props.type === 'plus-minus' ? dec : undefined} style={[styles.leftButtonStyle, { backgroundColor: "#000" }]}>
        <MyIcon name={props.type === 'plus-minus' ? 'md-remove' : 'ios-arrow-down'} style={[styles.icon,{fontSize: 30}]} />
      </Button>
      <TextInput
        {...props.extraTextInputProps}
        ref={inputRef}
        editable={props.editable}
        returnKeyType='done'
        underlineColorAndroid='transparent'
        keyboardType='numeric'
        value={stringValue}
        onChangeText={onChange}
        style={[styles.inputPlusMinus, props.inputStyle]}
        onBlur={onBlur}
        onFocus={onFocus}
      />
      <Button onPress={props.type === 'plus-minus' ? inc : props.renderOptions} style={[styles.rightButtonStyle, { backgroundColor: props.rightButtonBackgroundColor }]}>
      <MyIcon name={props.type === 'plus-minus' ? 'md-remove' : 'ios-arrow-down'} style={[styles.icon,{fontSize: 30}]} />
      </Button> */}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainerPlusMinus: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputPlusMinus: {
    textAlign: 'center',
    padding: 0,
    flex: 1,
    height: 50,
  },
  icon: {
    fontWeight: '900',
    backgroundColor: 'rgba(0,0,0,0)',
  },
  leftButtonStyle: {
    position: 'absolute',
    zIndex: -1,
    left: 0,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightButtonStyle: {
    position: 'absolute',
    zIndex: -1,
    right: 0,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

NumericInput.propTypes = {
    iconSize: PropTypes.number,
    borderColor: PropTypes.string,
    iconStyle: PropTypes.any,
    totalWidth: PropTypes.number,
    totalHeight: PropTypes.number,
    type: PropTypes.oneOf(['up-down', 'plus-minus']),
    valueType: PropTypes.oneOf(['real', 'integer']),
    rounded: PropTypes.any,
    textColor: PropTypes.string,
    containerStyle: PropTypes.any,
    inputStyle: PropTypes.any,
    initValue: PropTypes.number,
    onChange: PropTypes.func.isRequired,
    onLimitReached: PropTypes.func,
    value: PropTypes.number,
    minValue: PropTypes.number,
    maxValue: PropTypes.number,
    step: PropTypes.number,
    upDownButtonsBackgroundColor: PropTypes.string,
    rightButtonBackgroundColor: PropTypes.string,
    leftButtonBackgroundColor: PropTypes.string,
    editable: PropTypes.bool,
    reachMaxIncIconStyle: PropTypes.any,
    reachMaxDecIconStyle: PropTypes.any,
    reachMinIncIconStyle: PropTypes.any,
    reachMinDecIconStyle: PropTypes.any,
    extraTextInputProps: PropTypes.any
}

NumericInput.defaultProps = {
    iconSize: 30,
    borderColor: '#d4d4d4',
    iconStyle: {},
    totalWidth: 220,
    type: 'plus-minus',
    rounded: false,
    textColor: 'black',
    containerStyle: {},
    inputStyle: {},
    initValue: 0,
    valueType: 'integer',
    value: 0,
    minValue: 0,
    maxValue: 0,
    step: 1,
    upDownButtonsBackgroundColor: 'white',
    rightButtonBackgroundColor: 'white',
    leftButtonBackgroundColor: 'white',
    editable: true,
    validateOnBlur: true,
    reachMaxIncIconStyle: {},
    reachMaxDecIconStyle: {},
    reachMinIncIconStyle: {},
    reachMinDecIconStyle: {},
    onLimitReached: (isMax, msg) => { },
    extraTextInputProps: {}
}

export default NumericInput;