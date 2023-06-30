import { Box } from "@chakra-ui/layout";
import "./style.css"
import SingleChat from "./SingleChat";
import useLocalStorage from "../customHook/useLocalStorage";

const ChatBox = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat } = useLocalStorage();

  return (
    <Box
      display={{ base: selectedChat ? "flex" : "none", md: 'flex' }}
      alignItems="center"
      flexDir="column"
      p={3}
      bg="#F7FAFC"
      w={{ base: "100%", md: "68%" }}
      borderRadius="lg"
      borderWidth="1px"
    >
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </Box>
  );
};

export default ChatBox;
