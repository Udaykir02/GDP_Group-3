import { View, Text, TouchableOpacity, StyleSheet, Animated, TextInput, Platform } from 'react-native';
import { useTheme } from 'react-native-paper';

import { AppTheme } from '../../../styles/theme/theme';
export default function <C>({ colors }:any) {
    return StyleSheet.create({
        mainContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            padding: 4,
            height: 40,
            
        },
        outerContainer: {
            padding: 4,
            borderRadius: 50,
            backgroundColor: colors.backgroundDefault,
            alignItems: 'center',
            justifyContent: 'center',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 4,
            borderColor: colors.coreMarkGreen,
            borderWidth: 1,
            flexDirection: 'row',
            blurRadius: 8,
            height: 40
        },
        svg: {
            position: 'absolute',
            top: 0,
            left: 0,
            borderRadius: 25,
        },
        innerContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'white',
            borderRadius: 50,
            padding: 4,
            borderColor: colors.coreMarkGreen,
            borderWidth: 1,
            height: 32,

        },
        button: {
            width: 32,
            height: 32,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 16,
            marginHorizontal: 5,
            color: colors.primary
        },
        buttonText: {
            fontSize: 16,
            color: colors.primary,
        },
        countInput: {
            minWidth: 32,
            textAlign: 'center',
            fontSize: 16,
            fontWeight: 'bold',
            marginHorizontal: 4,
            color: colors.textDarken,
        },
        parContainer: {
            height: 12,
            position: 'absolute',
            bottom: 0,
            right: 0,
            left: 50,
            top: 20,
        },
        par: {
            position: 'absolute',
            fontSize: 12,
            color: colors.textSecondary,
        },
        inputContainer: {
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minWidth: 32,

        },
        shadow: {
            ...Platform.select({
                ios: {
                    shadowColor: 'transparent',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.8,
                    shadowRadius: 8,
                },
                android: {

                },
            }),
        },
        androidShadow: {
            position: 'absolute',
            top: -2,
            left: -2,
            right: -2,
            bottom: -2,
            borderColor: 'transparent',
            borderWidth: 2,
            borderRadius: 50,
            backgroundColor: 'transparent',
            elevation: 2,
            opacity: 0.3,
        },
        hidden: {
            opacity: 0,
        },
        productStepperContainer: { // main container
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 4,
            height: 40

        },
        innerContainerProdStepper: { // inner container
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: colors.coreMarkGreen,
            borderRadius: 50,
            height: 40,
        },
        buttonTextProdStepper: { // button text prd
            minWidth: 32,
            textAlign: 'center',
            fontSize: 12,
            fontWeight: 'bold',
            marginHorizontal: 4,
            color: colors.textDarken,
        },
        priceProdStepper: { // pirce style
            color: colors.textSecondary,
            minWidth: 40,
            textAlign: 'center',
            fontSize: 12,
            fontWeight: 'bold',
            marginHorizontal: 4,
        },
        shadowProdStepper: {
            ...Platform.select({
                ios: {
                    shadowColor: 'transparent',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.8,
                    shadowRadius: 8,
                },
                android: {

                },
            }),
        },
        androidShadowProdStepper: {
            position: 'absolute',
            top: -2,
            left: -2,
            right: -2,
            bottom: -2,
            borderColor: 'transparent',
            borderWidth: 2,
            borderRadius: 50,
            backgroundColor: 'transparent',
            elevation: 2,
            opacity: 0.3,
        },
        productCaseContainer: { // case container
            flexDirection: 'column',
            justifyContent: 'space-evenly',
            backgroundColor: colors.brightWhite,
            borderRadius: 50,
            padding: 4,
            height: 37,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 4,
            borderColor: colors.coreMarkGreen,
            borderWidth: 1,
            blurRadius: 8,
        },
        stepperCaseContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 4,
        },
        outerContainerStepperCase: {
            padding: 4,
            
            borderRadius: 50,
            backgroundColor: colors.backgroundDefault,
            alignItems: 'center',
            justifyContent: 'center',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 4,
            borderColor: colors.coreMarkGreen,
            borderWidth: 1,
            flexDirection: 'row',
            blurRadius: 8,
            height: 37
        },
        svgStepperCase: {
            position: 'absolute',
            top: 0,
            left: 0,
            borderRadius: 25,
        },
        innerContainerStepperCase: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'white',
            borderRadius: 50,
            height: 35,
        },
        buttonStepperCase: {
            width: 32,
            height: 32,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 16,
            marginHorizontal: 5,
            color: colors.primary
        },
        buttonTextStepperCase: {
            fontSize: 16,
            color: colors.primary,
        },
        countInputStepperCase: {
            textAlign: 'center',
            fontSize: 16,
            fontWeight: 'bold',
            marginHorizontal: 4,
            color: colors.textDarken,
        },
        parContainerStepperCase: {
            height: 12,
            position: 'absolute',
            bottom: 0,
            right: 0,
            left: 40,
            top: 20,
        },
        parStepperCase: {
            position: 'absolute',

            fontSize: 12,
            color: colors.textSecondary,
        },
        inputContainerStepperCase: {
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
        },
        shadowStepperCase: {
            ...Platform.select({
                ios: {
                    shadowColor: 'transparent',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.8,
                    shadowRadius: 8,
                },
                android: {

                },
            }),
        },
        androidShadowStepperCase: {
            position: 'absolute',
            top: -2,
            left: -2,
            right: -2,
            bottom: -2,
            borderColor: 'transparent',
            borderWidth: 2,
            borderRadius: 50,
            backgroundColor: 'transparent',
            elevation: 2,
            opacity: 0.3,
        },
        hiddenStepperCase: {
            opacity: 0,
        },
        productCaseStepperCase: {
            minWidth: 32,
            textAlign: 'center',
            fontSize: 12,
            fontWeight: 'bold',
            marginHorizontal: 4,
            color: colors.textDarken,
        },
        priceStepperCase: {
            color: colors.textSecondary,
            minWidth: 32,
            textAlign: 'center',
            fontSize: 12,
            fontWeight: 'bold',
            marginHorizontal: 4,
        },
    })
}