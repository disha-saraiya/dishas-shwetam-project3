import React, {useState} from 'react';
import moment from 'moment';
import {Button, Form} from 'react-bootstrap';
import { Redirect } from 'react-router';
import axios from 'axios'; 


function PostPage(props){

    const [comment, setComment] = useState(false); 
    const [commentContent, setCommentContent] = useState("");

    const handleComment = e => {
        e.preventDefault(); 
        setComment(true);
    }

    const handleSubmitComment = e => {
        e.preventDefault(); 
        alert('comment submitted');

        axios.post('/api/comments/create', {
            userId: props.user._id,
            content: commentContent,
            postId: props.postId,
        }).then(res => {
            console.log(res); 
        })
    }



    return(
        <div> 
        Here are the details of the post  
        <div className = "post_details">
            <h2> {props.postTitle}</h2>
            <h2> {moment(props.createdAt).format('MMMM Do YYYY')}</h2>
            <h2> Posted by : {props.username} </h2>
            <p> {props.description} </p>
            <Button> Like </Button>
            <Button> Report </Button>
            <Button onClick = {e => handleComment(e)}> Comment </Button>
            <br />
            <br /> 

            {comment && 
            <div>
            <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Comment here</Form.Label>
            <Form.Control as="textarea" rows={2} 
            onChange = {e => setCommentContent(e.target.value)} />
            </Form.Group>
            <Button onClick = {e => handleSubmitComment(e)}> submit comment </Button>
            </div>
            }
        </div>
        </div>
        )
} 

export default PostPage; 