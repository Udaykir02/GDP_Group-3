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
import DropDownPicker from 'react-native-dropdown-picker';
import { argonTheme } from '../constants';
import { updateBrand, updateCategories, updateMaxPrice, updateMinPrice } from '../../reducers/vendorReducer';
const { width, height } = Dimensions.get('screen');



const vendors = [
    { label: 'Grocery', value: "grocery" },
    { label: 'Boutique', value: "boutique" },
    { label: 'Artisanal', value: "artisanal" },
    { label: 'Market', value: "market" },
    { label: 'Food', value: "food" },
    { label: 'Antique', value: "antique" },
    { label: 'Book', value: "book" },
    { label: 'Craft', value: "craft" },
    { label: 'Pet', value: "pet" }
]


const ProductFilter = ({ navigation }: any) => {


    const { products, selectedVendor, brand, categories, minPrice, maxPrice } = useSelector((state: any) => state.vendor)
    const { token, user } = useSelector((state: any) => state.auth)

    const { goBack, setOptions } = useNavigation();
    const { bottom } = useSafeAreaInsets();
    const dispatch = useDispatch();
    
    const [min, setMin] = useState(minPrice?minPrice:(products.length> 0 ? products[0].price:0));
    const [max, setMax] = useState(maxPrice?maxPrice:(products.length> 0 ? products[0].price:0));
    const [sliderRadius, setSliderRadius] = useState(maxPrice?maxPrice:(products.length> 0 ? products[0].price:0));
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(brand? brand :(Array.from(new Set(products.map((product: any) => product.brand)))));
    const [items, setItems] = useState<any>(Array.from(new Set(products.map((product: any) => product.brand))).map((brand: any) => ({
        label: brand.charAt(0).toUpperCase() + brand.slice(1),
        value: brand
    })));

    const [openCategories, setOpenCategories] = useState(false);
    const [valueCategories, setValueCategories] = useState(categories?categories:(Array.from(new Set(products.flatMap((product: any) => product.categories)))));
    const [itemsCategories, setItemsCategories] = useState<any>(Array.from(new Set(products.flatMap((product: any) => product.categories))).map((category: any) => ({
        label: category.charAt(0).toUpperCase() + category.slice(1),
        value: category
    })));


    useEffect(() => {
        const numbers = [];
        for (let index = 0; index < products.length; index++) {
            numbers.push(products[index].price);
        }
        // Get the minimum value
        const minValue = Math.min(...numbers); // Output: 1
        setMin(minValue)

        // Get the maximum value
        const maxValue = Math.max(...numbers); // Output: 8
        setMax(maxValue);
    }, [products])


    const handleSubmit = () => {

        dispatch(updateMaxPrice(min));
        dispatch(updateMaxPrice(sliderRadius));
        dispatch(updateBrand(value));
        dispatch(updateCategories(valueCategories));
        navigation.goBack();
    }

    const onSliderValueChange = (value:any) =>{

        setSliderRadius(value)
    }

    const onValueChange = (value:any) =>{

        setValue(value)
    }

    const onCategoryValueChange = (value:any) =>{

        setValueCategories(value)
    }

    return (
        <View style={{
            backgroundColor: '#fff',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'flex-start',
            paddingHorizontal: 15
        }}>

            {<FilterItem title="Categories">
                <View style={{
                    backgroundColor: '#fff',
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingHorizontal: 15
                }}>
                    <DropDownPicker
                        open={openCategories}
                        value={valueCategories}
                        items={itemsCategories}
                        setOpen={setOpenCategories}
                        setValue={onCategoryValueChange}
                        setItems={setItemsCategories}

                        multiple={true}
                        mode="BADGE"
                        badgeDotColors={["#e76f51", "#00b4d8", "#e9c46a", "#e76f51", "#8ac926", "#00b4d8", "#e9c46a", "#e76f51", "#8ac926"]}
                    />
                </View>
            </FilterItem>}

            {(openCategories)?<></>:<FilterItem title="Brand">
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
            </FilterItem>}

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

export default ProductFilter;

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
        backgroundColor: argonTheme.COLORS.ERROR,
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