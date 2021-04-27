import React, {useState, useEffect} from 'react';
import '../App.css'; 
import { Navbar, Nav, Button } from 'react-bootstrap';
import axios from 'axios';

function Navigation(){

    const [isLoggedIn, setIsLoggedIn] = useState(false); 
    const [firstName, setFirstName] = useState(""); 
    

    
    useEffect(() => {
        axios.post('/api/authorize').then((response) => {
            console.log(response); 
            setFirstName(response.data.firstName);
            setIsLoggedIn(true); 

        }).catch((err) => {
            console.log(err);
            setIsLoggedIn(false); 
        })
    }, [])

    const handleLogout = (e) => {
        e.preventDefault(); 
        axios.post('/api/logout').then(res => {
            console.log(res); 
            setIsLoggedIn(false); 
        }).catch(err => {
            console.log(err); 
        })
    }   

if(isLoggedIn){
    return(
        <div className = "navigation">
            <div className="row">
                <div className = "col-md-12">            
                <Navbar collapseOnSelect sticky="top" variant = "light" expand="lg">
                    <Navbar.Brand href="/">The Wellness Forum</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/new">New</Nav.Link>
                    </Nav>
                    </Navbar.Collapse>
                    <Navbar.Text>
                        Signed in as {firstName}
                    </Navbar.Text>
                    <Button onClick = {(e) => handleLogout(e)}> Logout </Button>
    </Navbar>
    </div>
    </div>
</div>
)
}

//If user is not logged in (default) 
return(
    <div className = "navigation">
        <div className="row">
            <div className = "col-md-12">            
            <Navbar collapseOnSelect sticky="top" variant = "light" expand="lg">
                <Navbar.Brand href="/">The Wellness Forum</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/login">Login</Nav.Link>
                    <Nav.Link href="/signup">Signup</Nav.Link>
                </Nav>
                </Navbar.Collapse>
</Navbar>
</div>
</div>
</div>
)
}
export default Navigation; 