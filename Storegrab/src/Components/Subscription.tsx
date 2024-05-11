import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MyIcon from './MyIcon';

const VendorSubscriptionPage: React.FC = () => {
  // Assuming the vendor's current plan and monthly cost are fetched from backend
  const currentPlan = 'Premium';
  const monthlyCost = 49.99; // Example cost in dollars

  const handleUpgradePlan = () => {
    // Implement logic for upgrading plan
    console.log('Upgrade plan clicked');
  };

  const handleCancelSubscription = () => {
    // Implement logic for canceling subscription
    console.log('Cancel subscription clicked');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Subscription Details</Text>
      <View style={styles.subscriptionInfo}>
        <Text style={styles.label}>Current Plan:</Text>
        <Text style={styles.value}>{currentPlan}</Text>
      </View>
      <View style={styles.subscriptionInfo}>
        <Text style={styles.label}>Cost Per Month:</Text>
        <Text style={styles.value}>${monthlyCost.toFixed(2)}</Text>
      </View>
      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.button} onPress={handleUpgradePlan}>
            <MyIcon name={"MaterialCommunityIcons|arrow-upward"} style={{fontSize: 24, color: "white"}} />
            <Text style={styles.buttonText}>Upgrade Plan</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleCancelSubscription}>
        <MyIcon name={"MaterialCommunityIcons|cancel"} style={{fontSize: 24, color: "white"}} />

          <Text style={styles.buttonText}>Cancel Subscription</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subscriptionInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    marginRight: 10,
    fontWeight: 'bold',
  },
  value: {
    fontSize: 16,
  },
  actionsContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#007bff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 5,
  },
});

export default VendorSubscriptionPage;
