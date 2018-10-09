import {
    GET_MATCH_BEGINS,
    GET_MATCH_SUCCESS,
    GET_MATCH_FAILURE
} from './../actions/actions';

const initialState = {
    match: [],
    loading: false,
    error: null
}

export default (state = initialState, action) => {
    
    switch (action.type) {
            
        case 'GET_MATCH_BEGINS':
            return {
                ...state,
                loading: true,
                error: null
            };
            
        case 'GET_MATCH_SUCCESS':
            return {
                ...state,
                loading: false,
                match: action.payload.match
            };
            
        case 'GET_MATCH_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                match: []
            };
            
        default:
            return state
            
    }
    
}