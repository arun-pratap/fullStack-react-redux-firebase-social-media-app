import { SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI, LIKE_SCREAM, SET_AUTHENTICATED, SET_UNAUTHENTICATED, LOADING_USER, UNLIKE_SCREAM } from '../type'

//locatState --- NOTglobalState
const initialState = {
    authenticated: false,
    loading: false,
    credentials: {},
    likes: [],
    notifications: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_AUTHENTICATED:
            return {
                ...state,
                authenticated: true
            }
        case SET_UNAUTHENTICATED:
            return {
                initialState
            }
        case SET_USER:
            return {
                authenticated: true,
                loading: false,
                ...action.payload
            }
        case LOADING_USER:
            return {
                ...state,
                loading: true
            }
        case LIKE_SCREAM:
            return {
                ...state,
                likes: [
                    ...state.likes,
                    {
                        userHandle: state.credentials.handle,
                        screamId: action.payload.screamId
                    }
                ]
            }
        case UNLIKE_SCREAM:
            return {
                ...state,
                likes: state.likes.filter((like) => like.screamId !== action.payload.screamId)
            }
        default:
            return state
    }
}