import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import axios from "axios";
import cookie from 'js-cookie';

class Profile extends Component {
    
    constructor(props){
        super(props);

        let a = cookie.get('user');
        debugger;

        this.state = {email: props.email, name: props.name, errors: {}};
    }
    
    handleInput = (e)=>{
        e.preventDefault();
        //console.log(e.target.value);
        const name = e.target.name;
        const value = e.target.value;

        this.setState({[name]:value})
    }

    handleForm = (e) => {
        e.preventDefault();

        const data = {email: this.state.email, name: this.state.name};
        let token = cookie.get('token');

        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        axios.patch("http://localhost:8000/api/auth/update", data)
        .then(res => {
            //dispatch
            // this.props.updateUser(res.data.user);
        })
        .catch(e => this.setState({errors:e.response.data}))

        // history.push("/profile");
    }

    render() {
        return (
            <div className="flex w-full">
                <aside className="w-1/6 bg-black h-screen">
                    <ul className="text-white p-4">
                        <Link to="/profile">
                            <li className="bg-gray-900 rounded py-1 px-3 m-5">
                                Profile
                            </li>
                        </Link>
                        <Link to="/ticketsList">
                            <li className="bg-gray-900 rounded py-1 px-3 m-5">
                                Tickets
                            </li>
                        </Link>
                    </ul>
                </aside>
                <section className="w-5/6 m-2 bg-white flex justify-center">
                <form className="border border-gray-500 m-4 w-6/12 my-5 rounded"
                    onSubmit={this.handleForm}>
                        <div className="p-4">
                            <h1 className="text-lg border-b 
                                border-gray-500">Edit your detail</h1>
                                {/* {error.errors ? <p className="text-red-500 text-small">{error.errors}</p> : ""} */}
                                <div className="mt-4">
                                    <label>Name</label>
                                    <input type="text" name="name" 
                                        placeholder="lovely name"
                                        className="mt-1 p-2 bg-gray-200 rounded
                                        border border-gray-400 w-full"
                                        onChange={this.handleInput}
                                        value={this.state.name}></input>
                                </div>
                                <div className="mt-4">
                                    <label>Email</label>
                                    <input type="email" name="email" 
                                        placeholder="lovely email"
                                        className="mt-1 p-2 bg-gray-200 rounded
                                        border border-gray-400 w-full"
                                        onChange={this.handleInput}
                                        value={this.state.email}></input>
                                </div>
                                <div className="mt-4">
                                    <input type="submit" 
                                        value="Update"
                                        className="mt-1 p-2 w-full
                                        border border-gray-400 rounded
                                        cursor-pointer
                                        bg-purple-600
                                        text-white"></input>
                                </div>
                        </div>
                    </form>
                </section>
            </div>
        );
    }
}

// const updateUser = dispatch => {
//     debugger;
//     return {
//       name: state.auth.user.name,
//       email: state.auth.user.email
//     };
//   };

const mapStateToProps = state => {
    debugger;
    return {
      name: state.auth.user.name,
      email: state.auth.user.email
    };
  };
  export default connect(
    mapStateToProps,
    null
  )(Profile);
  