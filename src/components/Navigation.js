import React from 'react';
import '../App.css'; 
import { Navbar, Nav } from 'react-bootstrap';
import {userLogin, userLoginError} from '../actions'; 
import {useSelector, useDispatch} from 'react-redux'; 
import { connect } from 'react-redux';


function Navigation(props){

    const dispatch = useDispatch(); 

    if(!props.isUserLoggedIn){
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
                        <Nav.Link href="/new">New</Nav.Link>
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

return(
    <div className = "navigation">
            <div className="row">
                <div className = "col-md-12">            
                <Navbar collapseOnSelect sticky="top" variant = "light" expand="lg">
                    <Navbar.Brand href="/">{props.user.firstName}'s Wellness Forum</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                    <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/new">New</Nav.Link>
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

let mapStateToProps =  function (state, props){ 
    console.log(state); 
    return{
        isUserLoggedIn: state.authReducer.isUserLoggedIn, 
        user: state.authReducer.user
    }
}

let mapDispatchToProps = function(dispatch, props){
    return{
        dispatch: dispatch, 
        userLogin, userLoginError
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation); 