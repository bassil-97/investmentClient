import { createStore } from 'redux';

const authReducer = (state = { isAuth: false }, action) => {
    if(action.type === 'login') {
        return {
            isAuth: !state.isAuth
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