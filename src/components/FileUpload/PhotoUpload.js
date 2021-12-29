import React from "react";
import { FileUploader } from "react-drag-drop-files";
import { useEffect, useState } from 'react';


function PhotoUpload() {

    const [files, setFiles] = useState([])

    useEffect(() => {
        console.log(files)
    }, [files])


    const fileUploadChangeHandler = (e) => {
        const files = e.target.files;
        Array.from(files).forEach(async file => {
            const base64 = await toBase64(file);
            setFiles(prev => [...prev, base64])
        });
    }

    const toBase64 = (file) => {

        return new Promise((resolve, reject) => {

            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result)
            }

            fileReader.onerror = (er) => {
                reject(er);
            }
        });
    }

    return (
        <React.Fragment>
             <input type="file" multiple onChange={fileUploadChangeHandler} />
        </React.Fragment>
    );
}

export default PhotoUpload;