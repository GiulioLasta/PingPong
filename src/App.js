import './App.css';
import './css/tailwind.css'
import Login from './Login.js';
import history from './history.js';
import Profile from './Profile.js';
import Register from './Register.js';
import {
  Router,
  // Switch,
  Route
  // Link
} from "react-router-dom";
import GuestRoute from './Components/GuestRoute';
import AuthRoute from './Components/AuthRoute';
import Layout from './Components/Layout';

function App() {
  return (
    <Router history={history}>
      <Layout>
        <div className="bg-gray-300 h-screen">
          <GuestRoute path="/login" component={Login}></GuestRoute>
          <AuthRoute path="/profile" component={Profile}></AuthRoute>
          <GuestRoute path="/register" component={Register}></GuestRoute>
        </div>
      </Layout>
    </Router>
  );
}

export default App;
