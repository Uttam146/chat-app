import React, { useEffect, useState } from 'react';
import { fetchChats } from '../../api/chatApi'

const Chat = () => {
    const [allChats, setAllChats] = useState([]);

    // useEffect(() => {
    //     fetchChats()
    //         .then(({ data }) => setAllChats(data))
    //         .catch((err) => console.log(err))
    // }, [])

    return (
        <div>
            {allChats.map((chat)=> <div key={chat._id}>{chat.chatName}</div>)}
        </div>
    )
}

export default Chat;