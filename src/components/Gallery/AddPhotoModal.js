import React, { useState } from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import FileUpload from "../UI/FileUpload";


function AddPhotoModal() {

    const [open, setOpen] = useState(false);

    const [files, setFiles] = useState([]);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


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


    const fileTypes = ["JPG", "PNG", "GIF", "JPEG", "SVG"];


    const handleChange = (files) => {
        console.log(files)
    };

    const galleryFormSubmited = (event) => {
        event.preventDefault()
        console.log("form submited...")
    }

    return (

        <React.Fragment>
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
                    <Box component="form" onSubmit={galleryFormSubmited} noValidate sx={{ mt: 1, display: 'flex', flexDirection: 'column' }}>

                        <FileUpload />

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
        </React.Fragment>
    );
}

export default AddPhotoModal;