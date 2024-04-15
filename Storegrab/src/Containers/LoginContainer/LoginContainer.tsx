import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useState } from 'react';
import { TouchableOpacity,View, Text, TextInput, Button } from 'react-native';
import createToBeImplementedStyle from "./LoginContainerStyle";

const LoginContainer = ({ navigation }: any) => {
    const styles = createToBeImplementedStyle();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const handleLogin = async () => {
      try {
        const emailString = email.toLowerCase();
        const passwordString = password.toLowerCase();
        const response = await axios.post('http://localhost:3000/api/login', { email: emailString, password: passwordString });
        const token = response.data.token;
        await AsyncStorage.setItem('auth_token', token);
        // Save token to AsyncStorage or Redux store for future requests

        console.log('Logged in successfully with token:', token);
      } catch (error) {
        console.error('Login failed:', error);
      }
    };
  
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Button title="Login" onPress={handleLogin} />
      </View>
    );
};

export default LoginContainer;
