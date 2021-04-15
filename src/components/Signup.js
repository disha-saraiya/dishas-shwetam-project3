import React from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';


function Signup(){
    return(
        <div>
            <h3> Welcome to The Wellness Forum </h3>
            <h4> Create an account </h4>
            <div className = "container">
            <Form>

            <Form.Label>Name</Form.Label>
            <Row>
            <Col>
            <Form.Control placeholder="First name" />
            </Col>
            <Col>
            <Form.Control placeholder="Last name" />
            </Col>
            </Row>

            <br />
        
            <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
                We'll never share your email with anyone else.
            </Form.Text>
            </Form.Group>

        
            <Form.Group controlId="formBasicEmail">
            <Form.Label>Username</Form.Label>
            <Form.Control type="username" placeholder="Enter a username" />
            <Form.Text className="text-muted">
                Select a funky username, something you love!
            </Form.Text>
            </Form.Group>



            <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password"/>
            </Form.Group>

            
            <Form.Group controlId="formBasicPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control type="password" placeholder="Confirm Password"/>
            </Form.Group>


            <Button variant="primary" type="submit">
                Sign me up!
            </Button>
            </Form>
        </div>
        </div>
        )
}

export default Signup; 