import * as ActionTypes from './Types';

const initialState = {
    authenticated: false,
    user: null,
    loading:false,

}

export default (state = initialState, { type, payload }={}) => {
    switch (type) {
        case ActionTypes.LOGOUT:
            return initialState;
        case ActionTypes.LOADING:
            return { ...state, loading: payload, error: null }

        case ActionTypes.LOGIN_FAILED:
            return { ...state, loading: false, error: payload }

        case ActionTypes.LOGIN_SUCCESS:
            localStorage.setItem('parkingUser',JSON.stringify(payload))
            return { ...state, loading: false, authenticated: true, user: payload }
        default:
            return state;
    }
}
