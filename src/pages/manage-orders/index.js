import OrdersList from "@/components/order/orders-list";
import Layout from "../layout";
import React, { useState, useEffect,useContext } from "react";
import { ContextUser } from "@/context/context";
import { useRouter } from "next/router";


export default function ManageOrders(){
    const [orders, setOrders] = useState(null);
    const [loading, setLoading] = useState(true);
    const { user, logout } = useContext(ContextUser);
    const router = useRouter();

    const body = {
        collection: "orders",
    };
    let headers = new Headers();

    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    headers.append("Access-Control-Allow-Origin", "http://localhost:3000");
    headers.append("Access-Control-Allow-Credentials", "true");
    headers.append("GET", "POST", "OPTIONS");

    useEffect(() => {
        if (
            user == null ||
            (user && user.hasOwnProperty("userType") && user.userType != "admin")
          ) {
            router.push("/login");      
        }else{
        fetch("http://localhost:5000/service/getCollection", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
        })
        .then((response) => response.json())
        .then((data) => {
            setOrders(data);
            setLoading(false);
            console.log(data);
        })
        .catch((error) => {
            setLoading(false);
        });
    } 
}, []);

    return <Layout>
        {loading ? (
         <div>Cargando ..</div>
        ) : (
            <>
                <OrdersList orders={orders}></OrdersList>
            </>
         )}
    </Layout>;
}