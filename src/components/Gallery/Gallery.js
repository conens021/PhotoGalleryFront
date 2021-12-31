import { Box, CircularProgress, Container } from "@mui/material";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import PhotoList from "../Photos/PhotoList";
import AddPhotoModal from "./AddPhotoModal";
import CoverPhoto from "./CoverPhoto/CoverPhoto";

function Gallery() {

    const params = useParams()

    const dispatch = useDispatch()

    const jwt = localStorage.getItem("jwt")

    const isLoading = useSelector(state => state.photosIsLoading)

    const gallery = useSelector(state => state.gallery)


    useEffect(() => {
        requestPhotos()
    }, [params])


    useEffect(() => {
        console.log(gallery)
    }, [gallery])

    const requestPhotos = () => {

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt}`
        }

        axios.get(`http://localhost:5297/galleries/${params.id}`, { headers: headers })
            .then(r => {
                dispatch({ type: "SET_GALLERY", payload: r.data.gallery })

                dispatch({ type: "SET_PHOTOS", payload: r.data.photos })

                setTimeout(() => {
                    dispatch({ type: "SET_PHOTOS_LOADING", payload: false })
                    console.log("SET LOADING FALSE")
                }, 700)

            }).catch(e => {
                console.log(e)
            })
    }

    const renderLoading = () => {
        return (
            <div className="backdrop">
                <CircularProgress sx={{ color: 'secondary.light' }} />
            </div>
        )
    }
    return (
        <main>
            <Box sx={{ backgroundColor: 'primary.main', width: '100%', height: '100%', position: 'relative' }} >
                {isLoading && renderLoading()}
                {
                    !isLoading &&
                    <React.Fragment>
                        <CoverPhoto galleryName={gallery.name} />
                        <AddPhotoModal />
                        <PhotoList />
                    </React.Fragment>
                }
            </Box>
        </main >
    );
}

export default Gallery;