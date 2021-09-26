import { createStore } from 'redux';

const authReducer = (state = { isAuth: false, admin_name: '' }, action) => {
    if(action.type === 'login') {
        return {
            isAuth: !state.isAuth,
            admin_name: action.payload
        };
    }

    if(action.type === 'logout') {
        return {
            isAuth: !state.isAuth
        };
    }

    return state;
};

const store = createStore(authReducer);

export default store;