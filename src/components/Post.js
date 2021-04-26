import React from 'react';
import {Card, Button} from 'react-bootstrap'; 
import '../App.css'

function Post(props){
    return(
        <div className = "home_container">
        <div className = "posts_container">
            <Card bg="light" text="info" className="post_card text-center">
            <Card.Header>{props.username}</Card.Header>
            <Card.Body>
            <Card.Title>{props.postTitle}</Card.Title>
            <Card.Text>
                {props.content}
            </Card.Text>
            <Button variant="primary">Report Post</Button>
            <Button variant = "primary"> Hide Post </Button>
            </Card.Body>
            <Card.Footer className="text-muted">2 days ago</Card.Footer>
            </Card>
        </div>
        </div>
        )
}

export default Post; 