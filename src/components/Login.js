import React, {useState, useEffect} from 'react';
import { Form, Button } from 'react-bootstrap';
import '../App.css'; 
import Axios from 'axios'; 


function Login(){
    const jwt = require('jsonwebtoken');

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
            const {email, password} = form
            const newErrors = {} 

            if(!email || email === '') newErrors.email = "Email ID cannot be blank."
            //TODO : add username unique check 
            
            if(!password || password === '') newErrors.password = "Password cannot be blank."
            return newErrors
    }

    const handleSubmit = e => {
        e.preventDefault()

        const newErrors = findFormErrors()
        
        //console.log(newErrors); 

        if(Object.keys(newErrors).length > 0){
            setErrors(newErrors)
            
        }else{
            //TODO: write form submission to API logic here
            alert('Form is correct, submitting to API');   
            
            Axios.post('http://localhost:3000/api/login', form).then(function(response) {
                console.log(response);

            }).catch(function(error){
                console.log(error); 
            });
        }
    }


    return(
        <div>
            <h3> Login to The Wellness Forum </h3>

        <div id="login" className = "login_container">

            <Form>
            <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" 
            onChange = {e => setField('email', e.target.value)} isInvalid={!!errors.email} />
            <Form.Control.Feedback type = "invalid" > {errors.email} </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" 
            onChange = {e => setField('password', e.target.value)} isInvalid={!!errors.password} />
            <Form.Control.Feedback type = "invalid" > {errors.password} </Form.Control.Feedback>

            </Form.Group>


            <Button variant="primary" type="submit" onClick = {(e) => handleSubmit(e)}>
                Login
            </Button>
            </Form>
        </div>
        </div>
        )
}

export default Login; 