import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import cookie from 'js-cookie';
import {connect} from 'react-redux';

const GuestRoute = ({ component: Component, ...rest}) => {
    // const token = cookie.get('token');
    //console.log('TEST->' + token);
    return (
        <Route
          {...rest}
          render={ props => 
            //!token 
            !rest.loggedIn ? (
              <Component {...props}></Component>
            ) : (
              <Redirect
                to={{
                  pathname: "/profile",
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

export default connect(mapStateToProps)(GuestRoute);