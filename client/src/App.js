import './App.css';
import {Route,Switch} from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import Home from './components/Home/Home'
function App() {
  return (
    <Switch>
    <Route exact path='/'component={LandingPage}/>
    <Route path='/home' component={Home}/>
    </Switch>
  );
}

export default App;
