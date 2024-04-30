import React, { useState, useEffect } from 'react';
import { useStripe } from '@stripe/react-native-stripe-sdk';
import { API_URL } from '../config'; // assuming you have a config file with API_URL defined
import { Screen, Button } from '../components'; // assuming you have Screen and Button components

const CheckoutScreen: React.FC = () => {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState<boolean>(false);

  interface PaymentSheetParams {
    paymentIntent: string;
    ephemeralKey: string;
    customer: string;
  }

  const fetchPaymentSheetParams = async (): Promise<PaymentSheetParams> => {
    const response = await fetch(`${API_URL}/payment-sheet`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const { paymentIntent, ephemeralKey, customer } = await response.json();

    return {
      paymentIntent,
      ephemeralKey,
      customer,
    };
  };

  const initializePaymentSheet = async (): Promise<void> => {
    const {
      paymentIntent,
      ephemeralKey,
      customer,
    } = await fetchPaymentSheetParams();

    const { error } = await initPaymentSheet({
      merchantDisplayName: "Example, Inc.",
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,
      allowsDelayedPaymentMethods: true,
      defaultBillingDetails: {
        name: 'Jane Doe',
      }
    });
    if (!error) {
      setLoading(true);
    }
  };

  const openPaymentSheet = async (): Promise<void> => {
    // Implement your openPaymentSheet function
  };

  useEffect(() => {
    initializePaymentSheet();
  }, []);

  return (
    <Screen>
      <Button
        variant="primary"
        disabled={!loading}
        title="Checkout"
        onPress={openPaymentSheet}
      />
    </Screen>
  );
}

export default CheckoutScreen;
