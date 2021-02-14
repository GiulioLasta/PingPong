import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './store/index';
import {Provider} from 'react-redux';
import axios from 'axios';
import cookie from 'js-cookie';
import jwt from 'jsonwebtoken';

const jwt_secret = 'YV8LY1rin8Cb8qS0kjnZY2IPoHGaxLbuE3EYNgsHWXP1KUmASlmYUh5UOgxzZq88';
//pass token!
let token = cookie.get('token');

if(token){
  jwt.verify(token, jwt_secret, (err, decoded) => {
    if(err){
      token = null;
      cookie.remove("token");
    }else{
      if(decoded.iss !== 'http://localhost:8000/api/auth/login'){
        token = null;
        cookie.remove("token");
      }
    }
  });
}

const render = () => {
  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>,
    document.getElementById('root')
  );
};

if(token){
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  axios.post('http://localhost:8000/api/auth/me')
  .then(res => {
    //dispatch action
    store.dispatch({type: "SET_LOGIN", payLoad:res.data });
    //render only after data is retrieved
    render();
  });
}else{
  render();
}


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
