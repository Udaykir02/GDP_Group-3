export const getProductsRequest = (skuids: any, token: any, brand: any, categories: any, minPrice: any, maxPrice: any) => ({
    type: 'GET_PRODUCTS_REQUEST',
    payload: { skuids, token, brand, categories, minPrice, maxPrice },
});

export const searchProductsRequest = (searchText: any, token: any) => ({
    type: 'SEARCH_PRODUCTS_REQUEST',
    payload: { searchText, token },
});

export const getVendorRequestByID = (vendorId: any, token: any) => ({
    type: 'GET_VENDOR_REQUEST_BY_ID',
    payload: { vendorId, token},
});

export const increaseInventoryQtyRequest = (skuId: any, amount: any,token: any) => ({
    type: 'INCREASE_INVENTORY_QTY_REQUEST',
    payload: { skuId, amount, token},
});

export const decreaseInventoryQtyRequest = (skuId: any, amount: any, token: any) => ({
    type: 'DECREASE_INVENTORY_QTY_REQUEST',
    payload: { skuId, amount, token},
});


export const filterProductRequest = (skuids: any, token: any, brand: any, categories: any, minPrice: any, maxPrice: any) => ({
    type: 'FILTER_PRODUCTS_REQUEST',
    payload:  { skuids, token, brand, categories, minPrice, maxPrice },
});