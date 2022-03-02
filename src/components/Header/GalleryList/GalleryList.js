import React, { useEffect, useState } from 'react';
import './gallery-list.css'
import axios from 'axios';
import { Link as RouterLink, useParams } from 'react-router-dom'
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import AddGalleryModal from './AddGalleryModal';
import { CircularProgress, Container } from "@mui/material";
import { Box } from '@mui/system';
import { toTitleCase } from '../.../../../../helpers/toTitleCase'
import AccessTimeIcon from '@mui/icons-material/AccessTime';


function GalleryList(props) {

    const galleries = useSelector(state => state.galleries)
    const isLoading = useSelector(state => state.galleriesLoading)
    const galleryId = useSelector(state => state.galleryId)

    const user = JSON.parse(localStorage.getItem("userSession"))
    const jwt = localStorage.getItem("jwt")

    const dispatch = useDispatch()

    const navigate = useNavigate()


    //on page load fetch galleries
    useEffect(() => {
        dispatch({ type: "SET_GALLERIES_LOADING", payload: true })
        fetchGalleriesFromServer()

    }, [])


    useEffect(() => { 
        console.log(`Gallery id ${galleryId}`)
    }, [galleryId])

    //Logout user end navigate to the login page
    const logoutHandler = () => {

        localStorage.removeItem('userSession');
        localStorage.removeItem('jwt');

        dispatch({ type: "LOGOUT_USER" })
        dispatch({ type: "SET_GALLERY_ID", payload: 0 })

        navigate("/login")
    }

    const fetchGalleriesFromServer = () => {

        dispatch({ type: "SET_GALLERIES_LOADING", payload: true })

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt}`,
        }

        axios.get(`http://localhost:5297/users/${user.id}/galleries`,

            { headers: headers })

            .then(addGalleries)
            .catch(handleError)
    }


    const addGalleries = (response) => {

        dispatch({ type: "SET_GALLERIES", payload: response.data.galleries })

        //for fake loading...
        setTimeout(() => {
            dispatch({ type: "SET_GALLERIES_LOADING", payload: false })
        }, 500)
    }

    const handleError = (err) => {
        if (err.response) {
        } else if (err.request) {
            logoutHandler()
        }
    }

    const changeGallery = (id) => {

        dispatch({ type: "SET_PHOTOS_LOADING", payload: true })
        dispatch({ type: "SET_GALLERY_ID", payload: id })
    }

    const renderGalleries = () => {

        console.log(galleryId)
        if (galleries.length > 0)
            return galleries.map(g => (

                <RouterLink onClick={() => changeGallery(g.id)} to={`/galleries/${g.id}`}>
                    <Box sx={galleryId == g.id && { backgroundColor: 'secondary.dark' }}>
                        {toTitleCase(g.name)}
                    </Box>
                </RouterLink>
            ))
    }

    const renderGalleryList = () => {
        return (
            <li className='gallery-list'>
                <RouterLink onClick={() => galleryId != 0 && changeGallery(0)} to="/" >
                    <Box sx={galleryId == 0 && { backgroundColor: 'secondary.dark' }} >
                        <AccessTimeIcon /> Recently Added
                    </Box>
                </RouterLink>
                {renderGalleries()}
            </li >
        )
    }

    const renderLoading = () => {
        return (
            <div className="loading-galleries">
                <CircularProgress sx={{ color: 'secondary.light' }} />
            </div>
        )
    }

    return (
        <ul>
            {isLoading && renderLoading()}

            {!isLoading && renderGalleryList()}

            <li className='create-gallery'>
                <AddGalleryModal />
            </li>

            <li className='logout-header'>
                <Button variant="contained" onClick={logoutHandler}>
                    Log Out
                </Button>
            </li>

        </ul >
    );
}

export default GalleryList;