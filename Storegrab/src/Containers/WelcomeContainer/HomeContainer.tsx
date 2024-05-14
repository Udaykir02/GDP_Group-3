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
    setRefreshing
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
import { getProductsRequest } from "../../../actions/vendorActions";
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

const mock_products = [
    {
        id: 101,
        title: "Product 1",
        price: 10,
        description: "Description of Product 1",
        image: "https://picsum.photos/700",
        units: 0,
        cart: [],
        meat: ""
    },
    {
        id: 102,
        title: "Product 2",
        price: 15,
        description: "Description of Product 2",
        image: "https://picsum.photos/700",
        units: 0,
        cart: [],
        meat: ""
    },
]

const HomeContainer = ({
    navigation, route
}: any) => {
    const [refreshing, setRefreshing] = useState<boolean>(false);
    const styles = createToBeImplementedStyle();
    const { cartitems, orderitems, orders, moreorders, lastorder, order_refreshing, favourites, morefavourites, lastfavourite, fav_refreshing } = useSelector((state: any) => state.cart)
    const { algoliatext, vendorshops, vendorpage, hasmore, products, moreproducts, lastproduct, selectedVendor } = useSelector((state: any) => state.vendor)
    const { token, user } = useSelector((state:any)=>state.auth)
    const dispatch = useDispatch();
    useEffect(()=>{
        if(selectedVendor){
            dispatch(getProductsRequest(selectedVendor.products,token))
        }
        
    },[selectedVendor?.vendorId])

    useEffect(() => {
        // const fetchProducts = async () => {
        //   const productApi = await getProducts({ id: route.params.shop.objectID });
        //   const imagearray = productApi.products.map(product => product.image);
        //   await _loadResourcesAsync(imagearray);
        //   await addProducts(productApi.products);
        //   await productsPagination({ lastproduct: productApi.lastVisible, moreproducts: productApi.hasMore });
        // };

        // fetchProducts();

        // return () => {
        //   // Cleanup function here if needed
        // };
    }, []);

    const _loadResourcesAsync = (assetImages: any) => {
        return Promise.all([...cacheImages(assetImages)]);
    };

    const getProducts = async (object: any) => {
        // try {
        //   const getProductsFn = fire.functions('asia-east2').httpsCallable('getProducts');
        //   const result = await getProductsFn(object);
        //   if (result.data.type === 'success') {
        //     return result.data.payload;
        //   }
        // } catch (error) {
        //   console.error('Error getting products:', error);
        // }
    };

    const getMoreProducts = async (object: any) => {
        // try {
        //   const getMoreProductsFn = fire.functions('asia-east2').httpsCallable('getMoreProducts');
        //   const result = await getMoreProductsFn(object);
        //   if (result.data.type === 'success') {
        //     return result.data.payload;
        //   }
        // } catch (error) {
        //   console.error('Error getting more products:', error);
        // }
    };

    const renderArticles = () => {
        return (
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ paddingHorizontal: 16 }}>
                    {/* <Prodcard item={route.params.shop} horizontal /> */}
                </View>
            </ScrollView>
        );
    };

    const renderHeader = () => {
        // Your renderHeader logic here
        return (<></>)
    };

    const renderMore = async () => {
        // Your renderMore logic here
    };

    const fetchMore = () => {
        // Your fetchMore logic here
    };

    const getTotal = () => {
        // Your getTotal logic here
    };

    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
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
                            cartitems={cartitems}
                            removeProduct={removeProduct}
                            removeProduct2={removeProduct2}
                            removeUnits={removeUnits}
                            removeUnits2={removeUnits2}
                            navigation={navigation} full={false} ctaColor={""} imageStyle={{ borderRadius: 10 }} />
                    )}
                    keyExtractor={(item, index) => index.toString()}
                    extraData={products}
                    onEndReachedThreshold={0.1}
                    //   ListFooterComponent={(moreproducts) ? <View row space="evenly" style={{ paddingVertical: 16 }}><View flex center><ActivityIndicator size="large" /></View></View> : null}
                    refreshing={refreshing}
                    onEndReached={() => fetchMore()}
                    style={styles.articles}
                />
            </View>: null}
            {(user?.cart?.length>0)?
                <View style={[styles.shadow]}>
                    <View style={{ flex: 1, justifyContent: 'center',alignItems: 'center'}}>
                        <TouchableOpacity  style={styles.optionsButton} onPress={() => { navigation.navigate('Cart') }}>
                            <View style={{ width: 'auto', flexDirection: 'row' }}>
                                <View style={{ width: '70%'}}>
                                    <Text>
                                        {cartitems.length + ((cartitems.length === 1) ? ' ITEM' : ' ITEMS')}
                                    </Text>
                                    <Text>
                                        {'\u20B9' + getTotal()}<Text> plus charges</Text>
                                    </Text>
                                </View>
                                <View style={{ justifyContent: 'center', alignItems: 'flex-end'}}>
                                    <Text>
                                        View Cart <MyIcon name='Entypo|controller-play' style={{ fontSize: 15, color: "#fff"}} />
                                    </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>:null}
        </View>
    );
};




export default HomeContainer;
