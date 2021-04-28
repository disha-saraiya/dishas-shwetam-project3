import React, {useState, useEffect} from 'react';
import moment from 'moment';
import {Button, Form} from 'react-bootstrap';
import axios from 'axios'; 
import '../App.css'; 
import Home from './Home'; 
import { Redirect } from "react-router-dom";
import NewPost from './NewPost';


function PostPage(props){

    const [comment, setComment] = useState(false); 
    const [editComment, setEditComment] = useState(false); 
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

    //console.log(loggedInUser.user._id); 
    //console.log(props.user._id); 

    const handleSubmitComment = e => {
        e.preventDefault(); 

            axios.post('/api/comments/create', {
                userId: props.user._id,
                content: commentContent,
                postId: props.postId,
            }).then(res => {
                //console.log(res); 
                setCommentsArray([...commentsArray, res.data])
            })
        
    }

    const handleDeleteComment = (e, commentId) => {
        e.preventDefault();     

        var indexOfComment = commentsArray.findIndex(comment => comment._id === commentId);

        axios.delete(`/api/comments/remove/${props.postId}/${commentId}`).then(res => {
            setCommentsArray([commentsArray.splice(indexOfComment,1)]);  
        })
    }

    const handleEditComment = (e) => {
        e.preventDefault(); 
        setEditComment(true);   
    }


    const handleSubmitEditedComment = (e, commentId)=> {
        e.preventDefault(); 
        
        console.log(commentsArray); 
        var indexOfComment = commentsArray.findIndex(comment => comment._id === commentId);
        // console.log(indexOfComment)
        // setCommentsArray([commentsArray.splice(indexOfComment, 1, {content: 'new comment'})])
        // console.log(commentsArray); 

        axios.put(`/api/comments/update/${props.postId}/${commentId}`, {
            content: commentContent
        }).then(res => {
            //setCommentsArray([commentsArray.splice(indexOfComment,1) ,res.data.comment])
            //setCommentsArray([commentsArray.splice(indexOfComment, 1, res.data.comment)])
            console.log(res)
        })

        setEditComment(false); 
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
            <div> 
            <div className = "post_details">
                <h2> {props.postTitle}</h2>
                <h2> {moment(props.createdAt).format('MMMM Do YYYY')}</h2>
                <h2> Posted by : {props.username} </h2>
                <p> {props.description} </p>
                <br />
                <br /> 
                <h4> Please login or create an account to comment on the post </h4>
            </div>
            </div>
            )}

   if(loggedInUser.user._id !== props.user._id){
    return(
        <div> 
        <div className = "post_details">
            <h2> {props.postTitle}</h2>
            <h2> {moment(props.createdAt).format('MMMM Do YYYY')}</h2>
            <h2> Posted by : {props.username} </h2>
            <p> {props.description} </p>
            <Button> Like </Button>
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
        
            {commentsArray.map((comment) => {
                return(
                    <div className = "comments_container">
                    <div key = {comment._id}>{comment.content}</div>
                    <Button onClick = {e => handleEditComment(e)}>edit</Button>
                    {/* {editComment && 
                        <div>
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Edit comment</Form.Label>
                        <Form.Control as="textarea" rows={1} 
                        onChange = {e => setCommentContent(e.target.value)} />
                        </Form.Group>
                        <Button onClick = {e => handleSubmitEditedComment(e, comment._id)}> edit comment </Button>
                        </div>
                    } */}
                    <Button onClick = {e => handleDeleteComment(e, comment._id)}>delete</Button>
                    </div>
                    )
            })
            }
        </div>
        </div>
        )
   }

    //The user who has created the post has logged in 
    return(
    <div> 
    <Button onClick = {e => handleEditPost(e)}> Edit Post </Button>
    <Button onClick = {e => handleDeletePost(e, props.postId, props.post)}> Delete Post </Button>
    <div className = "post_details">
        <h2> {props.postTitle}</h2>
        <h2> {moment(props.createdAt).format('MMMM Do YYYY')}</h2>
        <h2> Posted by : {props.username} </h2>
        <p> {props.description} </p>
        <Button> Like </Button>
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
    
        {commentsArray.map((comment) => {
            return(
                <div className = "comments_container">
                <div key = {comment._id}>{comment.content}</div>
                <Button onClick = {e => handleEditComment(e)}>edit</Button>
                {/* {editComment && 
                    <div>
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Edit comment</Form.Label>
                    <Form.Control as="textarea" rows={1} 
                    onChange = {e => setCommentContent(e.target.value)} />
                    </Form.Group>
                    <Button onClick = {e => handleSubmitEditedComment(e, comment._id)}> edit comment </Button>
                    </div>
                } */}
                <Button onClick = {e => handleDeleteComment(e, comment._id)}>delete</Button>
                </div>
                )
        })
        }
    </div>
    </div>
    )


} 

export default PostPage; 