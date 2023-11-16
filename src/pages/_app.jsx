import showSweetAlert from "@/components/Alerts/Alert";
import { ContextUser } from "@/context/context";
import "@/styles/globals.css";
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
    if (localStorage.getItem("user") != undefined || localStorage.getItem("user") != null) {
      setUser(localStorage.getItem("user"));
    }else{
      setUser(null);
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
    } else {
      setCart([]);
    }
  }

  const login = (userData) => {
    console.log(userData)
    setUser(userData);
    localStorage.setItem("user", userData);
    if(userData.typeUser== 'admin'){
      Router.replace("/manage-products");
    }else{
      Router.replace("/");
    }
    
  };

  const cartProducts = (cartData) => {
    setCart(cartData);
    localStorage.setItem("cart", cartData);
  };

  const logout = () => {
    setUser(null);
    localStorage.setItem("user", user);
    showSweetAlert("Sesión Cerrada!", "success")
  };

  return (
    <ContextUser.Provider
      value={{ user, cart, login, logout, cartProducts }}
    >
      <Component {...pageProps} />
    </ContextUser.Provider>
  );
}
