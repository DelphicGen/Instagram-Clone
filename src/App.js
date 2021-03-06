import React, {useState, useEffect} from 'react';
import './App.css';
import Post from './components/Post/Post';
import {db, auth} from './firebase';
import Form from './components/Form/Form';
import { Button } from '@material-ui/core';
import ImageUpload from './components/ImageUpload/ImageUpload';
import InstagramEmbed from 'react-instagram-embed';

function App() {

  const [posts, setPosts] = useState([]);
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [formType, setFormType] = useState('login');
  const [user, setUser] = useState(null);

  useEffect(() => {
    
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);

        if(authUser.displayName) {
          // don't update username
        } else {
          // if we just created someone
          return authUser.updateProfile({
            displayName: form.username
          });
        }

      } else {
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    }

  }, [form.username]);

  useEffect(() => {

    db.collection('posts').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
        setPosts(snapshot.docs.map( doc => ({
          id: doc.id, 
          post: doc.data()
        })
      ));
    });

  }, []);

  const handleFormChange = (e) => {
    let {name, value} = e.target
    setForm((prevForm) => ({
        ...prevForm,
        [name]: value
    }))
  }

  const login = (event) => {
    event.preventDefault();
    auth.signInWithEmailAndPassword(form.email, form.password)
      .then(response => {
        setForm({
          username: '',
          email: '',
          password: ''
        })
      })
      .catch((error) => alert(error.message));
  }

  const signup = (event) => {
    event.preventDefault();
    auth.createUserWithEmailAndPassword(form.email, form.password)
      .then(authUser => {
        setForm({
          username: '',
          email: '',
          password: ''
        })
        setFormType('login');
      })
      .catch((error) => alert(error.message))
  }

  const logout = (event) => {
    event.preventDefault();
    auth.signOut()
    .then(response => {
      setUser(null);
    })
    .catch((error) => alert(error.message))
  }

  return (
    <div className="App">
      
      {
        user ? 
        (

            <React.Fragment>
              <div className="app__header">
                <img className="app__headerImage" src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt="instagram_logo"/>
                <Button onClick={logout}>Log Out</Button>
              </div>

              
              {/* <div className="app_post"> */}
                <div className="app__postsLeft">
                  {
                    posts.map(({id, post}) => (
                      <Post postId={id} user={user} username={post.username} caption={post.caption} imageUrl={post.imageUrl} key={id} />
                    ))
                  }
                </div>
                {/* <div className="app__postsRight">
                  <InstagramEmbed
                    url='https://instagr.am/p/Zw9o4/'
                    maxWidth={300}
                    minWidth={150}
                    hideCaption={false}
                    containerTagName='div'
                    protocol=''
                    injectScript
                    onLoading={() => {}}
                    onSuccess={() => {}}
                    onAfterRender={() => {}}
                    onFailure={() => {}}
                  />
                </div> */}
              {/* </div> */}
              <ImageUpload username={user.displayName} />
            </React.Fragment>
            
        ) : 
        (

          <Form form={form} handleFormChange={handleFormChange} action1={formType === 'login' ? login : signup} action2={setFormType} formType={formType} />

        )
      }

    </div>
  );
}

export default App;
