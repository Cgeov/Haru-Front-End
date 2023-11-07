import { useContext, useEffect, useState } from "react";
import Layout from "../layout";
import { ContextUser } from "@/context/context";
import React from "react";

export default function Cart() {
  const { cart } = useContext(ContextUser);

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
                    <img
                      src={product.img}
                      alt="product-image"
                      className="w-full rounded-lg sm:w-40"
                    />
                    <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                      <div className="mt-5 sm:mt-0">
                        <h2 className="text-lg font-bold text-gray-900">
                          {product.name}
                        </h2>
                        <p className="mt-1 text-xs text-gray-700">
                          {product.description}
                        </p>
                      </div>
                      <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                        <div className="flex items-center border-gray-100">
                          <span className="cursor-pointer rounded-l bg-gray-100 text-primary  py-1 px-3.5 duration-100 hover:bg-primary hover:text-white">
                            {" "}
                            -{" "}
                          </span>
                          <input
                            className="h-8 w-8 border bg-primary font-bold text-center text-xs outline-none"
                            type="number"
                            onChange={() => {}}
                            value="2"
                            min="1"
                          />
                          <span className="cursor-pointer rounded-r text-primary bg-gray-100 py-1 px-3 duration-100 hover:bg-primary hover:text-white">
                            {" "}
                            +{" "}
                          </span>
                        </div>
                        <div className="flex items-center space-x-4">
                          <p className="text-xl font-bold text-primary">
                            ${product.price}
                          </p>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
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
              <p className="text-gray-700">Subtotal</p>
              <p className="text-gray-700">$129.99</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-700">Envio</p>
              <p className="text-gray-700">$4.99</p>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between">
              <p className="text-lg text-primary font-bold">Total</p>
              <div className="">
                <p className="mb-1 text-primary text-lg font-bold">$134.98</p>
                <p className="text-sm text-gray-700">Incluye IVA</p>
              </div>
            </div>
            <button className="mt-6 w-full rounded-md bg-primary py-1.5 font-medium text-blue-50 hover:bg-secondary">
              Enviar
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
