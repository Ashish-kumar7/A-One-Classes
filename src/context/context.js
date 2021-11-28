import { createContext, useContext, useState, useEffect } from "react";
import { authenticate, googleprovider } from "../Firebase_library/firebase";
const AddContext = createContext();

export function useLocalContext() {
  return useContext(AddContext);
}

export function ContextProvider({ children }) {
  const [createClassDialog, setCreateClassDialog] = useState(false);
  const [joinClassDialog, setJoinClassDialog] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [loggedInMail, setLoggedInMail] = useState(null);

  const login = () => authenticate.signInWithPopup(googleprovider);
  const logout = () => authenticate.signOut();

  useEffect(() => {
    const funct = authenticate.onAuthStateChanged((authUser) => {
      if (authUser) {
        console.log(authUser);
        setLoggedInMail(authUser.email);
        setLoggedInUser(authUser);
      } else {
        setLoggedInMail(null);
        setLoggedInUser(null);
      }
    });
    return () => funct();
  }, []);

  const value = {
    createClassDialog,
    setCreateClassDialog,
    joinClassDialog,
    setJoinClassDialog,
    login, logout,
    loggedInMail,
    loggedInUser,
  };
  
  return <AddContext.Provider value={value}>{children}</AddContext.Provider>;
}

