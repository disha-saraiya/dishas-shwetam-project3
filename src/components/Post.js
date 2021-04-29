import React, {useState} from 'react';
import '../App.css'
import PostPage from './PostPage';


function Post(props){

    const [showPost, setShowPost] = useState(false);


    const handlePostOpen = (e) => {
            console.log('clicked')
            e.preventDefault(); 
            setShowPost(true); }

    if(showPost){
        return(
            <PostPage postTitle = {props.postTitle} createdAt = {props.post.createdAt}
            username = {props.username} description  = {props.post.description} user = {props.post.user} 
            postId = {props.post._id} comments = {props.post.comments} post = {props.post}/>
        )
    }

    function convertTZ(date, tzString) {
    date = props.post.createdAt; 
    let formatDate =  new Date((typeof date === "string" ? new Date(date) : date)
        .toLocaleString("en-US", {timeZone: tzString}));
    return formatDate.toLocaleString();   
}

    let formatDate = convertTZ(convertTZ(props.post.createdAt), Intl.DateTimeFormat().resolvedOptions().timeZone ); 

return(
    <div className = "posts_container">
        <p>Posted on {formatDate} by {props.username}</p>
        <h3><button type = "submit" onClick = {(e) => handlePostOpen(e)}>{props.postTitle} </button> </h3>
        <h5><button  type = "submit" onClick = {(e) => handlePostOpen(e)}>{props.post.comments.length} Comments </button> </h5>
    </div>
)
}

export default Post; 