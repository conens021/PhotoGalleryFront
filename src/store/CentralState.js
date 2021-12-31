import { createStore } from 'redux'

const initialState = {
    userLogedIn: false,
    photos: [],
    galleries: [],
    galleriesLoading: false,
    photosIsLoading: false,
    gallery: {},
    photoModal: {}
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


            return {
                ...state, gallery: action.payload
            }

        case "ADD_NEW_GALLERY":

            const newGallery = action.payload

            return {
                ...state,
                galleries: [newGallery, ...state.galleries]
            }
        case "ADD_NEW_PHOTOS":


            return {
                ...state, photos: [...action.payload, ...state.photos]
            }

        case "SET_PHOTOS_LOADING":


            return {
                ...state,
                photosIsLoading: action.payload
            }

        case "SET_GALLERIES_LOADING":


            return {
                ...state,
                galleriesLoading: action.payload
            }

        case "SET_PHOTO_MODAL":
            console.log(`New photo in modal :`)
            console.log(action.payload)
            return {
                ...state,
                photoModal: action.payload
            }
        default:


            return {
                ...state
            }
    }
}

const store = createStore(rootReducer)

export default store