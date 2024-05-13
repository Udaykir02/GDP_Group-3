export const getProductsRequest = (skuids: any, token: any) => ({
    type: 'GET_PRODUCTS_REQUEST',
    payload: { skuids, token },
});