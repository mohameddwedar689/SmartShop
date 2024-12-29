import { configureStore } from '@reduxjs/toolkit';
import { thunk }  from 'redux-thunk'
import { productListReducer , productDetailesReducer } from './reducers/prodcutReducers'
import {cartReducer} from './reducers/cartReducers'

const middleware = [thunk]

const cartItemsFromStorage = localStorage.getItem('cartItems') ?
    JSON.parse(localStorage.getItem('cartItems')) : []

const initialState = {
    cart: {
        cartItems: cartItemsFromStorage
    }
}

const store = configureStore({
    reducer: {
        productList: productListReducer,
        productDetailes: productDetailesReducer,
        cart: cartReducer,
    }, 
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(...middleware),
});

export default store;