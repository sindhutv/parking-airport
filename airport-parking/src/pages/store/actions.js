import axios from 'axios';
import * as ActionTypes from './Types';
import { dispatch } from '../../redux';


export const setLoading = (payload) => ({
    type: ActionTypes.LOADING,
    payload
})
export const logout = () => ({
    type: ActionTypes.LOGOUT
})

export const setLoginSuccess = (payload) => ({
    type: ActionTypes.LOGIN_SUCCESS,
    payload
})

export const login = (payload) => {

    return async () => {
        try {
            setLoading(true)
            const {data} = await axios.post(`http://localhost:9009/v1/auth/login`, payload)
            setLoading(false)
            if (data && data.tokens) {
                dispatch(setLoginSuccess(data.user))
            }
            else {
                alert('Something went wrong')
            }
        } catch (error) {
            alert(error?.response?.data?.message ?? 'Something went wrong')
        }
    }


}