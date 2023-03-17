import { ChatPage, Login } from "./pages";
import "./App.css";
import { AuthContext } from "./context/AuthContext";
import { useContext } from "react";
function App() {
  const { currentUser } = useContext(AuthContext);

  return <div className="App">{currentUser ? <ChatPage /> : <Login />}</div>;
}

export default App;
