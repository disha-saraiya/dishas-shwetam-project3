import React, {useState, useEffect} from 'react';
import Post from './Post';
import Axios from 'axios'; 


function Home(){

const [allPosts, setPosts] = useState([]);  

useEffect(() => {

  setTimeout(() => {
    Axios.get('http://localhost:3000/api/posts/get').then((res) => {
    setPosts(res.data.posts) 
  }).catch(error => console.error(error));
  }, 1000)
}, [])

return(
  <div className = "home_container">
    
  <div className = "posts_container">

     {allPosts.map((post) => {
       return(
         <div>
         <Post post = {post} postTitle = {post.title} username = {post.user.firstName} showPost = {false} />
         </div>
       ) 
     })} 

  </div>
  </div>   
)
}
export default Home; 