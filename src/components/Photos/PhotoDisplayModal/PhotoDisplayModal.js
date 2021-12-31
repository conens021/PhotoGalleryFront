import ReactDOM from "react-dom";
import './photo-modal.css'
import { PhotoModal } from '../../UI/PhotoModal/PhotoModal'
import CloseIcon from '@mui/icons-material/Close';
import ModalHeader from "./ModalHeader/ModalHeader";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

function PhotoDisplayModal({ vissible, closeModal }) {

    const photos = useSelector(state => state.photos)

    const photo = useSelector(state => state.photoModal)

    const dispatch = useDispatch()

    useEffect(() => {
        console.log(photo)
    }, [])


    const getNextPhoto = () => {

        if (photos != null) {
            const currentPhotoIndex = photos.indexOf(photo)

            if (currentPhotoIndex == -1) {

                return
            }

            if (currentPhotoIndex == photos.length - 1) {

                dispatch({ type: "SET_PHOTO_MODAL", payload: photos[0] })

                return
            }
            else {
                dispatch({ type: "SET_PHOTO_MODAL", payload: photos[currentPhotoIndex + 1] })
            }

        }
    }

    const getPreviusPhoto = () => {
        if (photos != null) {
            const currentPhotoIndex = photos.indexOf(photo)

            if (currentPhotoIndex == -1) {

                return
            }

            if (currentPhotoIndex == 0) {

                dispatch({ type: "SET_PHOTO_MODAL", payload: photos[photos.length - 1] })

                return
            }
            else {
                console.log("SELECTING NEXT ITEM IN ARRAY")
                dispatch({ type: "SET_PHOTO_MODAL", payload: photos[currentPhotoIndex - 1] })
            }

        }
    }

    return ReactDOM.createPortal(
        <PhotoModal vissible={vissible}>
            <ModalHeader>
                <CloseIcon id="close-photo-modal" sx={{ color: 'primary.contrastText' }} fontSize="medium" onClick={() => closeModal()} />
            </ModalHeader>
            <div className="photo-modal-image">
                <img src={`http://localhost:5297/images/${photo.path}`} />
            </div>

            <h2 onClick={getPreviusPhoto} id="modal-left-arrow">Left</h2>
            <h2 onClick={getNextPhoto} id="modal-right-arrow">Right</h2>

        </PhotoModal>,
        document.querySelector("#photo-display-modal")
    )
}

export default PhotoDisplayModal;