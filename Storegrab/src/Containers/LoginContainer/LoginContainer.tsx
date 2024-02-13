import { useState } from 'react';
import { TouchableOpacity,View, Text, TextInput } from 'react-native';
import createToBeImplementedStyle from "./LoginContainerStyle";

const LoginContainer = ({ navigation }: any) => {
    const styles = createToBeImplementedStyle();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        console.log("hello")
        navigation.navigate("Home")
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
