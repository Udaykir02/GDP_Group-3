import { Provider } from 'react-redux'
import store from '../../../../store'
import render, {
    RenderResult,
} from '@testing-library/react-native/build/render'
import OrderContainer from '../OrderContainer'
import { NavigationContainer } from '@react-navigation/native'
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
        <Provider store={store}>
            <NavigationContainer>
                <OrderContainer />
            </NavigationContainer>
        </Provider>,
    )
}
let page: RenderResult
describe('VendorSubscriptionPage', () => {
    beforeEach(() => {
        jest.useFakeTimers();
        page = renderStartupContainerPage()
    })
    it('should render correctly', function () {
        expect(page.toJSON()).toMatchSnapshot()
    })

});