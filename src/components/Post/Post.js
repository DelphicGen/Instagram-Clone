import React, {useState, useEffect} from 'react';
import styles from './Post.module.css';
import Avatar from '@material-ui/core/Avatar';
import {db} from '../../firebase';
import firebase from 'firebase';
import { Button } from '@material-ui/core';

const Post = ({postId, user, username, caption, imageUrl}) => {

    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('')

    useEffect(() => {
        let unsubscribe
        if(postId) {
            unsubscribe = db
                .collection("posts")
                .doc(postId)
                .collection("comments")
                .orderBy('timestamp', 'desc')
                .onSnapshot(snapshot => {
                    setComments(snapshot.docs.map(doc => doc.data()))
                })
        }

        return () => {
            unsubscribe()
        }
    }, [postId]);

    const postComment = (event) => {
        event.preventDefault();
        db.collection("posts")
            .doc(postId)
            .collection("comments")
            .add({
                text: comment,
                username: user.displayName,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            })
        setComment('')
    }

    return (
        <div className={styles.post}>
            
            <div className={styles.post__header}>
                <Avatar 
                    className={styles.post__avatar}
                    alt={username}
                    src="/static/images/avatar/1.jpg"
                />
                <h3>{username}</h3>
            </div>

            {/* <img className={styles.post__image} src={require('../../images/' + imageUrl)} alt="" /> */}
            <img className={styles.post__image} src={imageUrl} alt="" />

            <h4 className={styles.post__text}><strong>{username}</strong> {caption}</h4>

            <div className={styles.post__comments}>
                {
                    comments.map(comment => (
                        <p>
                            <strong>{comment.username}</strong> {comment.text}
                        </p>
                    ))
                }
            </div>

            <form className={styles.post__commentBox}>
                <input type="text" className={styles.post__input} placeholder="Comment..." value={comment} onChange={event => setComment(event.target.value)} />
                <Button className={styles.post__button} disabled={!comment} type="submit" onClick={postComment}>
                    Post
                </Button>
            </form>
        </div>
    )
}

export default Post
