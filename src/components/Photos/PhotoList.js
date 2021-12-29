import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import React from 'react'

import './photo-list.css'
import AddGalleryModal from '../Header/GalleryList/AddGalleryModal'

function PhotoList() {

    const photos = useSelector(state => state.photos)

    useEffect(() => {
        console.log(photos)
    }, [])

    useEffect(() => {
        console.log(photos)
    }, [photos])

    const renderPhotos = () => {
        if (photos != null) {
            return photos.map((photo) => (
                <ImageListItem key={photo.id}>
                    <img
                        src={`http://localhost:5297/images/${photo.path}`}
                        alt={photo.path}
                        loading="lazy"
                    />
                </ImageListItem>
            ))
        }

    }

    return (
        <div className='image-list-container'>
            <ImageList
                sx={{ width: '100%', height: 550 }}
                variant="quilted"
                cols={6}
                rowHeight={137}
            >
                {renderPhotos()}
            </ImageList>
        </div>


    )
}

export default PhotoList