import { Dimensions, StyleSheet } from 'react-native';
const { width, height } = Dimensions.get('screen');
export default function <C>() {
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#ffffff',
            justifyContent: 'center',
            alignItems: 'center',
        },
        articles: {
            width: width - 16 * 2,

        },
        avatar: {
            width: 28,
            height: 28,
            borderRadius: 15,
            borderWidth: 0
        },
        shadow: {
            width: width,
            backgroundColor: '#fff',
            shadowColor: 'black',
            shadowOffset: { width: 0, height: 2 },
            shadowRadius: 6,
            shadowOpacity: 0.5,
            elevation: 3,
        },
    })
}