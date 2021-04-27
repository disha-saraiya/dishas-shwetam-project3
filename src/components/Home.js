import React, {useState, useEffect} from 'react';
import Post from './Post';
import Axios from 'axios'; 


function Home(){

const [allPosts, setPosts] = useState([]);  
//Get method on all the posts 
//Map out each post and it's content, title, username and send it as props to the Post component. 

useEffect(() => {

  setTimeout(() => {
    Axios.get('http://localhost:3000/api/posts/get').then((res) => {
    console.log(res); 
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