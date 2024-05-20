import { Provider } from 'react-redux'
import store from '../../../../store'
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
    // it('renders the switch with the initial state', () => {
    //     const switchComponent = page.getByTestId('vendor-admin-switch');
    //     expect(switchComponent.props.value).toBe(false);
    //   });
    
    //   it('toggles the switch and dispatches actions', () => {
    //     const switchComponent = component.getByTestId('vendor-admin-switch');
        
    //     // Toggle the switch to turn it on
    //     fireEvent(switchComponent, 'valueChange', true);
    
    //     expect(store.dispatch).toHaveBeenCalledWith(actions.updateVendorAdmin(true));
    //     expect(store.dispatch).toHaveBeenCalledWith(actions.resetCart());
    //     expect(store.dispatch).toHaveBeenCalledWith(actions.clearOrders());
    //     expect(store.dispatch).toHaveBeenCalledWith(actions.clearVendor());
    //     expect(store.dispatch).toHaveBeenCalledWith(actions.clearState());
    //     expect(store.dispatch).toHaveBeenCalledWith(actions.clearLocation());
    
    //     // Update store and re-render component
    //     store = mockStore({
    //       auth: {
    //         user: { fname: 'John', lname: 'Doe', userId: 'john_doe', username: 'john@example.com' },
    //         vendorAdmin: true,
    //       },
    //     });
    
    //     store.dispatch = jest.fn();
    
    //     component = render(
    //       <Provider store={store}>
    //         <AccountContainer />
    //       </Provider>
    //     );
    
    //     const switchComponentAfter = component.getByTestId('vendor-admin-switch');
    //     expect(switchComponentAfter.props.value).toBe(true);
    //   });

});