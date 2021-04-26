import React, {useState} from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import Axios from 'axios'; 


//https://dev.to/alecgrey/controlled-forms-with-front-and-backend-validations-using-react-bootstrap-5a2
function Signup(){
    const axios = require('axios').default;

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
            const {firstName, emailId, userName, password, confirmPassword} = form
            const newErrors = {} 

            if(!firstName || firstName === '') newErrors.firstName = "First name cannot be blank."
            if(!emailId || emailId === '') newErrors.emailId = "Email ID cannot be blank."
            if(!userName || userName === '') newErrors.userName = "Username cannot be blank."
            //TODO : add username unique check 
            
            if(!password || password === '') newErrors.password = "Password cannot be blank."
            if(password !== confirmPassword) newErrors.confirmPassword = "Passwords do not match! Please enter the correct password"

            return newErrors
    }

    const handleSubmit = e => {
        e.preventDefault()

        const newErrors = findFormErrors()
        
        console.log(newErrors); 

        if(Object.keys(newErrors).length > 0){
            setErrors(newErrors)
            
        }else{
            //TODO: write form submission to API logic here
            alert('Form is correct, submitting to API'); 

            Axios.post('/api/create', form).then(function(response) {
                console.log(response);
            }).catch(function(error){
                console.log(error); 
            });       
        }
    }

    return(
        <div>
            <h3> Welcome to The Wellness Forum </h3>
            <h4> Create an account </h4>
            <div className = "container">
            <Form>

            <Form.Group>
            <Form.Label>Name</Form.Label>
            <Row>
            <Col>
            <Form.Control placeholder="First name" type = "text" 
            onChange = {e => setField('firstName', e.target.value)} isInvalid={!!errors.firstName} />
            <Form.Control.Feedback type = "invalid" > {errors.firstName} </Form.Control.Feedback>
             </Col>
            <Col>
            <Form.Control placeholder="Last name" type = "text" onChange = {e => setField('lastName', e.target.value)} />
            </Col>
            </Row>
            </Form.Group>

            <br />
        
            <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" 
            onChange = {e => setField('emailId', e.target.value)} isInvalid = {!!errors.emailId} />
            <Form.Control.Feedback type = "invalid">{errors.emailId}</Form.Control.Feedback>
            <Form.Text className="text-muted">
                We'll never share your email with anyone else.
            </Form.Text>
            </Form.Group>

        
            <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control type="username" placeholder="Enter a username"  
            onChange = {e => setField('userName', e.target.value)} isInvalid = {!!errors.userName} />
            <Form.Control.Feedback type = "invalid"> {errors.userName} </Form.Control.Feedback>
            <Form.Text className="text-muted">
                Select a funky username, something you love!
            </Form.Text>
            </Form.Group>



            <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" 
            onChange = {e => setField('password', e.target.value)} isInvalid = {!!errors.password} />
            <Form.Control.Feedback type ="invalid"> {errors.password} </Form.Control.Feedback>
            </Form.Group>

            
            <Form.Group>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control type="password" placeholder="Confirm Password" 
            onChange = {e => setField('confirmPassword', e.target.value)} isInvalid = {!! errors.confirmPassword} />
            <Form.Control.Feedback type = "invalid"> {errors.confirmPassword} </Form.Control.Feedback>
            </Form.Group>


            <Button type="submit" onClick = {(e) => handleSubmit(e)}>
                Sign me up!
            </Button>


            </Form>
        </div>
        </div>
        )
}

export default Signup; 