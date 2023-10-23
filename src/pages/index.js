import Product from "@/components/product/product";
import Layout from "./layout";
import { useEffect, useState } from "react";
import skeletonHome from "@/components/skeleton/skeleton";

export default function Home() {
  const [flowers, setFlowers] = useState(null);
  const [loading, setLoading] = useState(true);
  const body = {
    collection: "products",
  };
  let headers = new Headers();

  headers.append("Content-Type", "application/json");
  headers.append("Accept", "application/json");
  headers.append("Access-Control-Allow-Origin", "http://localhost:3000");
  headers.append("Access-Control-Allow-Credentials", "true");
  headers.append("GET", "POST", "OPTIONS");

  useEffect(() => {
    fetch("http://localhost:5000/service/getCollection", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((data) => {
        setFlowers(data);
        setLoading(false);
        console.log(data);
      })
      .catch((error) => {
        setLoading(false);
      });
  }, []);

  return (
    <Layout>
      {loading ? (
        <div>Cargando ..</div>
      ) : (
        <Product products={flowers}></Product>
      )}
    </Layout>
  );
}
