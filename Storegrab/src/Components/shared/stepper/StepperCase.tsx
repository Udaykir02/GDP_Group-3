import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, TextInput, Platform } from 'react-native';
import { useTheme } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { AppTheme } from '../../../styles/theme/theme';
import createStepperStyle from './StepperStyle';

interface StepperCaseProps {
    productQuantityCase?: String;
    handleProductCase: (caseType: String) => void
    isCase?: boolean
}

const StepperCase = ({ productQuantityCase, handleProductCase, isCase }: StepperCaseProps) => {
    const theme: AppTheme = useTheme();
    const [shadowColor, setShadowColor] = useState('transparent');
    const [borderColor, setBorderColor] = useState(theme.colors.primary);
    const [count, setCount] = useState(0);
    const styles = createStepperStyle(theme);
    const dynamicShadowStyle = {
        ...Platform.select({
            ios: {
                shadowColor: shadowColor,
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.8,
                shadowRadius: 2,
            },
            android: {

            },
        }),
    };
    return (<View style={[styles.stepperCaseContainer]}>
        <TouchableOpacity onPress={() => {
            isCase && handleProductCase('')
        }}>
            <View style={[{ ...styles.outerContainerStepperCase, ...dynamicShadowStyle, borderColor: borderColor }, !isCase && { borderWidth: 0}]}>
                {Platform.OS === 'android' && <View style={{ ...styles.androidShadowStepperCase, borderColor: shadowColor }} />}

                <View style={{ ...styles.innerContainerStepperCase, backgroundColor: count > 0 ? theme.colors.primarySuperLight : theme.colors.backgroundDefault }}>

                    <View style={styles.inputContainerStepperCase}>
                        <Text style={styles.priceStepperCase}>$5.6 </Text>
                        <Text style={styles.productCaseStepperCase}>{productQuantityCase.toUpperCase()}</Text>
                    </View>
                    <Text><MaterialCommunityIcons name="chevron-right" size={25} /></Text>
                </View>
            </View>
        </TouchableOpacity>
    </View>)
}

export default StepperCase;