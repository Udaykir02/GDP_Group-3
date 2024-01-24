/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  StyleSheet,
  View, Text, ImageBackground
} from 'react-native';


import createToBeImplementedStyle from "./AppStyle";


function App(): React.JSX.Element {
  const styles = createToBeImplementedStyle();
  return (
      <View style={styles.container}>
              <Text style={styles.title}>Storegrab</Text>
      </View>
  )
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
