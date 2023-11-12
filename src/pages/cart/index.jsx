import { useContext, useEffect, useState } from "react";
import Layout from "../layout";
import { ContextUser } from "@/context/context";
import React from "react";
import {BiSolidTrash} from "react-icons/bi"
import showSweetAlert from "@/components/Alerts/Alert";

export default function Cart() {
  const { cart,cartProducts,user } = useContext(ContextUser);
  const [total, setTotal] = useState(0);
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    const calculatedTotal = cart.reduce((acc, product) => {
      return acc + product.price * product.quantity;
    }, 0);

    const calculatedDiscount = cart.reduce((acc, product) => {
      let totalDiscount = 0;
      if(product.hasOwnProperty('priceBefore') && product.priceBefore != 0 && !isNaN(product.priceBefore)){
        console.log(product.priceBefore)
        totalDiscount = acc + (product.priceBefore - product.price) * product.quantity
      }
      return totalDiscount;
    }, 0);

    setTotal(calculatedTotal);
    setDiscount(calculatedDiscount);
  }, [cart]);

  const removeQuantity = (product) => {
    product.quantity -=1;
    if(product.quantity < 1){
      cartProducts(cart.filter((productsCart) => productsCart.id !== product.id));
      localStorage.setItem("cart", JSON.stringify(cart));
      showSweetAlert("Producto Eliminado del Carrito", "warning")
    }else{
      console.log(2)
      cartProducts([...cart]);
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }

  const addQuantity = (product) => {
    product.quantity +=1;
      cartProducts([...cart]);
      localStorage.setItem("cart", JSON.stringify(cart));
  }

  const deleteProduct = (product) =>{
    cartProducts(cart.filter((productsCart) => productsCart.id !== product.id));
    localStorage.setItem("cart", JSON.stringify(cart));
    showSweetAlert("Producto Eliminado del Carrito", "warning")
  }

  const sendRequest = () => {
    if(!user){
      showSweetAlert("Debe de Iniciar Sesión","error")
    }
  }

  return (
    <Layout>
      <div className="h-screen pt-20">
        <h1 className="mb-10 text-center text-primary text-2xl font-bold">
          Tu carrito
        </h1>
        <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
          <div className="rounded-lg md:w-2/3">
            {cart.length > 0 ? (
              cart.map((product, index) => {
                return (
                  <div
                    key={index}
                    className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start"
                  >
                    <div className="w-[200px] rounded-lg h-[150px]">
                      <img
                        src={product.img}
                        alt="product-image"
                        className="w-full h-[150px] rounded-lg object-cover"
                      />
                    </div>
                    <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                      <div className="mt-5 sm:mt-0 flex flex-col justify-between">
                        <div>
                        <h2 className="text-lg font-bold text-gray-900">
                          {product.name}
                        </h2>
                        <p className="mt-1 text-xs text-gray-700">
                          {product.description}
                        </p>
                        </div>
                        <div className="flex items-center border-gray-100">
                          <span onClick={() => {removeQuantity(product)}} className="cursor-pointer rounded-l bg-gray-200 text-primary py-2 px-5 duration-100 hover:bg-primary hover:text-white">
                            {" "}
                            -{" "}
                          </span>
                          <input
                            className="h-10 w-10 border text-primary font-bold text-center text-xs outline-none"
                            onChange={() => {}}
                            readOnly
                            value={product.quantity}
                            min="1"
                          />
                          <span onClick={() => {addQuantity(product)}} className="cursor-pointer rounded-r text-primary bg-gray-200 py-2 px-5 duration-100 hover:bg-primary hover:text-white">
                            {" "}
                            +{" "}
                          </span>
                        </div>
                      </div>
                      <div className="mt-4 flex flex-col justify-between items-center">
                        <div>
                          <p className="text-xl font-bold text-primary">
                            ${product.price.toFixed(2)}
                          </p>
                        </div>
                        <div>
                          <div onClick={(()=>{deleteProduct(product)})} className="cursor-pointer bg-[#c8c8c8] rounded p-3 hover:bg-primary hover:text-white">
                            <BiSolidTrash size={20}></BiSolidTrash>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <p>Poner algo Aquí si está vacio</p>
            )}
          </div>
          <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
            <div className="mb-2 flex justify-between">
              <p className="text-gray-700">Descuentos</p>
              <p className="text-gray-700">${discount.toFixed(2)}</p>
            </div>
            <div className="mb-2 flex justify-between">
              <p className="text-gray-700">Subtotal</p>
              <p className="text-gray-700">${total.toFixed(2)}</p>
            </div>
            
            <div className="flex justify-between">
              <p className="text-gray-700">Cargos Administrativos</p>
              <p className="text-gray-700">$2.99</p>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between">
              <p className="text-lg text-primary font-bold">Total</p>
              <div className="">
                <p className="mb-1 text-primary text-lg font-bold">${(total + 2.99).toFixed(2)}</p>
                <p className="text-sm text-gray-700">Incluye IVA</p>
              </div>
            </div>
            <button onClick={()=>{sendRequest()}} className="mt-6 w-full rounded-md bg-primary py-1.5 font-medium text-blue-50 hover:bg-secondary">
              Enviar
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
