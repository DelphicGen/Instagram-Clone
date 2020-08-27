import React from 'react';
import styles from './Form.module.css';
import { TextField, Button } from '@material-ui/core';

const Form = ({form, handleFormChange, action1, action2, formType}) => {
    return (
        <div className={styles.formContainer}>
            <form className={styles.formContainer__form}>

                <center>
                    <img className="app__headerImage" src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt="instagram_logo"/>
                </center>

                {
                    formType === 'signup' && 
                    <TextField className={styles.formContainer__input} id="standard-basic" label="Username" value={form.username} name="username" onChange={handleFormChange} />
                }

                <TextField className={styles.formContainer__input} id="standard-basic" label="Email" value={form.email} name="email" onChange={handleFormChange} />
                <TextField className={styles.formContainer__input} type="password" id="standard-basic" label="Password" value={form.password} name="password" onChange={handleFormChange} />
                
                <Button type="submit" className={styles.formContainer__button} variant="contained" color="primary" onClick={action1}>
                    {
                        formType === 'login' ?
                        'Log In' :
                        'Sign Up'
                    }
                </Button>
                <Button className={styles.formContainer__button} color="secondary" onClick={formType === 'login' ? () => action2('signup') : () => action2('login')}>
                    {
                        formType === 'login' ?
                        'Sign Up' :
                        'Log In'
                    }
                </Button>

            </form>
        </div>
    )
}

export default Form
