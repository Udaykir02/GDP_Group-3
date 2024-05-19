import { Provider } from 'react-redux'
import store from '../../../../Store'
import render, {
    RenderResult,
} from '@testing-library/react-native/build/render'
import AccountContainer from '../AccountContainer'
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
                <AccountContainer />
            </NavigationContainer>
        </Provider>,
    )
}
let page: RenderResult
describe('AccountContainer', () => {
    beforeEach(() => {
        jest.useFakeTimers();
        page = renderStartupContainerPage()
    })
    afterEach(() => {
        jest.runOnlyPendingTimers();
        jest.useRealTimers();
    });
    it('should render correctly', function () {
        expect(page.toJSON()).toMatchSnapshot()
    })
});