import { loginRequest } from '../../../actions/userActions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useState } from 'react';
import { TouchableOpacity, View, Text, TextInput, Button, Image, TouchableHighlight } from 'react-native';
import { useDispatch } from 'react-redux';
import createToBeImplementedStyle from "./LoginContainerStyle";


const LoginContainer = ({ navigation }: any) => {
    const styles = createToBeImplementedStyle();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const handleLogin = async () => {
        dispatch(loginRequest(email, password));
    };
    const handleResetPassword = () => {
        navigation.navigate('Reset')
    }
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
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    autoCapitalize={'none'}
                />
                <TouchableHighlight
                    style={styles.button}
                    onPress={handleLogin}
                    underlayColor='#fff'>
                    <Text style={[{fontSize: 15},styles.loginText]}>Login</Text>
                </TouchableHighlight>
                <Button title="Reset Password" onPress={handleResetPassword} />
            </View>

        </View>
    );
};

export default LoginContainer;
