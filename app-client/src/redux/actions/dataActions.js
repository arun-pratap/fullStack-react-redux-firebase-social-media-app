import { SET_SCREAMS, SUBMIT_COMMENT, LOADING_DATA, LOADING_UI, LIKE_SCREAM, UNLIKE_SCREAM, DELETE_SCREAM, POST_SCREAM, SET_ERRORS, CLEAR_ERRORS, SET_SCREAM, STOP_LOADING_UI } from "../type";
import Axios from "axios";

export const getScreams = () => (dispatch) => {
    dispatch({ type: LOADING_DATA })
    Axios.get('https://us-central1-spaceit-af177.cloudfunctions.net/api/screams')
        .then(res => {
            dispatch({
                type: SET_SCREAMS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: SET_SCREAMS,
                payload: []
            })
        })
}

export const getScream = (screamId) => (dispatch) => {
    dispatch({
        type: LOADING_UI
    })
    Axios.get(`https://us-central1-spaceit-af177.cloudfunctions.net/api/scream/${screamId}`)
        .then((res) => {
            dispatch({
                type: SET_SCREAM,
                payload: res.data
            })
            dispatch({
                type: STOP_LOADING_UI
            })
        })
        .catch((err) => [
            console.log(err)
        ])
}

export const likeScream = (screamId) => (dispatch) => {
    Axios.get(`https://us-central1-spaceit-af177.cloudfunctions.net/api/scream/${screamId}/like`)
        .then((res) => {
            dispatch({
                type: LIKE_SCREAM,
                payload: res.data
            })
        })
        .catch((err) => console.log(err))
}

export const unlikeScream = (screamId) => (dispatch) => {
    Axios.get(`https://us-central1-spaceit-af177.cloudfunctions.net/api/scream/${screamId}/unlike`)
        .then((res) => {
            dispatch({
                type: UNLIKE_SCREAM,
                payload: res.data
            })
        })
        .catch((err) => console.log(err))
}

export const submitComment = (screamId, commentData) => (dispatch) => {
    Axios.post(`https://us-central1-spaceit-af177.cloudfunctions.net/api/scream/${screamId}/comment`, commentData)
        .then((res) => {
            dispatch({
                type: SUBMIT_COMMENT,
                payload: res.data
            })
            dispatch(clearErrors())
        })
        .catch((err) => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        })
}

export const deleteScream = (screamId) => (dispatch) => {
    Axios.delete(`https://us-central1-spaceit-af177.cloudfunctions.net/api/scream/${screamId}`)
        .then(() => {
            dispatch({
                type: DELETE_SCREAM,
                payload: screamId
            })
        })
        .catch((err) => console.log(err))
}

export const postScream = (newScream) => (dispatch) => {
    dispatch({
        type: LOADING_UI
    })
    Axios.post(`https://us-central1-spaceit-af177.cloudfunctions.net/api/scream`, newScream)
        .then((res) => {
            dispatch({
                type: POST_SCREAM,
                payload: res.data
            })
            dispatch({
                type: CLEAR_ERRORS
            })
        })
        .catch((err) => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        })
}

export const getUser = (userHandle) => (dispatch) => {
    dispatch({ type: LOADING_DATA })
    Axios.get(`https://us-central1-spaceit-af177.cloudfunctions.net/api/user/${userHandle}`)
        .then((res) => {
            dispatch({
                type: SET_SCREAMS,
                payload: res.data.screams
            })
        })
        .catch(() => {
            dispatch({
                type: SET_ERRORS,
                payload: null
            })
        })
}

export const clearErrors = () => (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}