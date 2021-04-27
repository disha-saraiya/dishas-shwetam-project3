import React, {useState} from 'react';
import {Card, Button} from 'react-bootstrap'; 
import '../App.css'
import moment from 'moment'; 
import PostPage from './PostPage';


function Post(props){

    const [showPost, setShowPost] = useState(false);
    const [form, setForm] = useState({}); 


    const handlePostOpen = (e) => {
            console.log('clicked')
            e.preventDefault(); 
            setShowPost(true); }

    if(showPost){
        return(
            <PostPage postTitle = {props.postTitle} createdAt = {props.post.createdAt}
            username = {props.username} description  = {props.post.description} user = {props.post.user} 
            postId = {props.post._id} />
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
            <Button> 10 Comments </Button>
            </Card.Body>
            <Card.Footer> Posted by {props.username} </Card.Footer> 
            </Card>
        </div>
        </div>
)
}

export default Post; 