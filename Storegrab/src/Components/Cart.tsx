import React, { useState } from 'react';
import { StyleSheet, Dimensions, ScrollView, TouchableOpacity, Alert, View, Text } from 'react-native';

const { width, height } = Dimensions.get('screen');

import { useDispatch, useSelector } from 'react-redux';





import { StateType } from '../../reducers';
import CheckoutButton from './CheckoutButton';
import MyIcon from './MyIcon';

const Cart = ({ navigation }: any) => {
  const [tip, setTip] = useState(0);
  const [charges] = useState(20);
  const [fade, setFade] = useState(false);
  const [cash, setCash] = useState(false);
  const [loading, setLoading] = useState(false);

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
  } = useSelector((state:StateType)=>state.cart)

  const dispatch = useDispatch()

  const removeCart = (object: any) => {
    return new Promise(function(resolve, reject) {
      var remove_Cart = fire.functions('asia-east2').httpsCallable('removeCart');
      remove_Cart(object).then(function(result) {
        if (result.data.type === 'success') {
          //resolve(result.data.payload);
        }
      })
    })
  }

  const updateCart = (object: any) => {
    return new Promise(function(resolve, reject) {
      var update_Cart = fire.functions('asia-east2').httpsCallable('updateCart');
      update_Cart(object).then(function(result) {
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
    for (let i = cartitems.length - 1; i >= 0; i--) {
      total = total + parseFloat(cartitems[i].total);
    }
    return total;
  }

  const renderItem = (item:any, i:number) => {
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

  const makePayment = async () => {
    let total = getTotal() + charges;
    total = total + (total * (tip / 100));
    total = total.toFixed(2);
    var options = {
      description: 'Payment',
      image: 'https://firebasestorage.googleapis.com/v0/b/meri-dukan-9b512.appspot.com/o/cart%2FWDVEFT89GTB9CWF7.png?alt=media&token=4d686440-ef0b-4e4f-8620-95119f42a97a',
      currency: 'INR',
      key: 'rzp_test_TfrlPnWktXhFGw',
      amount: total * 100,
      name: 'Pay',
      prefill: {
        email: privatedata.user.email,
        contact: privatedata.user.phone,
        name: privatedata.user.name
      },
      theme: { color: '#e2bb88' }
    }
    setLoading(true);
    try {
      const res = await RazorpayCheckout.open(options);
      if (res.razorpay_payment_id) {
        var payment_id = res.razorpay_payment_id;
        var payment = {
          payment_id: payment_id,
          tip: tip,
          address: choosenaddress.address,
          location: choosenlocation.location,
          cash: cash,
          total: total
        }
        addOrder({ order: payment });
        setLoading(false);
        initialCart();
        Alert.alert(
          "Order Placed",
          "Your order is on the way",
          [
            {
              text: "OK",
              onPress: () => navigation.goBack()
            }
          ]
        )
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

//   if (cartitems.length === 0) {
//     return (
//       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000000' }}>
//         <Text style={{ color: '#fff' }}>No items in Cart</Text>
//       </View>
//     )
//   }

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.articles}>
        {/* {cartitems.map((item, i) => renderItem(item, i))} */}
      </ScrollView>
      <View style={styles.total}>
        <View style={styles.totalPrice}>
          <Text style={{ fontFamily: 'HKGrotesk-Bold' }}>Total: </Text>
          {/* <Text style={{ fontFamily: 'HKGrotesk-Bold' }}>${getTotal()}</Text> */}
        </View>
        <View style={{ flexDirection: 'row' }}>
          {/* <CheckBox
            color='#e2bb88'
            label='Cash on delivery'
            onChange={() => setCash(!cash)}
          /> */}
        </View>
        <CheckoutButton onPress={()=>{}} loading={false} />
      </View>
    </View>
  )
}


export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
});
