import axios from 'axios';
import {
    GET_ERRORS
} from './types'
/**
 * REgister user
 */

export const registeruser = (userdata, history) => dispatch => {

    axios.post('http://localhost:5000/api/users/register', userdata)
        .then(res => {
           history.push('/login')
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err
            })
        )
}