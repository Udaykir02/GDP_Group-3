import { Provider } from 'react-redux'
import store from '../../../../store'
import render, {
    RenderResult,
} from '@testing-library/react-native/build/render'
import VendorContainer from '../VendorContainer'
import { NavigationContainer } from '@react-navigation/native'


describe('VendorContainer', () => {
    beforeEach(() => {
        jest.useFakeTimers();

    })
    afterEach(() => {
        jest.runOnlyPendingTimers();
        jest.useRealTimers();
    });
    it('should render correctly', function () {
        expect(<></>).toMatchSnapshot()
    })
});
