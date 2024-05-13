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
    const { token } = useSelector((state:any)=>state.auth)
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
            {/* {(cartitems.length > 0) ?
                <View flex={0.10} row style={styles.shadow}>
                    <View flex middle >
                        <Button color="success" style={styles.optionsButton} onPress={() => { navigation.navigate('Cart') }}>
                            <View row style={{ width: 'auto' }}>
                                <View flex={0.6} middle left>
                                    <Text bold size={12} color="#fff">
                                        {cartitems.length + ((cartitems.length === 1) ? ' ITEM' : ' ITEMS')}
                                    </Text>
                                    <Text bold size={12} color="#fff">
                                        {'\u20B9' + getTotal()}<Text p size={8} color="#fff"> plus charges</Text>
                                    </Text>
                                </View>
                                <View flex={0.4} middle>
                                    <Text bold size={16} color="#fff">
                                        View Cart <Icon family='Entypo' name='controller-play' size={15} color="#fff" />
                                    </Text>
                                </View>
                            </View>
                        </Button>
                    </View>
                </View> : null} */}
        </View>
    );
};

const styles = StyleSheet.create({
    navbar: {
        paddingVertical: 0,
        paddingBottom: 16 * 1,
        paddingTop: 16,
        zIndex: 5,
    },
    title: {
        width: '100%',
        color: "#32325D",
        fontSize: 16,
        fontWeight: 'bold',
    },
    shadow: {
        width: width,
        backgroundColor: '#fff',
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.2,
        elevation: 3,
    },
    optionsButton: {
        width: "92%",
        paddingHorizontal: 16,
    },
});


export default HomeContainer;
