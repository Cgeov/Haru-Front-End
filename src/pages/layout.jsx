import Footer from "@/components/footer/footer";
import Navbar from "@/components/navbar/navbar";
import React from "react";

export default function Layout({ children }) {
  return (
    <div className="bg-white">
    {/* <div className="bg-gradient-to-b from-tertiary via-four to-five"> */}
      <Navbar></Navbar>
      {children}
      <Footer></Footer>
    </div>
  );
}