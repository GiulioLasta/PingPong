import React, { Component } from 'react';
import {Link} from "react-router-dom";
import {connect} from 'react-redux';
import cookie from 'js-cookie';
import history from '../history.js';
import {
  Router,
  // Switch,
//   Route
  // Link
} from "react-router-dom";

class NavBar extends Component {
    render() {
        return (
            <aside className="w-1/6 bg-black " style={{display: "block", overflow: "auto"}}>
                <Router history={history}>
                    <ul className="text-white p-4">
                        <Link to="../profile">
                            <li className="bg-gray-900 rounded py-1 px-3 m-5">
                                Profile
                            </li>
                        </Link>
                        <Link to="../ticketsManagement/ticketsList">
                            <li className="bg-gray-900 rounded py-1 px-3 m-5">
                                Tickets
                            </li>
                        </Link>
                        <Link to="../ticketsManagement/newTicket" >
                            <li className="bg-gray-900 rounded py-1 px-3 m-5">
                                New Ticket
                            </li>
                        </Link>
                        <Link to="../lookups/lookupList?type=projects">
                            <li className="bg-gray-900 rounded py-1 px-3 m-5">
                                Projects
                            </li>
                        </Link>
                        <Link to="../usersGroupsManagement/users">
                            <li className="bg-gray-900 rounded py-1 px-3 m-5">
                                Users
                            </li>
                        </Link>
                    </ul>
                </Router>
            </aside>
        );
    }
}

export default NavBar;