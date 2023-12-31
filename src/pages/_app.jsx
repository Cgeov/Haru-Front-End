import showSweetAlert from "@/components/Alerts/Alert";
import { ContextUser } from "@/context/context";
import "@/styles/globals.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function App({ Component, pageProps }) {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const router = useRouter()

  useEffect(() => {
    getDataUser();
    getDataCart();
  }, []);

  function getDataUser() {
    if (localStorage.getItem("user") != undefined || localStorage.getItem("user") != null || localStorage.getItem("user") != "") {
      console.log(localStorage.getItem("user"))
      setUser(JSON.parse(localStorage.getItem("user")));
      console.log(user)
    } else {
      setUser(null);
    }
  }

  function getDataCart() {
    //console.log(localStorage.getItem("cart"));
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
    localStorage.setItem("user", JSON.stringify(userData));
    console.log(localStorage.getItem('user'))
    if (userData.typeUser == 'admin') {
      router.push("/manage-products");
    } else {
      router.push("/");
    }
  };

  const cartProducts = (cartData) => {
    setCart(cartData);
    localStorage.setItem("cart", JSON.stringify(cartData));
  };

  const logout = () => {
    if (user.typeUser == 'admin') {
      setUser(null);
      localStorage.setItem("user", JSON.stringify(null));
      showSweetAlert("Sesión Cerrada!", "success")
      router.push("/login")
    } else {
      setUser(null);
      localStorage.setItem("user", JSON.stringify(null));
      showSweetAlert("Sesión Cerrada!", "success")
      router.push("/")
    }

  };
  return (
    <>
      <ContextUser.Provider
        value={{ user, cart, login, logout, cartProducts }}
      >
        <Component {...pageProps} />
      </ContextUser.Provider>


    </>
  );
}
