import { Box, CircularProgress, Container } from "@mui/material";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddGalleryModal from "../Header/GalleryList/AddGalleryModal";
import PhotoList from "../Photos/PhotoList";

function Home() {

    const dispatch = useDispatch()

    const isLoading = useSelector(state => state.photosIsLoading)

    const user = JSON.parse(localStorage.getItem("userSession"))
    const jwt = localStorage.getItem("jwt")

    useEffect(() => {

        dispatch({ type: "SET_PHOTOS_LOADING", payload: true })

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt}`
        }

        axios.get(`http://localhost:5297/users/${user.id}/photos`, { headers: headers })
            .then(r => {

                dispatch({ type: "SET_PHOTOS", payload: r.data })

                setTimeout(() => {
                    dispatch({ type: "SET_PHOTOS_LOADING", payload: false })
                    console.log("SET LOADING FALSE")
                }, 500)

            }).catch(e => {
                console.log(e)
            })
    }, [])

    const renderLoading = () => {
        return (
            <div className="backdrop">
                <CircularProgress sx={{ color: 'secondary.light' }} />
            </div>
        )
    }

    return (
        <main>
            <Box sx={{ backgroundColor: 'primary.main' ,width : '100%',height:'100%',paddingTop : '50px'}} >

                {isLoading && renderLoading()}
                {
                    !isLoading &&
                    <Container maxWidth="lg" style={{ 'textAlign': 'center' }}>
                        <h2>Recently Added</h2>
                        <PhotoList />

                    </Container>
                }

            </Box>

        </main>
    );
}

export default Home;
