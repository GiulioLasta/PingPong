import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import cookie from 'js-cookie';
import {connect} from 'react-redux';

const AuthRoute = ({ component: Component, ...rest}) => {
    
    //console.log(rest.loggedIn);
    const token = cookie.get('token');
    //console.log('TEST->' + token);
    return (
        <Route
          { ...rest}
          render={ props => 
            token ? (
              <Component {...props}></Component>
            ) : (
              <Redirect
                to={{
                  pathname: "/login",
                  state: { from: props.location }
                }}
              />
            )
          }
        />
      );
}

const mapStateToProps = state => {
  return {
    loggedIn: state.auth.loggedIn
  }
};

export default connect(mapStateToProps)(AuthRoute);