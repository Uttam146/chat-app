import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    _id:'',
    name:'',
    email:'',
    pic:'',
    token:''

};
const userSlice = createSlice({
    name: 'tab',
    initialState,
    reducers: {
        saveLocalStorage(state,action) {
            state._id= action.payload.id;
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.pic = action.payload.pic;
            state.token = action.payload.token;
        },
        removeLocalStorage(state,action){
            state._id = '';
            state.name = '';
            state.email = '';
            state.pic = '';
            state.token = '';
        }
    }

})

export const { saveLocalStorage,removeLocalStorage } = userSlice.actions;
export default userSlice.reducer;