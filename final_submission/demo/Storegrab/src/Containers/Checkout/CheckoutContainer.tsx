import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const CheckoutContainer: React.FC = () => {
  const [shippingInfo, setShippingInfo] = useState({
    name: '',
    address: '',
    city: '',
    // Add other shipping info fields as needed
  });

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    // Add other payment info fields as needed
  });

  const handleShippingInputChange = (key: string, value: string) => {
    setShippingInfo(prevState => ({ ...prevState, [key]: value }));
  };

  const handlePaymentInputChange = (key: string, value: string) => {
    setPaymentInfo(prevState => ({ ...prevState, [key]: value }));
  };

  const handleCheckout = () => {
    // Implement your checkout logic here
    console.log('Shipping Info:', shippingInfo);
    console.log('Payment Info:', paymentInfo);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Checkout</Text>
      <View style={styles.formContainer}>
        <Text style={styles.sectionTitle}>Shipping Information</Text>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={shippingInfo.name}
          onChangeText={value => handleShippingInputChange('name', value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Address"
          value={shippingInfo.address}
          onChangeText={value => handleShippingInputChange('address', value)}
        />
        <TextInput
          style={styles.input}
          placeholder="City"
          value={shippingInfo.city}
          onChangeText={value => handleShippingInputChange('city', value)}
        />
        {/* Add other shipping info fields */}
        <Text style={styles.sectionTitle}>Payment Information</Text>
        <TextInput
          style={styles.input}
          placeholder="Card Number"
          value={paymentInfo.cardNumber}
          onChangeText={value => handlePaymentInputChange('cardNumber', value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Expiry Date"
          value={paymentInfo.expiryDate}
          onChangeText={value => handlePaymentInputChange('expiryDate', value)}
        />
        <TextInput
          style={styles.input}
          placeholder="CVV"
          value={paymentInfo.cvv}
          onChangeText={value => handlePaymentInputChange('cvv', value)}
        />
        {/* Add other payment info fields */}
      </View>
      <Button title="Checkout" onPress={handleCheckout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  formContainer: {
    width: '100%',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
});

export default CheckoutContainer;
