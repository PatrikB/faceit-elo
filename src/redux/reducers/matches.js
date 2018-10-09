import {
    GET_MATCHES_BEGINS,
    GET_MATCHES_SUCCESS,
    GET_MATCHES_FAILURE
} from './../actions/actions';

const initialState = {
    matches: [],
    loading: false,
    error: null
}

export default (state = initialState, action) => {
    
    switch (action.type) {
            
        case 'GET_MATCHES_BEGINS':
            return {
                ...state,
                loading: true,
                error: null
            };
            
        case 'GET_MATCHES_SUCCESS':
            return {
                ...state,
                loading: false,
                matches: action.payload.matches
            };
            
        case 'GET_MATCHES_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                matches: []
            };
            
        default:
            return state
            
    }
    
}