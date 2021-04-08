import React from 'react';
import { Form, Button } from 'react-bootstrap';
import '../App.css'; 


function Login(){
    return(
        <div>
            <h3> Login to The Wellness Forum </h3>
        <div id="login" className = "login_container">
            <Form>
            <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Button variant="primary" type="submit">
                Login
            </Button>
            </Form>
        </div>
        </div>
        )
}

export default Login; 