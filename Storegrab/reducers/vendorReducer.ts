import { createSlice } from '@reduxjs/toolkit';

const initialState: any = {
    algoliatext: '',
    vendorshops: [],
    vendorpage: 0,
    hasmore: true,
    products: [],
    moreproducts: true,
    lastproduct: {},
    refreshing: false,
    radius: 5,
    vendorTypes: ['grocery', 'boutique', 'artisanal', 'market','food', 'antique', 'book', 'craft', 'pet'],
    selectedVendor: null,
    loading: false,
    error: null
};

const vendorSlice = createSlice({
    name: 'vendor',
    initialState,
    reducers: {
        addShops(state, action) {
            state.vendorshops = action.payload;
        },
        shopsPagination(state, action) {
            state.vendorpage = action.payload.vendorpage;
            state.hasmore = action.payload.hasmore;
        },
        addProducts(state, action) {
            state.products = action.payload;
        },
        productsPagination(state, action) {
            state.lastproduct = action.payload.lastproduct;
            state.moreproducts = action.payload.moreproducts;
        },
        eraseProducts(state) {
            state.products = [];
            state.lastproduct = {};
            state.moreproducts = true;
        },
        updateProducts(state, action) {
            const { skuId, qty } = action.payload;
            console.log(state.products.find((element:any)=>element.skuId === skuId))
            if(qty > 0)
            state.products.find((element:any)=>element.skuId === skuId).qty += qty;
            else
            state.products.find((element:any)=>element.skuId === skuId).qty -= qty;
        },
        changeProduct(state, action) {
            const { index, units, cart } = action.payload;
            state.products[index].units = units;
            state.products[index].cart.push(cart);
        },
        removeProduct(state, action) {
            const { index, units, cart } = action.payload;
            state.products[index].units = units;
            state.products[index].cart.splice(cart, 1);
        },
        removeProduct2(state, action) {
            const { index, units, cartindex, cartunits, total } = action.payload;
            state.products[index].units = units;
            state.products[index].cart[cartindex].units = cartunits;
            state.products[index].cart[cartindex].total = total;
        },
        removeProduct3(state, action) {
            const { index } = action.payload;
            state.products[index].units = 0;
            state.products[index].cart = [];
        },
        setAlgoliaText(state, action) {
            state.algoliatext = action.payload;
        },
        setRefreshing(state, action) {
            state.refreshing = action.payload;
        },
        updateRadius: (state, action) => {
            state.radius = action.payload;
        },
        updateVendorType: (state, action) => {
            state.vendorTypes = action.payload;
        },
        updateSelectedVendor: (state, action) => {
            state.selectedVendor = action.payload;
        },
        updateVendorProductsSuccess: (state, action) => {
            state.products = action.payload
        },
        updateVendorProductsFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;;
        }
    }
});

export const {
    addShops,
    shopsPagination,
    addProducts,
    productsPagination,
    eraseProducts,
    updateProducts,
    changeProduct,
    removeProduct,
    removeProduct2,
    removeProduct3,
    setAlgoliaText,
    setRefreshing,
    updateRadius,
    updateVendorType,
    updateSelectedVendor,
    updateVendorProductsSuccess,
    updateVendorProductsFailure
} = vendorSlice.actions;

export default vendorSlice.reducer;
