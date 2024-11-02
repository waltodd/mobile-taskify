import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getCurrentUser, signIn, signOut, signUp } from "../lib/api"; // Import your auth functions
import { router } from "expo-router";
const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState(null);
  const [tasks, setTask] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load the user's session from AsyncStorage on app start
  useEffect(() => {
    const loadSession = async () => {
      try {
        const storedToken = await AsyncStorage.getItem("authToken");
        if (storedToken) {
          // Validate token by fetching current user info
          const {user} = await getCurrentUser(storedToken);
          console.log("currentUser",user)
          if (user) {
            setIsLogged(true);
            setUser(user);
          } else {
            await AsyncStorage.removeItem("authToken"); // Remove invalid token
          }
        }
      } catch (error) {
        // console.error("Error loading user session:", error);
        router.replace("/sign-in");
      } finally {
        setLoading(false);
      }
    };

    loadSession();
  }, []);


 

  return (
    <GlobalContext.Provider
      value={{
        isLogged,
        setIsLogged,
        user,
        setUser,
        tasks,
        setTask,
        loading,
        signIn, 
        signOut,
        signUp,
        setToken
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
