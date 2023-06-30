import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedChat: [],
    chats : [],
};
const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        addChat(state, action) {
            state.chats = action.payload;
        },
        addSelectedChat(state, action) {
            state.selectedChat = action.payload;
        },

        removeChatData(state, action) {
            state.selectedChat = [];
            state.chats = [];
        }
    }

})

export const { addChat, addSelectedChat, removeChatData } = chatSlice.actions;
export default chatSlice.reducer;