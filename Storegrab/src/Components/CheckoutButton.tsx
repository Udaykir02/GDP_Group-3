import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const CheckoutButton = ({ onPress, loading }: any) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, loading && styles.loadingButton]}
        onPress={onPress}
        disabled={loading}
      >
        {loading ? (
          <SkeletonPlaceholder>
            <View style={{ borderRadius: 10, width: 150, height: 35 }} />
          </SkeletonPlaceholder>
        ) : (
          <Text style={styles.buttonText}>Checkout</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  button: {
    width: 150,
    height: 35,
    borderRadius: 5,
    backgroundColor: 'error', // Assuming 'error' is a valid color
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white', // Assuming white text color
  },
  loadingButton: {
    opacity: 0.5, // Dim the button when loading
  },
});

export default CheckoutButton;
