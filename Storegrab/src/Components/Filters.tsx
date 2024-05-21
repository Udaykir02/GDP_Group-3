import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import FilterItem from './FilterItem';
import { Button } from 'react-native-paper';
import AppPageWrapper from '../shared/AppPageWrapper';
import DropDown from './DropDown';
import Slider from '@react-native-community/slider';
import { useDispatch, useSelector } from 'react-redux';
import { updateRadius, updateVendorType } from "../../reducers/vendorReducer";
const { width, height } = Dimensions.get('screen');





const Filters = ({ navigation }: any) => {



  const { radius, vendorTypes } = useSelector((state: any)=> state.vendor)
  const [sliderRadius, setSliderRadius] = useState(radius);
  const [dropDownArray, setDropDownArray] = useState(vendorTypes);
  const { goBack, setOptions } = useNavigation();
  const { bottom } = useSafeAreaInsets();
  const dispatch = useDispatch();



  const onValueChange = (value: any) => {
    setSliderRadius(Math.round(value));
  }
  const onDropDownValuechange = (value:any) => {
    setDropDownArray(value)
  }

  const handleSubmit = () => {
    dispatch(updateRadius(sliderRadius));
    dispatch(updateVendorType(dropDownArray));
    navigation.goBack();
  }
  return (
    <View style={{
      backgroundColor: '#fff',
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-start',
      paddingHorizontal: 15
    }}>
      <FilterItem title="Radius" filterValue={`${sliderRadius} miles`}>
        <Slider
          style={{ width: width - 16 * 2, height: 40, paddingHorizontal: 15 }}
          value={sliderRadius}
          onValueChange={onValueChange}
          minimumValue={5}
          maximumValue={20}
          minimumTrackTintColor="#000"
          maximumTrackTintColor="#000000"
        />
      </FilterItem>

      <FilterItem title="Categories">
        <DropDown onDropDownValuechange={onDropDownValuechange}/>
      </FilterItem>

      <Button
        mode="contained"
        onPress={handleSubmit}
        style={styles.button}
        labelStyle={styles.buttonText}
      >
        {'Apply'}
      </Button>

    </View>
  );
};

export default Filters;

const styles = StyleSheet.create({
  headerContainer: { marginRight: 16 },
  headerText: { color: 'white', fontWeight: '600' },
  filtersContainer: { flex: 1 },
  textInput: { fontSize: 16 },
  button: {
    marginRight: 50,
    marginLeft: 50,
    marginTop: 20,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#68a0cf',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
    width: width - 16 * 2,
    position: 'absolute',
    bottom: 50

  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});