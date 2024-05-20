import { Provider } from 'react-redux'
import store from '../../../../store'
import render, {
    RenderResult,
} from '@testing-library/react-native/build/render'


import { StripeProvider } from '@stripe/stripe-react-native';
import { PaperProvider } from 'react-native-paper';
import AppThemeProvider from '../../../core/AppThemeProvider';
import RegisterContainer from '../RegisterContainer';

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
                        <RegisterContainer />
                    </AppThemeProvider>
                </PaperProvider>
            </Provider>
    )
}
let page: RenderResult

describe('Prodcard', () => {
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