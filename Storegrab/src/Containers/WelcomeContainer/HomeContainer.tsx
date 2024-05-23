import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    Dimensions,
    ScrollView,
    Image,
    ImageBackground,
    Platform,
    TouchableOpacity,
    ActivityIndicator,
    FlatList,
    View,
    Text,
    SafeAreaView
} from "react-native";
import { Button } from "react-native-paper";
import { connect, useDispatch, useSelector } from 'react-redux';
import propTypes from 'prop-types';
import {
    addShops,
    shopsPagination,
    addProducts,
    productsPagination,
    eraseProducts,
    updateProducts,
    changeProduct,
    removeProduct,
    removeProduct2,
    removeProduct3,
    setAlgoliaText,
    setRefreshing,
    updateNewVendorProducts
} from '../../../reducers/vendorReducer'

import {
    initialCart,
    initialOrder,
    removeOrder,
    changeOrder,
    addOrder,
    addItem,
    removeItem,
    removeUnits,
    removeUnits2,
    addOrders,
    updateOrders,
    ordersPagination,
    ordersRefreshing,
    ordersFavourite,
    addFavourites,
    updateFavourites,
    favouritesPagination,
    favRefreshing,
    addFavourite,
    removeFavourite
} from "../../../reducers/cartReducer"

import createToBeImplementedStyle from "./HomeContainerStyle";
import Prodcard from "../../Components/Prodcard";
import { filterProductRequest, getProductsRequest } from "../../../actions/vendorActions";
import MyIcon from "../../Components/MyIcon";
// import Prodcard from "../components/Prodcard";
const { width, height } = Dimensions.get("screen");

const thumbMeasure = (width - 48 - 32) / 3;

const cacheImages = (images: any) => {
    return images.map((image: any) => {
        if (typeof image === "string") {
            return Image.prefetch(image);
        }
    });
}


const HomeContainer = ({
    navigation, route
}: any) => {
    const [refreshing, setRefreshing] = useState<boolean>(false);
    const styles = createToBeImplementedStyle();
    const { products, selectedVendor, brand, categories, minPrice, maxPrice } = useSelector((state: any) => state.vendor)
    const { token, user } = useSelector((state: any) => state.auth)
    const dispatch = useDispatch();

    useEffect(() => {
        if (selectedVendor) {
            dispatch(getProductsRequest(selectedVendor.products, token, brand, categories, minPrice, maxPrice))
        }

    }, [selectedVendor?.vendorId])

    useEffect(() => {
        if (selectedVendor) {
            dispatch(filterProductRequest(selectedVendor.products, token, brand, categories, minPrice, maxPrice))
        }

    }, [brand.length, categories.length, minPrice, maxPrice])

    const handleResetPassword = () => {
        navigation.navigate('ProductFilter')
    }
    const renderHeader = () => {
        // if(!defaultlocation)
        //   return (<></>)
        return (
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', margin: 15 }}>
                <Button icon={'menu'} mode={'outlined'} onPress={handleResetPassword} >Filters</Button>
            </View>
        )
    }

    if(!selectedVendor){
        return (
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', margin: 15 }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold'}}>Please select any Vendors</Text>
                <Button mode={'outlined'} onPress={()=>{ navigation.navigate("VendorsTab")}} >Go</Button>
            </View>
        )
    }
    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }} testID="home-container-testid">
            {selectedVendor !== null ? <View style={{ flex: 1 }}>
                <FlatList
                    data={products}
                    ListHeaderComponent={renderHeader}
                    renderItem={({ item, index }) => (
                        <Prodcard
                            item={item}
                            shop={{ cta: true }}
                            location={index}
                            horizontal
                            style={{ paddingHorizontal: 16, paddingVertical: 16 / 2 }}
                            cartitems={[]}
                            navigation={navigation} full={false} ctaColor={""} imageStyle={{ borderRadius: 10 }} />
                    )}
                    keyExtractor={(item, index) => index.toString()}
                    extraData={products}
                    onEndReachedThreshold={0.1}
                    //   ListFooterComponent={(moreproducts) ? <View row space="evenly" style={{ paddingVertical: 16 }}><View flex center><ActivityIndicator size="large" /></View></View> : null}
                    refreshing={refreshing}
                    style={styles.articles}
                />
            </View> : null}
        </View>
    );
};




export default HomeContainer;
