import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { ChatContext } from "../../context/ChatContext";
import { db } from "../../config/firebase";
import Message from "../Message";
import "./messages.css";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      unSub();
    };
  }, [data.chatId]);

  console.log(messages);

  // const messageByDate = messages.reduce((acc, curr) => {
  //   const messageDate = new Date(curr.date.seconds * 1000).toDateString();

  //   if (!acc[messageDate]) {
  //     acc[messageDate] = [];
  //   }

  //   acc[messageDate].push(curr);

  //   return acc;
  // }, {});

  // console.log(messageByDate);

  return (
    <div className="messages">
      {messages?.map((m) => (
        <Message message={m} key={m.id} />
      ))}
    </div>
  );
};

export default Messages;
