import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: { isAuth: true },
    reducers: {
        toggle(state) {
            state.isAuth = !state.isAuth;
        },
        
    }
});

export const authActions = authSlice.actions;

export default authSlice;