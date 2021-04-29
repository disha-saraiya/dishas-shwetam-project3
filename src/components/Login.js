import React, {useState} from 'react';
import { Form, Button } from 'react-bootstrap';
import '../App.css'; 
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";
import Axios from 'axios'; 
import {userLogin, userLoginError} from '../actions'; 
import {useDispatch} from 'react-redux'; 



function Login(props){
    //Holds they key pair value for each of our form fields.
    const [form, setForm] = useState({}); 
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch(); 
    const [isLoggedIn, setIsLoggedIn] = useState(false);


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
            
            if(!password || password === '') newErrors.password = "Password cannot be blank."
            return newErrors
    }

    const handleSubmit = e => {
        e.preventDefault()

        const newErrors = findFormErrors()
        
        if(Object.keys(newErrors).length > 0){
            setErrors(newErrors)
            
        }else{
            Axios.post('/api/login', form).then(function(response) {
                setIsLoggedIn(true);  
            }).catch(function(error){
                setIsLoggedIn(false); 
                alert('Could not log in. Please check your credentials!') 
            });
        }
    }
    
    if(isLoggedIn){
        return(
            <Redirect to= '/'></Redirect>
        )
    }

    return(
        <div className = "home_container">

            <div id="login" className = "login_container">
            <h3> Login to The Wellness Forum </h3>  
            <br />

            
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


            <button className = "login_button" type="submit" onClick = {(e) => handleSubmit(e)}>
                Login
            </button>
        </div>
        </div>
        )
}

export default Login; 