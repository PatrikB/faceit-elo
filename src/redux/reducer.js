import { combineReducers } from 'redux';
import users from './reducers/users';
import match from './reducers/match';
import matches from './reducers/matches';

export default combineReducers ({
   
    users,
    match,
    matches
    
});