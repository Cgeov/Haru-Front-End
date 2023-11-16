import { ContextUser } from "@/context/context";
import Link from "next/link";
import { useContext, useState } from "react";
import showSweetAlert from "../Alerts/Alert";

export default function Register() {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {login} = useContext(ContextUser);



  let dataRegister = {
    name: name,
    lastname: lastName,
    email:email,
    password: password,
  }

  let headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Accept", "application/json");
  headers.append("Access-Control-Allow-Origin", "http://localhost:3000");
  headers.append("Access-Control-Allow-Credentials", "true");
  headers.append("GET", "POST", "OPTIONS");
  const handleSubmitSignUp = async (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/auth/sign-up", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(dataRegister),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.hasOwnProperty('error'))
        if(data.hasOwnProperty('error')){
          showSweetAlert("Correo ya existente", "error");
        }else{
          login(data);
          showSweetAlert("Bienvenido "+ data.name + "!", "success");
        }
        
      })
      .catch((error) => {
      });
  }

  return (
    <div className="w-[80%] flex flex-row gap-[15px] justify-between my-20 mx-auto max-w-4xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8">
      <form onSubmit={handleSubmitSignUp}  className="space-y-6 w-[100%] max-w-xs" >
        <h5 className="text-xl font-medium text-primary">
          Registrate en nuestra Plataforma
        </h5>
        <div>
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900">
            Correo Electronico
          </label>
          <input
            type="email"
            name="email"
            id="email"
            onChange={(e)=> setEmail(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="correo@correo.com"
            required
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900">
            Nombre
          </label>
          <input
            type="text"
            name="name"
            id="name"
            onChange={(e)=> setName(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Nombre"
            required
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900">
            Apellidos
          </label>
          <input
            type="text"
            name="apellidos"
            id="apellidos"
            onChange={(e)=> setLastName(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Apellido"
            required
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900">
            Contraseña
          </label>
          <input
            type="password"
            name="password"
            minLength={6}
            onChange={(e)=> setPassword(e.target.value)}
            id="password"
            placeholder="••••••••"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full text-white bg-primary hover:bg-secondary focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
          Registrar
        </button>
        <div className="text-sm font-medium text-gray-500">
          ¿Ya posees una cuenta?{" "}
          <Link
            href="/login"
            className=" text-primary hover:underline">
            Inicia Sesión
          </Link>
        </div>
      </form>
      <div className="max-w-md">
        <img className="rounded-lg h-[100%] object-cover" src="https://cdn.shopify.com/s/files/1/1034/3311/files/stunning-gradient-of-fresh-blossoming-flowers-from-dark-purple-to-picture-id951907832_1024x1024.jpg?v=1551840991"></img>
      </div>
    </div>
  );
}