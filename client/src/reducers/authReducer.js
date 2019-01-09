import {GET_ERRORS } from '../actions/types';
/**
 * Inital state for the auth reducer
 */
const initalState ={
    isAuthenticated:false,
    user:{}
}


export default function(state = initalState, action){
    switch(action.type){
       
        default:
            return state;
    }
}