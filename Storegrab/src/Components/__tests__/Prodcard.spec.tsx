import { Provider } from 'react-redux'
import store from '../../../store'
import render, {
    RenderResult,
} from '@testing-library/react-native/build/render'
import { NavigationContainer } from '@react-navigation/native'
import { fireEvent } from '@testing-library/react-native';
import Prodcard from '../Prodcard';
import { StripeProvider } from '@stripe/stripe-react-native';
import { PaperProvider } from 'react-native-paper';
import AppThemeProvider from '../../core/AppThemeProvider';

jest.mock('@react-navigation/native', () => {
    return {
        ...jest.requireActual('@react-navigation/native'),
        useNavigation: () => ({
            navigate: jest.fn(),
        }),
    };
});

const inventoryMock = {
    skuId: 'sku_123',
    item: 'item',
    price: 100,
    qty: 1,
    size: {
      h: 1,
      l: 1,
      w: 1,
    },
    features: 'red',
    categories: ['category'],
    image: 'https://fastly.picsum.photos/id/237/200/300.jpg?hmac=TmmQSbShHz9CdQm0NkEjx1Dyh_Y984R9LpNrpvH2D_U',
    description:   'description',
    brand: 'brand',
    vendorId: 'vendorId',
    vendor_name: 'vendor_name',
  };
const renderStartupContainerPage = () => {
    return render(
            <Provider store={store}>
                <PaperProvider>
                    <AppThemeProvider>
                    <Prodcard
                            item={inventoryMock}
                            shop={{ cta: true }}
                            location={0}
                            horizontal
                            style={{ paddingHorizontal: 16, paddingVertical: 16 / 2 }}
                            cartitems={[]}
                            full={false} ctaColor={""} imageStyle={{ borderRadius: 10 }} />
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

    it('sets the image source correctly', () => {
        const image = page.getByTestId('prodcard-image-testid');
        expect(image.props.source).toEqual({ uri: inventoryMock.image });
      });
});