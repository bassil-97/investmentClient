import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: { isAuth: false, admin_name: '' },
    reducers: {
        toggle(state, action) {
            state.isAuth = !state.isAuth;
            state.admin_name = action.payload;
        },
    }
});

export const authActions = authSlice.actions;

export default authSlice;