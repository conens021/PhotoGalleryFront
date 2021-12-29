import { Box, CircularProgress, Container } from "@mui/material";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import AddGalleryModal from "../Header/GalleryList/AddGalleryModal";
import PhotoList from "../Photos/PhotoList";
import AddPhotoModal from "./AddPhotoModal";

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
        requestPhotos()
    }, [])

    const requestPhotos = () => {

        dispatch({ type: "SET_PHOTOS_LOADING", payload: true })

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
        console.log("loading.....")
        return (
            <div className="backdrop">
                <CircularProgress sx={{ color: 'secondary.light' }} />
            </div>
        )
    }
    return (
        <main>
            <Box sx={{ backgroundColor: 'primary.main', width: '100%', height: '100%', paddingTop: '50px' }} >
                {isLoading && renderLoading()}
                {
                    !isLoading &&
                    <Container maxWidth="lg" style={{ 'textAlign': 'center' }}>
                        <h2>{gallery.name}</h2>
                        <PhotoList />
                        <AddPhotoModal />
                    </Container>
                }
            </Box>

        </main >
    );
}

export default Gallery;