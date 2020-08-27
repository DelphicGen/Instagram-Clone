import React from 'react';
import styles from './Post.module.css';
import Avatar from '@material-ui/core/Avatar';

const Post = ({username, caption, imageUrl}) => {
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

            <img className={styles.post__image} src={require('../../images/' + imageUrl)} alt=""/>

            <h4 className={styles.post__text}><strong>{username}</strong> {caption}</h4>
        </div>
    )
}

export default Post
