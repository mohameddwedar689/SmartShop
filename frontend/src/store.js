import { configureStore } from '@reduxjs/toolkit';
import { thunk }  from 'redux-thunk'
import { productListReducer , productDetailesReducer } from './reducers/prodcutReducers'

const middleware = [thunk]

const initialState = {}

const store = configureStore({
    reducer: {
        productList: productListReducer,
        productDetailes: productDetailesReducer,
    }, 
    initialState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(...middleware),
});

export default store;