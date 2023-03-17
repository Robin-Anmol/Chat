import { Box, Button } from "@chakra-ui/react";
import React from "react";
import { auth, db } from "../config/firebase";
import { signOut } from "firebase/auth";
import {
  signInWithPopup,
  GoogleAuthProvider,
  signInWithCredential,
} from "firebase/auth";

import { FcGoogle } from "react-icons/fc";
import { addDoc, doc, collection, setDoc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const SignWithGoogle = async () => {
    const googleProvider = new GoogleAuthProvider(auth);
    try {
      const result = await signInWithPopup(auth, googleProvider);

      const credential = GoogleAuthProvider.credentialFromResult(result);
      await signInWithCredential(auth, credential);
      const user = result?.user;

      const userRef = doc(db, "users", user.uid);
      await setDoc(userRef, {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      });
      //create empty user chats on firestore

      const currentUserRef = doc(db, "userChats", user?.uid);
      const CurrentUserChatsDocSnap = await getDoc(currentUserRef);
      if (!CurrentUserChatsDocSnap.exists()) {
        await setDoc(doc(db, "userChats", user.uid), {});
      }

      //   console.log(data);
      console.log(result.user);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      w="100%"
      h="100vh"
    >
      <Button
        onClick={SignWithGoogle}
        d="flex"
        fontSize={{ base: "17px", md: "10px", lg: "17px" }}
        leftIcon={FcGoogle}
      >
        Sign in with Google
      </Button>
    </Box>
  );
};

export default Login;
