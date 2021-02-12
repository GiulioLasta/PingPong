import {combineReducers} from 'redux';
import AuthReducer from './AuthReducers'

const AllReducers = combineReducers({auth: AuthReducer})
export default AllReducers;