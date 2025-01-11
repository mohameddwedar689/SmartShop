import { configureStore } from '@reduxjs/toolkit';
import { thunk }  from 'redux-thunk'
import { productListReducer , productDetailesReducer } from './reducers/prodcutReducers'
import {cartReducer} from './reducers/cartReducers'
import {userLoginReducer , userRegisterReducer , userDetailesReducer , userUpdateProfileReducer} from './reducers/userReducers'

const middleware = [thunk]

const cartItemsFromStorage = localStorage.getItem('cartItems') ?
    JSON.parse(localStorage.getItem('cartItems')) : []

const userInfoFromStorage = localStorage.getItem('userInfo') ?
    JSON.parse(localStorage.getItem('userInfo')) : null

const initialState = {
    cart: {
        cartItems: cartItemsFromStorage
    }, 
    userLogin: {
        userInfo: userInfoFromStorage
    }
}


const store = configureStore({
    reducer: {
        productList: productListReducer,
        productDetailes: productDetailesReducer,
        cart: cartReducer,
        userLogin: userLoginReducer,
        userRegister: userRegisterReducer,
        userDetails: userDetailesReducer,
        userUpdateProfile: userUpdateProfileReducer,
    }, 
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(...middleware),
});

export default store;