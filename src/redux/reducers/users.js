import {
    GET_USER_BEGINS,
    GET_USER_SUCCESS,
    GET_USER_FAILURE
} from './../actions/actions';

const initialState = {
    user: [],
    loading: false,
    error: null
}

export default (state = initialState, action) => {
    
    switch (action.type) {
            
        case 'GET_USER_BEGINS':
            return {
                ...state,
                loading: true,
                error: null
            };
            
        case 'GET_USER_SUCCESS':
            return {
                ...state,
                loading: false,
                user: action.payload.user
            };
            
        case 'GET_USER_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                user: []
            };
            
        default:
            return state
            
    }
    
}