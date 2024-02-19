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
