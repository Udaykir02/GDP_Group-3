import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, StyleSheet, Image, TouchableHighlight, Text, Alert } from 'react-native';
import axios from 'axios';
import createToBeImplementedStyle from "./RegisterContainerStyle";
import { useDispatch, useSelector } from 'react-redux';
import { registerRequest } from '../../../actions/userActions';
import { clearError } from '../../../reducers/users/slice';
import AppPageWrapper from '../../shared/AppPageWrapper';
import LoadingSpinner from '../../Components/shared/LoadingSpinner';

const RegisterContainer = ({ navigation }: any) => {
  const styles = createToBeImplementedStyle();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const { error, loading } = useSelector((state:any)=> state.auth);
  const handleRegister = async () => {

      dispatch(registerRequest(username, email, password));
      setUsername('')
      setPassword('')
      setEmail('')
  };

  useEffect(()=>{
    // Display alert when error occurs
    if (error) {
        Alert.alert('Error', error, [{ text: 'OK' }]);
        dispatch(clearError())
    }
},[loading])

if(loading){
    return (<AppPageWrapper>
        <LoadingSpinner />
    </AppPageWrapper>)
}
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require('../../Assets/icons/Storegrab.png')}
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
          testID={"email_register_textinput_testid"}
        />
        <TextInput
          style={styles.input}
          placeholder="Username" // Add TextInput for username
          value={username}
          onChangeText={setUsername}
          autoCapitalize={'none'}
          testID={"username_register_textinput_testid"}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoCapitalize={'none'}
          testID={"password_register_textinput_testid"}
        />
        <TouchableHighlight
          style={styles.button}
          onPress={handleRegister}
          underlayColor='#fff' testID='register_button_testid'>
          <Text style={[{ fontSize: 15 }, styles.loginText]}>Register</Text>
        </TouchableHighlight>
      </View>

    </View>
  );
};

export default RegisterContainer;
