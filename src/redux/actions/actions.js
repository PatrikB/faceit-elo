import axios from 'axios';

const url = process.env.NODE_ENV === 'production' ? 'api/' : 'http://localhost:4000/api/';

export const GET_USER_BEGINS    = 'GET_USER_BEGINS';
export const GET_USER_SUCCESS   = 'GET_USER_SUCCESS';
export const GET_USER_FAILURE   = 'GET_USER_FAILURE';

export const getUserBegins = () => ({
    type: GET_USER_BEGINS
});

export const getUserSuccess = user => ({
    type: GET_USER_SUCCESS,
    payload: { user }
});

export const getUserFailure = error => ({
    type: GET_USER_FAILURE,
    payload: { error }
});

export function getUser (_id) {
    
    return dispatch => {
        
        dispatch(getUserBegins());
        
        return axios.get(`${url}user/${_id}`).then((res) => {
            
            dispatch(getUserSuccess(res));
            
        }).catch(err => dispatch(getUserFailure(err)));
        
    }
    
}

export const GET_MATCH_BEGINS   = 'GET_MATCH_BEGINS';
export const GET_MATCH_SUCCESS   = 'GET_MATCH_SUCCESS';
export const GET_MATCH_FAILURE  = 'GET_MATCH_FAILURE';

export const getMatchBegins = () => ({
    type: GET_MATCH_BEGINS
});

export const getMatchSuccess = match => ({
    type: GET_MATCH_SUCCESS,
    payload: { match }
});

export const getMatchFailure = error => ({
    type: GET_MATCH_FAILURE,
    payload: { error }
});

export function getMatch (_id) {
    
    return dispatch => {
        
        dispatch(getMatchBegins());
        
        return axios.get(`${url}match/${_id}`).then((res) => {
            
            dispatch(getMatchSuccess(res));
            
        }).catch(err => dispatch(getMatchFailure(err)));
        
    }
    
}

export const GET_MATCHES_BEGINS     = 'GET_MATCHES_BEGINS';
export const GET_MATCHES_SUCCESS    = 'GET_MATCHES_SUCCESS';
export const GET_MATCHES_FAILURE    = 'GET_MATCHES_FAILURE';

export const getMatchesBegins = () => ({
    type: GET_MATCHES_BEGINS
});

export const getMatchesSuccess = matches => ({
    type: GET_MATCHES_SUCCESS,
    payload: { matches }
});

export const getMatchesFailure = error => ({
    type: GET_MATCH_FAILURE,
    payload: { error }
});

export function getMatches (_id) {
    
    return dispatch => {
        
        dispatch(getMatchesBegins());
        
        return axios.get(`${url}matches/${_id}`).then((res) => {
            
            dispatch(getMatchesSuccess(res));
            
        }).catch(err => dispatch(getMatchesFailure(err)));
        
    }
    
}