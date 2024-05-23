import { Provider } from 'react-redux'
import store from '../Store'
import render, {
  RenderResult,
} from '@testing-library/react-native/build/render'
import { NavigationContainer } from '@react-navigation/native'
import { StripeProvider } from '@stripe/stripe-react-native'
import { PaperProvider } from 'react-native-paper'
import AppThemeProvider from '@/core/AppThemeProvider'
import App from '../App'
import { device } from 'detox'
jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      navigate: jest.fn(),
    }),
  };
});
// const renderStartupContainerPage = () => {
//   return render(
//     <App />
//   )
// }
let page: RenderResult
describe('Login flow', () => {
  // beforeEach(async () => {
  //   await device.reloadReactNative();
  // });

  // it('should login successfully', async () => {
  //   await element(by.id('email')).typeText('john@example.com');
  //   await element(by.id('password')).typeText('123456');

  //   const loginButton = element(by.text('Login'));
  //   await loginButton.tap();

  //   await expect(loginButton).not.toBeDefined();
  //   await expect(element(by.label('Welcome'))).toBeDefined();
  // });
});
