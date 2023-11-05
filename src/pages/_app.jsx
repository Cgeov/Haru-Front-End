import { ContextUser } from '@/context/context'
import '@/styles/globals.css'
import { useState } from 'react';

export default function App({ Component, pageProps }) {
  const [user, setUser] = useState(null);
  const login = (userData) =>{
    setUser(userData);
  }

  const logout = () =>{
    setUser(null);
  }
  return (<ContextUser.Provider value={{user,login, logout}}>
  <Component {...pageProps} />
  </ContextUser.Provider>)
}
