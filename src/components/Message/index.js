import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import "./message.css";
const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  // const dateString = "March 18, 2023 at 1:23:44 AM";
  // const date = new Date(dateString + " UTC");
  // const formattedTime = date.toLocaleTimeString([], {
  //   hour: "2-digit",
  //   minute: "2-digit",
  // });
  // const formattedDateTime = date.toLocaleDateString() + " at " + formattedTime;

  return (
    <div
      ref={ref}
      className={`message ${message.senderId === currentUser.uid && "owner"}`}
    >
      <div
        className={`user__message__div ${
          message.senderId === currentUser.uid && "owner"
        }`}
      >
        <img
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt=""
        />
        <div className="user__message_content">
          <span
            className={`chat__userName ${
              message.senderId === currentUser.uid && "owner"
            }`}
          >
            {message.senderName}
          </span>

          <div
            className={`_chat_Text_ ${
              message.senderId === currentUser.uid && "owner"
            }`}
          >
            <p>{message.text}</p>
            <span className="message_timeStamp">{`2:30am`}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
