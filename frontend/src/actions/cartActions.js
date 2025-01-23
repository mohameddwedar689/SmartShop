import axios from 'axios'
import {CART_ADD_ITEM , CART_REMOVE_ITEM , CART_SAVE_SHIPPING_ADDRESS , CART_SAVE_PAYMENT_METHOD} from '../constants/cartConstants'
import { type } from '@testing-library/user-event/dist/type'

export const addToCart = (id , qty) => async (dispatch , getState) => {
    const { data } = await axios.get(`/api/products/${id}`)


    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            product: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            qty
        }
    })
    
    const { cartItems } = getState().cart; 
    localStorage.setItem('cartItems' , JSON.stringify(cartItems));
}


export const removeFromCart = (id) => (dispatch , getState) => {
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: id,
    })
    const { cartItems } = getState().cart; 
    localStorage.setItem('cartItems' , JSON.stringify(cartItems));
} 

export const saveShippingAddress = (data) => (dispatch) => {
    dispatch({
        type: CART_SAVE_SHIPPING_ADDRESS,
        payload: data,
    }) 
    localStorage.setItem('shippingAddress' , JSON.stringify(data));
} 


export const savePaymentMethod = (data) => (dispatch) => {
    dispatch({
        type: CART_SAVE_PAYMENT_METHOD,
        payload: data,
    }) 
    localStorage.setItem('paymentMethod' , JSON.stringify(data));
}  