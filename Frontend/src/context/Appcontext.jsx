import React,{ createContext, useState } from "react";
import { doctors } from "../assets/assets_frontend/assets";

export const Appcontext = createContext();

const AppContextProvider = (props) => {
  const [islogin,Setislogin]=useState(false);
  const val = {
    doctors,
    islogin,
    Setislogin
  };

  return (
    <Appcontext.Provider value={val}>
      {props.children}
    </Appcontext.Provider>
  );
};

export default AppContextProvider;
