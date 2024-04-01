import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useState } from 'react';
import { TouchableOpacity,View, Text, TextInput } from 'react-native';
import createToBeImplementedStyle from "./LoginContainerStyle";

const LoginContainer = ({ navigation }: any) => {
    const styles = createToBeImplementedStyle();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:5000/login', {
                username,
                password
            });
            const token = response.data.token;
            // Store token in AsyncStorage or secure storage
            await AsyncStorage.setItem('token', token);
            // Navigate to the next screen upon successful login
            // Add your navigation logic here
        } catch (error) {
            console.error('Login failed:');
        }
    };

    const handleRegister = async () => {
        try {
            const response = await axios.post('http://localhost:5000/register', {
                username,
                password
            });
            console.log('Registration successful:', response.data);
            // Optionally, you can navigate to the login screen after successful registration
            // navigation.navigate('Login');
        } catch (error) {
            console.error('Registration failed:');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Storegrab</Text>
            <TextInput
                style={styles.input}
                placeholder="Username"
                value={username}
                onChangeText={text => { setUsername(text) }}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry={true}
                value={password}
                onChangeText={text => { setPassword(text) }}
            />
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
        </View>
    );
};

export default LoginContainer;
