import React, { Component } from 'react';
import {Link} from 'react-router-dom';
// import { connect } from 'react-redux';
import history from '../history.js';
import axios from "axios";
import cookie from 'js-cookie';
import {
  Router
} from "react-router-dom";


class newTicket extends Component {
    constructor(props){
        super(props);
         this.state = {id_project: '', id_priority: '', description: '', note: '', errors: {}};
    }

    handleForm = (e) => {
        e.preventDefault();

         const data = {
            id_project: this.state.id_project,
            id_priority: this.state.id_priority,
            description: this.state.description,
            note: this.state.note
        };

        axios.post("http://localhost:8000/api/ticket/create", data)
        .then(res => {
            cookie.set('token', res.data.access_token);
            // cookie.set('user', res.data.user);//set below not needed here

            //dispatch
            // this.props.setLogin(res.data.user);
            // history.push("/profile");
        })
        .catch(e => this.setState({errors:e.response.data.errors}))

        // history.push("/profile");
    }

    handleInput = (e)=>{
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]:value})
    }

    render() {
        return (
            <div className="bg-red-600 flex">
                <aside className="w-1/6 bg-black h-screen">
                    <Router history={history}>
                        <ul className="text-white p-4">
                            <Link to="/profile">
                                <li className="bg-gray-900 rounded py-1 px-3 m-5">
                                    Profile
                                </li>
                            </Link>
                            <Link to="./ticketsList">
                                <li className="bg-gray-900 rounded py-1 px-3 m-5">
                                    Tickets
                                </li>
                            </Link>
                            <Link to="./newTicket" >
                                <li className="bg-gray-900 rounded py-1 px-3 m-5">
                                    New Ticket
                                </li>
                            </Link>
                        </ul>
                    </Router>
                </aside>
                <section className="w-5/6 m-2 bg-white flex justify-center">
                    <form className="border border-gray-500 m-4 w-6/12 my-5 rounded"
                        onSubmit={this.handleForm}>
                        <div className="p-4">
                            <h1 className="text-lg border-b 
                                border-gray-500">TICKETS MANAGEMENT</h1>
                                {/* {error.errors ? <p className="text-red-500 text-small">{error.errors}</p> : ""} */}
                                <div className="mt-4">
                                    <label>Project</label>
                                    <select name="id_project" id="id_project" className="mt-1 p-2 bg-gray-200 rounded
                                        border border-gray-400 w-full"
                                        onChange={this.handleInput}>
                                        <option value="1">pr1</option>
                                        <option value="2">pr2</option>
                                        <option value="3">pr3</option>
                                        <option value="4">pr4</option>
                                    </select>
                                </div>
                                <div className="mt-4">
                                    <label>Priority</label>
                                    <select name="id_priority" id="id_priority" className="mt-1 p-2 bg-gray-200 rounded
                                        border border-gray-400 w-full"
                                        onChange={this.handleInput}>
                                        <option value="1">10</option>
                                        <option value="2">20</option>
                                        <option value="3">30</option>
                                        <option value="4">40</option>
                                    </select>
                                </div>

                                <div className="mt-4">
                                    <label>Description</label>
                                    <input type="text" name="description" 
                                        placeholder="lovely description"
                                        className="mt-1 p-2 bg-gray-200 rounded
                                        border border-gray-400 w-full"
                                        onChange={this.handleInput}>
                                        {/* // onChange={this.handleInput}
                                        // value={this.state.name} */}
                                        </input>
                                        
                                </div>
                                <div className="mt-4">
                                    <label>Notes</label>
                                    <input type="text" name="note" 
                                        placeholder="lovely notes"
                                        className="mt-1 p-2 bg-gray-200 rounded
                                        border border-gray-400 w-full"
                                        onChange={this.handleInput}
                                        // onChange={this.handleInput}
                                        // value={this.state.email}
                                        ></input>
                                </div>
                                <div className="mt-4">
                                    <input type="submit" 
                                        value="Save"
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

export default newTicket;