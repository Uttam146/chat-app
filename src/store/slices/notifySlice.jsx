import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    notification:[],
}
const notifySlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        setNotification(state, action) {
            state.notification = action.payload;
            console.log(action.payload);
            // state.notification= action.payload.data;
        },
    }

})

export const { setNotification } = notifySlice.actions;
export default notifySlice.reducer;