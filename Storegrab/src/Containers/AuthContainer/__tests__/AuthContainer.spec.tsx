import { Provider } from 'react-redux'
import store from '../../../../store'
import render, {
    RenderResult,
} from '@testing-library/react-native/build/render'
import { NavigationContainer } from '@react-navigation/native'
import AuthContainer from '../AuthContainer'
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
                <AuthContainer />
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