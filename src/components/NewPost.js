import axios from 'axios';
import React, {useState, useEffect} from 'react'
import {Form, Button} from 'react-bootstrap'; 
import '../App.css'; 
import PostPage from './PostPage'; 
import Home from './Home'; 
import { Redirect } from "react-router-dom";
import Navigation from './Navigation';

function NewPost(props){
    console.log(props); 

    //https://stackoverflow.com/questions/52064303/reactjs-pass-props-with-redirect-component

        //Holds they key pair value for each of our form fields.
        const [form, setForm] = useState({}); 
        const [errors, setErrors] = useState({});
        const [isLoggedIn, setIsLoggedIn] = useState(false); 
        const [post, setPost] = useState(null); 
        const [newPost, isNewPost] = useState(typeof(props.location.state) === 'undefined' ? true : false)
        const [redirectToHome, setRedirectToHome] = useState(false); 



        useEffect(() => {
            //Use to check whether the user is logged in or not, when they go to create a new post. 
            axios.post('/api/authorize').then((response) => {
                console.log(response); 
                setIsLoggedIn(true); 
            }).catch((err) => {
                console.log(err);
                setIsLoggedIn(false); 
            })
        }, [])


        //Function to update state of the form
        const setField = (field, value) => {
            setForm({
                ...form, 
                [field]: value
            })
            // Check and see if errors exist, and remove them from the error object:
            if ( !!errors[field] ) setErrors({
                    ...errors,
                    [field]: null
            })
    
        }
    
        const findFormErrors = () => {
                const {title, url, description} = form
                const newErrors = {} 
    
                if(!title || title === '') newErrors.title = "Title cannot be blank."
                
                if(url && description) newErrors.content = "You cannot write the post and provide the URL, please only do either!"
                if(!url && !description) newErrors.content = "Please provide a URL or write your post."

                return newErrors
        }

        const handleSubmit = e => {
            e.preventDefault()
    
            const newErrors = findFormErrors()
            if(!form.description){
                form.description = form.url; 
            }


            if(Object.keys(newErrors).length > 0){
                setErrors(newErrors)
            }else{
                alert('Form is correct, submitting to API');
                
                axios.post('/api/posts/create', {
                    title: form.title,
                    description: form.description
                }).then(function(res) {
                    setPost(res.data.post); 
                }).catch(function(error){
                    alert('You need to be logged in to create a post!')
                })
            }
        } 

        const handleEditPost = (e) => {
            e.preventDefault(); 

            axios.patch(`/api/posts/update/${props.location.state.post._id}`, {
                title: form.newTitle, 
                description: form.newDescription
            }).then(res => {
                setRedirectToHome(true); 
            })
        }

        if(redirectToHome){
            return(
                <Redirect to="/"><Home /></Redirect>
            )
        }

        if(post !== null){
            return(
                <PostPage postTitle = {post.title} createdAt = {post.createdAt}
                username = {post.user.firstName} description  = {post.description} user = {post.user} />
            )
        }

        if(isLoggedIn && newPost){
        return(
        <div>
        <Navigation />
        <div className = "home_container">
           <div className = "new_post_container">
            <h3> Create a new post </h3>

            <Form>

            <Form.Group>
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" placeholder="Enter the title of your post" 
            onChange = {e => setField('title', e.target.value)} isInvalid = {!!errors.title}/>
            <Form.Control.Feedback type = "invalid" > {errors.title} </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId = "ControlTextarea">
                <Form.Label> Type your thoughts! </Form.Label>
                <Form.Control as="textarea" rows = {6} placeholder = "This is where I would type how much I love The Wellness Forum, for example..." 
                onChange = {e => setField('description', e.target.value)} isInvalid = {!!errors.content}/>
                <Form.Control.Feedback type = "invalid"> {errors.content} </Form.Control.Feedback>
            </Form.Group>

            <Form.Group>
                <Form.Label>URL to your post</Form.Label>
                <Form.Control type = "link" placeholder = "Enter the URL to your post" 
                onChange = {e => setField('url', e.target.value)} isInvalid = {!!errors.content} />
                <Form.Control.Feedback type = "invalid"> {errors.content} </Form.Control.Feedback>
            </Form.Group>
            <Button variant="primary" type="submit" onClick = {e => handleSubmit(e)}>
                Post
            </Button>
            </Form>
           </div>
        </div>
        </div>
        )
    } else if(isLoggedIn && (newPost === false)){
        return(
        <div>
        <Navigation />
        <div className = "home_container">
           <div className = "new_post_container">
            <h3> Edit your post </h3>

            <Form.Group>
            <Form.Label>New Title</Form.Label>
            <Form.Control type="text" placeholder= "Edit your title" 
            onChange = {e => setField('newTitle', e.target.value)}/>
            </Form.Group>

            <Form.Group controlId = "ControlTextarea">
                <Form.Label> New Content</Form.Label>
                <Form.Control as="textarea" rows = {6} placeholder = "Edit your description" 
                onChange = {e => setField('newDescription', e.target.value)}/>
            </Form.Group>

            <Button variant="primary" type="submit" onClick = {e => handleEditPost(e)}>
                Edit Post
            </Button>
           </div>
        </div>
        </div>
        )
    }
    
    return(<h2> Please login to continue </h2>)
}


export default NewPost; 