import React from 'react';
import '../App.css'; 
import { Navbar, Nav } from 'react-bootstrap';

function Navigation(){

    return(
        <div className = "navigation">
                <Navbar collapseOnSelect sticky="top" variant = "light" expand="lg">
                    <Navbar.Brand href="home">The Wellness Forum</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="home">Home</Nav.Link>
                        <Nav.Link href="home">New</Nav.Link>
                        <Nav.Link href="link">Threads</Nav.Link>
                        <Nav.Link href="login">Login</Nav.Link>
                        <Nav.Link href="signup">Signup</Nav.Link>
                    </Nav>

                    </Navbar.Collapse>
    </Navbar>

        
</div>

        )
}

export default Navigation; 