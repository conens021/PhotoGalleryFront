import React, { useEffect, useState } from 'react';
import './gallery-list.css'
import axios, { AxiosResponse, AxiosError } from 'axios';
import { Link as RouterLink } from 'react-router-dom'
import Link from '@mui/material/Link'
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import AddGalleryModal from './AddGalleryModal';
import { CircularProgress, Container } from "@mui/material";
import { Box } from '@mui/system';


function GalleryList(props) {

    const galleries = useSelector(state => state.galleries)
    const isLoading = useSelector(state => state.galleriesLoading)

    const user = JSON.parse(localStorage.getItem("userSession"))
    const jwt = localStorage.getItem("jwt")

    const dispatch = useDispatch()

    const navigate = useNavigate()


    //on page load fetch galleries
    useEffect(() => {
        fetchGalleriesFromServer()
    }, [])


    //Logout user end navigate to the login page
    const logoutHandler = () => {

        localStorage.removeItem('userSession');
        localStorage.removeItem('jwt');

        dispatch({ type: "LOGOUT_USER" })

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
            console.log("Problem with Response", err.response.status)
        } else if (err.request) {
            //if we have probmel with request jwt token is expired
            //so we logout user
            logoutHandler()
        }
    }

    const renderGalleries = () => {
        if (galleries.length > 0)
            return galleries.map(g => (

                <RouterLink to={`/galleries/${g.id}`}>
                    <Box>
                        {g.name}
                    </Box>
                </RouterLink>
            ))
        galleries.forEach(element => {
            console.log(element)
        });
    }

    const renderLoading = () => {
        return (
            <div className="loading-galleries">
                <CircularProgress sx={{color : 'secondary.light'}}/>
            </div>
        )
    }

    return (
        <ul>
            {isLoading && renderLoading()}

            {!isLoading &&
                <li className='gallery-list'>

                    <RouterLink to="/">
                        <Box sx= {{backgroundColor : 'secondary.main'}}>
                            Recently Added
                        </Box>
                    </RouterLink>

                    {renderGalleries()}
                </li>
            }

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