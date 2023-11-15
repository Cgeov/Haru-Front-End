import { ContextUser } from "@/context/context";
import Link from "next/link";
import { useContext, useState } from "react";
import showSweetAlert from "../Alerts/Alert";

export default function LoginForm() {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const {login} = useContext(ContextUser);

  let dataRegister = {
    email: email,
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
    fetch("http://localhost:5000/auth/sign-in", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(dataRegister),
    })
      .then((response) => response.json())
      .then((data) => {
        if(data.hasOwnProperty('error')){
          showSweetAlert("Creedenciales Incorrectas", "error");
        }else{
          login(data);
          showSweetAlert("Bienvenido "+ data.name + "!", "success");
        }
      })
      .catch((error) => {
      });
  }

  return (
    <div className="w-full my-20 mx-auto max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8">
      <form className="space-y-6" onSubmit={handleSubmitSignUp}>
        <h5 className="text-xl font-medium text-primary">
          Iniciar Sesión en nuestra plataforma
        </h5>
        <div>
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900">
            Correo Electronico
          </label>
          <input
            type="email"
            onChange={(e)=> setEmail(e.target.value)}
            name="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="correo@correo.com"
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
            onChange={(e)=> setPassword(e.target.value)}
            type="password"
            name="password"
            id="password"
            placeholder="••••••••"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full text-white bg-primary hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
          Iniciar Sesión
        </button>
        <div className="text-sm font-medium text-gray-500">
          ¿Aún no estas Registrado?{" "}
          <Link
            href="/sign-up"
            className="text-primary hover:underline">
            Create tu cuenta
          </Link>
        </div>
      </form>
    </div>
  );
}
