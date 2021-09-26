import { createSlice } from '@reduxjs/toolkit';

const companyNameSlice = createSlice({
    name: 'company_name',
    initialState: { company_name: "الهيئة العامة للاستثمار" },
    reducers: {
        changeCompanyName(state, action) {
            state.company_name = action.payload;
        },
        
    }
});

export const companyNameActions = companyNameSlice.actions;

export default companyNameSlice;