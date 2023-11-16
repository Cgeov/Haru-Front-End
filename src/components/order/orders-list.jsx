import React, { useState, useEffect, Children, useRef } from "react";
import Modal from '@/components/modal/Modal'
import axios from 'axios'
import ModalAlert from "../modal/ModalAlert";
import ModalDetails from "../modal/ModalDetails"
import { Checkbox } from "flowbite-react";
import { Input } from "postcss";
import showSweetAlert from "../Alerts/Alert";



const OrdersList = ({ orders }) => {
    //ID de documento
    const [idDocument, setIdDocument] = useState('')
    //Datos del cliente
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [lastName, setLastName] = useState('')
    const [typeUser, setTypeUser] = useState('')
    const [idUser, setIdUser] = useState('')
    //Datos de la orden
    const [fee, setFee] = useState(0)
    const [subTotal, setSubTotal] = useState(0)
    const [numOrder, setNumOrder] = useState('')
    const [total, setTotal] = useState(0)
    const [discounts, setDiscounts] = useState(0)
    const [invoice, setInvoice] = useState('')
    const [status, setStatus] = useState('')
    const [products, setProducts] = useState([])
    //contenedor de orders
    const [orderList, setOrderList] = useState(orders)
    //control checkbox
    const [isChecked, setIsChecked] = useState(false);

    //Contenedores de para quote modificado

    //Contreol de  modales
    const [isOpenModalOrders, setIsOpenModalOrders] = useState(false)
    const [loadingData, setLoadingData] = useState(false)
    const [download, setDowload] = useState(false)

    //Control del useEffect
    const [ahora, setAhora] = useState(false)

    const body = {
        collection: "orders",
        id: idDocument
    };

    let headers = new Headers();

    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    headers.append("Access-Control-Allow-Origin", "http://localhost:3000");
    headers.append("Access-Control-Allow-Credentials", "true");
    headers.append("GET", "POST", "OPTIONS");


    useEffect(() => {
        if (idDocument !== "") {
            fetch("http://localhost:5000/service/getDoc", {
                method: "POST",
                headers: headers,
                body: JSON.stringify(body),
            })
                .then((response) => response.json())
                .then((data) => {
                    //Datos del usuario 
                    setName(data.user.name)
                    setEmail(data.user.email)
                    setLastName(data.user.lastname)
                    setTypeUser(data.user.typeUser)
                    setIdUser(data.user.id)
                    //Datos de la orden 
                    setFee(data.fee)
                    setSubTotal(data.subtotal)
                    setNumOrder(data.numberOrder)
                    setTotal(data.total)
                    setDiscounts(data.discounts)
                    setInvoice(data.invoice)
                    setStatus(data.status)
                    //Productos
                    setProducts(data.products)
                    //Para cuendo se carga toda la data
                    setLoadingData(!loadingData)
                })
                .catch((error) => {
                });
        }
    }, [isOpenModalOrders]);


    const handleSeeDetails = (id) => {
        setIdDocument(id)
    }

    const handleModalSeeDetails = () => {
        setIsOpenModalOrders(true)
    }

    //Completar pedido
    const bodyOrder = {
        collection: "orders",
        id: idDocument,
        document: {
            id: idDocument,
            user: {
                /*created_at: {
                    seconds: seconds,
                    nanoseconds: nanoseconds
                },*/
                name: name,
                email: email,
                lastname: lastName,
                typeUser: typeUser,
                id: idUser,
            },
            fee: fee,
            subtotal: subTotal,
            numberOrder: numOrder,
            total: total,
            discounts: discounts,
            invoice: invoice,
            status: status,
            products: products,
            /*created_at: {
                seconds: seconds,
                nanoseconds: nanoseconds
            }*/
        }
    }

    const cambiarEstado = async () => {
        const res = await axios.put('http://localhost:5000/service/update', bodyOrder)
        console.log(res)
        handleUpdateOrderList();
        //Se vacia el id de la orden para evitar que se active el useEffect
        setAhora(false)
        setIdDocument('')
        //Activa la alerta
        //setProductSuccessEdit(!isProductSuccessEdit)
    }

    useEffect(() => {
        if (ahora !== false) {
            cambiarEstado()
        }
    }, [ahora])

    const handleSubmitChangeStatus = async (estado) => {
        setStatus(estado)
        setAhora(true)
    }
    //Actualizar lista de ordenes
    const handleUpdateOrderList = async () => {
        const body = {
            collection: "orders",
        };
        const res = await axios.post('http://localhost:5000/service/getCollection', body)
        setOrderList(res.data);
    }


    const handleModalClose = () => {
        setLoadingData(false)
        setIsOpenModalOrders(false)
        setIdDocument('')
    }

    const handleDelete = async (id) => {
        const body = {
            data: {
              collection: "orders",
              id: id
            }
          }
          //setDeleteConfirm(!isDeleteConfirm)
          //setIdProduct(id)
          //if (isDeleteConfirm) {
            const res = await axios.delete('http://localhost:5000/service/delete', body)
            console.log(res)
            handleUpdateOrderList();
            //setIdProduct('')
            //setIsDelete(!isDelete)
          //}





    }
    return (
        <>

            <div className="mt-7">
                <h1 className="text-2xl font-semibold mx-10 mb-10 text-black">Lista de Ordenes</h1>
                <div className="flex justify-center">
                    <table className="table-auto mt-5">
                        <thead className="text-white bg-primary">
                            <tr>
                                <th className="border border-black px-2 text-center"># Orden</th>
                                <th className="border border-black px-3 w-30 text-center">Estado</th>
                                <th className="border border-black px-3 w-30 text-center">Fecha</th>
                                <th className="border border-black px-5">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="white  text-black">
                            {orderList.map((order, index) => (
                                <tr key={order.id}>
                                    <td className="border border-black px-2 text-center">{order.numberOrder}</td>
                                    <td className="border border-black px-3 w-30 text-center">{(order.status === "pending"?"Pendiente" : order.status === "success"? "Completado": "Cancelado" )} </td>
                                    <td className="border border-black px-3 w-30 text-center"></td>
                                    <td className="border border-black px-5">
                                        <div className="space-x-2">
                                            <button onClick={() => { handleSeeDetails(order.id), handleModalSeeDetails() }} className=" text-white bg-primary px-2 py-1 rounded hover:bg-blue-600">Ver Detalles</button>
                                            <button onClick={() => handleDelete(order.id)} className="bg-secondary text-white px-2 py-1 rounded hover:bg-red-600">Eliminar</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {loadingData && (
                isOpenModalOrders && (
                    <ModalDetails Title="Detalle de la orden" handleModal={handleModalClose}>
                        <div className="">
                            <div className="flex justify-between items-center mb-2 ml-5">
                                <p className="text-black underline font-bold">Nº{numOrder}</p>
                                <span className={`text-xs font-medium me-2 px-2.5 py-0.5 rounded ${status === "pending" ? "dark:bg-red-900 dark:text-red-300 bg-red-100 text-red-800" : status === "success" ? "dark:bg-green-900 dark:text-green-300 bg-green-100 text-green-800" : "bg-gray-100 dark:bg-gray-700 dark:text-gray-300"}`}>{status === "pending" ? "Pendiente" : status === "success"? "Completado": "Cancelado"}</span>
                            </div>
                            <div className="ml-5 mb-1">
                                <p className="text-black underline font-bold">Datos del cliente</p>
                            </div>
                            <div className="flex justify-between">
                                <div className="flex items-center mb-2 ml-5">
                                    <p className="text-black font-bold">Cliente: </p>
                                    <p className="text-black w-20 ml-2 ">{name + ' ' + lastName}</p>
                                </div>
                                <div className="flex items-center mb-2">
                                    <p className="text-black font-bold">Correo: </p>
                                    <p className="text-black w-20 ml-2 mr-20">{email}</p>
                                </div>
                            </div>
                            <div className="ml-5">
                                <p className="text-black underline font-bold">Productos solicitados</p>
                            </div>
                            <div className="flex justify-start items-center mb-2">
                                <table className="table-auto mt-2 ml-5">
                                    <thead className="text-white bg-primary">
                                        <tr>
                                            <th className="border border-black px-2 text-center">#</th>
                                            <th className="border border-black px-3 w-30 text-center">Nombre</th>
                                            <th className="border border-black px-3 w-30 text-center">Cantidad</th>
                                            <th className="border border-black px-3 w-30 text-center">Categoría</th>
                                            <th className="border border-black px-3 w-30 text-center">Precio Unitario</th>
                                            <th className="border border-black px-3 w-30 text-center">Total</th>
                                        </tr>
                                    </thead>
                                    <tbody className="white  text-black">
                                        {products.map((product, index) => (
                                            <tr key={product.id}>
                                                <td className="border border-black px-2 text-center">{index + 1}</td>
                                                <td className="border border-black px-3 w-30 text-center">{product.name}</td>
                                                <td className="border border-black px-3 w-30 text-center">{product.quantity}</td>
                                                <td className="border border-black px-3 w-30 text-center">{product.category}</td>
                                                <td className="border border-black px-3 w-30 text-center">${product.price}</td>
                                                <td className="border border-black px-3 w-30 text-center">${product.price * product.quantity}</td>
                                            </tr>
                                        ))}
                                        <tr>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td className="border border-black px-2 text-center text-blaclk"> SubTotal</td>
                                            <td className="border border-black px-2 text-center font-bold">${parseFloat(subTotal).toFixed(2)}</td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td className="border border-black px-2 text-center font-bold text-primary">Total</td>
                                            <td className="border border-black px-2 text-center font-bold">${parseFloat(total).toFixed(2)}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="space-x-2 mt-4 ml-5 mb-2 flex justify-start">
                                {status === "pending" && (
                                    <>
                                        <button onClick={() => { handleSubmitChangeStatus("success") }} className=" text-white bg-primary px-2 py-1 rounded hover:bg-blue-600">Completar</button>
                                        <button onClick={() => { handleSubmitChangeStatus("cancel") }} className="bg-secondary text-white px-2 py-1 rounded hover:bg-red-600">Cancelar orden</button>
                                    </>
                                )}
                                {status === "success" && (
                                    <>
                                        <a href={invoice}>
                                            <button className="bg-secondary text-white px-2 py-1 rounded hover:bg-red-600">Ver Factura</button>
                                        </a>
                                    </>
                                )}
                                {status === "cancel" && (
                                    <>
                                            <button onClick={handleModalClose}className="bg-secondary text-white px-2 py-1 rounded hover:bg-red-600">Salir</button>
                                    </>
                                )}

                            </div>
                        </div>
                    </ModalDetails>
                )
            )
            }
        </>
    );
};

export default OrdersList;
