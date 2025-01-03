import axios from 'axios'
import { 
    PRODUCT_LIST_FAIL , 
    PRODUCT_LIST_SUCCESS , 
    PRODUCT_LIST_REQUEST ,
    PRODUCT_DETAILES_FAIL,
    PRODUCT_DETAILES_SUCCESS,
    PRODUCT_DETAILES_REQUEST
} from '../constants/productConstants'

export const listProducts = () => async (dispatch) => {
    try {
        dispatch({type: PRODUCT_LIST_REQUEST})
        const { data } = await axios.get('/api/products/')
        dispatch({
            type: PRODUCT_LIST_SUCCESS , 
            payload: data
        })
    }
    catch(error) {
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}

export const listProductDetailes = (id) => async (dispatch) => {
    try {
        dispatch({type: PRODUCT_DETAILES_REQUEST})
        const {data} = await axios.get(`/api/products/${id}`)
        dispatch({
            type: PRODUCT_DETAILES_SUCCESS , 
            payload: data
        })
    }
    catch(error) {
        dispatch({
            type: PRODUCT_DETAILES_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}