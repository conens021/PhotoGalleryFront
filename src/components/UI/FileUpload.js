import { Box } from '@mui/material'
import React, { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'

import './file-upload.css'

function FileUpload() {

    const style = {
        height: '150px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer'
    }

    const [files, setFiles] = useState([])
    const [previewFiles, setPreviewFiles] = useState([])

    useEffect(() => {

        files.forEach(f => {
            const reader = new FileReader()

            //when load end
            reader.onload = () => {
                setPreviewFiles( prev => ([...prev,reader.result]))
            }

            reader.readAsDataURL(f)

        })
    }, [files])

    const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
        setFiles(acceptedFiles)
    }, [])


    useEffect(() => {
        console.log(files.length)
    }, [files])


    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    const renderFilePreview = () => {
        return previewFiles.map(f => (
            <img src={f} />
        ))
    }

    return (
        <React.Fragment>
            <Box sx={{ borderStyle: 'dashed', borderWidth: '4px', borderColor: 'primary.main' }} style={style}
                {...getRootProps()}>
                <input {...getInputProps()} />
                {
                    isDragActive ?
                        <p>Drop the files here ...</p> :
                        <p>Drag 'n' drop some files here, or click to select files</p>
                }
            </Box>
            <div className='file-preview'>
                {renderFilePreview()}
            </div>

        </React.Fragment>

    )
}

export default FileUpload;