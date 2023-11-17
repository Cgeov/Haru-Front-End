import { useContext, useEffect, useRef, useState } from "react";
import Layout from "../layout";
import { ContextUser } from "@/context/context";
import React from "react";
import { BiSolidTrash } from "react-icons/bi";
import showSweetAlert from "@/components/Alerts/Alert";
import html2pdf from "html2pdf.js";
import { BiSolidPhoneCall } from "react-icons/bi";
import { TfiWorld } from "react-icons/tfi";
import { ImLocation } from "react-icons/im";
import logo from "../../assets/img/logoTextResized.png";
import Image from "next/image";
import Loader from "@/components/loader/loader";
import emptyCart from "../../assets/img/empty-cart.png"

export default function Cart() {
  const { cart, cartProducts, user } = useContext(ContextUser);
  const [total, setTotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [numberOrder, setnumberOrder] = useState(0);

  useEffect(() => {
    setnumberOrder(generarNumerosAleatorios());
  }, []);

  const loaderRef = useRef(null);

  const handleShowLoader = () => {
    if (loaderRef.current) {
      loaderRef.current.showLoader();
    }
  };

  const handleHideLoader = () => {
    if (loaderRef.current) {
      loaderRef.current.hideLoader();
    }
  };

  useEffect(() => {
    const calculatedTotal = cart.reduce((acc, product) => {
      return acc + product.price * product.quantity;
    }, 0);

    const calculatedDiscount = cart.reduce((acc, product) => {
      let totalDiscount = 0;
      if (
        product.hasOwnProperty("priceBefore") &&
        product.priceBefore != 0 &&
        !isNaN(product.priceBefore)
      ) {
        console.log(product.priceBefore);
        totalDiscount =
          acc + (product.priceBefore - product.price) * product.quantity;
      }
      return totalDiscount;
    }, 0);

    setTotal(calculatedTotal);
    setDiscount(calculatedDiscount);
  }, [cart]);

  const removeQuantity = (product) => {
    product.quantity -= 1;
    if (product.quantity < 1) {
      cartProducts(
        cart.filter((productsCart) => productsCart.id !== product.id)
      );
      localStorage.setItem("cart", JSON.stringify(cart));
      showSweetAlert("Producto Eliminado del Carrito", "warning");
    } else {
      cartProducts([...cart]);
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  };

  const addQuantity = (product) => {
    product.quantity += 1;
    cartProducts([...cart]);
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  const deleteProduct = (product) => {
    cartProducts(cart.filter((productsCart) => productsCart.id !== product.id));
    localStorage.setItem("cart", JSON.stringify(cart));
    showSweetAlert("Producto Eliminado del Carrito", "warning");
  };

  const sendRequest = () => {
    if (!user) {
      showSweetAlert("Debe de Iniciar Sesión", "error");
    } else {
      generarFacturaPDF();
    }
  };

  const generarNumerosAleatorios = () => {

    let numeroAleatorio = Math.floor(Math.random() * 100000);
    numeroAleatorio = ("00000" + numeroAleatorio).slice(-5);

    return parseInt(numeroAleatorio);
  };

  const generarFacturaPDF = () => {
    handleShowLoader();
    const pdfOptions = {
      filename: "factura.pdf",
      image: { type: "jpg", quality: 0.99 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };

    const content = document.getElementById("factura");
    if (content) {
      html2pdf()
        .from(content)
        .set(pdfOptions)
        .outputImg()
        .then(async (pdf) => {
          let headers = new Headers();
          headers.append(
            "Access-Control-Allow-Origin",
            "http://localhost:3000"
          );
          headers.append("Access-Control-Allow-Credentials", "true");
          const binaryString = await atob(pdf.src.split(",")[1]);

          const length = binaryString.length;
          const bytes = new Uint8Array(length);
          for (let i = 0; i < length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
          }

          const blob = new Blob([bytes], { type: "image/png" });
          var fd = new FormData();
          fd.append("upl", blob, "image.png");
          console.log(blob);

          await fetch("http://localhost:5000/service/saveImage", {
            method: "POST",
            headers: headers,
            body: fd,
          })
            .then((response) => response.json())
            .then(async (data) => {
              let headers2 = new Headers();
              headers2.append("Content-Type", "application/json");
              headers2.append("Accept", "application/json");
              headers2.append(
                "Access-Control-Allow-Origin",
                "http://localhost:3000"
              );
              headers2.append("Access-Control-Allow-Credentials", "true");
              headers2.append("GET", "POST", "OPTIONS");
              const cartDetails = {
                collection: "orders",
                document: {
                  products: cart,
                  subtotal: total,
                  total: total + 2.99,
                  discounts: discount,
                  user: user,
                  fee: 2.99,
                  invoice: data.url,
                  status: "pending",
                  numberOrder: numberOrder
                },
              };

              console.log(cartDetails);

              await fetch("http://localhost:5000/service/add", {
                method: "POST",
                headers: headers2,
                body: JSON.stringify(cartDetails),
              }).then((response) => {
                cartProducts([]);
              });
            });

          html2pdf().from(content).set(pdfOptions).outputPdf().save();
          handleHideLoader();
        });
    } else {
      console.error(
        "El elemento con ID 'factura' no fue encontrado en el DOM."
      );
    }
  };

  return (
    <Layout>
      <div className="h-screen pt-20">
        <h1 className="mb-10 text-center text-primary text-2xl font-bold">
          Tu carrito
        </h1>
        {cart.length > 0 ? (
        <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
          <div className="rounded-lg md:w-2/3">
            {
              cart.map((product, index) => {
                return (
                  <div
                    key={index}
                    className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
                    <div className="w-[200px] rounded-lg h-[150px]">
                      <img
                        src={product.img}
                        alt="product-image"
                        className="w-full h-[150px] rounded-lg object-cover"
                      />
                    </div>
                    <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                      <div className="mt-5 sm:mt-0 flex flex-col justify-between lg:pr-[30px]">
                        <div>
                          <h2 className="text-lg font-bold text-gray-900">
                            {product.name}
                          </h2>
                          <p className="mt-1 text-xs text-gray-700">
                            {product.description}
                          </p>
                        </div>
                        <div className="flex items-center border-gray-100">
                          <span
                            onClick={() => {
                              removeQuantity(product);
                            }}
                            className="cursor-pointer rounded-l bg-gray-200 text-primary py-2 px-5 duration-100 hover:bg-primary hover:text-white">
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
                          <span
                            onClick={() => {
                              addQuantity(product);
                            }}
                            className="cursor-pointer rounded-r text-primary bg-gray-200 py-2 px-5 duration-100 hover:bg-primary hover:text-white">
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
                          <div
                            onClick={() => {
                              deleteProduct(product);
                            }}
                            className="cursor-pointer bg-[#c8c8c8] rounded p-3 hover:bg-primary hover:text-white">
                            <BiSolidTrash size={20}></BiSolidTrash>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            }
            
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
                <p className="mb-1 text-primary text-lg font-bold">
                  ${(total + 2.99).toFixed(2)}
                </p>
                <p className="text-sm text-gray-700">Incluye IVA</p>
              </div>
            </div>
            <button
              onClick={() => {
                sendRequest();
              }}
              className="mt-6 w-full rounded-md bg-primary py-1.5 font-medium text-blue-50 hover:bg-secondary">
              Enviar
            </button>
          </div>
        </div>
        ) : (
          <div className="flex flex-col items-center">
            <Image src={emptyCart} width={200} height={200} alt="empty cart"></Image>
            <h1 className="text-primary font-bold text-3xl mt-[20px]">Tu carrito parece estar vacio</h1>
            <p className="text-secondary font-bold">Parece que no haz añadido nada a tu carrito, ve y explora todo nuestro catalogo de flores que tenemos para ofrecerte!</p>
          </div>
        )}
      </div>

      <Loader ref={loaderRef} />

      <div hidden={true}>
        <div
          id="factura"
          className="bg-gray-100 text-gray-600 py-[2cm] px-[3cm]">
          <div className="flex justify-between items-center py-[10px]">
            <div className="px-[20px]">
              <Image
                id="facturaimg"
                className="h-[50px] w-[120px]"
                src={logo}
                alt=""></Image>
            </div>
            <div className="text-primary text-2xl font-bold">Haru Flower</div>
          </div>
          <div className="flex justify-between mt-[2cm]">
            <div>
              <p className="text-primary text-3xl font-bold">Factura</p>
              <p className="flex justify-between gap-[40px] font-bold">
                <span className="text-gray-400 font-medium">N° Factura</span>
                {numberOrder}
              </p>
              <p className="flex justify-between gap-[40px] font-bold">
                <span className="text-gray-400 font-medium">Pedido</span>
                {numberOrder}
              </p>
              <p className="flex justify-between gap-[40px] font-bold">
                <span className="text-gray-400 font-medium">Fecha</span>
                {new Date().toLocaleDateString()}
              </p>
            </div>
            <div className="text-right">
              <span className="text-primary font-bold">
                Facturado a
              </span>
              {user ? (
                <div>
                  <p className="text-right font-bold">{user.name}</p>
                  <p className="text-right font-bold">{user.email}</p>
                  <p className="text-right font-bold">{user.phoneNumber}</p>
                </div>
              ) : (
                <p className="text-right font-bold">Faltan Campos</p>
              )}
            </div>
          </div>
          <div className="w-full mt-[2cm]">
            <table className="w-full">
              <thead>
                <tr className="bg-primary text-white">
                  <td className="text-right pr-[15px] pb-[10px]">N°</td>
                  <td className="pb-[10px]">Producto</td>
                  <td className="text-right pb-[10px]">Precio Unitario</td>
                  <td className="text-right pb-[10px]">Cantidad</td>
                  <td className="text-right pr-[10px] pb-[10px]">Total</td>
                </tr>
              </thead>
              <tbody>
                {cart.length > 0 ? (
                  cart.map((product, index) => {
                    return (
                      <tr key={index} className="bg-gray-200 odd:bg-gray-100">
                        <td className="text-right pr-[15px] py-[5px]">
                          {index + 1}
                        </td>
                        <td>{product.name}</td>
                        <td className="text-right py-[5px]">
                          ${product.price.toFixed(2)}
                        </td>
                        <td className="text-right py-[5px]">
                          {product.quantity}
                        </td>
                        <td className="text-right pr-[10px] py-[5px]">
                          ${(product.quantity * product.price).toFixed(2)}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr className="bg-gray-200 odd:bg-gray-100"></tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="mt-[20px]">
            <p className="flex gap-[1cm] justify-end">
              <span className="text-left">Subtotal</span> ${total.toFixed(2)}
            </p>
            <p className="flex gap-[1cm] justify-end">
              <span className="text-left">Descuentos</span> $
              {discount.toFixed(2)}
            </p>
            <p className="flex gap-[1cm] justify-end">
              <span className="text-left">Gastos Administrativos</span> $2.99
            </p>
            <p className="pb-[10px] mt-[5px] flex justify-end gap-[1cm] text-primary font-bold border-b-solid border-b-2 border-b-primary">
              <span>TOTAL</span> ${(total + 2.99).toFixed(2)}
            </p>
          </div>
          <div className="flex justify-between mt-[2cm]">
            <div>
              <p className="text-primary">Forma de Pago</p>
              <p>------</p>
            </div>
            <div>
              <p className="text-primary">Haru Flowers</p>
              <p>Dirección 1</p>
              <p>Codigo Postal</p>
              <p>El Salvador</p>
            </div>
          </div>
          <div className="flex justify-center gap-[1cm] mt-[2cm] pb-[1cm]">
            <div className="flex flex-col items-center gap-[10px]">
              <BiSolidPhoneCall size={25}></BiSolidPhoneCall> 2313-2343
            </div>
            <div className="flex flex-col items-center gap-[10px]">
              <TfiWorld size={25}></TfiWorld>www.haruFlowers.com
            </div>
            <div className="flex flex-col items-center gap-[10px]">
              <ImLocation size={25}></ImLocation>Street 0349
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
