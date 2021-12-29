import { createStore } from 'redux'

const initialState = {
    userLogedIn: false,
    photos: [],
    galleries: [],
    galleriesLoading : true,
    photosIsLoading : true,
    gallery : {}
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case "LOGIN_USER":

            return { ...state, userLogedIn: true }

        case "LOGOUT_USER":

            return { ...state, logedIn: false }


        case "SET_PHOTOS":

            return { ...state, photos: action.payload }

        case "SET_GALLERIES":
            return { ...state, galleries: action.payload }

        case "SET_GALLERY":
            return{
                ...state,gallery : action.payload
            }

        case "ADD_NEW_GALLERY":

            const newGallery = action.payload

            return {
                ...state,
                galleries : [newGallery,...state.galleries]
            }
        case "SET_PHOTOS_LOADING":
            return{
                ...state,
                photosIsLoading : action.payload
            }
        case "SET_GALLERIES_LOADING":
            return{
                ...state,
                galleriesLoading : action.payload
            }
        default:
            return {
                ...state
            }
    }
}

const store = createStore(rootReducer)

export default store