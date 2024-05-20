import { Provider } from 'react-redux'
import store from '../../../store'
import render, {
    RenderResult,
} from '@testing-library/react-native/build/render'
import VendorSubscriptionPage from '../Subscription'
import { NavigationContainer } from '@react-navigation/native'
import OrderScreen from '../OrderScreen'
const mockOrder = {
    orderId: "ORD123456",
    userId: "USR78910",
    paymentId: "PAY09876",
    vendorId: "VND54321",
    paymentStatus: "Paid",
    paymentMethod: "Credit Card",
    status: "Shipped",
    currency: "USD",
    totalCost: 39.98,
    items: [
        {
            skuId: "12345",
            item: "Widget A",
            price: 19.99,
            qty: 2,
            size: {
                h: 10,
                l: 5,
                w: 3
            },
            features: "Durable, lightweight, water-resistant",
            categories: ["tools", "gadgets"],
            image: "http://example.com/images/widgetA.png",
            description: "A high-quality widget useful for various tasks.",
            brand: "WidgetCo"
        },
        {
            skuId: "67890",
            item: "Gadget B",
            price: 9.99,
            qty: 1,
            size: {
                h: 10,
                l: 5,
                w: 3
            },
            features: "Compact, multi-purpose",
            categories: ["gadgets"],
            image: "http://example.com/images/gadgetB.png",
            description: "A versatile gadget with multiple uses.",
            brand: "GadgetInc"
        }
    ],
    shipping: {
        address: {
            street1: "123 Main St",
            street2: "Apt 4B",
            city: "Springfield",
            state: "IL",
            country: "USA",
            zip: "62701"
        },
        origin: {
            street1: "789 Warehouse Rd",
            street2: "",
            city: "Shelbyville",
            state: "IL",
            country: "USA",
            zip: "62702"
        },
        carrier: "UPS",
        tracking: "1Z9999999999999999"
    },
    orderTime: new Date("2024-05-19T12:34:56.000Z"),
    endTime: new Date("2024-05-26T12:34:56.000Z")
}

jest.mock('@react-navigation/native', () => {
    return {
      ...jest.requireActual('@react-navigation/native'),
      useRoute: () => ({
        params: {
          order: mockOrder,
        },
      }),
    };
  });

const renderStartupContainerPage = () => {
    return render(
        <Provider store={store}>
            <NavigationContainer>
                <OrderScreen route={{params: { order: mockOrder}}} />
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
    afterEach(() => {
        jest.runOnlyPendingTimers();
        jest.useRealTimers();
    });
    it('should render correctly', function () {
        expect(page.toJSON()).toMatchSnapshot()
    })

});