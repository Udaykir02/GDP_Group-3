import React, { Component } from "react";
import { View, Text, Image, StyleSheet, ImageSourcePropType } from "react-native";

interface DealCardProps {
    imageUri: ImageSourcePropType;
    heading: string;
    price: string;
}

export default class DealCard extends Component<DealCardProps> {
    render() {
        const { imageUri, heading, price } = this.props;
        return (
            <View style={styles.container} >
                <View style={styles.imageContainer} >
                    <Image 
                        source={imageUri} 
                        style={styles.image}
                    />
                </View>

                <Text style={styles.headingText}>{heading}</Text>
                <Text style={styles.priceText}>{price}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    imageContainer: { 
        width: 110, 
        height: 110 
    },
    image: { 
        width: null, 
        height: null, 
        flexGrow: 1, 
        resizeMode: 'contain' 
    },
    headingText: { 
        fontSize: 12, 
        color: '#262626', 
    },
    priceText: { 
        fontSize: 14, 
        color: '#388e3c', 
        marginTop: 8 
    }
});
