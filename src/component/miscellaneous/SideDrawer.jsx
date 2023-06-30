import React, { useState } from 'react';
import { Button } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import { Input } from "@chakra-ui/input";
import { Box, Text } from "@chakra-ui/layout";
import useLocalStorage from '../../customHook/useLocalStorage';
import {
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
} from "@chakra-ui/menu";
import {
    Drawer,
    DrawerBody,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
} from "@chakra-ui/modal";
import { Tooltip } from "@chakra-ui/tooltip";
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { Avatar } from "@chakra-ui/avatar";
import { Navigate, useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/toast";
import ChatLoading from "../ChatLoading";
import { Spinner } from "@chakra-ui/spinner";
import ProfileModal from "./ProfileModal";
import NotificationBadge from "react-notification-badge";
import { Effect } from "react-notification-badge";
import { removeLocalStorage } from '../../store/slices/userSlice';
import { addChat, addSelectedChat,removeChatData } from '../../store/slices/chatSlice';
import { useDispatch } from 'react-redux';
import { fetchUserByNameorEmail } from '../../api/userApi';
import { fetchChatsByUserId } from '../../api/chatApi';
import UserListItem from "../UserAvatar/UserListItem";
// import { getSender } from "../../config/ChatLogics";
// import { ChatState } from "../../Context/ChatProvider";

const SideDrawer = () => {
    const { user, chats } = useLocalStorage();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingChat, setLoadingChat] = useState();

    const logoutUser = () => {
        dispatch(removeLocalStorage());
        dispatch(removeChatData());
        navigate('/');
    }
    const handleSearch = async () => {
        if (!search) {
            toast({
                title: "Please Enter something in search",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "top-left",
            });
            return;
        }

        try {
            setLoading(true);
            const { data } = await fetchUserByNameorEmail(search, user.token);

            setLoading(false);
            setSearchResult(data);
        } catch (error) {
            toast({
                title: "Error Occured!",
                description: "Failed to Load the Search Results",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-left",
            });
        }
    };
    const accessChat = async (userId) => {

        try {
            setLoadingChat(true);
            const { data } = await fetchChatsByUserId(userId, user.token);

            if (![chats].find((c) => c._id === data._id)) dispatch(addChat([data, ...chats]));
            dispatch(addSelectedChat(data));
            setLoadingChat(false);
            onClose();
        } catch (error) {
            toast({
                title: "Error fetching the chat",
                description: error.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-left",
            });
        }
    };
    return (
        <>
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                bg="white"
                w="100%"
                p="5px 10px 5px 10px"
                borderWidth="5px"
            >
                <Tooltip label="Search Users to Chat"
                    hasArrow
                    placement="bottom-end"
                >
                    <Button variant="ghost" onClick={onOpen}>
                        <i className="fa-solid fa-magnifying-glass"></i>
                        <Text display={{ base: 'none', md: 'flex' }} px="4">
                            Search User
                        </Text>
                    </Button>
                </Tooltip>
                <Text fontSize="2xl" fontFamily="Work sans">
                    Chat-App
                </Text>
                <div>
                    <Menu>
                        <MenuButton p={1}>
                            <BellIcon fontSize="2xl" m={1} />
                        </MenuButton>
                    </Menu>
                    <Menu>
                        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                            <Avatar size="sm" cursor="pointer" name={user.name} src={user.pic} />
                        </MenuButton>
                        <MenuList>
                            <ProfileModal user={user}>
                                <MenuItem>My Profile</MenuItem>
                            </ProfileModal>
                            <MenuDivider />
                            <MenuItem onClick={logoutUser}>Logout</MenuItem>
                        </MenuList>
                    </Menu>
                </div>
            </Box>

            <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>
                    <DrawerBody>
                        <Box display="flex" pb={2}>
                            <Input
                                placeholder="Search by name or email"
                                mr={2}
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <Button onClick={handleSearch}>Go</Button>
                        </Box>
                        {loading ? (
                            <ChatLoading />
                        ) : (
                            searchResult?.map((listdata) => (
                                <UserListItem
                                    key={listdata._id}
                                    searchResult={listdata}
                                    handleFunction={() => accessChat(listdata._id)}
                                />
                            ))
                        )}
                        {loadingChat && <Spinner ml="auto" display="flex" />}
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default SideDrawer;
