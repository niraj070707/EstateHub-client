import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser : null,
    loading : false,
    error : null,
}

const userSlice = createSlice({
    name : 'user',
    initialState,
    reducers : {
        signInBegin : (state)=>{
            state.loading = true;
        },
        signInComplete : (state, action)=>{
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        signInError : (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        },
        updateUserStart: (state) => {
            state.loading = true;
        },
        updateUserSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        updateUserFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
    }
})

export const { signInBegin, signInComplete, signInError, updateUserFailure, updateUserStart, updateUserSuccess } = userSlice.actions;
export default userSlice.reducer;