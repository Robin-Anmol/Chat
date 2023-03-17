import React, { useState } from "react";
import { Box } from "@chakra-ui/layout";
import { Button, CSSReset, IconButton } from "@chakra-ui/react";
import { FiEdit } from "react-icons/fi";
import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";

import "./Sidebar.css";
import Search from "../Search";
import Chats from "../MyChats";

const Sidebar = () => {
  
  return (
    <>
      <Box
        px={4}
        py={3}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        borderBottom="1px solid #E2E8F0"
      >
        <Box fontSize={{ base: "28px", md: "30px" }} fontFamily="Work sans">
          Your Messages
        </Box>
        <IconButton
          icon={<FiEdit />}
          backgroundColor="green.500"
          borderRadius="50%"
          color="white"
          aria-label="Edit"
          fontSize={{ base: "17px", md: "10px", lg: "17px" }}
        />
      </Box>

      <Search />
      <Box bg="white" w="100%" p={4} borderRadius="lg">
        <Tabs>
          <TabList
            css={{
              borderBottom: "1px solid grey",
              "& .chakra-tabs__tab": {
                color: "green",
                fontWeight: 700,
              },
              "& .chakra-tabs__tab[aria-selected=true]": {
                color: "green",
              },
              "& .chakra-tabs__tab:not([aria-selected=true])": {
                color: "black",
                borderBottom: "green",
              },
              "& .chakra-tabs__tab:hover": {
                color: "green",
              },
            }}
          >
            <Tab>All Chats</Tab>
            <Tab>Unread Chats</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Chats />
            </TabPanel>
            <TabPanel>
              <p>Unread Chats</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </>
  );
};

export default Sidebar;
