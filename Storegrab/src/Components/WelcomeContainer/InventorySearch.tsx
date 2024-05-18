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

import { connect, useDispatch, useSelector } from 'react-redux';




import createToBeImplementedStyle from "./InventorySearchStyle";
import Prodcard from "../Prodcard";
import { getProductsRequest } from "../../../actions/vendorActions";
import MyIcon from "../MyIcon";
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

const InventorySearch = ({
    navigation, route
}: any) => {
    const [refreshing, setRefreshing] = useState<boolean>(false);
    const styles = createToBeImplementedStyle();

    const { user } = useSelector((state:any)=>state.auth)
    const { inventoryData } = useSelector((state: any) => state.search) 
    const dispatch = useDispatch();




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


    const renderMore = async () => {
        // Your renderMore logic here
    };

    const fetchMore = () => {
        // Your fetchMore logic here
    };

    const getTotal = () => {
        let total = 0;
        let cart = user?.cart;
        for (let i = 0; i < cart.length; i++) {
            console.log(cart[i])
            total += cart[i].qty * cart[i].price;
        }
        return total
    };

    const handleResetPassword = () => {
        navigation.navigate('ProductFilter')
    }
    const renderHeader = () => {
        // if(!defaultlocation)
        //   return (<></>)
        return (
          <></>
        )
      }
    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <View style={{ flex: 1 }}>
                <FlatList
                    data={inventoryData}
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
                    extraData={inventoryData}
                    onEndReachedThreshold={0.1}
                    //   ListFooterComponent={(moreproducts) ? <View row space="evenly" style={{ paddingVertical: 16 }}><View flex center><ActivityIndicator size="large" /></View></View> : null}
                    refreshing={refreshing}
                    onEndReached={() => fetchMore()}
                    style={styles.articles}
                />
            </View>
        </View>
    );
};




export default InventorySearch;
