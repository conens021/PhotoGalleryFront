import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import FileUpload from "../UI/FileUpload";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import './add-photo-modal.css'

function AddPhotoModal() {

    const [open, setOpen] = useState(false);

    const [files, setFiles] = useState([]);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const gallery = useSelector(state => state.gallery)

    const dispatch = useDispatch()

    const jwt = localStorage.getItem("jwt")

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
    };

    const fileTypes = ["JPG", "PNG", "GIF", "JPEG", "SVG"];


    const galleryFormSubmited = (event) => {

        dispatch({ type: "SET_PHOTOS_LOADING", payload: true })

        event.preventDefault()

        const url = "http://localhost:5297/photos/base64"

        const formRequestObject = {
            Files: files,
            GalleryId: gallery.id
        }


        const headers = {
            'content-type': 'application/json',
            'Authorization': `Bearer ${jwt}`
        }

        axios.post(url, formRequestObject, { headers: headers })
            .then(actionResponse)
            .catch(handleError)

    }

    const actionResponse = (response) => {
        const newPhotos = response.data.photos
        console.log(newPhotos)
        setTimeout(() => {
            dispatch({ type: "ADD_NEW_PHOTOS", payload: newPhotos })
            dispatch({ type: "SET_PHOTOS_LOADING", payload: false })

        }, 2000)

    }

    const handleError = (err) => {
        if (err.response) {
            console.log("Problem with Response", err.response)
            console.log("Problem with Response", err.response.status)
        } else if (err.request) {
            console.log("Problem with Request", err.request)
        }
    }

    const addPhotoToFormData = (photo) => {
        setFiles(prev => ([...prev, photo]))
    }

    const renderFilePreview = () => {
        return files.map(f => (
            <img src={f} />
        ))
    }

    return (

        <div className="add-photo-modal">
            <Fab onClick={e => { setOpen(true) }} size="medium" color="secondary" aria-label="add">
                <AddIcon />
            </Fab>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">

                <Box sx={style}>

                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Add new photo
                    </Typography>

                    <Box component="form" enctype="multipart/form-data"
                        onSubmit={galleryFormSubmited} noValidate sx={{ mt: 1, display: 'flex', flexDirection: 'column' }}>

                        <FileUpload toFormData={addPhotoToFormData} />

                        <div className='file-preview'>
                            {renderFilePreview()}
                        </div>

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}>
                            PUBLISH PHOTOS
                        </Button>

                    </Box>
                </Box>
            </Modal>
        </div>
    );
}

export default AddPhotoModal;