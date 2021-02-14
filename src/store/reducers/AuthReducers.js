const AuthReducer = (state = {}, actions) => {
    debugger;
    switch(actions.type){
        case 'value': 
            return state;
        case 'SET_LOGIN': 
            return { ...state, loggedIn: true, user: actions.payLoad};
        case 'SET_LOGOUT': 
            return { ...state, loggedIn: false, user: {}};
        default: 
            return state;
    }
};

export default AuthReducer;