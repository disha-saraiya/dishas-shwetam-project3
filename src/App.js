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


function App() {
  return (
    <div className="App">
      <Navigation />
      <Router>
      <Switch>
        <Route exact path = "/"><Home /></Route>
        <Route path = "/login"><Login /></Route>
        <Route path = "/signup"><Signup /></Route>
      </Switch>
      </Router>
      
    </div>
  );
}

export default App;
