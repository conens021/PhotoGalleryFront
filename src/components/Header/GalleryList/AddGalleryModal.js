import React, { useState } from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios'
import { useDispatch } from "react-redux";

function AddGalleryModal() {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const dispatch = useDispatch();

    const [galleryName, setGalleryName] = useState("")


    const user = JSON.parse(localStorage.getItem("userSession"))
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


    const galleryNameInputChange = (event) => {
        const galleryName = event.target.value
        setGalleryName(galleryName)
    }

    const galleryFormSubmited = (event) => {
        event.preventDefault()
        console.log(galleryName)
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt}`
        };

        const galleryRequestObject = {
            name: galleryName,
            userId: user.id
        }
        axios.post("http://localhost:5297/galleries", galleryRequestObject, { headers })
            .then(r => {
                const newGallery = r.data
                console.log(newGallery)
                dispatch({ type: "ADD_NEW_GALLERY", payload: newGallery })
                setOpen(false)

            })
            .catch(e => {
                console.log(e)
            })
    }


    return (

        <React.Fragment>
            <Fab onClick={e => { setOpen(true) }} variant="extended" size="medium" color="primary" aria-label="add">
                <AddIcon />
                Create Gallery
            </Fab>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Create Gallery
                    </Typography>

                    <Box component="form" onSubmit={galleryFormSubmited} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Gallery Name"
                            name="galleryName"
                            autoComplete="galleryName"
                            autoFocus
                            onChange={galleryNameInputChange}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Create
                        </Button>

                    </Box>
                </Box>
            </Modal>
        </React.Fragment>
    );
}

export default AddGalleryModal;