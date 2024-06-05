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
    }
})

export const { signInBegin, signInComplete, signInError } = userSlice.actions;
export default userSlice.reducer;