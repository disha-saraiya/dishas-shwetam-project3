import React, {useState} from 'react';
import {Card, Button} from 'react-bootstrap'; 
import '../App.css'
import moment from 'moment'; 


function Post(props){

    const [showPost, setShowPost] = useState(false);

    const handlePostOpen = (e) => {
            console.log('clicked')
            e.preventDefault(); 
            setShowPost(true); }

    
    const handlePostClose = (e) => {
        e.preventDefault(); 
        setShowPost(false); 
    }

    if(showPost){
        return(
            <div> 
                Here are the details of the post  
                <div className = "post_details">
                    <h2> {props.postTitle}</h2>
                    <h2> {moment(props.post.createdAt).format('MMMM Do YYYY')}</h2>
                    <h2> Posted by : {props.username} </h2>
                    <p> {props.post.description} </p>
                </div>
                <Button onClick = {(e) => handlePostClose(e)}> Back to all posts </Button>
            </div>
            
        )
    }
            
    return(
        <div className = "home_container">
        <div className = "posts_container">
            <Card bg="light" text="info" className="post_card text-center">
            <Card.Header>Posted on {moment(props.post.createdAt).format('MMMM Do YYYY')} </Card.Header>
            <Card.Body>
            <Card.Title><Button type = "submit" onClick = {(e) => handlePostOpen(e)} >
                {props.postTitle} </Button> </Card.Title>
            </Card.Body>
            <Card.Footer> Posted by {props.username} </Card.Footer> 
            </Card>
        </div>
        </div>
)
}

export default Post; 