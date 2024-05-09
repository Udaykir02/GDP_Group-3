import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Dimensions, Image, TouchableWithoutFeedback, Alert, View, Text } from 'react-native';
import { useDispatch } from 'react-redux';
import NumericInput from './NumericInput';
import { Card } from 'react-native-paper';
import { useAppTheme } from '../styles/theme/theme';
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
    removeProduct: (args: { index: number; units: number; cart: number }) => void;
    removeProduct2: (args: { index: number; units: number; cartindex: number; cartunits: number; total: number }) => void;
    removeUnits: (index: number) => void;
    removeUnits2: (args: { index: number; units: number; total: number }) => void;
}

const Prodcard: React.FC<ProdcardProps> = ({
    navigation,
    item,
    horizontal,
    full,
    style,
    ctaColor,
    imageStyle,
    shop,
    location,
    cartitems,
    removeProduct,
    removeProduct2,
    removeUnits,
    removeUnits2,
}) => {
    const [isHorizontal, setIsHorizontal] = useState<boolean>(horizontal);
    const dispatch = useDispatch();
    const {colors} = useAppTheme();
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
        cardContainer: {
            padding: 2,
            backgroundColor: colors.backgroundDefault,
            elevation: 5,
            borderRadius: 8,
            marginVertical: 10
          },
    });

    const removeCart = (object: { product: any }) => {
        // return new Promise((resolve, reject) => {
        //   var remove_Cart = fire.functions('asia-east2').httpsCallable('removeCart');
        //   remove_Cart(object).then((result: { data: { type: string } }) => {
        //     if (result.data.type === 'success') {
        //       //resolve(result.data.payload);
        //     }
        //   });
        // });
    };

    const updateCart = (object: { product: any }) => {
        // return new Promise((resolve, reject) => {
        //   var update_Cart = fire.functions('asia-east2').httpsCallable('updateCart');
        //   update_Cart(object).then((result: { data: { type: string } }) => {
        //     if (result.data.type === 'success') {
        //       //resolve(result.data.payload);
        //     }
        //   });
        // });
    };

    const renderOptions = () => {
        if (shop.cta && cartitems.length > 0) {
            navigation.navigate('Options', { product: item, shop, location });
        } else {
            Alert.alert(
                'No service',
                'This vendor is not accepting orders, Please try again later.',
                [
                    {
                        text: 'Ok',
                        onPress: () => { },
                    },
                ],
                { cancelable: false }
            );
        }
    };

    const decrease = () => {
        // if (item.units === 1 && item.cart.length === 1) {
        //     const uniqueID = item.cart[0].uniqueID;
        //     const loc = location;
        //     dispatch(removeProduct({ index: loc, units: 0, cart: 0 }));
        //     cartitems.forEach((cartItem, i) => {
        //         if (cartItem.uniqueID === uniqueID) {
        //             removeCart({ product: cartItem });
        //             dispatch(removeUnits(i));
        //         }
        //     });
        // } else if (item.units > 1 && item.cart.length === 1) {
        //     const units = item.units - 1;
        //     const total = units * item.cart[0].cost;
        //     const uniqueID = item.cart[0].uniqueID;
        //     const loc = location;
        //     dispatch(removeProduct2({ index: loc, units, cartindex: 0, cartunits: units, total }));
        //     cartitems.forEach((cartItem, i) => {
        //         if (cartItem.uniqueID === uniqueID) {
        //             dispatch(removeUnits2({ index: i, units, total }));
        //             updateCart({ product: cartItem });
        //         }
        //     });
        // } else {
        //     navigation.navigate('Customization', { product: item, shop, location });
        // }
    };

    const imageStyles = [
        !isHorizontal ? styles.fullImage : styles.horizontalImage,
        imageStyle,
    ];
    const cardContainer = [styles.card, style];
    const imgContainer = [
        styles.imageContainer,
        isHorizontal ? styles.horizontalStyles : styles.verticalStyles,
        styles.shadow,
    ];

    return (
        <TouchableWithoutFeedback onPress={() => setIsHorizontal(!isHorizontal)}>
            <View style={[cardContainer, { flexDirection: isHorizontal ? 'row' : 'column' }]}>
                <View style={[imgContainer, { flex: isHorizontal ? 0.3 : 1 }]}>
                    <Image source={{ uri: item.image }} style={imageStyles} />
                </View>
                <View style={{ flex: isHorizontal ? 0.7 : 1, justifyContent: 'space-between' }}>
                    <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                        <View style={[{ flex: 0.4 },isHorizontal? {marginHorizontal: 5}:{marginVertical: 5}]}>
                            <Text style={[styles.cardTitle, { color: "#32325D", fontWeight: 'bold', fontSize: 14 }]}>{item.title}</Text>
                            <Text style={[styles.cardTitle, { color: "#32325D", fontWeight: 'normal', fontSize: 12 }]}>{item.meat}</Text>
                            <Text style={[styles.cardTitle, { color: "#32325D", fontWeight: 'bold', fontSize: 12 }]}>{'\u0024' + item.price}</Text>
                        </View>
                        <View style={{ flex: 0.6, alignItems: isHorizontal ? 'center': 'flex-end', justifyContent: isHorizontal ?'center':'flex-end' }}>
                            <NumericInput
                                value={item.units}
                                decrease={decrease}
                                onChange={(value: any) => { }}
                                editable={false}
                                leftButtonBackgroundColor="#fdfeff"
                                rightButtonBackgroundColor="#fdfeff"
                                totalWidth={80}
                                totalHeight={25}
                                borderColor={'#adadad'}
                                separatorWidth={0.5}
                                minValue={0}
                                inputStyle={{ backgroundColor: '#f7ebeb', borderTopWidth: 1, borderBottomWidth: 1, borderColor: '#adadad' }}
                                rounded={true}
                                textColor={'#32325D'}
                                renderOptions={renderOptions}
                            />
                        </View>
                    </View>
                    <View style={[{ justifyContent: 'space-between' },isHorizontal? {marginHorizontal: 5}:{marginVertical: 5}]}>
                        <Text style={[styles.cardTitle, { fontSize: 12, fontWeight: 'normal' }]}>{item.description}</Text>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>

    );
};


export default Prodcard;