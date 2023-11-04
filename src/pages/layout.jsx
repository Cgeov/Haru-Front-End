import Footer from "@/components/footer/footer";
import Navbar from "@/components/navbar/navbar";
import React, { useState } from "react";
import { ContextUser } from "@/context/context";

export default function Layout({ children }) {
  const [user, setUser] = useState(null);
  const login = (userData) =>{
    setUser(userData);
  }

  const logout = () =>{
    setUser(null);
  }

  return (
    <ContextUser.Provider value={{user,login, logout}}>
    <div className="bg-white">
    {/* <div className="bg-gradient-to-b from-tertiary via-four to-five"> */}
      <Navbar></Navbar>
      {children}
      <Footer></Footer>
    </div>
    </ContextUser.Provider>
  );
}
