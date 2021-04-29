import './App.css';
import Navigation from './components/Navigation';
import Home from './components/Home';
import Login from './components/Login'; 
import Signup from './components/Signup'; 
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
} from 'react-router-dom';
import NewPost from './components/NewPost';

import {Provider} from 'react-redux'; 
import store from './store'; 
import PostPage from './components/PostPage';


function App() {
  return (
    <Provider store={store}>
    <div className="App">
      {/* <Navigation /> */}
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
    </Provider>
  );
}

export default App;
