import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const useLocalStorage = () => {
    const user = useSelector(state => { return state.user });
    const chats = useSelector(state => { return state.chat.chats });
    const selectedChat = useSelector(state => { return state.chat.selectedChat });
    const [notification, setNotification] = useState([]);

    return { user, chats, selectedChat, notification };
}
export default useLocalStorage;