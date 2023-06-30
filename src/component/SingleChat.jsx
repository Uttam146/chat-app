import React, { useState, useEffect } from 'react';
import { FormControl } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Box, Text } from "@chakra-ui/layout";
import useLocalStorage from '../customHook/useLocalStorage';
import { IconButton, Spinner, useToast, VStack, Image, Stack } from "@chakra-ui/react";
import { getSender, getSenderFull } from "../config/ChatLogics";
import { ArrowBackIcon } from "@chakra-ui/icons";
import ProfileModal from "./miscellaneous/ProfileModal";
import ScrollableChat from "./ScrollableChat";
import Lottie from "react-lottie";
import animationData from "../animations/typing.json";
import UpdateGroupChatModal from "./miscellaneous/UpdateGroupChatModel";
import whatsapp from "../assets/whatsapp.png";
import { addSelectedChat } from '../store/slices/chatSlice';
import { sendMessages,getMessages } from '../api/messageApi';
import io from "socket.io-client";
import './style.css';

const ENDPOINT = "http://localhost:8000";
var socket, selectedChatCompare;

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
    const { user, selectedChat, notification } = useLocalStorage();
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [newMessage, setNewMessage] = useState("");
    const [socketConnected, setSocketConnected] = useState(false);
    const [typing, setTyping] = useState(false);
    const [istyping, setIsTyping] = useState(false);
    const toast = useToast();

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };

    const fetchMessages = async () => {
        if (!selectedChat) return;

        try {
          setLoading(true);
          const { data } = await getMessages(selectedChat._id,user.token);
          setMessages(data);
          setLoading(false);

        socket.emit("join chat", selectedChat._id);
        } catch (error) {
          toast({
            title: "Error Occured!",
            description: "Failed to Load the Messages",
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "bottom",
          });
        }
    };

    const sendMessage = async (event) => {
        if (event.key === "Enter" && newMessage) {
            socket.emit("stop typing", selectedChat._id);
            try {
                setNewMessage("");
                const { data } = await sendMessages({ content: newMessage, chatId: selectedChat }, user.token);
                socket.emit("new message", data);
                setMessages([...messages, data]);
            } catch (error) {
                toast({
                    title: "Error Occured!",
                    description: "Failed to send the Message",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom",
                });
            }
        }
    };

    useEffect(() => {
        socket = io(ENDPOINT);
        socket.emit("setup", user);
        socket.on("connected", () => setSocketConnected(true));
        socket.on("typing", () => setIsTyping(true));
        socket.on("stop typing", () => setIsTyping(false));
    }, []);

    useEffect(() => {
        fetchMessages();
        selectedChatCompare = selectedChat;
    }, [selectedChat]);

    useEffect(() => {
        socket.on("message recieved", (newMessageRecieved) => {
            console.log("new message is received");
          if (
            !selectedChatCompare || // if chat is not selected or doesn't match current chat
            selectedChatCompare._id !== newMessageRecieved.chat._id
          ) {
            // if (!notification.includes(newMessageRecieved)) {
            //   setNotification([newMessageRecieved, ...notification]);
            //   setFetchAgain(!fetchAgain);
            // }
          } else {
            setMessages([...messages, newMessageRecieved]);
          }
        });
    });

    const typingHandler = (e) => {
        setNewMessage(e.target.value);

        if (!socketConnected) return;

        if (!typing) {
          setTyping(true);
          socket.emit("typing", selectedChat._id);
        }
        let lastTypingTime = new Date().getTime();
        var timerLength = 3000;
        setTimeout(() => {
          var timeNow = new Date().getTime();
          var timeDiff = timeNow - lastTypingTime;
          if (timeDiff >= timerLength && typing) {
            socket.emit("stop typing", selectedChat._id);
            setTyping(false);
          }
        }, timerLength);
    };
    return (
        <>
            {selectedChat ? (
                <>
                    <Text
                        fontSize={{ base: "28px", md: "30px" }}
                        pb={3}
                        px={2}
                        w="100%"
                        fontFamily="Work sans"
                        display="flex"
                        justifyContent={{ base: "space-between" }}
                        alignItems="center"
                    >
                        <IconButton
                            display={{ base: "flex", md: "none" }}
                            icon={<ArrowBackIcon />}
                            onClick={() => addSelectedChat("")}
                        />
                        {messages.length &&
                            (!selectedChat.isGroupChat ? (
                                <>

                                    {getSender(user, selectedChat.users)}
                                    <ProfileModal
                                        user={getSenderFull(user, selectedChat.users)}
                                    />
                                </>
                            ) : (
                                <>
                                    {selectedChat.chatName.toUpperCase()}
                                    <UpdateGroupChatModal
                                        fetchMessages={fetchMessages}
                                        fetchAgain={fetchAgain}
                                        setFetchAgain={setFetchAgain}
                                    />
                                </>
                            ))}
                    </Text>
                    <Stack
                        direction="column"
                        justifyContent="flex-end"
                        p={3}
                        bg="#E8E8E8"
                        w="100%"
                        h="100%"
                        borderRadius="lg"
                        overflowY="hidden"
                    >
                        {loading ? (
                            <Spinner
                                size="xl"
                                w={20}
                                h={20}
                                alignSelf="center"
                                margin="auto"
                            />
                        ) : (
                            <div className="messages">
                                <ScrollableChat messages={messages} />
                            </div>
                        )}

                        <FormControl
                            onKeyDown={sendMessage}
                            id="first-name"
                            isRequired
                            mt={3}
                        >
                            {istyping ? (
                                <div>
                                    <Lottie
                                        options={defaultOptions}
                                        // height={50}
                                        width={70}
                                        style={{ marginBottom: 15, marginLeft: 0 }}
                                    />
                                </div>
                            ) : (
                                <></>
                            )}
                            <Input
                                variant="filled"
                                bg="#E0E0E0"
                                placeholder="Enter a message.."
                                value={newMessage}
                                onChange={typingHandler}
                            />
                        </FormControl>
                    </Stack>
                </>
            ) : (
                // to get socket.io on same page
                <VStack display="flex" alignItems="center" justifyContent="center" direction="column" h="100%">
                    <Image src={whatsapp} height="30%" width="30%" alt='Dan Abramov' />
                    <Text fontSize="4xl" pb={3} fontFamily="Work sans">
                        Chat-App
                    </Text>
                    <Text fontSize="xl" fontFamily="Work sans">
                        Send and receive messages without keeping your phone online.
                    </Text>
                    <Text fontSize="xl" fontFamily="Work sans">
                        Use WhatsApp on up to 4 linked devices and 1 phone at the same time.
                    </Text>


                </VStack>
            )}
        </>
    )
}

export default SingleChat;