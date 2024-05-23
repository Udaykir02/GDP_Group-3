import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Dimensions, Image, TouchableWithoutFeedback, Alert, View, Text, Platform } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Card } from 'react-native-paper';
import { useAppTheme } from '../styles/theme/theme';
import { UserCartType } from '@/../reducers/users/types';
import Stepper from './shared/stepper/Stepper';
import { addItemToCart, decreaseItemQuantity, increaseItemQuantity, removeItemFromCart, updateItemInCart } from '../../reducers/cartReducer';
import { decreaseProductQuantity, increaseProductQuantity } from '../../reducers/vendorReducer';
import { addToCartRequest } from '../../actions/userActions';
import { decreaseInventoryQtyRequest, increaseInventoryQtyRequest } from '../../actions/vendorActions';
// import { Text, theme } from 'galio-framework';


// import NumericInput from '../components/NumericInput';
// import fire from '../firebase/Fire';

interface Product {
    title: string;
    meat: string;
    price: number;
    description: string;
    image: string;
    units: number;
    cart: any[];
}

interface Shop {
    cta: boolean;
}

interface Location { }

interface CartItem {
    uniqueID: string;
    cost: number;
}

interface ProdcardProps {
    navigation: any;
    item: Product;
    horizontal: boolean;
    full: boolean;
    style: any;
    ctaColor: string;
    imageStyle: any;
    shop: Shop;
    location: Location;
    cartitems: CartItem[];
}

const Prodcard: React.FC<any> = ({
    item,
    horizontal,
    style,
    imageStyle,
}) => {
    const [isHorizontal, setIsHorizontal] = useState<boolean>(horizontal);
    const { colors } = useAppTheme();
    const { user, token, vendorAdmin } = useSelector((state: any) => state.auth)
    const styles = StyleSheet.create({
        card: {
            backgroundColor: '#fff',
            marginVertical: 16,
            borderWidth: 0,
            minHeight: 114,
            marginBottom: 16
        },
        cardTitle: {
            flex: 1,
            flexWrap: 'wrap',
            paddingBottom: 6
        },
        cardDescription: {
            padding: 16 / 2
        },
        imageContainer: {
            borderRadius: 3,
            elevation: 1,
            overflow: 'hidden',
        },
        image: {
            // borderRadius: 3,
        },
        horizontalImage: {
            height: 107,
            width: 'auto',
            borderRadius: 3,
        },
        horizontalStyles: {
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
        },
        verticalStyles: {
            borderBottomRightRadius: 0,
            borderBottomLeftRadius: 0
        },
        fullImage: {
            height: 170
        },
        shadow: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowRadius: 4,
            shadowOpacity: 0.1,
            elevation: 2,
        },
        androidShadow: {
            borderWidth: 0,
            shadowColor: '#fff',
            shadowOffset: { width: 0, height: 0 },
            shadowRadius: 0,
            shadowOpacity: 0,
            elevation: 2, 
        },
        cardContainer: {
            padding: 2,
            backgroundColor: colors.backgroundDefault,
            elevation: 5,
            borderRadius: 8,
            marginVertical: 10
        },
    });
    const dispatch = useDispatch();

    const cartData = useSelector((state: any) => state.usercart.cart)



    const imageStyles = [
        !isHorizontal ? styles.fullImage : styles.horizontalImage,
        imageStyle,
    ];
    const cardContainer = [styles.card, style];
    const imgContainer = [
        styles.imageContainer,
        isHorizontal ? styles.horizontalStyles : styles.verticalStyles,
        Platform.OS === 'android'?  styles.androidShadow:styles.shadow,
    ];




    const handleChange = (change: number) => {
        if (vendorAdmin) {

            if (change > 0) {
                dispatch(increaseInventoryQtyRequest(item?.skuId, change, token))
                dispatch(increaseProductQuantity(item?.skuId))
            }
            else {
                if (item?.qty > 0) {
                    dispatch(decreaseInventoryQtyRequest(item?.skuId, 1, token))
                    dispatch(decreaseProductQuantity(item?.skuId))
                }

            }
        }
        else {
            let cartItem = cartData.find((cartItem: any) => cartItem.skuId === item?.skuId)
            dispatch(addToCartRequest(user?.userId, item?.skuId, change, token));
            if (cartItem) {
                if (cartItem.qty === 1 && change < 0) {
                    dispatch(removeItemFromCart(cartItem?.skuId))
                    dispatch(increaseProductQuantity(cartItem?.skuId))
                }
                else if (change > 0) {
                    if (item?.qty > 0) {
                        dispatch(increaseItemQuantity(cartItem?.skuId))
                        dispatch(decreaseProductQuantity(cartItem?.skuId))
                    }

                }
                else {
                    dispatch(decreaseItemQuantity(cartItem?.skuId))
                    dispatch(increaseProductQuantity(cartItem?.skuId))
                }
            }
            else {
                if (change > 0) {
                    if (item.qty > 0) {
                        const newCartItem: any = {
                            skuId: item?.skuId,
                            item: item?.item,
                            price: item?.price,
                            qty: change,
                            size: item?.size,
                            features: item?.features,
                            categories: item?.categories,
                            image: item?.image,
                            description: item?.description,
                            brand: item?.brand,
                            vendorId: item?.vendorId,
                            vendor_name: item?.vendor_name,
                        }
                        dispatch(addItemToCart(newCartItem))
                        dispatch(decreaseProductQuantity(cartItem?.skuId))
                    }

                }
            }
        }


    }

    const getQuantity = () => {
        if (vendorAdmin) {
            return item?.qty ? item?.qty : 0;
        }
        return (cartData && cartData.length > 0 && cartData.find((cartItem: any) => cartItem.skuId === item.skuId)?.qty) ? cartData.find((cartItem: any) => cartItem.skuId === item.skuId)?.qty : 0
    }

    return (
        <TouchableWithoutFeedback onPress={() => setIsHorizontal(!isHorizontal)}>
            <View style={[cardContainer, { flexDirection: isHorizontal ? 'row' : 'column' }]}>
                <View style={[imgContainer, { flex: isHorizontal ? 0.3 : 1 }]}>
                    <Image source={{ uri: item.image }} style={imageStyles} testID='prodcard-image-testid' />
                </View>
                <View style={{ flex: isHorizontal ? 0.7 : 1, justifyContent: 'space-between' }}>
                    <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                        <View style={[{ flex: 0.4 }, isHorizontal ? { marginHorizontal: 5 } : { marginVertical: 5 }]}>
                            <Text style={[styles.cardTitle, { color: "#32325D", fontWeight: 'bold', fontSize: 14 }]}>{item?.item}</Text>
                            <Text style={[styles.cardTitle, { color: "#32325D", fontWeight: 'normal', fontSize: 12 }]}>{item?.features}</Text>
                        </View>
                        <View style={{ flex: 0.6, alignItems: isHorizontal ? 'center' : 'flex-end', justifyContent: isHorizontal ? 'center' : 'flex-end' }}>
                            <Text style={[styles.cardTitle, { color: "#32325D", fontWeight: 'bold', fontSize: 18 }]}>{'\u0024' + item?.price}</Text>
                            {((!vendorAdmin && item?.qty > 0) || (cartData && cartData.length > 0 && cartData.find((cartItem: any) => cartItem.skuId === item.skuId)?.qty>0) || vendorAdmin)?<Stepper quantity={getQuantity()} handleChange={handleChange} />: <Text style={[styles.cardTitle, { color: "#32325D", fontWeight: 'bold', fontSize: 18 }]}>{'Out Of Stock'}</Text>}
                            <Text style={[styles.cardTitle, { color: "#32325D", fontWeight: 'bold', fontSize: 12, marginTop: 10 }]}>In Stock: {item?.qty}</Text>
                        </View>
                    </View>
                    <View style={{ justifyContent: 'space-between', flexDirection: 'row', margin: 5 }}>
                        <Text style={[styles.cardTitle, { color: "#32325D", fontWeight: 'bold', fontSize: 12 }]}>Description: {item?.description}</Text>
                    </View>
                    <View style={[{ justifyContent: 'space-between' }, isHorizontal ? { marginHorizontal: 5 } : { marginVertical: 5 }]}>
                        <Text style={[styles.cardTitle, { color: "#32325D", fontWeight: 'bold', fontSize: 12 }]}>{item.brand}</Text>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>

    );
};


export default Prodcard;