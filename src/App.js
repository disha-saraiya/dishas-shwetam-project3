import './App.css';
import Home from './components/Home';
import Login from './components/Login'; 
import Signup from './components/Signup'; 
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import NewPost from './components/NewPost';
import PostPage from './components/PostPage';


function App() {
  return (
    <div className="App">
      <Router>
      <Switch>
        <Route exact path = "/"><Home /></Route>
        <Route path = "/login"><Login /></Route>
        <Route path = "/signup"><Signup /></Route>
        <Route path = "/new" render = {props => <NewPost {...props} />}></Route>
        <Route path = "/postPage"><PostPage /></Route>
      </Switch>
      </Router>
    </div>
  );
}

export default App;
