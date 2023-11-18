import { Fragment, useContext, useEffect, useState } from "react";
import Layout from "../layout";
import { ContextUser } from "@/context/context";
import { Dialog, Transition } from "@headlessui/react";
import { GrClose } from "react-icons/gr";

export default function MyOrders() {
  const { user } = useContext(ContextUser);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [orderSelected, setOrderSelected] = useState({});

  const [ordersToShow, setOrdersToShow] = useState([...orders]);

  const handleSearch = (e) => {
    const searchValue = e.target.value;
    const results = orders.filter((result) => {
      return result.numberOrder.toString().includes(searchValue);
    });
    setOrdersToShow(results);
  };

  useEffect(() => {
    setOrdersToShow([...orders]);
  }, [orders]);

  let headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Accept", "application/json");
  headers.append("Access-Control-Allow-Origin", "http://localhost:3000");
  headers.append("Access-Control-Allow-Credentials", "true");
  headers.append("GET", "POST", "OPTIONS");

  useEffect(() => {
    console.log(user)
    if (user) {
      fetch("http://localhost:5000/service/getDocsFilter", {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
          collection: "orders",
          filter: [
            {
              field: "user.id",
              comparison: "==",
              value: user.id,
            },
          ],
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          setOrders(data);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
        });
    }
  }, []);

  const handleModalViewOrder = (order, event) => {
    event.preventDefault();
    setOrderSelected(order);

    setOpen(true);
  };

  return (
    <Layout>
      <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 pr-10 lg:px-8">
        <div className="align-middle rounded-tl-lg rounded-tr-lg inline-block w-full py-4 overflow-hidden bg-white shadow-lg px-12">
          <div className="flex justify-between">
            <div className="inline-flex border rounded w-7/12 px-2 lg:px-6 h-12 bg-transparent">
              <div className="flex flex-wrap items-stretch w-full h-full mb-6 relative">
                <div className="flex">
                  <span className="flex items-center leading-normal bg-transparent rounded rounded-r-none border border-r-0 border-none lg:px-3 py-2 whitespace-no-wrap text-grey-dark text-sm">
                    <svg
                      width="18"
                      height="18"
                      className="w-4 lg:w-auto"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M8.11086 15.2217C12.0381 15.2217 15.2217 12.0381 15.2217 8.11086C15.2217 4.18364 12.0381 1 8.11086 1C4.18364 1 1 4.18364 1 8.11086C1 12.0381 4.18364 15.2217 8.11086 15.2217Z"
                        stroke="#455A64"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                      />
                      <path
                        d="M16.9993 16.9993L13.1328 13.1328"
                        stroke="#455A64"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </div>
                <input
                  onChange={(e) => {
                    handleSearch(e);
                  }}
                  type="text"
                  className="flex-shrink flex-grow flex-auto leading-normal tracking-wide w-px flex-1 border border-none border-l-0 rounded rounded-l-none px-3 relative focus:outline-none text-sm lg:text-sm lg:text-base text-gray-500 font-thin"
                  placeholder="Buscar"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="align-middle inline-block min-w-full shadow overflow-hidden bg-white shadow-dashboard px-8 pt-3 rounded-bl-lg rounded-br-lg">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-primary tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-primary tracking-wider">
                  Nombre
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-primary tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-primary tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-primary tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-primary tracking-wider">
                  Fecha Orden
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300"></th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {ordersToShow.map((order, i) => {
                return (
                  <tr key={i}>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                      <div className="flex items-center">
                        <div>
                          <div className="text-sm leading-5 text-primary">
                            #{order.numberOrder}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                      <div className="text-sm leading-5 text-primary">
                        {order.user.name + " " + order.user.lastname}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b text-primary border-gray-500 text-sm leading-5">
                      {order.user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b text-primary border-gray-500 text-sm leading-5">
                      ${order.total.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b text-primary border-gray-500 text-sm leading-5">
                      {order.status == "success" && (
                        <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                          <span
                            aria-hidden
                            className="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
                          <span className="relative text-xs">Entregado</span>
                        </span>
                      )}
                      {order.status == "cancel" && (
                        <span className="relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight">
                          <span
                            aria-hidden
                            className="absolute inset-0 bg-red-200 opacity-50 rounded-full"></span>
                          <span className="relative text-xs">Cancelado</span>
                        </span>
                      )}
                      {order.status == "pending" && (
                        <span className="relative inline-block px-3 py-1 font-semibold text-yellow-900 leading-tight">
                          <span
                            aria-hidden
                            className="absolute inset-0 bg-yellow-200 opacity-50 rounded-full"></span>
                          <span className="relative text-xs">En Proceso</span>
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-primary text-sm leading-5">
                      {new Date(order.created_at).toLocaleString("es-Es")}
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-500 text-sm leading-5">
                      <div className="flex gap-[15px]">
                        <button
                          onClick={(e) => {
                            handleModalViewOrder(order, e);
                          }}
                          className="px-5 py-2 border-primary border text-primary rounded transition duration-300 hover:bg-primary hover:text-white focus:outline-none">
                          Ver Productos
                        </button>
                        <a
                          href={order.invoice}
                          className="px-5 py-2 border-primary border text-primary rounded transition duration-300 hover:bg-primary hover:text-white focus:outline-none">
                          Descargar Factura
                        </a>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0">
            <div className="fixed inset-0 hidden bg-gray-500 bg-opacity-75 transition-opacity md:block" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
                enterTo="opacity-100 translate-y-0 md:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 md:scale-100"
                leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95">
                <Dialog.Panel className="flex w-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl">
                  <div className="rounded-2xl relative flex w-full items-center overflow-hidden bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                    <button
                      type="button"
                      className="absolute right-4 top-4 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8"
                      onClick={() => setOpen(false)}>
                      <span className="sr-only">Close</span>
                      <GrClose className="h-6 w-6" aria-hidden="true" />
                    </button>

                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                          <tr>
                            <th scope="col" className="px-16 py-3">
                              <span className="sr-only">Imagen</span>
                            </th>
                            <th scope="col" className="px-6 py-3">
                              Producto
                            </th>
                            <th scope="col" className="px-6 py-3">
                              Cantidad
                            </th>
                            <th scope="col" className="px-6 py-3">
                              Precio
                            </th>
                            <th scope="col" className="px-6 py-3">
                              Total
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {orderSelected.products
                            ? orderSelected.products.map((product, i) => {
                                return (
                                  <tr
                                    key={i}
                                    className="bg-white border-b hover:bg-gray-50">
                                    <td className="p-4">
                                      <img
                                        src={product.img}
                                        className="w-16 md:w-32 max-w-full max-h-full"
                                        alt="Apple Watch"
                                      />
                                    </td>
                                    <td className="px-6 py-4 font-semibold">
                                      {product.name}
                                    </td>
                                    <td className="px-6 py-4">
                                      {product.quantity}
                                    </td>
                                    <td className="px-6 py-4">
                                      ${product.price.toFixed(2)}
                                    </td>
                                    <td className="px-6 py-4 text-gray-900">
                                      <div>
                                        $
                                        {(
                                          product.quantity * product.price
                                        ).toFixed(2)}
                                      </div>
                                    </td>
                                  </tr>
                                );
                              })
                            : null}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </Layout>
  );
}
