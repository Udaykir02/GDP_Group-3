import 'react-native-gesture-handler/jestSetup';
import mock from '@stripe/stripe-react-native/jest/mock.js';
jest.mock('react-native-reanimated', () => require('react-native-reanimated/mock'));
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

// Mock react-native-permissions
jest.mock('react-native-permissions', () => {
  const RNPermissions = require('react-native-permissions/mock');
  return RNPermissions;
});

jest.mock('@react-native-community/geolocation', () => ({
  getCurrentPosition: jest.fn().mockImplementation((success) => 
    Promise.resolve(success({
      coords: {
        latitude: 0,
        longitude: 0,
      },
    }))
  ),
  watchPosition: jest.fn(),
  clearWatch: jest.fn(),
  stopObserving: jest.fn(),
}));

// Mock React Native modules
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  mergeItem: jest.fn(),
  clear: jest.fn(),
  getAllKeys: jest.fn(),
  multiGet: jest.fn(),
  multiSet: jest.fn(),
  multiRemove: jest.fn(),
  multiMerge: jest.fn(),
}));