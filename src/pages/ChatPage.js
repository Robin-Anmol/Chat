
import { Box, Flex } from "@chakra-ui/react";
import { ChatBox, Sidebar } from "../components";
import { useContext } from "react";
import { ChatContext } from "../context/ChatContext";

const ChatPage = () => {
  const { data } = useContext(ChatContext);
  return (
    <Flex
      direction={{ md: "row" }}
      height="100vh"
      width="100%"
      p="5"
      overflow="hidden"
    >
      <Box
        d={{ base: data.chaId !== "null" ? "none" : "flex", md: "flex" }}
        flexDir="column"
        alignItems="center"
        p={3}
        bg="white"
        h={"100%"}
        w={{ base: "100%", md: "27%" }}
        borderRadius="lg"
        borderWidth="1px"
      >
        <Sidebar />
      </Box>
      <Box
        d={{ base: data.chaId !== "null" ? "flex" : "none", md: "flex" }}
        width={{ base: "100%", md: "73%" }}
        bg="white"
        height="100%"
        boxShadow="rgba(0, 0, 0, 0.1) 0px 1px 4px;"
      >
        <ChatBox />
      </Box>
    </Flex>
  );
};

export default ChatPage;
