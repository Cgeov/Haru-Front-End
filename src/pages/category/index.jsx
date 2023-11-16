import React, { useState, Fragment, useContext, useEffect } from "react";
import Star from "@/components/stars/stars";
import { BsCart3 } from "react-icons/bs";
import { ContextUser } from "../../context/context";
import Layout from "../layout";
import showSweetAlert from "@/components/Alerts/Alert";
import { useRouter } from "next/router";



export default function Category(){



  const { user, cart, cartProducts, cleanCart } = useContext(ContextUser);
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
            field: 'category', 
            comparison: '==',
            value: 'Canasta'
        }]
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setFlowers(data);
        setLoading(false);
        
      })
      .catch((error) => {
        setLoading(false);
      });
      
  }, []);

  //Añadir los productos al carrito
  const addProduct = (product) => {
    let alreadyExist = false;
    product.quantity = 1;
    if(cart.length > 0){
      cart.forEach((cartProduct)=>{
        if(cartProduct.id == product.id){
          cartProduct.quantity += 1;
          alreadyExist = true;
        }
      })
    }

    if(alreadyExist){
      console.log(cart)
      cartProducts([...cart]);
      localStorage.setItem("cart", JSON.stringify(cart));
    }else{
      cartProducts([...cart, product]);
      localStorage.setItem("cart", JSON.stringify(cart));
    }

    
    showSweetAlert('Producto agregado a tu carrito.', 'success');
    console.log(localStorage.getItem("cart"));
  };
    
    return (
        <Layout>
    <section className="pt-20 pb-12 lg:pt-[100px] lg:pb-[90px] dark:bg-dark">
        <div className="container mx-auto">
          <div className="flex flex-wrap -mx-4">
            <div className="w-full px-4">
              <div className="mx-auto mb-[60px] max-w-[510px] text-center">
                <span className="text-primary mb-2 block text-lg font-semibold">
                  Nuestros Servicios
                </span>
                <h2 className="text-primary mb-3 text-3xl leading-[1.208] font-bold sm:text-4xl md:text-[40px]">
                  Conoce más sobre los servicios que ofrecemos
                </h2>
                <p className="text-primary text-base dark:text-dark-6">
                En Haru los las flores son una forma de expresar sentimientos, celebrar ocasiones o decorar espacios con flores naturales. Descubre lo que tenemos para ofrecerte
                </p>
                
              </div>
            </div>
          </div>


        </div>
      </section>
      <div className="mt-[50px] mb-[20px] mx-[50px]">
      <h2 className="text-2xl font-bold text-primary ml-[60px]">
        Nuetras flores
      </h2>
      <div className='grid grid-rows-4 grid-flow-col gap-4'>
      {flowers.map((flower) => (
          <div
            key={flower.id}
            className="relative mx-auto my-10 w-full max-w-xs overflow-hidden rounded-lg bg-white shadow-md"
            
          >
            <a 
            onClick={()=> (handleModal(flower.id), openModal())}
            >
              <img
                className="h-60 rounded-t-lg object-cover w-[100%]"
                src={flower.img}
                alt={flower.name}
                
              />
            </a>
            <span className="absolute top-0 left-0 w-28 translate-y-4 -translate-x-6 -rotate-45 bg-primary text-center text-sm text-white">
              Sale
            </span>
            <div className="mt-4 px-5 pb-5">
              <a href="#">
                <h5 className="whitespace-nowrap overflow-hidden text-ellipsis text-xl font-semibold tracking-tight text-slate-900">
                  {flower.name}
                </h5>
              </a>
              <div className="mt-2.5 mb-5 flex items-center">
                <span className="mr-2 rounded bg-primary text-white px-2.5 py-0.5 text-xs font-semibold">
                  {flower.rate}
                </span>
                {Array(flower.rate)
                  .fill()
                  .map((_, index) => (
                    <Star key={index} />
                  ))}
              </div>
              <div className="flex items-center justify-between">
                <p>
                  <span className="text-3xl font-bold text-slate-900">
                    ${flower.price}
                  </span>
                  {flower.priceBefore != 0  && (
                    <span className="text-sm text-slate-900 line-through">
                      ${flower.priceBefore}
                    </span>
                  )}
                </p>
                <a
                  onClick={() => {
                    addProduct(flower);
                  }}
                  className="cursor-pointer flex items-center gap-[5px] rounded-md bg-primary px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-secondary focus:outline-none focus:ring-4 focus:ring-blue-300"
                >
                  <BsCart3 color="white" size={20}></BsCart3>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </Layout>

    )
}