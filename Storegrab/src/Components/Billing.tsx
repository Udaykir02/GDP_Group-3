import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const Billing: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [zip, setZip] = useState('');
  const [country, setCountry] = useState('');
  const [emailValid, setEmailValid] = useState(true);

  const validateEmail = (text: string) => {
    setEmail(text);
    // Basic email validation
    setEmailValid(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(text));
  };

  const handleCheckout = () => {
    // Implement your checkout logic here
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Address:', address);
    console.log('City:', city);
    console.log('Zip:', zip);
    console.log('Country:', country);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Billing Information</Text>
      <TextInput
        style={[styles.input, name ? null : styles.inputError]}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={[styles.input, emailValid ? null : styles.inputError]}
        placeholder="Email"
        value={email}
        onChangeText={validateEmail}
        keyboardType="email-address"
      />
      {!emailValid && <Text style={styles.errorText}>Please enter a valid email</Text>}
      <TextInput
        style={styles.input}
        placeholder="Address"
        value={address}
        onChangeText={setAddress}
      />
      <TextInput
        style={styles.input}
        placeholder="City"
        value={city}
        onChangeText={setCity}
      />
      <TextInput
        style={styles.input}
        placeholder="ZIP Code"
        value={zip}
        onChangeText={setZip}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Country"
        value={country}
        onChangeText={setCountry}
      />
      <Button title="Checkout" onPress={handleCheckout} disabled={!emailValid} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  heading: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default Billing;