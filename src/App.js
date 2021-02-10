import './App.css';
import './css/tailwind.css'
import Login from './Login.js';
import history from './history.js';
import Profile from './Profile.js';
import {
  Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <Router history={history}>
      <div className="bg-gray-300 h-screen">
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
      </div>
    </Router>
  );
}

export default App;
