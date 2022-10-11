const defaultState = {
    isAuth: false,
    userData: null,
    loading: true
}

const AUTH_LOGIN = "AUTH_LOGIN"
const AUTH_LOGOUT = "AUTH_LOGOUT"
const AUTH_UPDATE_USER_DATA = "AUTH_UPDATE_USER_DATA"
const SET_LOADING = "SET_LOADING"

export const authReducer = (state = defaultState, action) => {
    switch (action.type) {
        case AUTH_LOGIN:
            return { ...state, isAuth: true, userData: action.payload }
        case AUTH_LOGOUT:
            return { ...state, isAuth: false, userData: null }
        case AUTH_UPDATE_USER_DATA:
            return { ...state, userData: { ...state.userData, ...action.payload } }
        case SET_LOADING:
            return { ...state, loading: action.payload }
        default:
            return state
    }
}

export const authLoginAction = (payload) => ({ type: AUTH_LOGIN, payload })
export const authLogoutAction = (payload) => ({ type: AUTH_LOGOUT, payload })
export const authUpdateUserData = (payload) => ({ type: AUTH_UPDATE_USER_DATA, payload })
export const authSetLoading = (payload) => ({ type: SET_LOADING, payload })