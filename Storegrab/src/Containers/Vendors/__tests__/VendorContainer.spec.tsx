import { Provider } from 'react-redux'
import store from '../../../../store'
import render, {
    RenderResult,
} from '@testing-library/react-native/build/render'
import { NavigationContainer } from '@react-navigation/native'
import VendorContainer from '../VendorContainer'
import { PaperProvider } from 'react-native-paper'
import AppThemeProvider from '../../../core/AppThemeProvider'
import axios from 'axios'
import { waitFor } from '@testing-library/react-native'
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
                <VendorContainer />
            </AppThemeProvider>
        </PaperProvider>
    </Provider>
        ,
    )
}
let page: RenderResult
describe('VendorContainer', () => {
    beforeEach(() => {
        jest.useFakeTimers();
        page = renderStartupContainerPage()
    })
    afterEach(() => {
        jest.runOnlyPendingTimers();
        jest.useRealTimers();
    });
    // it('fetches vendors on mount and displays them', async () => {
    //   const vendorsData = {
    //     nearestVendor: [
    //       {
    //         vendorId: '1',
    //         vendor_name: 'Vendor 1',
    //         vendor_description: 'Description 1',
    //         website: 'https://example.com/1'
    //       },
    //       {
    //         vendorId: '2',
    //         vendor_name: 'Vendor 2',
    //         vendor_description: 'Description 2',
    //         website: 'https://example.com/2'
    //       }
    //     ]
    //   };
  
    //   (axios as jest.Mocked<typeof axios>).post.mockResolvedValueOnce({ data: vendorsData });
  
    //   const { getByText, findByText } = renderStartupContainerPage()
  
    //   // Check if LoadingSpinner is rendered initially (if you have one)
    //   // expect(getByTestId('loading-spinner')).toBeTruthy();
  
    //   // Wait for the vendors to be fetched and displayed
    //   await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(1));
    //   expect(axios.post).toHaveBeenCalledWith(
    //     'http://localhost:3000/vendorapi/nearest-vendor',
    //     {
    //       longitude: -122.4194,
    //       latitude: 37.7749,
    //       miles: 10,
    //       vendor_types: []
    //     },
    //     {
    //       headers: {
    //         'Content-Type': 'application/json',
    //         'Authorization': 'test-token'
    //       }
    //     }
    //   );
  
    //   // Check if the vendors are displayed
    //   expect(await findByText('Vendor 1')).toBeTruthy();
    //   expect(await findByText('Description 1')).toBeTruthy();
    //   expect(await findByText('Vendor 2')).toBeTruthy();
    //   expect(await findByText('Description 2')).toBeTruthy();
    // });
  
    // Add more test cases as needed
    it('should render correctly', function () {
        expect(page.toJSON()).toMatchSnapshot()
    })

  });