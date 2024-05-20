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
jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      navigate: jest.fn(),
    }),
  };
});
const renderStartupContainerPage = () => {
  return render(

            <App />
  )
}
let page: RenderResult
describe('App', () => {
  beforeEach(() => {
    // jest.useFakeTimers();
    page = renderStartupContainerPage()
  })
  // afterEach(() => {
  //   jest.runOnlyPendingTimers();
  //   jest.useRealTimers();
  // });
  it('should render correctly', function () {
    expect(page.toJSON()).toMatchSnapshot()
  })
});
