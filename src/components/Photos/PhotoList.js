import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import React from 'react'

import LazyLoad from 'react-lazyload'

import './photo-list.css'
import PhotoDisplayModal from './PhotoDisplayModal/PhotoDisplayModal'

function PhotoList() {

    const photos = useSelector(state => state.photos)

    const [modalVisible, setModalVisible] = useState(false)

    const dispatch = useDispatch()




    useEffect(() => {
        renderPhotos()
    }, [photos])

    const showPhotoModal = (photo) => {
        dispatch({ type: "SET_PHOTO_MODAL", payload: photo })
        setModalVisible(true)
    }

    const closeModal = () => {
        setModalVisible(false)
    }

    const renderPhotos = () => {
        if (photos != null) {
            return photos.map((photo) => (
                <LazyLoad height={200} key={photo.id}>
                    <img class='lazy'
                        src={`http://localhost:5297/images/${photo.path}`}
                        alt={photo.path}
                        loading="lazy"
                        onClick={() => showPhotoModal(photo)}
                    />
                </LazyLoad>
            ))
        }

    }



    return (
        <React.Fragment>

            {
                modalVisible
                &&
                <PhotoDisplayModal closeModal={closeModal} vissible={modalVisible} />
            }

            {
                !modalVisible
                &&
                <div className='image-list-container' onScroll={() => { console.log("SCROLLED") }}>
                    {renderPhotos()}
                </div>
            }

        </React.Fragment>


    )
}

export default PhotoList