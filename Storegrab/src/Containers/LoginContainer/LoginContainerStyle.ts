import { StyleSheet } from 'react-native';
export default function <C>() {
    return StyleSheet.create({
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
            backgroundColor: 'blue',
            width: '50%',
            height: 40,
            borderRadius: 5,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 20,
          },
          buttonText: {
            color: 'white',
            fontSize: 16,
            fontWeight: 'bold',
          },
    })
}