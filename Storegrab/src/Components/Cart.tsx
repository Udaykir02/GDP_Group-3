import { removeUnits, removeUnits2 } from '../../reducers/cartReducer';
import { removeProduct, removeProduct2 } from '../../reducers/vendorReducer';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Dimensions, ScrollView, TouchableOpacity, Alert, View, Text, FlatList } from 'react-native';

const { width, height } = Dimensions.get('screen');

import { useDispatch, useSelector } from 'react-redux';
import { Button, Checkbox } from 'react-native-paper';





import { StateType } from '../../reducers';
import CheckoutButton from './CheckoutButton';
import MyIcon from './MyIcon';
import Prodcard from './Prodcard';
import { argonTheme } from '../constants';
import { initPaymentSheet, presentPaymentSheet } from '@stripe/stripe-react-native';
import { placeOrders } from '../../actions/userActions';

const Cart = ({ navigation }: any) => {
    const [tip, setTip] = useState(0);
    const [charges] = useState(20);
    const [fade, setFade] = useState(false);
    const [cash, setCash] = useState(false);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false)
    const [paymentIntentId, setPaymentIntentId] = useState();
    const { user, token } = useSelector((state: any) => state.auth)
    const { algoliatext, vendorshops, vendorpage, hasmore, products, moreproducts, lastproduct, selectedVendor } = useSelector((state: any) => state.vendor)
    const { defaultlocation } = useSelector((state: any) => state.location)


    const {
        cartitems,
        orderitems,
        orders,
        moreorders,
        lastorder,
        order_refreshing,
        favourites,
        morefavourites,
        lastfavourite,
        fav_refreshing
    } = useSelector((state: StateType) => state.cart)

    const dispatch = useDispatch()

    const removeCart = (object: any) => {
        return new Promise(function (resolve, reject) {
            var remove_Cart = fire.functions('asia-east2').httpsCallable('removeCart');
            remove_Cart(object).then(function (result) {
                if (result.data.type === 'success') {
                    //resolve(result.data.payload);
                }
            })
        })
    }

    const updateCart = (object: any) => {
        return new Promise(function (resolve, reject) {
            var update_Cart = fire.functions('asia-east2').httpsCallable('updateCart');
            update_Cart(object).then(function (result) {
                if (result.data.type === 'success') {
                    //resolve(result.data.payload);
                }
            })
        })
    }

    const renderOptions = (i: number) => {
        const cartunits = cartitems[i].units + 1;
        const total = cartunits * cartitems[i].cost;
        const objectID = cartitems[i].objectID;
        const uniqueID = cartitems[i].uniqueID;
        for (let j = products.length - 1; j >= 0; j--) {
            if (products[j].id === objectID) {
                for (let k = products[j].cart.length - 1; k >= 0; k--) {
                    if (products[j].cart[k].uniqueID === uniqueID) {
                        const units = products[j].units + 1;
                        removeProduct2({ index: j, units: units, cartindex: k, cartunits: cartunits, total: total });
                    }
                }
            }
        }
        removeUnits2({ index: i, units: cartunits, total: total });
        updateCart({ product: cartitems[i] });
    }

    const decrease = (i: number) => {
        if (cartitems.length === 1) {
            if (cartitems[i].units === 1) {
                const objectID = cartitems[i].objectID;
                const uniqueID = cartitems[i].uniqueID;
                for (let j = products.length - 1; j >= 0; j--) {
                    if (products[j].id === objectID) {
                        for (let k = products[j].cart.length - 1; k >= 0; k--) {
                            if (products[j].cart[k].uniqueID === uniqueID) {
                                const units = products[j].units - 1;
                                removeProduct({ index: j, units: units, cart: k });
                            }
                        }
                    }
                }
                removeCart({ product: cartitems[i] });
                removeUnits(i);
                navigation.goBack();
            } else if (cartitems[i].units > 1) {
                const cartunits = cartitems[i].units - 1;
                const total = cartunits * cartitems[i].cost;
                const objectID = cartitems[i].objectID;
                const uniqueID = cartitems[i].uniqueID;
                for (let j = products.length - 1; j >= 0; j--) {
                    if (products[j].id === objectID) {
                        for (let k = products[j].cart.length - 1; k >= 0; k--) {
                            if (products[j].cart[k].uniqueID === uniqueID) {
                                const units = products[j].units - 1;
                                removeProduct2({ index: j, units: units, cartindex: k, cartunits: cartunits, total: total });
                            }
                        }
                    }
                }
                removeUnits2({ index: i, units: cartunits, total: total });
                updateCart({ product: cartitems[i] });
            }
        } else if (cartitems.length > 1) {
            if (cartitems[i].units === 1) {
                const objectID = cartitems[i].objectID;
                const uniqueID = cartitems[i].uniqueID;
                for (let j = products.length - 1; j >= 0; j--) {
                    if (products[j].id === objectID) {
                        for (let k = products[j].cart.length - 1; k >= 0; k--) {
                            if (products[j].cart[k].uniqueID === uniqueID) {
                                const units = products[j].units - 1;
                                removeProduct({ index: j, units: units, cart: k });
                            }
                        }
                    }
                }
                removeCart({ product: cartitems[i] });
                removeUnits(i);
            } else if (cartitems[i].units > 1) {
                const cartunits = cartitems[i].units - 1;
                const total = cartunits * cartitems[i].cost;
                const objectID = cartitems[i].objectID;
                const uniqueID = cartitems[i].uniqueID;
                for (let j = products.length - 1; j >= 0; j--) {
                    if (products[j].id === objectID) {
                        for (let k = products[j].cart.length - 1; k >= 0; k--) {
                            if (products[j].cart[k].uniqueID === uniqueID) {
                                const units = products[j].units - 1;
                                removeProduct2({ index: j, units: units, cartindex: k, cartunits: cartunits, total: total });
                            }
                        }
                    }
                }
                removeUnits2({ index: i, units: cartunits, total: total });
                updateCart({ product: cartitems[i] });
            }
        }
    }

    const getTotal = () => {
        let total = 0;
        let cart = user?.cart;
        for (let i = 0; i < cart?.length; i++) {
            total += cart[i].qty * cart[i].price;
        }
        return total
    };



    const renderItem = (item: any, i: number) => {
        return (
            <View key={i} style={styles.article}>
                <TouchableOpacity onPress={() => navigation.navigate('Pro', { 'id': item.objectID })}>
                    <Text style={styles.articleTitle}>{item.name}</Text>
                </TouchableOpacity>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.articleText}>{item.qty}</Text>
                    <Text style={styles.articleText}> x </Text>
                    <Text style={styles.articleText}>${item.price}</Text>
                    <Text style={styles.articleText}> = </Text>
                    <Text style={styles.articleText}>${item.qty * item.price}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => decrease(i)}>
                        <MyIcon name="AntDesign|minus" style={{ color: '#e2bb88', marginRight: 10, fontSize: 18 }} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => renderOptions(i)}>
                        <MyIcon name="AntDesign|plus" style={{ color: '#e2bb88', fontSize: 18 }} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    // const makePayment = async () => {
    //     let total = getTotal() + charges;
    //     total = total + (total * (tip / 100));
    //     total = total.toFixed(2);
    //     var options = {
    //         description: 'Payment',
    //         image: 'https://firebasestorage.googleapis.com/v0/b/meri-dukan-9b512.appspot.com/o/cart%2FWDVEFT89GTB9CWF7.png?alt=media&token=4d686440-ef0b-4e4f-8620-95119f42a97a',
    //         currency: 'INR',
    //         key: 'rzp_test_TfrlPnWktXhFGw',
    //         amount: total * 100,
    //         name: 'Pay',
    //         prefill: {
    //             email: privatedata.user.email,
    //             contact: privatedata.user.phone,
    //             name: privatedata.user.name
    //         },
    //         theme: { color: '#e2bb88' }
    //     }
    //     setLoading(true);
    //     try {
    //         const res = await RazorpayCheckout.open(options);
    //         if (res.razorpay_payment_id) {
    //             var payment_id = res.razorpay_payment_id;
    //             var payment = {
    //                 payment_id: payment_id,
    //                 tip: tip,
    //                 address: choosenaddress.address,
    //                 location: choosenlocation.location,
    //                 cash: cash,
    //                 total: total
    //             }
    //             addOrder({ order: payment });
    //             setLoading(false);
    //             initialCart();
    //             Alert.alert(
    //                 "Order Placed",
    //                 "Your order is on the way",
    //                 [
    //                     {
    //                         text: "OK",
    //                         onPress: () => navigation.goBack()
    //                     }
    //                 ]
    //             )
    //         }
    //     } catch (error) {
    //         setLoading(false);
    //         console.log(error);
    //     }
    // }

    //   if (cartitems.length === 0) {
    //     return (
    //       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000000' }}>
    //         <Text style={{ color: '#fff' }}>No items in Cart</Text>
    //       </View>
    //     )
    //   }
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

    const fetchPaymentSheetParams = async () => {
        console.log("I am here"+`${process.env.BASE_URL}/stripe/payment-sheet`)
            const response = await fetch(`${process.env.BASE_URL}/stripe/payment-sheet`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`
                },
                body: JSON.stringify({
                    amount: getTotal(),
                    // add other body parameters if needed
                }),
            });
            const { paymentIntent, ephemeralKey, customer, publishableKey, paymentIntentId } = await response.json();
    
            return {
                paymentIntent,
                ephemeralKey,
                customer,
                publishableKey,
                paymentIntentId
            };


    };

    useEffect(() => {
        console.log('hi-bye')
        initializePaymentSheet()
    }, [])



    const initializePaymentSheet = async () => {
        // console.log("I am here"+`${process.env.BASE_URL}/stripe/payment-sheet`)
        try {
            const {
                paymentIntent,
                ephemeralKey,
                customer,
                publishableKey,
                paymentIntentId
            } = await fetchPaymentSheetParams();
            setPaymentIntentId(paymentIntentId);
            console.log(paymentIntent, ephemeralKey, customer, publishableKey)

            const response: any = await initPaymentSheet({
                merchantDisplayName: "Storegrab",
                customerId: customer,
                customerEphemeralKeySecret: ephemeralKey,
                paymentIntentClientSecret: paymentIntent,
                // // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
                // //methods that complete payment after a delay, like SEPA Debit and Sofort.
                // allowsDelayedPaymentMethods: true,
                defaultBillingDetails: {
                    name: 'Jane Doe',
                },
                returnURL: 'Storegrab://stripe-redirect',
            });


            console.log("payment_log" + JSON.stringify(response))
        }
        catch (error) {
            // console.log(error)
            setLoading(true);
        }
        // const { error } 
        // if (!error) {


        // }
    };

    const openPaymentSheet = async () => {
        try {
            const { error } = await presentPaymentSheet();
            if (error) {
                console.log(`Error code: ${error.code}`, error.message);
              } else {
                console.log('Success', 'Your order is confirmed!');
              }
            console.log(paymentIntentId)
            const orderReq = { userId: user?.userId, paymentIntentId: paymentIntentId, vendorId: selectedVendor?.vendorId, items: user?.cart }
            await dispatch(placeOrders(orderReq));
            navigation.navigate('Cart')
        }
        catch (error) {
            Alert.alert(`Error code: ${error.code}`, error.message);

        }
        // const { error } = 

        // if (error) {
        // } else {
        //   Alert.alert('Success', 'Your order is confirmed!');
        // }
    };




    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <View style={{ flex: 1 }}>
                <FlatList
                    data={user?.cart}
                    ListHeaderComponent={renderHeader}
                    renderItem={({ item, index }) => (
                        <Prodcard
                            item={item}
                            shop={{ cta: true }}
                            location={index}
                            horizontal
                            style={{ paddingHorizontal: 16, paddingVertical: 16 / 2 }}
                            cartitems={user?.cart}
                            removeProduct={removeProduct}
                            removeProduct2={removeProduct2}
                            removeUnits={removeUnits}
                            removeUnits2={removeUnits2}
                            navigation={navigation} full={false} ctaColor={""} imageStyle={{ borderRadius: 10 }} />
                    )}
                    keyExtractor={(item, index) => index.toString()}
                    extraData={user?.cart}
                    onEndReachedThreshold={0.1}
                    //   ListFooterComponent={(moreproducts) ? <View row space="evenly" style={{ paddingVertical: 16 }}><View flex center><ActivityIndicator size="large" /></View></View> : null}
                    refreshing={refreshing}
                    onEndReached={() => fetchMore()}
                />
            </View>
            <View style={styles.total}>
                <View style={styles.totalPrice}>
                    <Text style={{ fontFamily: 'HKGrotesk-Bold' }}>Total: </Text>
                    <Text style={{ fontFamily: 'HKGrotesk-Bold' }}>${getTotal()}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Checkbox
                        color='#e2bb88'
                        onPress={() => setCash(!cash)} status={'checked'} />
                </View>
                <CheckoutButton onPress={() => { }} loading={false} />
            </View>
            {(user?.cart && user.cart.length > 0) ? <View>
                <View style={[styles.shadow]}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity style={styles.optionsButton} onPress={() => { openPaymentSheet() }}>
                            <View style={{ width: 'auto', flexDirection: 'row' }}>
                                <View style={{ width: '70%' }}>
                                    <Text>
                                        {user?.cart?.length + ((user?.cart?.length === 1) ? ' ITEM' : ' ITEMS')}
                                    </Text>
                                    <Text>
                                        {'\u0024' + getTotal()}<Text> plus charges</Text>
                                    </Text>
                                </View>
                                <View style={{ justifyContent: 'center', alignItems: 'flex-end' }}>
                                    <Text style={{ fontWeight: 'bold' }}>
                                        Pay <MyIcon name='Entypo|controller-play' style={{ fontSize: 15, color: "#fff" }} />
                                    </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View> : null}
        </View>
    )
}


export default Cart;

const styles = StyleSheet.create({
    articles: {
        width: width - 16 * 2,
        paddingVertical: 16,
        paddingBottom: 16,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    article: {
        width: width - 16 * 2,
        marginVertical: 16 / 2,
        backgroundColor: '#1e2123',
        padding: 10,
        borderRadius: 10
    },
    articleTitle: {
        fontSize: 16,
        fontFamily: 'HKGrotesk-Bold',
        color: '#fff'
    },
    articleText: {
        fontSize: 14,
        fontFamily: 'HKGrotesk-Regular',
        color: '#fff'
    },
    total: {
        paddingVertical: 10,
        borderTopWidth: 1,
        borderTopColor: '#e2bb88',
    },
    totalPrice: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        marginBottom: 10
    },
    inputs: {
        borderRadius: 10,
        borderColor: '#e2bb88',
        backgroundColor: '#1e2123',
        borderWidth: 1,
        marginBottom: 10,
        width: 150
    },
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#DEB887',
    },
    startButton: {
        backgroundColor: '#2196F3',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 510
    },
    image: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    navbar: {
        paddingVertical: 0,
        paddingBottom: 16 * 1,
        paddingTop: 16,
        zIndex: 5,
    },
    shadow: {
        position: 'absolute',
        bottom: 5,
        flex: 0.10,
        flexDirection: 'row',
        width: width,
        backgroundColor: '#ffffff',
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.2,
        elevation: 3,
        borderRadius: 8
    },
    optionsButton: {
        width: "92%",
        height: 50,
        paddingHorizontal: 16,
        backgroundColor: argonTheme.COLORS.ERROR,
        borderRadius: 8,
        justifyContent: 'center'
    },
    optionsButton_2: {
        width: "90%",
        height: 45,
        paddingHorizontal: 16,
        alignSelf: 'center',
        marginBottom: 10,
        backgroundColor: argonTheme.COLORS.ERROR
    },
});
