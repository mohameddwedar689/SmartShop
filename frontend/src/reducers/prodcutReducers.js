import { 
    PRODUCT_LIST_FAIL , 
    PRODUCT_LIST_SUCCESS , 
    PRODUCT_LIST_REQUEST ,
    PRODUCT_DETAILES_FAIL,
    PRODUCT_DETAILES_SUCCESS,
    PRODUCT_DETAILES_REQUEST
} from '../constants/productConstants'

export const productListReducer = (state = {products:[]} , action) =>   {
    switch(action.type) {
        case PRODUCT_LIST_REQUEST:
            return {loading: true , products:[]}
        
        case PRODUCT_LIST_SUCCESS:
            return {loading: false , products: action.payload}

        case PRODUCT_LIST_FAIL:
            return {loading: false , error: action.payload}
        
        default: 
            return state
    }
} 

export const productDetailesReducer = (state = {product: {review: []}} , action) => {
    switch(action.type) {
        case PRODUCT_DETAILES_REQUEST:
            return {loading: true , ...state}
        
        case PRODUCT_DETAILES_SUCCESS:
            return {loading: false , product: action.payload}

        case PRODUCT_DETAILES_FAIL:
            return {loading: false , error: action.payload}
        
        default: 
            return state
    }
}