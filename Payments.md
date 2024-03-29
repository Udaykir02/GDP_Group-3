# Payment Methods for Storegrab

## Cash on Delivery (COD)
Customers can pay with cash upon delivery of their orders using the popular payment option known as Cash on Delivery (COD). Customers who prefer to pay with cash will find flexibility and convenience when you incorporate COD into your application.

### Steps in Implementation:
1. **Checkout Procedure**: Give clients the choice to choose Cash on Delivery as their payment option during the checkout procedure.

2. **Order Confirmation**: Show the customer a summary of their order and let them know that they will be required to pay cash for their order when it is delivered.

3. **Delivery procedure**: Make sure that your delivery staff gets the customer's cash payment during the delivery procedure.
   
4. **Order Completion**: Mark the order as paid and finish the transaction as soon as the money is received.

## Debit Cards
When debit cards are accepted, clients can use money straight out of their bank account to pay for their orders. Debit card integration gives clients a safe and practical way to make payments.
### Procedure for Implementation:
Integrate a payment gateway that accepts debit cards into your application (see *Payment Gateway Integration* ). Payments with debit cards are supported by well-known payment gateways including Square, PayPal, and Stripe.

1. **Purchase Form**: Present a payment form to clients so they may input their debit card information (number, expiration date, CVV, and billing address).
2. **Tokenization**: Process and store debit card data securely and anonymously by using tokenization. Pay card industry (PCI) standards compliance is guaranteed by doing this.
3.  **Authorization and Capture**: Establish a procedure for authorization and capture in order to confirm that the customer's account has funds available and to obtain the amount of the payment.
4. **Error Handling**: Implement robust error handling mechanisms throughout the payment process to handle any unexpected issues gracefully. This includes validating the input data provided by the user to ensure it meets the required format and security standards.
5.  **Fraud Detection**: Integrate fraud detection measures to identify and prevent fraudulent transactions. This can involve analyzing transaction patterns, implementing velocity checks, and using machine learning algorithms to detect suspicious behavior.
6.  **Transaction Confirmation**: After payment authorization and capture are completed successfully, give consumers a transaction confirmation and finish their order.


## Credit Cards
Allowing customers to pay with credit cards provides them with convenience and flexibility, as they can use borrowed funds to make purchases. Credit card integration ensures a seamless payment process for your customers.

### Steps for Integration:
1. **Payment Gateway Integration**: Incorporate a reliable payment gateway that supports credit card transactions. Popular options include Square, PayPal, and Stripe.
2. **Checkout Process**: Offer customers the option to pay with a credit card during the checkout process. Provide a user-friendly interface where they can securely input their credit card details.
3. **Security Measures**: Implement robust security measures to protect customers' sensitive credit card information. Utilize encryption and adhere to Payment Card Industry Data Security Standard (PCI DSS) compliance to safeguard data.
4. **Authorization and Verification**: Develop a system for authorizing and verifying credit card transactions in real-time. This ensures that the customer's credit card has sufficient funds and is valid for the transaction.
5. **Transaction Confirmation**: Upon successful authorization, provide customers with a transaction confirmation, detailing the amount charged to their credit card and the completion of their order.
6. **Fraud Detection**: Integrate fraud detection mechanisms to identify and prevent fraudulent credit card transactions. Utilize machine learning algorithms and transaction monitoring systems to enhance security.
7. **Customer Support**: Offer dedicated customer support for any inquiries or issues related to credit card payments. Ensure prompt assistance for customers experiencing payment difficulties or discrepancies.
8. **Refund and Chargeback Handling**: Establish procedures for handling refunds and chargebacks efficiently. Provide clear guidelines for customers on how to request refunds and address any disputed transactions promptly.

By implementing credit card payment functionality, you enhance the shopping experience for your customers while expanding your payment options to cater to a broader audience.


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
#### iOS

The Stripe React Native SDK requires Xcode 14.1 or later and is compatible with apps targeting iOS 13 or above. For iOS 12 support, please use [`@stripe/stripe-react-native@0.19.0`](https://github.com/stripe/stripe-react-native/releases/tag/v0.19.0).

The SDK uses TypeScript features available in Babel version `7.9.0` and above.
Alternatively use the `plugin-transform-typescript` plugin in your project.

You'll need to run `pod install` in your `ios` directory to install the native dependencies.

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


##### Additional steps for webhook forwarding
 
Certain payment methods require a [webhook listener](https://stripe.com/docs/payments/payment-intents/verifying-status#webhooks) to notify you of changes in the status. When developing locally, you can use the [Stripe CLI](https://stripe.com/docs/stripe-cli) to forward webhook events to your local dev server.
 
- [Install the `stripe-cli`](https://stripe.com/docs/stripe-cli#install)
- Run `stripe listen --forward-to localhost:4242/webhook`
- The CLI will print a webhook secret (such as, `whsec_***`) to the console. Set STRIPE_WEBHOOK_SECRET to this value in your `example/.env` file.


## Testing

This library includes a built in mock file for Jest.
In order to use it, add the following code to the Jest setup file:

```
tsx
import mock from '@stripe/stripe-react-native/jest/mock.js';

jest.mock('@stripe/stripe-react-native', () => mock);
```

To have a more control over the mocks, you can extend and override particular methods e.g.:
```
tsx
const presentNativePayMock = jest.fn();

jest.mock('@stripe/stripe-react-native', () => ({
  ...mock,
  presentNativePay: presentNativePayMock,
}));
```

## Contributing
 
See the [contributor guidelines](CONTRIBUTING.md) to learn how to contribute to the repository or to learn how to run the example app.
 
## Troubleshooting
 
### Android web browser windows close on backgrounding the app
 
This is known limitation of using `singleTask` as your `launchMode` on Android. See [here](https://github.com/stripe/stripe-react-native/blob/master/docs/android-chrome-tab-closes-on-background.md) for a workaround.
 
### `Undefined symbols for architecture x86_64` on iOS
 
While building your iOS project, you may see a `Undefined symbols for architecture x86_64` error. This is caused by `react-native init` template configuration that is not fully compatible with Swift 5.1.
 
```
Undefined symbols for architecture x86_64:
  "(extension in Foundation):__C.NSScanner.scanUpToString(Swift.String) -> Swift.String?", referenced from:
      static Stripe.STPPhoneNumberValidator.formattedRedactedPhoneNumber(for: Swift.String, forCountryCode: Swift.String?) -> Swift.String in libStripe.a(STPPhoneNumberValidator.o)
  "__swift_FORCE_LOAD_$_swiftUniformTypeIdentifiers", referenced from:
      __swift_FORCE_LOAD_$_swiftUniformTypeIdentifiers_$_Stripe in libStripe.a(PKPaymentAuthorizationViewController+Stripe_Blocks.o)
```
 
Follow these steps to resolve this:
 
- Open your project via Xcode, go to `project -> build settings`, find `library search paths` and remove all swift related entries such as:
  `$(TOOLCHAIN_DIR)/usr/lib/swift/$(PLATFORM_NAME)` and `$(TOOLCHAIN_DIR)/usr/lib/swift-5.0/$(PLATFORM_NAME)`.
- Create a new Swift file to the project (File > New > File > Swift), give it any name (e.g. `Fix.swift`), check the appropriate Targets and create a bridging header when prompted by Xcode.

### `TypeError: null is not an object (evaluating '_NativeStripeSdk.default.initialise')` on Android

You might see error this whilst initializing the `StripeProvider` component with Expo. This is caused by using an older version of Expo before stripe-react-native was [officially supported](https://github.com/stripe/stripe-react-native/issues/3#issuecomment-846225534). Updating Expo Go from the stores (or locally on simulators installed with `expo install:client:[ios|android]`) should fix the problem.

If you're still having troubles, please [open an issue](https://github.com/stripe/stripe-react-native/issues/new/choose) or jump in our [developer chat](https://stripe.com/go/developer-chat).

### `Apple Pay Is Not Available in "My App Name"`

This can occur if you attempt to process an Apple Pay payment on a physical device (even in test mode) without having created **and uploaded** your Apple Pay Certificate to the Stripe Dashboard. Learn how to do that [here](https://stripe.com/docs/apple-pay#csr).

### Licence
`MIT License`

`Copyright (c) 2020 stripe`

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
 
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
