import { loginRequest } from '../../../actions/userActions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { TouchableOpacity, View, Text, TextInput, Button, Image, TouchableHighlight, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import createToBeImplementedStyle from "./LoginContainerStyle";


const LoginContainer = ({ navigation }: any) => {
    const styles = createToBeImplementedStyle();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const { error } = useSelector((state: any)=> state.auth)
    const handleLogin = async () => {
        await dispatch(loginRequest(email, password));
        
    };
    const handleResetPassword = () => {
        navigation.navigate('Reset')
    }

    useEffect(()=>{
        // Display alert when error occurs
        if (error) {
            console.log(JSON.stringify(error))
            Alert.alert('Error', error, [{ text: 'OK' }]);
        }
    },[error])

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
                    testID='email-input'
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    autoCapitalize={'none'}
                    testID='password-input'
                />
                <TouchableHighlight
                    style={styles.button}
                    onPress={handleLogin}
                    underlayColor='#fff' testID='login-button'>
                    <Text style={[{fontSize: 15},styles.loginText]}>Login</Text>
                </TouchableHighlight>
                <Button title="Reset Password" onPress={handleResetPassword} />
            </View>

        </View>
    );
};

export default LoginContainer;
