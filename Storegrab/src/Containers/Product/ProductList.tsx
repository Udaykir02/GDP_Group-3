import React from 'react';
import { View, FlatList, Image, StyleSheet, Dimensions } from 'react-native';

const products = [
  { id: 1, name: 'Product 1', image: require('./images/product1.jpg') },
  { id: 2, name: 'Product 2', image: require('./images/product2.jpg') },
  { id: 3, name: 'Product 3', image: require('./images/product3.jpg') },
  // Add more products here...
];

const numColumns = 2;
const screenWidth = Dimensions.get('window').width;

const ProductsGrid = () => {
  const renderItem = ({ item }: any) => (
    <View style={styles.item}>
      <Image source={item.image} style={styles.image} />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        numColumns={numColumns}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  item: {
    flex: 1,
    margin: 5,
    aspectRatio: 1, // This ensures that the items have equal width and height
  },
  image: {
    width: screenWidth / numColumns - 10 * (numColumns + 1) / numColumns,
    height: screenWidth / numColumns - 10 * (numColumns + 1) / numColumns,
    resizeMode: 'cover',
    borderRadius: 10,
  },
});

export default ProductsGrid;
