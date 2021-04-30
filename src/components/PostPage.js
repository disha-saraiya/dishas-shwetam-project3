import React, {useState, useEffect} from 'react';
import moment from 'moment';
import {Form} from 'react-bootstrap';
import axios from 'axios'; 
import '../App.css'; 
import Home from './Home'; 
import { Redirect } from "react-router-dom";


function PostPage(props){

    const [comment, setComment] = useState(false); 
    const[loggedInUser, setLoggedInUser] = useState({
        user: null, isLoggedIn: false
    }); 
    const [commentContent, setCommentContent] = useState("");
    const [commentsArray, setCommentsArray] = useState(props.comments ? props.comments : []); 
    const [redirectToHome, setRedirectToHome] = useState(false); 
    const [redirectToEditPost, setRedirectToEditPost] = useState(false); 
    
    const handleComment = e => {
        e.preventDefault(); 
        setComment(true);
    }

    useEffect(() => {
        //Use to check whether the user is logged in or not, when they go to create a new post. 
        axios.post('/api/authorize').then((response) => {
            console.log(response); 
            setLoggedInUser({
                user: response.data,
                isLoggedIn: true
            }); 
        }).catch((err) => {
            console.log(err);
            setLoggedInUser({
                user:{},
                isLoggedIn: false
            });  
        })
    }, [])

    const handleSubmitComment = e => {
        e.preventDefault(); 

            axios.post('/api/comments/create', {
                userId: props.user._id,
                content: commentContent,
                postId: props.postId,
            }).then(res => {
                setCommentsArray([...commentsArray, res.data])
            })
        
    }

    const handleDeleteComment = (e, commentId) => {
        e.preventDefault();     

        let indexOfComment = commentsArray.findIndex(comment => comment._id === commentId);

        axios.delete(`/api/comments/remove/${props.postId}/${commentId}`).then(res => {
            commentsArray.splice(indexOfComment,1);
            setCommentsArray([...commentsArray]);  
        })
    }

    const handleDeletePost = (e, postId) => {
        e.preventDefault(); 

        axios.delete(`/api/posts/remove/${postId}`).then(res => {
            console.log(res); 
            setRedirectToHome(true); 
        })
    }

    if(redirectToHome){
        return(
            <Redirect to="/"><Home /></Redirect>
        )
    }

    const handleEditPost = (e, postId, post) => {
        e.preventDefault(); 
        setRedirectToEditPost(true); 
    }

    if(redirectToEditPost){
        return(
            <Redirect to = {{
                pathname: "/new", 
                state: {post : props.post}
            }}></Redirect>
        )
    }

    if(!loggedInUser.isLoggedIn){
        return(
            <div className = "post_details">
                <h2 className = "post_title"> {props.postTitle}</h2>
                <h5>Posted on {moment(props.createdAt).format('MMMM Do YYYY')}, by {props.username} </h5>
                <p className = "description"> {props.description} </p>
                <br />
                <p className = "notice">Please <a href="/login">login</a> or
                     <a href = "/signup"> create an account</a> to comment on the post </p>
                <div> 
                {(commentsArray.length === 0) ? <p> There are no comments for this post yet </p> : <p> Comments: </p>}
                {commentsArray.map((comment) => {
                return(
                    <div className = "comments_container">
                    <div key = {comment._id}>{comment.content}</div>
                    </div>
                    )
                 })
                }
                </div>     
            </div>
            )}

   if(loggedInUser.user._id !== props.user._id){
    return(     
        <div className = "post_details">
            <h2 className = "post_title"> {props.postTitle}</h2>
            <h5>Posted on {moment(props.createdAt).format('MMMM Do YYYY')}, by {props.username} </h5>
            <p className = "description" > {props.description} </p>
            <br />
            <button className = "post_button" onClick = {e => handleComment(e)}> Comment </button>
            <br />
            <br /> 

            {comment && 
            <div className = "comment_box">
            <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Comment here</Form.Label>
            <br />
            <Form.Control as="textarea" rows={2} 
            onChange = {e => setCommentContent(e.target.value)} />
            </Form.Group>
            <button className = "post_button" onClick = {e => handleSubmitComment(e)}> submit comment </button>
            <br />
            </div>
            }
        
            {commentsArray.map((comment) => {
                return(
                    <div key = {comment._id}>
                    <div className = "comments_container">
                    <span key = {comment._id}>
                    <p className = "comment_content">{comment.content}</p> 
                    <button className = "comment_button" onClick = {e => handleDeleteComment(e, comment._id)}> delete </button>
                    </span>
                    </div>
                    </div>
                    )
            })
            }
        </div>
        )
   }

    //The user who has created the post has logged in 
    return(
        <div className = "post_details"> 
        
            <button className = "post_button" onClick = {e => handleEditPost(e)}> Edit Post </button>
            <button className= "post_button" onClick = {e => handleDeletePost(e, props.postId, props.post)}> Delete Post </button>
                <h2 className = "post_title"> {props.postTitle}</h2>
                <h5>Posted on {moment(props.createdAt).format('MMMM Do YYYY')}, by {props.username} </h5>
                <p className = "description"> {props.description} </p>
                <button className = "post_button" onClick = {e => handleComment(e)}> Comment </button>

                <br />
                <br /> 
                {comment && 
                <div className = "comment_box">
                <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Control as="textarea" rows={2} 
                onChange = {e => setCommentContent(e.target.value)} />
                <button className = "post_button" onClick = {e => handleSubmitComment(e)}> submit comment </button>
                </Form.Group>
                </div>
                }
            
                {commentsArray.map((comment) => {
                return(
                    <div key = {comment._id}>
                    <div className = "comments_container">
                    <span key = {comment._id}>
                    <p className = "comment_content">{comment.content}</p> 
                    <button className = "comment_button" onClick = {e => handleDeleteComment(e, comment._id)}> delete </button>
                    </span>
                    </div>
                    </div>
                )
            })
            }
        </div>
        )
} 

export default PostPage; 