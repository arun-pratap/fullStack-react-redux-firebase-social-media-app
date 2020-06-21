import { SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI, SET_UNAUTHENTICATED, LOADING_USER } from '../type'
import Axios from 'axios'

export const loginUser = (userData, history) => (dispatch) => {
    //dispatchLoadingUI whileFetchingData
    dispatch({ type: LOADING_UI })

    //axiosFetchData
    Axios.post('https://us-central1-spaceit-af177.cloudfunctions.net/api/login', userData)
        .then((res) => {
            setAuthorizationHeader(res.data.token)
            dispatch(getUserData())
            dispatch({ type: CLEAR_ERRORS })
            history.push('/')
        })
        .catch((err) => {
            console.log(err)
            console.log(err.response)
            console.log(err.response.data)
            //action(anObjectOrfunction that returns object)
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
            //OR
            // dispatch : () => ok
        })
}

export const signupUser = (newUserData, history) => (dispatch) => {
    //dispatchLoadingUI whileFetchingData
    dispatch({ type: LOADING_UI })

    //axiosFetchData
    Axios.post('https://us-central1-spaceit-af177.cloudfunctions.net/api/signup', newUserData)
        .then((res) => {
            setAuthorizationHeader(res.data.token)
            dispatch(getUserData())
            dispatch({ type: CLEAR_ERRORS })
            history.push('/')
        })
        .catch((err) => {
            console.log(err)
            console.log(err.response)
            console.log(err.response.data)
            //action(anObjectOrfunction that returns object)
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
            //OR
            // dispatch : () => ok
        })

}

export const logoutUser = () => (dispatch) => {
    localStorage.removeItem('FBIdToken')
    delete Axios.defaults.headers.common['Authorization']
    dispatch({
        type: SET_UNAUTHENTICATED
    })
}

export const getUserData = () => (dispatch) => {
    dispatch({ type: LOADING_USER })
    Axios.get('https://us-central1-spaceit-af177.cloudfunctions.net/api/user')
        .then((res) => {
            dispatch({
                type: SET_USER,
                payload: res.data
            })
        })
        .catch((err) => {
            console.log(err)
        })
}

export const uploadImage = (formData) => (dispatch) => {
    dispatch({ type: LOADING_USER })
    Axios.post('https://us-central1-spaceit-af177.cloudfunctions.net/api/user/image', formData)
        .then(() => {
            dispatch(getUserData())
        })
        .catch((err) => console.log(err))
}

export const editUserDetails = (userDetails) => (dispatch) => {
    dispatch({ type: LOADING_USER })
    Axios.post('https://us-central1-spaceit-af177.cloudfunctions.net/api/user', userDetails)
        .then(() => {
            dispatch(getUserData())
        })
        .catch((err) => console.log(err))
}

const setAuthorizationHeader = (token) => {
    const FBIdToken = `Bearer ${token}`
    localStorage.setItem('FBIdToken', FBIdToken)
    Axios.defaults.headers.common['Authorization'] = FBIdToken
}