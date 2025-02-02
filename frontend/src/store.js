import { configureStore } from '@reduxjs/toolkit';
import { thunk }  from 'redux-thunk'
import { productListReducer , productDetailesReducer } from './reducers/prodcutReducers'
import {cartReducer} from './reducers/cartReducers'
import {
    userLoginReducer , 
    userRegisterReducer , 
    userDetailesReducer , 
    userUpdateProfileReducer , 
    userListReducer , 
    userDeleteReducer ,
    userUpdateReducer,
} from './reducers/userReducers'
import {orderCreateReducer} from './reducers/orderReducers'

const middleware = [thunk]

const cartItemsFromStorage = localStorage.getItem('cartItems') ?
    JSON.parse(localStorage.getItem('cartItems')) : []

const userInfoFromStorage = localStorage.getItem('userInfo') ?
    JSON.parse(localStorage.getItem('userInfo')) : null

const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ?
    JSON.parse(localStorage.getItem('shippingAddress')) : {}

const initialState = {
    cart: {
        cartItems: cartItemsFromStorage,
        shippingAddress: shippingAddressFromStorage
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
        userList: userListReducer,
        userDelete: userDeleteReducer,
        userUpdate: userUpdateReducer,
        orderCreate: orderCreateReducer,
    }, 
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(...middleware),
});

export default store;