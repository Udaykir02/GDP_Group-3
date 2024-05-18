export const getProductsRequest = (skuids: any, token: any, brand: any, categories: any, minPrice: any, maxPrice: any) => ({
    type: 'GET_PRODUCTS_REQUEST',
    payload: { skuids, token, brand, categories, minPrice, maxPrice },
});

export const searchProductsRequest = (searchText: any, token: any) => ({
    type: 'SEARCH_PRODUCTS_REQUEST',
    payload: { searchText, token },
});