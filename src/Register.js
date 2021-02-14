import React, { Component } from 'react';
import axios from 'axios';
import cookie from 'js-cookie';
import history from './history';
import Error from './Components/Error';

class Register extends Component {

    constructor(props){
        super(props);
        this.state = {name: '', email: '', password: '', password_confirmation: '',  errors: []};
    }

    handleForm = (e) => {
        e.preventDefault();

        const data = {
            name: this.state.name, 
            email: this.state.email, 
            password: this.state.password,
            password_confirmation: this.state.password_confirmation
        };

        axios.post("http://localhost:8000/api/auth/register", data)
        .then(res => {
            cookie.set('token', res.data.access_token);
            cookie.set('user', res.data.user);

            history.push("/profile");
            //console.log(res)
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
                                {/* {error.errors ? <p className="text-red-500 text-small">{error.errors}</p> : ""} */}
                                <div className="mt-4">
                                    <label>Name</label>
                                    <input type="text" name="name" 
                                        placeholder="lovely name"
                                        className="mt-1 p-2 bg-gray-200 rounded
                                        border border-gray-400 w-full"
                                        onChange={this.handleInput}></input>
                                </div>
                                <Error error={this.state.errors['name']?this.state.errors['name']:null}></Error>
                                
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
                                    <label>Confirm Password</label>
                                    <input type="password_confirmation" name="password" 
                                        placeholder="lovely password_confirmation"
                                        className="mt-1 p-2 bg-gray-200 rounded
                                        border border-gray-400 w-full"
                                        onChange={this.handleInput}></input>
                                </div>
                                <Error error={this.state.errors['password']?this.state.errors['password']:null}></Error>

                                <div className="mt-4">
                                    <input type="submit" 
                                        value="register"
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

export default Register;