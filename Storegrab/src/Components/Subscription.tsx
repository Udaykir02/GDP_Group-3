import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MyIcon from './MyIcon';
import { useSelector } from 'react-redux';

const VendorSubscriptionPage: React.FC = () => {
  const { user } = useSelector((state: any) => state.auth);
  // Assuming the vendor's current plan and monthly cost are fetched from backend
  const currentPlan = 'Vendor Plan';
  const monthlyCost = 49.99; // Example cost in dollars




  const getTotalCost = () => {
    if(user && user.vendors && user?.vandors?.length){
      return user?.vandors?.length * monthlyCost;
    }
    return monthlyCost;
  }

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
      <View style={styles.subscriptionInfo}>
        <Text style={styles.label}>Total Cost:</Text>
        <Text style={styles.value}>${getTotalCost().toFixed(2)}</Text>
      </View>
      <View style={styles.actionsContainer}>
          <Text style={styles.buttonText}>To Cancel Subscription, Contact Group 3</Text>
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
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 5,
  },
});

export default VendorSubscriptionPage;
