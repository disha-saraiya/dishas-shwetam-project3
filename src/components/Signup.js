import React, {useState} from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';

//https://dev.to/alecgrey/controlled-forms-with-front-and-backend-validations-using-react-bootstrap-5a2
function Signup(){
    //Holds they key pair value for each of our form fields.
    const [form, setForm] = useState({}); 
    const [errors, setErrors] = useState({});

    //Function to update state of the form
    const setField = (field, value) => {
        setForm({
            ...form, 
            [field]: value
        })

        console.log(form); 
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

    const handleSubmit = (e) => {
        e.preventDefault()

        const newErrors = findFormErrors()

        if(Object.keys(newErrors).length > 0){
            setErrors(newErrors)
        }else{
            //TODO: write form submission to API logic here
            alert('Form is correct, submitting to API'); 
        }


    }
    return(
        <div>
            <h3> Welcome to The Wellness Forum </h3>
            <h4> Create an account </h4>
            <div className = "container">
            <Form>

            <Form.Label>Name</Form.Label>
            <Row>
            <Col>
            <Form.Control placeholder="First name" type = "text" onChange = {e => setField('firstName', e.target.value)}/>
            </Col>
            <Col>
            <Form.Control placeholder="Last name" type = "text" onChange = {e => setField('lastName', e.target.value)} />
            </Col>
            </Row>

            <br />
        
            <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" onChange = {e => setField('emailId', e.target.value)}/>
            <Form.Text className="text-muted">
                We'll never share your email with anyone else.
            </Form.Text>
            </Form.Group>

        
            <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control type="username" placeholder="Enter a username"  onChange = {e => setField('userName', e.target.value)}/>
            <Form.Text className="text-muted">
                Select a funky username, something you love!
            </Form.Text>
            </Form.Group>



            <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" onChange = {e => setField('password', e.target.value)}/>
            </Form.Group>

            
            <Form.Group controlId="formBasicPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control type="password" placeholder="Confirm Password" onChange = {e => setField('confirmPassword', e.target.value)}/>
            </Form.Group>


            <Button variant="primary" type="submit" onClick = {e => handleSubmit()}>
                Sign me up!
            </Button>
            </Form>
        </div>
        </div>
        )
}

export default Signup; 