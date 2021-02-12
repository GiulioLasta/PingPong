import {createStore} from "redux";
import AllReducers from './reducers/AllReducers';
import { composeWithDevTools } from 'redux-devtools-extension';

const initialStates = {
    auth:{
        loggedIn: false,
        user: {}
    }
};

const store = createStore(
    AllReducers, 
    initialStates,
    //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOLLS_EXTESION__()
    composeWithDevTools()
    )

export default store;   