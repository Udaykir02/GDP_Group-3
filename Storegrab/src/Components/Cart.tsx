import React, { useState } from 'react';
import { StyleSheet, Dimensions, ScrollView, TouchableOpacity, Alert, View } from 'react-native';
import { Text, Icon, Checkbox } from 'galio-framework';

import { Card, Input } from '../components';
import articles from '../constants/articles';
import argonTheme from '../constants/Theme';
import NumericInput from '../components/NumericInput';
import { Button } from "../components";
const { width, height } = Dimensions.get('screen');

import { connect } from 'react-redux';
import propTypes from 'prop-types';

import { removeUnits, removeUnits2, initialCart, addOrder } from '../actions/cartActions';
import { removeProduct, removeProduct2, removeProduct3 } from '../actions/vendorActions';

import RazorpayCheckout from 'react-native-razorpay';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import fire from '../firebase/Fire';

const Cart = ({ cartitems, products, removeProduct, removeProduct2, removeUnits, removeUnits2, initialCart, removeProduct3, addOrder, choosenlocation, privatedata, choosenaddress, delivery_charge, navigation }) => {
  const [tip, setTip] = useState(0);
  const [charges] = useState(delivery_charge);
  const [fade, setFade] = useState(false);
  const [cash, setCash] = useState(false);
  const [loading, setLoading] = useState(false);

  const removeCart = (object) => {
    return new Promise(function(resolve, reject) {
      var remove_Cart = fire.functions('asia-east2').httpsCallable('removeCart');
      remove_Cart(object).then(function(result) {
        if (result.data.type === 'success') {
          //resolve(result.data.payload);
        }
      })
    })
  }

  const updateCart = (object) => {
    return new Promise(function(resolve, reject) {
      var update_Cart = fire.functions('asia-east2').httpsCallable('updateCart');
      update_Cart(object).then(function(result) {
        if (result.data.type === 'success') {
          //resolve(result.data.payload);
        }
      })
    })
  }

  const renderOptions = (i) => {
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

  const decrease = (i) => {
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

  const renderItem = (item, i) => {
    return (
      <View key={i} style={styles.article}>
        <TouchableOpacity onPress={() => navigation.navigate('Pro', { 'id': item.objectID })}>
          <Text style={styles.articleTitle}>{item.title}</Text>
        </TouchableOpacity>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.articleText}>{item.units}</Text>
          <Text style={styles.articleText}> x </Text>
          <Text style={styles.articleText}>${item.cost}</Text>
          <Text style={styles.articleText}> = </Text>
          <Text style={styles.articleText}>${item.total}</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={() => decrease(i)}>
            <Icon name="minus" family="antdesign" size={18} style={{ color: '#e2bb88', marginRight: 10 }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => renderOptions(i)}>
            <Icon name="plus" family="antdesign" size={18} style={{ color: '#e2bb88' }} />
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

  if (cartitems.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000000' }}>
        <Text style={{ color: '#fff' }}>No items in Cart</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.articles}>
        {cartitems.map((item, i) => renderItem(item, i))}
      </ScrollView>
      <View style={styles.total}>
        <View style={styles.totalPrice}>
          <Text style={{ fontFamily: 'HKGrotesk-Bold' }}>Total: </Text>
          <Text style={{ fontFamily: 'HKGrotesk-Bold' }}>${getTotal()}</Text>
        </View>
        <Input
          placeholder="Tip"
          right
          icon="percent"
          family="antdesign"
          iconSize={15}
          iconColor="#e2bb88"
          onChangeText={(text) => setTip(text)}
          style={styles.inputs}
        />
        <View style={{ flexDirection: 'row' }}>
          <Checkbox
            color='#e2bb88'
            label='Cash on delivery'
            onChange={() => setCash(!cash)}
          />
        </View>
        <View style={{ marginTop: 10 }}>
          <Button color="error" style={{ width: 150 }} onPress={() => makePayment()}>{loading ? <SkeletonPlaceholder>
            <View style={{ borderRadius: 10, width: 150, height: 35 }} />
          </SkeletonPlaceholder> : 'Checkout'}</Button>
        </View>
      </View>
    </View>
  )
}

Cart.propTypes = {
  removeUnits: propTypes.func.isRequired,
  removeUnits2: propTypes.func.isRequired,
  removeProduct: propTypes.func.isRequired,
  removeProduct2: propTypes.func.isRequired,
  removeProduct3: propTypes.func.isRequired,
  addOrder: propTypes.func.isRequired,
  initialCart: propTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  cartitems: state.cart.cartitems,
  products: state.vendor.products,
  choosenlocation: state.location,
  privatedata: state.auth.privatedata,
  choosenaddress: state.address,
  delivery_charge: state.delivery,
});

export default connect(mapStateToProps, { removeUnits, removeUnits2, removeProduct, removeProduct2, removeProduct3, addOrder, initialCart })(Cart);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000'
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
    backgroundColor: '#000000'
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
