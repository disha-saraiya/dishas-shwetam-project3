import axios from 'axios';
import React, {useState} from 'react'
import {Form, Button} from 'react-bootstrap'; 
import '../App.css'; 

function NewPost(){

        //Holds they key pair value for each of our form fields.
        const [form, setForm] = useState({}); 
        const [errors, setErrors] = useState({});
    
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
            
            // console.log(newErrors); 
    
            //If there is no description, replace the URL with the description.
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
                    console.log(res);
                }).catch(function(error){
                    console.log(error); 
                })
            }
        } 


        
    return(
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
        )
}

export default NewPost; 