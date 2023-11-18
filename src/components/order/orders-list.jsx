import React, { useState, useEffect, Children, useRef } from "react";
import Modal from '@/components/modal/Modal'
import axios from 'axios'
import ModalAlert from "../modal/ModalAlert";
import ModalDetails from "../modal/ModalDetails"
import { Checkbox } from "flowbite-react";
import { Input } from "postcss";
import Swal from 'sweetalert2';
import showSweetAlert, { CotizacionError, confirmationAlert } from '../Alerts/AlertManage';


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
    const opcionesFormato = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        timeZone: 'UTC' // Ajusta según tu zona horaria
    }
    const [fechaPedido, SetFechaPedido] = useState(new Date())
    const [seconds, setSeconds] = useState(1700097373)
    const [nanoseconds, setNanoSeconds] = useState(832000000)
    //contenedor de orders
    const [orderList, setOrderList] = useState(orders)
    const [orderToShow, setorderToShow] = useState([...orderList]);
    //control checkbox
    const [isChecked, setIsChecked] = useState(false);

    //Contenedores de para quote modificado

    //Contreol de  modales
    const [isOpenModalOrders, setIsOpenModalOrders] = useState(false)
    const [loadingData, setLoadingData] = useState(false)
    const [download, setDowload] = useState(false)

    //Control del useEffect
    const [ahora, setAhora] = useState(false)

    //Filtros
    const [statusOrder, setStatusOrder] = useState('all')

    const body = {
        collection: "orders",
        id: idDocument
    };

    useEffect(() => {
        setorderToShow([...orderList]);
    }, [orderList]);


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
            created_at: new Date(seconds * 1000)
        }
    }

    const cambiarEstado = async () => {
        const res = await axios.put('http://localhost:5000/service/update', bodyOrder)
        console.log(res)
        handleUpdateOrderList();
        //Se vacia el id de la orden para evitar que se active el useEffect
        setAhora(false)
        setIdDocument('')
        const results = orderList.filter((result) => {
            return result.status == 'pendidg';
        })
        setorderToShow(results);
        setStatusOrder('all')
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
        const result = await confirmationAlert("¿Desea eliminar la orden?");
        //setDeleteConfirm(!isDeleteConfirm)
        //setIdProduct(id)
        //if (isDeleteConfirm) {
        if (result.isConfirmed) {
            const body = {
                data: {
                    collection: "orders",
                    id: id
                }
            }

            const res = await axios.delete('http://localhost:5000/service/delete', body)
            console.log(res)
            handleUpdateOrderList();
        }
        else if (result.isDismissed) {
            console.log("Se canceló");
        }
        //setIdProduct('')
        //setIsDelete(!isDelete)
        //}
    }

    //Alertas
    const handleMostrarConfirmacion = async (estado, titulo, mensaje) => {
        const result = await confirmationAlert(titulo);
        if (result.isConfirmed) {
            handleSubmitChangeStatus(estado)
            showSweetAlert(mensaje, "success");
        } else if (result.isDismissed) {
            console.log("Se canceló");
        }
    };

    //Filtro
    const filtroEstado = (type) => {
        setStatusOrder(type);
        if (type == 'success') {
            const results = orderList.filter((result) => {
                return result.status == 'success';
            });
            setorderToShow(results);
        } else if (type == 'pending') {
            const results = orderList.filter((result) => {
                return result.status == 'pending';
            });
            setorderToShow(results);
        } else if (type == 'cancel') {
            const results = orderList.filter((result) => {
                return result.status == 'cancel';
            });
            setorderToShow(results);
        }
        else {
            setorderToShow(orderList);
        }
    }


    return (
        <>

            <div className="mt-7">
                <h1 className="text-2xl font-semibold mx-10 mb-10 text-primary">Lista de Ordenes</h1>
                <div className="flex gap-[20px] justify-center">
                    <div onClick={() => { filtroEstado('all') }} className={statusOrder == 'all' ? 'bg-primary rounded-lg cursor-pointer px-6 py-4' : 'bg-neutral-400 rounded-lg cursor-pointer px-6 py-4'}>Todos</div>
                    <div onClick={() => { filtroEstado('pending') }} className={statusOrder == 'pending' ? 'bg-primary rounded-lg cursor-pointer px-6 py-4' : 'bg-neutral-400 rounded-lg cursor-pointer px-6 py-4'}>Pendientes</div>
                    <div onClick={() => { filtroEstado('success') }} className={statusOrder == 'success' ? 'bg-primary rounded-lg cursor-pointer px-6 py-4' : 'bg-neutral-400 rounded-lg cursor-pointer px-6 py-4'}>Compleados</div>
                    <div onClick={() => { filtroEstado('cancel') }} className={statusOrder == 'cancel' ? 'bg-primary rounded-lg cursor-pointer px-6 py-4' : 'bg-neutral-400 rounded-lg cursor-pointer px-6 py-4'}>Cancelados</div>
                </div>
                <div className="flex justify-center">
                    <table className="table-auto mt-5">
                        <thead className="text-white bg-primary">
                            <tr>
                                <th className="border border-black px-2 text-center"># Orden</th>
                                <th className="border border-black px-2 w-30 text-center"> Cliente</th>
                               { <th className="border border-black px-3 w-30 text-center">Fecha de proceso</th> }
                                <th className="border border-black px-3 w-30 text-center">Estado</th>
                                <th className="border border-black px-5">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="white  text-black">
                            {orderToShow.map((order, index) => (
                                <tr key={order.id}>
                                    <td className="border border-black px-2 text-center">{order.numberOrder}</td>
                                    <td className="border border-black px-2 text-center">{order.user.name + order.user.lastname}</td>
                                   {<td className="border border-black px-3 w-30 text-center">{new Date(order.created_at).toLocaleDateString('es-Es', opcionesFormato) === 'Invalid Date' ? new Date(seconds * 1000).toLocaleDateString('es-Es', opcionesFormato) : new Date(order.created_at).toLocaleDateString('es-Es', opcionesFormato)}</td>}
                                    <td className="border border-black px-3 w-30 text-center">{(order.status === "pending" ? "Pendiente" : order.status === "success" ? "Completado" : "Cancelado")} </td>
                                    <td className="border border-black px-5">
                                        <div className="space-x-3 p-3">
                                            <button onClick={() => { handleSeeDetails(order.id), handleModalSeeDetails() }} className=" text-white bg-primary px-2 py-1 rounded hover:bg-rose-800">Ver Detalles</button>
                                            <a href={order.invoice}>
                                                <button className="bg-secondary text-white px-2 py-1  rounded hover:bg-red-600">Descargar Factura</button>
                                            </a>
                                            <button onClick={() => handleDelete(order.id)} className="bg-red-700 text-white px-2 py-1 rounded hover:bg-red-600">Eliminar</button>
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
                                <p className="text-primary underline font-bold">Nº{numOrder}</p>
                                <span className={`text-xs font-medium me-2 px-2.5 py-0.5 rounded ${status === "pending" ? "dark:bg-red-900 dark:text-red-300 bg-red-100 text-red-800" : status === "success" ? "dark:bg-green-900 dark:text-green-300 bg-green-100 text-green-800" : "bg-gray-100 dark:bg-gray-700 dark:text-gray-300"}`}>{status === "pending" ? "Pendiente" : status === "success" ? "Completado" : "Cancelado"}</span>
                            </div>
                            <div className="ml-5 mb-1">
                                <p className="text-black underline font-bold">Datos del cliente</p>
                            </div>
                            <div className="flex justify-between">
                                <div className="flex items-center mb-2 ml-5">
                                    <p className="text-primary underline font-bold">Cliente: </p>
                                    <p className="text-black w-30 ml-2 font-bold ">{name + ' ' + lastName}</p>
                                </div>
                                <div className="flex items-center mb-2">
                                    <p className="text-primary underline font-bold">Correo: </p>
                                    <p className="text-black w-20 ml-2 font-bold mr-20">{email}</p>
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
                                        <button onClick={() => { handleMostrarConfirmacion("success", "¿Desea completar el pedido?", "¡Entrega completada con éxito!") }} className=" text-white bg-primary px-2 py-1 rounded hover:bg-rose-800">Completar</button>
                                        <button onClick={() => { handleMostrarConfirmacion("cancel", "¿Desea cancelar el pedido?", "¡Entrega cancelada con éxito!") }} className="bg-secondary text-white px-2 py-1 rounded hover:bg-red-600">Cancelar orden</button>
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
                                        <button onClick={handleModalClose} className="bg-secondary text-white px-2 py-1 rounded hover:bg-red-600">Salir</button>
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
