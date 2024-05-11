import { updateVendorType } from '../../reducers/vendorReducer';
import React, { useEffect, useState } from 'react';

import { View } from 'react-native';

import DropDownPicker from 'react-native-dropdown-picker';
import { useDispatch, useSelector } from 'react-redux';
const vendors = [
    {label: 'Grocery', value:"grocery"},
    {label: 'Boutique', value:"boutique"},
    {label: 'Artisanal', value:"artisanal"},
    {label: 'Market', value:"market"},
    {label: 'Food', value:"food"},
    {label: 'Antique', value:"antique"},
    {label: 'Book', value:"book"},
    {label: 'Craft', value:"craft"},
    {label: 'Pet', value:"pet"}
  ]
export default function DropDown({onDropDownValuechange}:any) {
const { vendorTypes} =useSelector((state:any)=> state.vendor)
const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(vendorTypes);
  const [items, setItems] = useState<any>(vendors);

  const onValueChange = (value:any) =>{
    onDropDownValuechange(value)
    setValue(value)
  }
  return (
    <View style={{
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 15
    }}>
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={onValueChange}
        setItems={setItems}

        multiple={true}
        mode="BADGE"
        badgeDotColors={["#e76f51", "#00b4d8", "#e9c46a", "#e76f51", "#8ac926", "#00b4d8", "#e9c46a", "#e76f51", "#8ac926"]}
      />
    </View>
  );
}