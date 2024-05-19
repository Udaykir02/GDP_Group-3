import { addItemToCart, decreaseItemQuantity, increaseItemQuantity, removeItemFromCart, removeUnits, removeUnits2, updateItemInCart } from '../../reducers/cartReducer';
import { decreaseProductQuantity, increaseProductQuantity, removeProduct, removeProduct2 } from '../../reducers/vendorReducer';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Dimensions, ScrollView, TouchableOpacity, Alert, View, Text, FlatList, Image } from 'react-native';

const { width, height } = Dimensions.get('screen');

import { useDispatch, useSelector } from 'react-redux';
import { Button, Checkbox } from 'react-native-paper';





import { StateType } from '../../reducers';
import CheckoutButton from './CheckoutButton';
import MyIcon from './MyIcon';
import Prodcard from './Prodcard';
import { argonTheme } from '../constants';
import { initPaymentSheet, presentPaymentSheet } from '@stripe/stripe-react-native';
import { addToCartRequest, inventoryRequest, placeOrders } from '../../actions/userActions';
import Stepper from './shared/stepper/Stepper';

const Cart = ({ navigation }: any) => {
    const [loading, setLoading] = useState(false);
    const [paymentIntentId, setPaymentIntentId] = useState();
    const { user, token } = useSelector((state: any) => state.auth)
    const { algoliatext, vendorshops, vendorpage, hasmore, products, moreproducts, lastproduct, selectedVendor, inventoryQty } = useSelector((state: any) => state.vendor)
    const { defaultlocation } = useSelector((state: any) => state.location)


    const cartData = useSelector((state: any) => { return state.usercart.cart })

    const dispatch = useDispatch()


    useEffect(() => {
        const array = [];
        for (let i = 0; i < cartData.length; i++) {
            array.push(cartData[i].skuId);
        }
        dispatch(inventoryRequest(array, token));
    }, [cartData.length])


    const getTotal = () => {
        let total = 0;
        let cart = user?.cart;
        for (let i = 0; i < cartData?.length; i++) {
            total += cartData[i].qty * cartData[i].price;
        }
        return total
    };



    const fetchPaymentSheetParams = async () => {
        console.log("I am here" + `${process.env.BASE_URL}/stripe/payment-sheet`)
        const response = await fetch(`${process.env.BASE_URL}/stripe/payment-sheet`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`
            },
            body: JSON.stringify({
                amount: getTotal() * 100,
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
                Alert.alert(`Error code: ${error.code}`, error.message);
                console.log(`Error code: ${error.code}`, error.message);
            } else {
                const orderReq = { userId: user?.userId, paymentIntentId: paymentIntentId, vendorId: (cartData && cartData?.length > 0 && cartData[0].vendorId)?cartData[0].vendorId:'', items: user?.cart }
                await dispatch(placeOrders(orderReq));
                navigation.navigate('Orders')
                console.log('Success', 'Your order is confirmed!');
            }
            console.log(paymentIntentId)

        }
        catch (error) {
            Alert.alert(`Error code: ${error?.code}`, error?.message);

        }
        // const { error } = 

        // if (error) {
        // } else {
        //   Alert.alert('Success', 'Your order is confirmed!');
        // }
    };

    const handleRemoveItem = (skuId: string) => {
        // const newCart = user?.cart.filter((item: any) => item.skuId !== skuId);
        // dispatch(removeUnits(newCart));
    }
    const getQuantity = (item: any) =>{
        return (cartData && cartData.length > 0 && cartData.find((cartItem:any) => cartItem.skuId === item.skuId)?.qty)?cartData.find((cartItem:any) => cartItem.skuId === item.skuId)?.qty: 0
    }


    const renderItem = ({ item, index }: any) => {
        const handleChange = (change: number) => {
            let cartItem = cartData.find((cartItem: any) => cartItem.skuId === item?.skuId)
            let inventoryItem = inventoryQty.find((inventoryItem: any) => inventoryItem.skuId === item?.skuId)
            dispatch(addToCartRequest(user?.userId,item?.skuId, change,token ));
        
            if(cartItem){
                if(cartItem.qty === 1 && change < 0){
                    dispatch(removeItemFromCart(cartItem?.skuId))
                    dispatch(increaseProductQuantity(cartItem?.skuId))
                }
                else if(change > 0) {
                    if(inventoryItem?.qty > 0){
                        dispatch(increaseItemQuantity(cartItem?.skuId))
                        dispatch(decreaseProductQuantity(cartItem?.skuId))
                    }
                    
                }   
                else {
                    dispatch(decreaseItemQuantity(cartItem?.skuId))
                    dispatch(increaseProductQuantity(cartItem?.skuId))
                }
            }
            else{
                if(change > 0){
                    if(inventoryItem.qty > 0){
                        const newCartItem: any = {
                            skuId: item?.skuId,
                            item:  item?.item,
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
        return (
        <View style={styles.itemContainer}>
          <Image source={{ uri: item.image }} style={styles.image} />
          <View style={styles.details}>
            <Text style={styles.itemName}>{item.item}</Text>
            <Text style={styles.itemCategory}>{item.categories.join(', ')}</Text>

            <Text style={styles.itemPrice}>${item.price * item.qty}</Text>
          </View>
          <Stepper quantity={getQuantity(item)} handleChange={handleChange}/>
        </View>
      )};

    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <FlatList
                data={cartData}
                renderItem={renderItem}
                keyExtractor={(item) => item.skuId}
                contentContainerStyle={styles.list}
            />
            {(cartData && cartData.length > 0) ?<View style={styles.totalContainer}>
                <Text style={styles.totalText}>Total Cost:</Text>
                <Text style={styles.totalAmount}>${getTotal()}</Text>
            </View>:null}

            {(cartData && cartData.length > 0) ?
                <View style={[styles.shadow, { marginBottom: 10}]}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity style={styles.optionsButton} onPress={() => { openPaymentSheet() }}>
                            <View style={{ width: 'auto', flexDirection: 'row' }}>
                                <View style={{ width: '70%' }}>
                                    <Text style={{ color: "#fff", fontWeight: 'bold'}}>
                                        {cartData?.length + ((cartData?.length === 1) ? ' ITEM' : ' ITEMS')}
                                    </Text>
                                    <Text style={{ color: "#fff", fontWeight: 'bold'}}>
                                        {'\u0024' + getTotal()}<Text> plus charges</Text>
                                    </Text>
                                </View>
                                <View style={{ justifyContent: 'center', alignItems: 'flex-end' }}>
                                    <Text style={{ fontWeight: 'bold', color: "#fff", fontSize: 24 }}>
                                        Pay <MyIcon name='Entypo|controller-play' style={{ fontSize: 15, color: "#fff" }} />
                                    </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            : null}
        </View>
    )
}


export default Cart;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
      },
      header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
      },
      list: {
        paddingBottom: 20,
      },
      itemContainer: {
        flexDirection: 'row',
        padding: 10,
        marginBottom: 10,
        backgroundColor: '#f8f8f8',
        borderRadius: 8,
        alignItems: 'center',
      },
      image: {
        width: 80,
        height: 80,
        marginRight: 10,
        borderRadius: 8,
      },
      details: {
        flex: 1,
      },
      itemName: {
        fontSize: 16,
        fontWeight: 'bold',
      },
      itemCategory: {
        fontSize: 14,
        color: '#888',
      },
      stepperContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
      },
      stepperButton: {
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ddd',
        borderRadius: 5,
      },
      stepperButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
      },
      qtyText: {
        marginHorizontal: 10,
        fontSize: 16,
      },
      itemPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 5,
      },
      removeButton: {
        padding: 5,
      },
      removeButtonText: {
        color: 'red',
        fontSize: 18,
      },
      totalContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        borderTopWidth: 1,
        borderTopColor: '#ddd',
      },
      totalText: {
        fontSize: 18,
        fontWeight: 'bold',
      },
      totalAmount: {
        fontSize: 18,
        fontWeight: 'bold',
      },
      checkoutButton: {
        backgroundColor: '#007bff',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
      },
      checkoutButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18,
      },
      //This is the break
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
        borderRadius: 8
    },
    optionsButton: {
        width: "92%",
        height: 60,
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
    itemDetails: {
        fontSize: 14,
        color: '#555',
    }
});
