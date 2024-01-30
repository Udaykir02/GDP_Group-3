import { View, Button, Text, Image, ImageBackground } from 'react-native';
import createToBeImplementedStyle from "./HomeContainerStyle";

const HomeContainer = ({ navigation }: any) => {
    const styles = createToBeImplementedStyle();
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Storegrab</Text>
        </View>
    )
}

export default HomeContainer