import { configureStore } from "@reduxjs/toolkit";

import authSlice from './auth-slice';
import companyNameSlice from "./company-name-slice";

const store = configureStore({
    reducer:  { auth: authSlice.reducer,  companyName: companyNameSlice.reducer}
});

export default store;