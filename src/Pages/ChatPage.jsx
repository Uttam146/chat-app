import React, { useState } from 'react';
import { Box } from '@chakra-ui/react';
import SideDrawer from '../component/miscellaneous/SideDrawer';
import MyChats from '../component/MyChats';
import ChatBox from '../component/ChatBox';
import useLocalStorage from '../customHook/useLocalStorage';

const ChatPage = () => {
    const [fetchAgain, setFetchAgain] = useState(false);
    const { user } = useLocalStorage();

    return (
        <div style={{ width: "100%" }}>
            {user && <SideDrawer />}
            <Box display="flex" justifyContent="space-between" w="100%" h="91.5vh" p="10px">
                {user && <MyChats fetchAgain={fetchAgain} />}
                {user && (<ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />)}
            </Box>
        </div>
    )
}

export default ChatPage;