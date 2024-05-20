import { Provider } from 'react-redux'
import store from '../../../../Store'
import render, {
    RenderResult,
} from '@testing-library/react-native/build/render'
import { NavigationContainer } from '@react-navigation/native'
import { fireEvent } from '@testing-library/react-native';
import HomeContainer from '../HomeContainer';
import { StripeProvider } from '@stripe/stripe-react-native';
import { PaperProvider } from 'react-native-paper';
import AppThemeProvider from '../../../core/AppThemeProvider';

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
                <PaperProvider>
                    <AppThemeProvider>
                            <HomeContainer />
                    </AppThemeProvider>
                </PaperProvider>
            </Provider>
    )
}
let page: RenderResult

describe('HomeContainer', () => {
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

    it('displays an error message when username is empty', async () => {
        const loginButton = page.getByTestId('home-container-testid');
    });
});