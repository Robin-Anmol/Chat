import React, { useContext, useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import { auth, db } from "../../config/firebase";
import "./chats.css";
import { signOut } from "firebase/auth";
import { Button } from "@chakra-ui/react";
const Chats = () => {
  const [chats, setChats] = useState([]);

  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(
        doc(db, "userChats", currentUser?.uid),
        (doc) => {
          // console.log(doc.data());
          setChats(doc.data());
        }
      );

      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);
  console.log(chats);
  const userALlChats = Object?.entries(chats)?.sort(
    (a, b) => b[1].date - a[1].date
  );
  console.log(userALlChats);



  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };

  const logoutHandler = async () => {
    try {
      await signOut(auth);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  if (userALlChats.length === 0) {
    return (
      <div className="chats">
        <span>Loading Chats</span>
        <Button
          onClick={logoutHandler}
          d="flex"
          position={"absolute"}
          bottom={"14"}
          fontSize={{ base: "17px", md: "10px", lg: "17px" }}
        >
          logout
        </Button>
      </div>
    );
  }
  return (
    <div className="chats">
      {userALlChats?.map((chat) => (
        <div
          className="userChat"
          key={chat[0]}
          onClick={() => handleSelect(chat[1].userInfo)}
        >
          <img src={chat[1].userInfo?.photoURL} alt="" />
          <div className="userChatInfo">
            <div className="userName__time">
              <span className="userName__time__username">
                {chat[1].userInfo.name}
              </span>
              <p className="time">2:30am</p>
            </div>
            <div className="userLastMsg__notif">
              <p>{chat[1].lastMessage?.text}</p>
              <span className="notif">1</span>
            </div>
          </div>
        </div>
      ))}
      <Button
        onClick={logoutHandler}
        d="flex"
        position={"absolute"}
        bottom={"14"}
        fontSize={{ base: "17px", md: "10px", lg: "17px" }}
      >
        logout
      </Button>
    </div>
  );
};

export default Chats;
