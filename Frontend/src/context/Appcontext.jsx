import React, { createContext, useState, useEffect } from "react";
import { doctors } from "../assets/assets_frontend/assets";

export const Appcontext = createContext();

const AppContextProvider = (props) => {
  const [islogin, Setislogin] = useState(false);
  const [user, setUser] = useState(null); // stores current logged-in user info


  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      Setislogin(true);
    }
  }, []);

  const val = {
    doctors,
    islogin,
    Setislogin,
    user,
    setUser, // allow setting user from login component
  };

  return (
    <Appcontext.Provider value={val}>
      {props.children}
    </Appcontext.Provider>
  );
};

export default AppContextProvider;
