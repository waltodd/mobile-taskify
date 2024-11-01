import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getCurrentUser, signIn, signOut, signUp } from "../lib/api"; // Import your auth functions

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load the user's session from AsyncStorage on app start
  useEffect(() => {
    const loadSession = async () => {
      try {
        const storedToken = await AsyncStorage.getItem("authToken");
        if (storedToken) {
          // Validate token by fetching current user info
          const currentUser = await getCurrentUser(storedToken);
          if (currentUser) {
            setIsLogged(true);
            setUser(currentUser);
          } else {
            await AsyncStorage.removeItem("authToken"); // Remove invalid token
          }
        }
      } catch (error) {
        console.error("Error loading user session:", error);
      } finally {
        setLoading(false);
      }
    };

    loadSession();
  }, []);

  const handleSignIn = async (email, password) => {
    try {
      const { token, user } = await signIn(email, password); // Sign in and retrieve token
      await AsyncStorage.setItem("authToken", token); // Store token in AsyncStorage
      setIsLogged(true);
      setUser(user);
    } catch (error) {
      console.error("Error signing in:", error);
      throw error;
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(); // Sign out on the server
      await AsyncStorage.removeItem("authToken"); // Remove token from AsyncStorage
      setIsLogged(false);
      setUser(null);
    } catch (error) {
      console.error("Error signing out:", error);
      throw error;
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        isLogged,
        setIsLogged,
        user,
        setUser,
        loading,
        signIn: handleSignIn,
        signOut: handleSignOut,
        signUp,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
