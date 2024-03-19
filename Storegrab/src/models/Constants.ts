export const enum USER_ROLES {
  ADMIN = 'ADMIN',
  SALES_REP = 'SALES_REP',
  CUSTOMER = 'CUSTOMER'
}
export const enum API_URLS {
  LOGIN_AUTHENTICATE = '/authenticate'
}

export const ORDER_DASHBOARD_TILE_TYPE = {
  UNSUBMITTED_ORDER: 'UNSUBMITTED_ORDER',
  UPCOMING_DELIVERIES: 'UPCOMING_DELIVERIES',
  CREDIT_REQUESTS: 'CREDIT_REQUESTS',
  PRE_BOOK_ITEMS: 'PRE_BOOK_ITEMS'
};

export const ORDER_DASHBOARD_TILES = [
  {
    icon: 'ShoppingCartCheckout',
    title: 'Unsubmitted Orders',
    type: ORDER_DASHBOARD_TILE_TYPE.UNSUBMITTED_ORDER
  },
  {
    icon: 'LocalShippingOutlinedIcon',
    title: 'Upcoming Deliveries',
    type: ORDER_DASHBOARD_TILE_TYPE.UPCOMING_DELIVERIES
  },
  {
    icon: 'AddCardIcon',
    title: 'Credit Requests',
    type: ORDER_DASHBOARD_TILE_TYPE.CREDIT_REQUESTS
  },
  {
    icon: 'FactCheckOutlinedIcon',
    title: 'Pre-Book Items',
    type: ORDER_DASHBOARD_TILE_TYPE.PRE_BOOK_ITEMS
  }
];

export const RESOURCE_TYPE = {
  ADS: 'ADS',
  MERCHANDISING_PROGRAM: 'MP',
  FOOD_SERVICE_PROGRAM: 'FSP'
};

export const CUT_OFF_TIME = {
  HOUR: 2
};

export const SORT_MENU = {
  A_TO_Z: 'A to Z',
  Z_TO_A: 'Z to A',
  ACCOUNT_ASCENDING: 'Account # Ascending',
  ACCOUNT_DESCENDING: 'Account # Descending'
};
