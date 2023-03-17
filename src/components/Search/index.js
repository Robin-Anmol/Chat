import React, { useContext, useEffect, useRef, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
  orderBy,
  runTransaction,
} from "firebase/firestore";
import { AiOutlineSearch } from "react-icons/ai";
import { db } from "../../config/firebase";
import { AuthContext } from "../../context/AuthContext";
import "./search.css";
const Search = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState([]);
  const [err, setErr] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const SearchUser = async () => {
    const q = query(
      collection(db, "users"),
      where("name", ">=", username.trim())
    );
    try {
      const querySnapshot = await getDocs(q);

      let usersList = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
      }));

      usersList = usersList.filter((doc) => doc.uid !== currentUser.uid);
      setUser(usersList);
    } catch (err) {
      setErr(true);
    }
  };

  const handleSelect = async (user) => {
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            name: user.name,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        console.log(user);

        console.log(currentUser);
        // console.log(data);
        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            name: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {
      console.log(err);
    }

    setUser(null);
    setUsername("");
  };
  console.log(user);

  return (
    <div className="search">
      <div className="searchForm">
        <input
          type="text"
          placeholder="Find a user"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        <AiOutlineSearch className="searchIcon" onClick={SearchUser} />
      </div>
      {err && <span>User not found!</span>}

      {user?.map((item, index) => {
        const image =
          "https://thumbs.dreamstime.com/b/male-avatar-icon-flat-style-male-user-icon-cartoon-man-avatar-hipster-vector-stock-91462914.jpg" ||
          item.photoURL;
        return (
          <div
            key={`result-${index}`}
            className="userChat"
            onClick={() => handleSelect(item)}
          >
            <img src={image} alt="userImage" />
            <div className="userChatInfo">
              <span>{item?.name}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Search;
