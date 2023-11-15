import React, { useState, useEffect } from "react";
import ModalDetails from "../modal/ModalDetails"



const ProductList = ({ quotes }) => {
  //Datos de la cotizacióm
  const [idDocument, setIdDocument] = useState('')
  const [firstNameQuote, setFirstNameQuote] = useState('')
  const [lastNameQuote, setLastNameQuote] = useState('')
  const [emailQuote, setEmailQuote] = useState('')
  const [phoneQuote, setPhoneQuote] = useState('')
  const [messageQuote, setMessageQuote] = useState('')
  const [imgQuote, setImgQuote] = useState('')

  //Contreol de  modales
  const [isOpenModalSeeDetails, setIsOpenModalSeeDetails] = useState(false)
  const [loadingData, setLoadingData] = useState(false)


  const body = {
    collection: "quotes",
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
          setFirstNameQuote(data.firstName)
          setLastNameQuote(data.lastName)
          setPhoneQuote(data.phone)
          setEmailQuote(data.email)
          setMessageQuote(data.message)
          setImgQuote(data.img)
          setLoadingData(!loadingData)
          setIdDocument('')
        })
        .catch((error) => {
        });
    }
  }, [isOpenModalSeeDetails]);


  const handleSeeDetails = (id) => {
    setIdDocument(id)

  }
  const handleModalSeeDetails = () => {
    setIsOpenModalSeeDetails(!isOpenModalSeeDetails)
  }
  const handleCerrar = () => {
    setLoadingData(false)
    setIsOpenModalSeeDetails(false)
  }
  const handleDelete = () => {

  }

  return (
    <>
      <div className="mt-10">
        <h1 className="text-2xl font-semibold mx-10 mb-10 text-black">Lista de Cotizaciones</h1>
        <div className="flex justify-center">
          <table className="table-auto mt-5">
            <thead className="text-white bg-primary">
              <tr>
                <th className="border border-black px-2 text-center">#</th>
                <th className="border border-black px-3 w-30 text-center">Nombre</th>
                <th className="border border-black px-5 w-30 text-center">Apellido</th>
                <th className="border border-black px-5 w-30">Teléfono</th>
                <th className="border border-black px-3 w-20 text-center">Correo</th>
                <td className="border border-black px-5 text-center">Mensaje</td>
                <th className="border border-black px-5">Acciones</th>
              </tr>
            </thead>
            <tbody className="white  text-black">
              {quotes.map((quote, index) => (
                <tr key={quote.id}>
                  <td className="border border-black px-2 text-center">{index + 1}</td>
                  <td className="border border-black px-3 w-30 text-center">{quote.firstName} </td>
                  <td className="border border-black px-5 w-30 text-center overflow-hidden">{quote.lastName} </td>
                  <td className="border border-black px-3 w-20 text-center">{quote.phone}</td>
                  <td className="border border-black px-5 text-center">{quote.email}</td>
                  <td className="border border-black px-5 w-60 text-center overflow-hidden whitespace-normal break-all">{quote.message}</td>
                  <td className="border border-black px-5">
                    <div className="space-x-2">
                      <button onClick={() => { handleSeeDetails(quote.id), handleModalSeeDetails() }} className=" text-white bg-primary px-2 py-1 rounded hover:bg-blue-600">Ver Detalles</button>
                      <button onClick={() => handleDelete(quote.id)} className="bg-secondary text-white px-2 py-1 rounded hover:bg-red-600">Eliminar</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {loadingData && (
        isOpenModalSeeDetails && (
          <ModalDetails handleModal={handleCerrar} Title="Datos de Cotización">
            <div className="">
              <div className="flex items-center mb-2">
                <p className="text-black font-bold">Nombre: </p>
                <p className="text-black w-20 ml-2 ">{firstNameQuote}</p>
              </div>
              <div className="flex items-center mb-2">
                <p className="text-black font-bold">Apellido: </p>
                <p className="text-black w-20 ml-2 ">{lastNameQuote}</p>
              </div>
              <div className="flex items-center mb-2">
                <p className="text-black font-bold">Correo: </p>
                <p className="text-black w-20 ml-2 ">{emailQuote}</p>
              </div>
              <div className="flex items-center mb-2">
                <p className="text-black font-bold">Teléfono: </p>
                <p className="text-black w-20 ml-2 ">{phoneQuote}</p>
              </div>
              <p className="text-black w-20 font-bold underline mb-3">Mensaje</p>
              <div className="px-70 overflow-hidden">
                <p className="text-black whitespace-normal break-all">{messageQuote}</p>
              </div>
              <p className="text-black w-30 font-bold underline mb-3 mt-3">Imagenes adjuntas</p>
              <div className="px-70 overflow-hidden">
                <img src={imgQuote} alt="" width="200" height="200"/>
              </div>
              <div className="space-x-2 mt-4">
                      <button  className=" text-white bg-primary px-2 py-1 rounded hover:bg-blue-600">Marcar como leído</button>
                      <button  className="bg-secondary text-white px-2 py-1 rounded hover:bg-red-600">Cancelar</button>
                    </div>
            </div>
          </ModalDetails>
        )
      )
      }
    </>
  );
};

export default ProductList;
