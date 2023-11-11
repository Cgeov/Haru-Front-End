import { ContextUser } from "@/context/context";
import "@/styles/globals.css";
import axios from "axios";
import Router from "next/router";
import { useEffect, useState } from "react";

export default function App({ Component, pageProps }) {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  useEffect(() => {
    getDataUser();
    getDataCart();
    localStorage.clear()
  }, []);

  function getDataUser() {
    if (localStorage.getItem("user") != undefined) {
      setUser(localStorage.getItem("user"));
    }
  }

  function getDataCart() {
    
    console.log(localStorage.getItem("cart"));
    if (
      localStorage.getItem("cart") != undefined &&
      localStorage.getItem("cart").length > 0 &&
      localStorage.getItem("cart") != null
    ) {
      setCart(JSON.parse(localStorage.getItem("cart")));
      console.log(localStorage.getItem("cart"));
    } else {
      setCart([]);
      console.log(localStorage.getItem("cart"));
    }
  }

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", userData);
    Router.replace("/");
  };

  const cartProducts = (cartData) => {
    setCart(cartData);
    localStorage.setItem("cart", cartData);
  };

  const cleanCart = () => {
    setCart([]);
    localStorage.setItem("cart", undefined);
  };

  const logout = () => {
    setUser(null);
    localStorage.setItem("user", undefined);
  };

  return (
    <ContextUser.Provider
      value={{ user, cart, login, logout, cleanCart, cartProducts }}
    >
      <Component {...pageProps} />
    </ContextUser.Provider>
  );
}
