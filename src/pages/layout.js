import Navbar from "@/components/navbar/navbar"
import React from "react"

export default function Layout({children}) {
  return (
    <div>
    <Navbar></Navbar>
    {children}
    </div>
  )
}
