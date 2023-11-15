import { UploadButton } from "@bytescale/upload-widget-react";
import React, { useState, useEffect, Children, useRef } from "react";
import axios from 'axios'
import {showSweetAlert, CotizacionError} from "../Alerts/Alert";



export default function Quote() {

  //Datos
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastname] = useState("");
  const [correo, setCorreo] = useState("");
  const [imagen, setImagen] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [telefono, setTelefono] = useState("");

  let headers = new Headers();

  //Byte Scale
  const options = {
    apiKey: "free", // Get API keys from: www.bytescale.com
    maxFileCount: 10
  };

  //Nueva Cotizacion
  const form = useRef(null);
  const quote = {
    collection: "quotes",
    document: {
      firstName: firstname,
      lastName: lastname,
      email: correo,
      img: imagen,
      message: mensaje,
      phone: telefono
    }
  }

  const handleFirstName = (event) => {
    setFirstName(event.target.value);
  }
  const handleLastName = (event) => {
    setLastname(event.target.value);
  }
  const handleEmail = (event) => {
    setCorreo(event.target.value);
  }
  const handleImg = (imagen) => {
    setImagen(imagen);
  }
  const handlePhone = (event) => {
    setTelefono(event.target.value);
  }
  const handleMessage = (event) => {
    setMensaje(event.target.value)
  }
  

  const handleSubmitNewQuote = async (e) => {
    e.preventDefault();
    const validaciones = []
    const esCorreo =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/ 
    const esTelefono = /^[267][0-9]{3}-?[0-9]{4}$/
    if(firstname === ""){
      validaciones.push('Agregar su primer nombre')
    }
    if(lastname === ""){
      validaciones.push(' Agregar su segundo nombre')
    }
    if(correo === ""){
      validaciones.push(' Agregar correo electronico')
    }else if(!esCorreo.test(correo)){
      validaciones.push(' Su correo no es valido')
    }
    if(telefono === ""){
      validaciones.push(' Agregar numero telefonico')
    }else if(!esTelefono.test(telefono)){
      validaciones.push(' Su numero de telefono no valido')
    }
    if(mensaje === ""){
      validaciones.push(' Agregar mensaje')
    }
    if(imagen === ""){
      validaciones.push(' Agregar imagen')
    }
    if(validaciones.length === 0){
      const res = await axios.post('http://localhost:5000/service/add', quote)
      console.log(res)
      form.current.reset();
      setImagen("");
      showSweetAlert('Cotizacion enviada', 'success');
    }else{
      CotizacionError(validaciones);
    }
    
  }

  return (
    <div className="w-screen bg-white">
      <div className="container mx-auto my-4 px-4 lg:px-20">
        <div className="w-full p-8 my-4 md:px-12 lg:w-9/12 lg:pl-20 lg:pr-40 mr-auto rounded-2xl shadow-2xl">
          <div className="flex">
            <h1 className="font-bold uppercase text-5xl text-primary">
              Contactanos
            </h1>
          </div>
          <form className="rounded-lg px-10 pb-8 mb-2" onSubmit={handleSubmitNewQuote} ref={form}>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 mt-5">
            <input
              className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:ring-blue-500 focus:border-blue-500 "
              type="text"
              placeholder="First Name*"
              onChange={handleFirstName}
            />
            <input
              className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:ring-blue-500 focus:border-blue-500 "
              type="text"
              placeholder="Last Name*"
              onChange={handleLastName}
            />
            <input
              className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:ring-blue-500 focus:border-blue-500 "
              type="email"
              placeholder="Email*"
              onChange={handleEmail}
            />
            <input
              className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:ring-blue-500 focus:border-blue-500 "
              type="number"
              placeholder="Phone*"
              onChange={handlePhone}
            />
          </div>
          <div className="my-4">
            <textarea
              placeholder="Message*"
              className="w-full h-32 bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              onChange={handleMessage}
            ></textarea>
          </div>
          <div className="my-4">
          <UploadButton options={options}
              onComplete={files => handleImg(files.map(x => x.fileUrl))}>
              {({ onClick }) =>
                <button onClick={onClick} className=" bg-primary text-gray-100  font-bold py-1 px-4 rounded mb-3">
                  Upload a img...
                </button>
              }
            </UploadButton>
            <input
              className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:ring-blue-500 focus:border-blue-500 "
              type="text" 
              placeholder="Img ..."
              disabled
              value={imagen}
            />
          </div>
          <div className="my-2 w-1/2 lg:w-1/4">
            <button
              className="uppercase text-sm font-bold tracking-wide bg-primary text-gray-100 p-3 rounded-lg w-full 
                      focus:outline-none focus:shadow-outline"
            >
              enviar
            </button>
          </div>
          </form>
        </div>

        <div className="w-full lg:-mt-96 lg:w-2/6 px-8 py-12 ml-auto bg-primary rounded-2xl">
          <div className="flex flex-col text-white">
            <h1 className="font-bold uppercase text-3xl my-4">
              Arreglos Florales de Ensueño
            </h1>
            <p className="text-white">
              Contáctanos hoy mismo y comencemos a
              planificar juntos. Ya sea que tengas una idea clara de lo que
              deseas o necesites orientación en la selección de arreglos,
              nuestro equipo te brindará asesoramiento experto y soluciones
              creativas. Estamos aquí para hacer de tu evento una ocasión
              verdaderamente memorable.
            </p>

            <div className="flex my-4 w-2/3 lg:w-1/2">
              <div className="flex flex-col">
                <i className="fas fa-map-marker-alt pt-2 pr-2" />
              </div>
              <div className="flex flex-col">
                <h2 className="text-2xl">Direccion</h2>
                <p className="text-white">
                 El salvador, San Salvador
                </p>
              </div>
            </div>

            <div className="flex my-4 w-2/3 lg:w-1/2">
              <div className="flex flex-col">
                <i className="fas fa-phone-alt pt-2 pr-2" />
              </div>
              <div className="flex flex-col">
                <h2 className="text-2xl">Llamanos</h2>
                <p className="text-white">Tel: 6054-9452</p>
              </div>
            </div>

            
          </div>
        </div>
      </div>
    </div>
  );
}
