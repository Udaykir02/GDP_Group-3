import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Image, TouchableHighlight, Text } from 'react-native';
import axios from 'axios';
import createToBeImplementedStyle from "./RegisterContainerStyle";
import { useDispatch } from 'react-redux';
import { registerRequest } from '../../../actions/userActions';

const RegisterContainer = ({ navigation }: any) => {
  const styles = createToBeImplementedStyle();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const handleRegister = async () => {
    try{
      dispatch(registerRequest(username, email, password));
    }
    catch(error){
        console.log(error)
    }
    finally{
       navigation.goBack();
    }
    

  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require('../../Assets/icons/bearcat_plaw.png')}
          style={styles.image}
        />
      </View>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize={'none'}
        />
        <TextInput
          style={styles.input}
          placeholder="Username" // Add TextInput for username
          value={username}
          onChangeText={setUsername}
          autoCapitalize={'none'}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoCapitalize={'none'}
        />
        <TouchableHighlight
          style={styles.button}
          onPress={handleRegister}
          underlayColor='#fff'>
          <Text style={[{ fontSize: 15 }, styles.loginText]}>Register</Text>
        </TouchableHighlight>
      </View>

    </View>
  );
};

export default RegisterContainer;
