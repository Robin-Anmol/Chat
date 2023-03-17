import React, { useContext } from "react";

import { ChatContext } from "../../context/ChatContext";
import { AiFillCamera } from "react-icons/ai";
import { Box } from "@chakra-ui/layout";

import "./ChatBox.css";
import { Image } from "@chakra-ui/react";
import Messages from "../Messages";
import InputField from "../InputField/InputField";
const ChatBox = () => {
  const { data } = useContext(ChatContext);

  const img = data.user?.photoURL;

  return (
    <div className="chat">
      {data.chatId === "null" ? (
        <div className="select_a_chat">Select a Chat </div>
      ) : (
        <>
          <div className="chatInfo">
            <img src={img} className="ChatInfo__user_img" alt="imagedd" />
            <span>{data.user?.name}</span>
          </div>
          <div className="message_div">
            <Messages />
          </div>
          <div className="input_div">
            <InputField />
          </div>
        </>
      )}
    </div>
  );
};

export default ChatBox;
