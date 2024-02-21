# Payment Methods for Storegrab
## Stripe React Native SDK

[![npm](https://img.shields.io/npm/v/@stripe/stripe-react-native)](https://www.npmjs.com/package/@stripe/stripe-react-native)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://github.com/stripe/stripe-react-native/blob/master/LICENSE)
 
The Stripe React Native SDK allows you to build delightful payment experiences in your native Android and iOS apps using React Native. 
We provide powerful and customizable UI screens and elements that can be used out-of-the-box to collect your users' payment details.

## Getting started

Get started with our [📚 integration guides](https://docs.stripe.com/payments/accept-a-payment?platform=react-native) and [example project](https://github.com/stripe/stripe-react-native/blob/master/CONTRIBUTING.md#running-the-example-app), or [📘 browse the SDK reference](https://stripe.dev/stripe-react-native/api-reference/index.html).

Updating to a newer version of the SDK? See our [changelog](https://github.com/stripe/stripe-react-native/blob/master/CHANGELOG.md).

## Features

*Simplified Security*: Our platform streamlines the process of gathering confidential information, such credit card numbers, while maintaining [PCI compliance](https://stripe.com/docs/security#pci-dss-guidelines). This implies that Stripe receives the sensitive data directly from you rather than via your server. See our [Integration Security Guide](https://stripe.com/docs/security) for additional details.

*Apple Pay*: We provide an [easy application with Apple Pay](https://stripe.com/docs/apple-pay).

*Payment methods*: Increasing the number of [payment modes](https://stripe.com/docs/payments/payment-methods/overview) you accept will help your company enhance checkout conversion and grow internationally.

*SCA-Ready*: In order to comply with the Strong Customer Authentication law in Europe, the SDK automatically conducts native 3D Secure authentication when necessary.

*Native User Interface*: On iOS and Android, we offer native panels and components for the safe collection of payment information.

*PaymentSheet*: Learn how to incorporate our new pre-built payments user interface (UI) for mobile apps, PaymentSheet. PaymentSheet allows remembering and reusing payment methods and helps you accept cards, Apple Pay, Google Pay, and much more right out of the box. Currently, Card, Apple Pay, Google Pay, SEPA Debit, Bancontact, iDEAL, EPS, P24, Afterpay/Clearpay, Klarna, Giropay, Sofort, and ACH are the payment options that PaymentSheet accepts.

*Recommended usage*: You must make use of the in-app purchase APIs provided by the app store if you're offering digital goods or services within your app (such as subscriptions, in-game currency, game levels, access to premium content, or full version unlocking). For additional information, view the policies from Google and Apple. You can use this SDK to process Stripe payments in all other scenarios.

## Installation

```
sh
yarn add @stripe/stripe-react-native
or
npm install @stripe/stripe-react-native
```

### Expo

> [Find Expo's full documentation here](https://docs.expo.io/versions/latest/sdk/stripe/).

Each Expo SDK version requires a specific stripe-react-native version. See the [CHANGELOG](./CHANGELOG.md) for a mapping of versions. To install the correct version for your Expo SDK version run:

```
sh
expo install @stripe/stripe-react-native
````

Next, add:
```
json
{
  "expo": {
    ...
    "plugins": [
      [
        "@stripe/stripe-react-native",
        {
          "merchantIdentifier": string | string [],
          "enableGooglePay": boolean
        }
      ]
    ],
  }
}
```

to your app.json file, where merchantIdentifier is the Apple merchant ID obtained [here](https://stripe.com/docs/apple-pay?platform=react-native). Otherwise, Apple Pay will not work as expected. If you have multiple `merchantIdentifier`s, you can set them in an array.

### Requirements

#### Android

- Android 5.0 (API level 21) and above
  - Your `compileSdkVersion` must be `34`. See [this issue](https://github.com/stripe/stripe-react-native/issues/812) for potential workarounds.
- Android gradle plugin 4.x and above

_Components_

In order to use [CardForm](https://stripe.dev/stripe-react-native/api-reference/index.html#CardForm) component, you need to install and configure [Material Components theme](https://github.com/material-components/material-components-android/blob/master/docs/getting-started.md#4-change-your-app-theme-to-inherit-from-a-material-components-theme) in your app.

1. Add below dependency to your `app/build.gradle` file with specified version

```tsx
implementation 'com.google.android.material:material:<version>'
```

2. Set appropriate style in your `styles.xml` file

```tsx
<style name="Theme.MyApp" parent="Theme.MaterialComponents.DayNight">
    <!-- ... -->
</style>
```

## Usage example
 
```tsx
// App.ts
import { StripeProvider } from '@stripe/stripe-react-native';
 
function App() {
  return (
<StripeProvider
      publishableKey={publishableKey}
      merchantIdentifier="merchant.identifier" // required for Apple Pay
      urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
>
<PaymentScreen />
</StripeProvider>
  );
}
 
// PaymentScreen.ts
import { CardField, useStripe } from '@stripe/stripe-react-native';
 
export default function PaymentScreen() {
  const { confirmPayment } = useStripe();
 
  return (
<CardField
      postalCodeEnabled={true}
      placeholders={{
        number: '4242 4242 4242 4242',
      }}
      cardStyle={{
        backgroundColor: '#FFFFFF',
        textColor: '#000000',
      }}
      style={{
        width: '100%',
        height: 50,
        marginVertical: 30,
      }}
      onCardChange={(cardDetails) => {
        console.log('cardDetails', cardDetails);
      }}
      onFocus={(focusedField) => {
        console.log('focusField', focusedField);
      }}
    />
  );
}
```

## Stripe initialization
 
To initialize Stripe in your React Native app, use the `StripeProvider` component in the root component of your application, or use the `initStripe` method.
 
`StripeProvider` can accept `urlScheme`, `publishableKey`, `stripeAccountId`, `threeDSecureParams` and `merchantIdentifier` as props. Only `publishableKey` is required.
 
```tsx
import { StripeProvider } from '@stripe/stripe-react-native';
 
function App() {
  const [publishableKey, setPublishableKey] = useState('');
 
  const fetchPublishableKey = async () => {
    const key = await fetchKey(); // fetch key from your server here
    setPublishableKey(key);
  };
 
  useEffect(() => {
    fetchPublishableKey();
  }, []);
 
  return (
<StripeProvider
      publishableKey={publishableKey}
      merchantIdentifier="merchant.identifier" // required for Apple Pay
      urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
>
      // Your app code here
</StripeProvider>
  );
}
```
 
or
 
```tsx
import { initStripe } from '@stripe/stripe-react-native';
 
function App() {
  // ...
 
  useEffect(() => {
    initStripe({
      publishableKey: publishableKey,
      merchantIdentifier: 'merchant.identifier',
      urlScheme: 'your-url-scheme',
    });
  }, []);
}
```
 
You can find more details about the `StripeProvider` component in the [API reference](https://stripe.dev/stripe-react-native/api-reference/index.html#StripeProvider).
