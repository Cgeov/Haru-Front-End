import { useEffect, useState } from "react";

import Product from "@/components/product/product";
import Layout from "./layout";
import CardService from "@/components/cardService/cardService";
import AboutUsHome from "@/components/aboutUsHome/aboutUsHome";
import HeroBanner from "@/components/heroBanner/heroBanner";

export default function Home() {
  const [flowers, setFlowers] = useState([]);
  const [loading, setLoading] = useState(true);
  let headers = new Headers();

  headers.append("Content-Type", "application/json");
  headers.append("Accept", "application/json");
  headers.append("Access-Control-Allow-Origin", "http://localhost:3000");
  headers.append("Access-Control-Allow-Credentials", "true");
  headers.append("GET", "POST", "OPTIONS");

  useEffect(() => {
    fetch("http://localhost:5000/service/getDocsFilter", {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        collection: "products",
        filter: [{
          field: 'featured', 
          comparison: '==',
          value: 'Sí'
      }]
      }),
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
      <HeroBanner></HeroBanner>
      {loading ? (
        <div>Cargando ..</div>
      ) : (
        <Product products={flowers}></Product>
      )}
      <CardService></CardService>

      <AboutUsHome></AboutUsHome>
    </Layout>
  );
}
