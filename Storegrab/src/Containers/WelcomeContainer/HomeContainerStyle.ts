import { argonTheme } from '../../constants';
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
        title: {
            fontSize: 24,
            fontWeight: 'bold',
            marginBottom: 20,
            color: '#DEB887',
        },
        startButton: {
            backgroundColor: '#2196F3',
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderRadius: 510
        },
        image: {
            flex: 1,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
        },
        articles: {
            width: 'auto',
        },
        navbar: {
            paddingVertical: 0,
            paddingBottom: 16 * 1,
            paddingTop: 16,
            zIndex: 5,
        },
        shadow: {
            position: 'absolute',
            bottom: 5,
            flex: 0.10,
            flexDirection: 'row',
            width: width,
            backgroundColor: '#ffffff',
            shadowColor: 'black',
            shadowOffset: { width: 0, height: 2 },
            shadowRadius: 6,
            shadowOpacity: 0.2,
            elevation: 3,
            borderRadius:8
        },
        optionsButton: {
            width: "92%",
            height: 50,
            paddingHorizontal: 16,
            backgroundColor: argonTheme.COLORS.ERROR,
            borderRadius:8,
            justifyContent: 'center'
        },
    })
}