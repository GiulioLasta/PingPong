import React, { Component } from 'react';
// import {
//     BrowserRouter as Router,
//     Switch,
//     Route,
//     Link
//   } from "react-router-dom";
  import history from './history';
  import axios from 'axios';
  import cookie from 'js-cookie';
  import {connect} from 'react-redux';
  import Error from './Components/Error';

class Login extends Component {

    constructor(props){
        super(props);
        this.state = {email: '', password: '', errors: {}};
    }

    handleForm = (e) => {
        e.preventDefault();

        const data = {email: this.state.email,password: this.state.password};

        axios.post("http://localhost:8000/api/auth/login", data)
        .then(res => {
            //console.log(res)
            
            cookie.set('token', res.data.access_token);
            // cookie.set('user', res.data.user);//set below not needed here

            //dispatch
            this.props.setLogin(res.data.user);

            history.push("/profile");
        })
        .catch(e => this.setState({errors:e.response.data.errors}))

        // history.push("/profile");
    }

    handleInput = (e)=>{
        e.preventDefault();
        //console.log(e.target.value);
        const name = e.target.name;
        const value = e.target.value;

        this.setState({[name]:value})
    }

    render() {
        const error = this.state.errors;

        return (
            <div className="flex">
                <div className="w-1/3 p-4"></div>
                <div className="w-1/3 bg-white mt-10">
                    <form className="border border-gray-500 m-4"
                    onSubmit={this.handleForm}>
                        <div className="p-4">
                            <h1 className="text-lg border-b 
                                border-gray-500">Ping here</h1>
                                <Error error={this.state.errors['result']?this.state.errors['result']:null}></Error>
                                {/* {error.errors ? <p className="text-red-500 text-small">{error.errors}</p> : ""} */}
                                <div className="mt-4">
                                    <label>Email</label>
                                    <input type="email" name="email" 
                                        placeholder="lovely email"
                                        className="mt-1 p-2 bg-gray-200 rounded
                                        border border-gray-400 w-full"
                                        onChange={this.handleInput}></input>
                                </div>
                                <Error error={this.state.errors['email']?this.state.errors['email']:null}></Error>
                                
                                <div className="mt-4">
                                    <label>Password</label>
                                    <input type="password" name="password" 
                                        placeholder="lovely password"
                                        className="mt-1 p-2 bg-gray-200 rounded
                                        border border-gray-400 w-full"
                                        onChange={this.handleInput}></input>
                                </div>
                                <Error error={this.state.errors['password']?this.state.errors['password']:null}></Error>

                                <div className="mt-4">
                                    <input type="submit" 
                                        className="mt-1 p-2 w-full
                                        border border-gray-400 rounded
                                        cursor-pointer
                                        bg-purple-600
                                        text-white"></input>
                                </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setLogin: user => dispatch({
            type:"SET_LOGIN",
            payLoad: user
        })
    }
};

export default connect(null, mapDispatchToProps)(Login);