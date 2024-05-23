import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { resetPasswordRequest, sendOTPRequest, verifyOTPRequest } from '../../actions/userActions';
import { clearError } from '../../reducers/users/slice';
import AppPageWrapper from '../shared/AppPageWrapper';
import LoadingSpinner from './shared/LoadingSpinner';

const ResetPasswordScreen = ({navigation}:any) => {
    const [email, setEmail] = useState('');
    const [otp, setOTP] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [step, setStep] = useState(1); // Track the current step
    const dispatch = useDispatch();
    const { resetToken, error, loading } = useSelector((state: any)=>state.auth)
    const handleSendOTP = async () => {
        // Dispatch action to send OTP
        await dispatch(sendOTPRequest(email));
        // Move to the next step
        setStep(2);
    };

    const handleVerifyOTP = async () => {
        // Dispatch action to verify OTP
        const isOTPVerified = await dispatch(verifyOTPRequest(email, otp));
        if (isOTPVerified) {
            // Move to the next step
            setStep(3);
        } else {
            // Handle OTP verification failure
            // Display an error message or take appropriate action
        }
    };

    const handleResetPassword = async () => {
        // Dispatch action to reset password
        await dispatch(resetPasswordRequest(email, newPassword, resetToken));
        // Reset state and navigate to login screen or home screen
        setEmail('');
        setOTP('');
        setNewPassword('');
        setConfirmPassword('');
        setStep(1);

        // Navigate to login screen or home screen

        // navigation.navigate('Login'); // Example navigation
    };


    useEffect(()=>{
        // Display alert when error occurs
        if (error) {
            Alert.alert('Error', error, [{ text: 'OK', onPress: () => { 
            }}]);
            
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
            {step === 1 && (
                <View style={styles.formContainer}>
                    <Text style={styles.title}>Enter your email to reset your password</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                        autoCapitalize={'none'}
                    />
                    <Button title="Send OTP" onPress={handleSendOTP} />
                </View>
            )}
            {step === 2 && (
                <View style={styles.formContainer}>
                    <Text style={styles.title}>Enter the OTP you received via email</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="OTP"
                        value={otp}
                        onChangeText={setOTP}
                    />
                    <Button title="Verify OTP" onPress={handleVerifyOTP} />
                </View>
            )}
            {step === 3 && (
                <View style={styles.formContainer}>
                    <Text style={styles.title}>Choose a new password</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="New Password"
                        value={newPassword}
                        onChangeText={setNewPassword}
                        secureTextEntry
                        autoCapitalize={'none'}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Confirm New Password"
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        secureTextEntry
                        autoCapitalize={'none'}
                    />
                    <Button title="Reset Password" onPress={handleResetPassword} />
                </View>
            )}
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
    input: {
        width: '100%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    button: {
        marginRight: 50,
        marginLeft: 50,
        marginTop: 20,
        paddingTop: 15,
        paddingBottom: 15,
        backgroundColor: '#68a0cf',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#fff',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    loginText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 16
    },
    image: {
        width: 200,
        height: 220,
        justifyContent: 'center',
        alignSelf: 'center'
    },
    imageContainer: { flex: 1, justifyContent: 'center' },
    formContainer: { flex: 1, width: '100%', padding: 20 }
});

export default ResetPasswordScreen;
