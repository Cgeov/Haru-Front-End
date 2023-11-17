import React, { useState, useEffect } from "react";
import ModalDetails from "../modal/ModalDetails"
import axios from "axios";
import showSweetAlert,{DeleteQuote} from "../Alerts/Alert";


const QuotesList = ({ quotes }) => {
  //Datos de la cotizacióm
  const [idDocument, setIdDocument] = useState('')
  const [firstNameQuote, setFirstNameQuote] = useState('')
  const [lastNameQuote, setLastNameQuote] = useState('')
  const [emailQuote, setEmailQuote] = useState('')
  const [phoneQuote, setPhoneQuote] = useState('')
  const [messageQuote, setMessageQuote] = useState('')
  const [imgQuote, setImgQuote] = useState([])
  const [estadoLecturaQuote, setEstadoLecturaQuote] = useState('')
  const [leidoStatus, setLeidoStatus] = useState('all');
  

  //contenedor de quotes
  const [quotesobj, setQuotesobj] = useState(quotes);
  const [quoteToShow, setquoteToShow] = useState([...quotesobj]);

  //control checkbox
  const [isChecked, setIsChecked] = useState(false);

  //Contenedores de para quote modificado
  const [idDocumentEDIT, setIdDocumentEDIT] = useState('')

  const bodyObj = {
    collection: "quotes",
    id: idDocumentEDIT,
    document: {
      firstName: firstNameQuote,
      lastName: lastNameQuote,
      message: messageQuote,
      phone: phoneQuote,
      email: emailQuote,
      img: imgQuote,
      leido: Boolean(true)
    }
  }

  useEffect(() => {
    setquoteToShow([...quotesobj]);
  }, [quotesobj]);



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

  const getQuotes = async () => {
    await fetch("http://localhost:5000/service/getDoc", {
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
        console.log(data.img)
        setLoadingData(!loadingData)
        setIdDocument('')
        setEstadoLecturaQuote(data.leido)
      })
      .catch((error) => {
      });

  }
  
  useEffect(() => {
    if (idDocument !== "") {
      getQuotes();

    }
  }, [isOpenModalSeeDetails]);


  const handleSeeDetails = (id) => {
    setIdDocument(id)
    setIdDocumentEDIT(id)

  }
  const handleModalSeeDetails = () => {
    setIsOpenModalSeeDetails(!isOpenModalSeeDetails)
  }
  const handleCerrar = () => {
    setLoadingData(false)
    setIsOpenModalSeeDetails(false)
  }
  const handleDelete = async (id) => {
    const result = await DeleteQuote("¿Desea eliminar este producto?");
    const quoteDeleted = {
      data: {
        collection: "quotes",
        id: id
      }
    }

    if (result.isConfirmed) {
      const res = await axios.delete('http://localhost:5000/service/delete', quoteDeleted)
      console.log(res)
      handleUpdateQuotetList();
      showSweetAlert("¡Cotizacion eliminada con éxito!", "success");
      //setIdProduct('')
      //setIsDelete(!isDelete)
    } else if (result.isDismissed) {
      console.log("Se canceló la acción");
    }
  }
  //Actualizar lista de cotizaciones
  const handleUpdateQuotetList = async () => {
    const body = {
      collection: "quotes",
    };
    const res = await axios.post('http://localhost:5000/service/getCollection', body)
    setQuotesobj(res.data);
  }

  //toshi
  const handleCotizacionEstado = async (e) => {
    e.preventDefault();
    const res = await axios.put('http://localhost:5000/service/update', bodyObj)

    handleCerrar();
    //Alerta
    showSweetAlert("¡La cotización ha sido Leída!","success");
    handleUpdateQuotetList();
  }

  const filtroEstado = (type) => {
    setLeidoStatus(type);
    if(type == 'read'){
      const results = quotesobj.filter((result) => {
        return result.leido == true;
      });
      setquoteToShow(results);
    }else if(type == 'notRead'){
      const results = quotesobj.filter((result) => {
        return result.leido === false;
      });
      setquoteToShow(results);
    }else{
      setquoteToShow(quotesobj);
    }

    // if (isChecked == false) {

    //   const quotesobjfiltrado = quotesobj.filter(quote => quote.leido === false);
    //   setQuotesobj(quotesobjfiltrado);
    // }
    // else {
    //   updateQuotes();


    // }

  }

  return (
    <>
      <div className="mt-7">
        <h1 className="text-2xl font-semibold mx-10 mb-10 text-primary">Lista de Cotizaciones</h1>
        <div className="flex gap-[20px] justify-center">
          <div onClick={()=>{filtroEstado('all')}} className={leidoStatus == 'all' ? 'bg-primary rounded-lg cursor-pointer px-6 py-4': 'bg-neutral-400 rounded-lg cursor-pointer px-6 py-4'}>Todos</div>
          <div onClick={()=>{filtroEstado('read')}} className={leidoStatus == 'read'? 'bg-primary rounded-lg cursor-pointer px-6 py-4' :'bg-neutral-400 rounded-lg cursor-pointer px-6 py-4'}>Leidos</div>
          <div onClick={()=>{filtroEstado('notRead')}} className={leidoStatus == 'notRead'? 'bg-primary rounded-lg cursor-pointer px-6 py-4' :'bg-neutral-400 rounded-lg cursor-pointer px-6 py-4'}>No Leidos</div>
        </div>

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
              {quoteToShow.map((quote, index) => (
                <tr key={quote.id}>
                  <td className="border border-black px-2 text-center">{index + 1}</td>
                  <td className="border border-black px-3 w-30 text-center">{quote.firstName} </td>
                  <td className="border border-black px-5 w-30 text-center overflow-hidden">{quote.lastName} </td>
                  <td className="border border-black px-3 w-20 text-center">{quote.phone}</td>
                  <td className="border border-black px-5 text-center">{quote.email}</td>
                  <td className="border border-black px-5 w-60 text-center overflow-hidden whitespace-normal break-all">{quote.message}</td>
                  <td className="border border-black px-5">
                    <div className="space-x-3 p-3 ">
                      <button onClick={() => { handleSeeDetails(quote.id), handleModalSeeDetails() }} className=" text-white bg-primary px-2 py-1 rounded hover:bg-rose-800">Ver Detalles</button>
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
              <div className="flex items-center mb-3 ml-1">
                <p className="text-primary font-bold underline">Cliente: </p>
                <p className="text-black w-30 ml-2 font-bold">{firstNameQuote + " " + lastNameQuote}</p>
              </div>
              <div className="flex justify-between mb-3 ml-1">
                <div className="flex">
                  <p className="text-primary  font-bold underline">Correo: </p>
                  <p className="text-black w-30 ml-2 font-bold">{emailQuote}</p>
                </div>
                <div className="flex">
                  <p className="text-primary  font-bold underline">Teléfono: </p>
                  <p className="text-black w-30 ml-2 font-bold">{phoneQuote}</p>
                </div>
              </div>
              <p className="text-primary font-bold underline mb-3 ml-1">Mensaje</p>
              <div className="px-70 overflow-hidden ml-1">
                <p className="text-black whitespace-normal break-all font-bold">{messageQuote}</p>
              </div>
              {imgQuote.length > 0 && (<>
                <p className="text-primary w-30 font-bold underline mb-4 mt-3 ml-1">Imagenes adjuntas</p>
                <div className="space-x-3  flex flex-wrap -mx-3 ml-1">
                {imgQuote.map((img, index) => (
                  <div key={index} className="px-70 overflow-hidden">
                    <img src={img} alt="" className="w-[200px] h-[200px]" />
                  </div>))}
                </div>
                
              </>
              )}
              <div className="space-x-2 mt-6">
              {!estadoLecturaQuote && (
              <button onClick={handleCotizacionEstado} className=" text-white bg-primary px-2 py-1 rounded hover:bg-rose-800">Marcar como leído</button>
              )}
                      
                <button onClick={()=> {handleCerrar()}} className="bg-secondary text-white px-2 py-1 rounded hover:bg-red-600">Salir</button>
              </div>
            </div>
          </ModalDetails>
        )
      )
      }
    </>
  );
};

export default QuotesList;