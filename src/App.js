import './App.css';
import './css/tailwind.css'
import Login from './Login.js';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <Router>
        <Route path="/login">
          <Login />
        </Route>
    </Router>
  );
}

export default App;
