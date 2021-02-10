import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
  import history from './history';
  

class Login extends Component {

    constructor(props){
        super(props);
        this.state = {email: '', password: '', errors: []};
    }

    handleForm = (e) => {
        e.preventDefault();

        const data = {email: this.state.email,password: this.state.password};

        fetch("http://localhost:8000/api/auth/login", {
            method: 'post',
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" }
        })
        .then(res => res.json())
        .then(res => console.log(res))
        .catch(e => this.setState({errors:e.errors}))

        history.push("/profile");
    }

    handleInput = (e)=>{
        e.preventDefault();
        //console.log(e.target.value);
        const name = e.target.name;
        const value = e.target.value;

        this.setState({[name]:value})
    }

    render() {
        return (
            <div className="flex">
                <div className="w-1/3 p-4"></div>
                <div className="w-1/3 bg-white mt-10">
                    <form className="border border-gray-500 m-4"
                    onSubmit={this.handleForm}>
                        <div className="p-4">
                            <h1 className="text-lg border-b 
                                border-gray-500">Ping here</h1>
                                <div className="mt-4">
                                    <label>Email</label>
                                    <input type="email" name="email" 
                                        placeholder="lovely email"
                                        className="mt-1 p-2 bg-gray-200 rounded
                                        border border-gray-400 w-full"
                                        onChange={this.handleInput}></input>
                                </div>
                                
                                <div className="mt-4">
                                    <label>Password</label>
                                    <input type="password" name="password" 
                                        placeholder="lovely password"
                                        className="mt-1 p-2 bg-gray-200 rounded
                                        border border-gray-400 w-full"
                                        onChange={this.handleInput}></input>
                                </div>

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

export default Login;