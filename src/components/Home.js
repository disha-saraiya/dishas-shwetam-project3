import React, {useState} from 'react';
import Post from './Post';

import Axios from 'axios'; 


function Home(){

const [allPosts, setPosts] = useState([]);  
//Get method on all the posts 
//Map out each post and it's content, title, username and send it as props to the Post component. 

Axios.get('http://localhost:3000/api/posts/get')
     .then((res) => {
       setPosts(res.data.posts);
     }).catch(error => console.error(error)); 

 

return(
  <div className = "home_container">
  <div className = "posts_container">
    {/* <h1> {allPosts[0].title} </h1> */}


     {allPosts.map((post) => {
         <div>
         <Post postTitle = {post.title} content = {post.description} username = "username"/>
         </div>
       
     })}


  </div>
  </div>   
)
}
export default Home; 