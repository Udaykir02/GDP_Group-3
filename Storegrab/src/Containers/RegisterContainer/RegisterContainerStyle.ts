import { argonTheme } from '../../constants';
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
        marginRight: 50,
        marginLeft: 50,
        marginTop: 20,
        paddingTop: 15,
        paddingBottom: 15,
        backgroundColor: argonTheme.COLORS.ERROR,
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
    })
}