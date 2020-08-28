import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import firebase from 'firebase';
import {db, storage} from '../../firebase';
import styles from './ImageUpload.module.css';

const ImageUpload = ({username}) => {

    const [caption, setCaption] = useState('');
    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(0);

    const handleChange = (event) => {
        if(event.target.files[0]) {
            setImage(event.target.files[0]);
        }
    }

    const handleUpload = () => {
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                console.log(snapshot.bytesTransferred, snapshot.totalBytes )
                setProgress(Math.round((snapshot.bytesTransferred / snapshot.totalBytes) *100))
            },
            (error) => {
                alert(error.message);
            },
            () => {
                storage
                    .ref("images")
                    .child(image.name)
                    .getDownloadURL()
                    .then((downloadURL) => {
                        db
                            .collection("posts")
                            .add({
                                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                                caption: caption,
                                imageUrl: downloadURL,
                                username: username
                            })


                        setProgress(0);
                        setCaption('');
                        setImage(null);
                    })
                }

        )
    }

    return (
        <div className={styles.imageUpload}>
            <div className={styles.imageUpload__filePicker}>
                <input type="file" onChange={handleChange}/>
                <progress className={styles.imageUpload__progress} value={progress} max="100" />
            </div>

            <input type="text" placeholder="Enter a caption..." className={styles.imageUpload__caption} onChange={event => setCaption(event.target.value)} value={caption} />
            <Button onClick={handleUpload}>
                Upload
            </Button>
        </div>
    )
}

export default ImageUpload
