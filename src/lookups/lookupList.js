import React, { Component } from 'react';
import axios from "axios";
import MaterialTable from 'material-table';
import {Link} from 'react-router-dom';
// import { connect } from 'react-redux';
import history from '../history.js';
import {
  Router
} from "react-router-dom";
import queryString from 'query-string';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import SearchIcon from '@material-ui/icons/Search';

import NavBar from '../Components/NavBar';

class LookupList extends Component {
    
    constructor(props){
        super(props);
        
        this.materialTableRef = React.createRef();

        this.state = {
            chartData:[], 
            columns:[
            { title: "id", field: "id", type: "numeric" },
            { title: "description", field: "description" }
            ],
            initialFormData: {}
        };
        
        if(queryString.parse(this.props.location.search).type){

            this.loadGrid(queryString.parse(this.props.location.search).type);
        }
        
    };

    loadGrid(table){
        axios.post("http://localhost:8000/api/"+table+"/list", {})
        .then(res => {
            this.setState({chartData:  res.data});
        }, [])
        .catch(e => this.setState({errors:e.response.data.errors}))
    }

    deleteRecords(data){
        
        if(data.length==1){
            var id = data[0].id;
            axios.post("http://localhost:8000/api/ticket/delete", {id: id})
            .then(res => {
                this.loadGrid();
            }, [])
            .catch(e => this.setState({errors:e.response.data.errors}))
        }else if(data.length > 1){
            var idList = '';
            data.forEach(function(e){
                idList += e.id + ',';
            });
            idList = idList.substr(0, idList.length-1);
            axios.post("http://localhost:8000/api/ticket/deleteList", {id: idList})
            .then(res => {
                this.loadGrid();
            }, [])
            .catch(e => this.setState({errors:e.response.data.errors}))
        }
    }

    createRecord(props){
        const data = {
           description: props.description,
       };

       return axios.post("http://localhost:8000/api/projects/create", data)
        .then(res => {
            this.loadGrid(queryString.parse(this.props.location.search).type);
        })
        .catch(e => this.setState({errors:e.response.data.errors}))
    }

    updateRecord(props){
        const data = {
            id: props.id,
            description: props.description,
       };

       return axios.post("http://localhost:8000/api/projects/update", data)
        .then(res => {
            this.loadGrid(queryString.parse(this.props.location.search).type);
        })
        .catch(e => this.setState({errors:e.response.data.errors}))
    }

    render() {
        // const { initialFormData } = this.state;
        return (
            <div className="flex h-screen">
                {/* <aside className="w-1/6 bg-black h-screen">
                    <Router history={history}>
                        <ul className="text-white p-4">
                            <Link to="/profile">
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
                        </ul>
                    </Router>
                </aside> */}
                <NavBar></NavBar>
                <section className="w-5/6 m-2 bg-white flex justify-center">
                <MaterialTable
                    // icons={
                    //     { Filter: () => <Search></Search> },
                    //     { Clear: () => <Clear></Clear> },
                    //     { Search: () => <Search></Search> }
                    // } // <== this solves it
                    tableRef={this.materialTableRef}
                    columns={this.state.columns}
                    data={this.state.chartData}
                    title="Alle Tickets"
                    style={{ width: 1200 }}
                    options={{
                        // selection: true,
                        filtering: true
                    }}
                    editable={
                        {
                            onRowAddCancelled: (changes) => {
                                // console.log(changes);
                            },
                            onEditRowDataChanged: (changes) => {
                                console.log(changes);
                            },
                            onEditingApproved: (changes) => {
                                console.log(changes);
                            },
                            onCellEditFinished: (changes) => {
                                console.log(changes);
                            },
                            onRowUpdate: data => this.updateRecord(data),
                            onRowAdd: newData => this.createRecord(newData)
                        }
                    }
                    // components={{
                    //     Actions: props => (
                    //       <div>
                           
                    //       </div>
                    //     )
                    //   }}
                    actions={[
                        {
                            tooltip: 'Remove All Selected Tickets',
                            icon: DeleteIcon,
                            onClick: (evt, data) => {
                                if(window.confirm('You want to delete ' + data.length + ' rows'))
                                    this.deleteRecords(data);
                            }
                        },
                        {
                            icon: AddIcon,
                            tooltip: 'New',
                            onClick: (event, rowData) => {
                                // this.createRecord(rowData);
                              const materialTable = this.materialTableRef.current;
                                
                              this.setState({
                                initialFormData: {
                                  ...rowData,
                                  id: -1,
                                  description: null,
                                },
                              });

                                materialTable.dataManager.changeRowEditing();
                                materialTable.setState({
                                    ...materialTable.dataManager.getRenderState(),
                                    showAddRow: true,
                                });
                                // materialTable.onEditingApproved(function(e){
                                //   console.log('-->' + e);
                                // });
                                // materialTable.onRowAddCancelled = function(e){
                                // //   console.log('--->' + e);
                                // };
                            }
                          }
                    ]}
                    />
                </section>
            </div>
            
            
        );
    }
}

 export default LookupList; 