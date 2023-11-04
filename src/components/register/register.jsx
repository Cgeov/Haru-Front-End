import Link from "next/link";
import { useState } from "react";

export default function Register() {
  
  const [name, setName] = useState('');
  const [lastname, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState(null);

  let headers = new Headers();

  headers.append("Content-Type", "application/json");
  headers.append("Accept", "application/json");
  headers.append("Access-Control-Allow-Origin", "http://localhost:3000");
  headers.append("Access-Control-Allow-Credentials", "true");
  headers.append("GET", "POST", "OPTIONS");

  const sendRequest = event =>{
    setErrors(null);
    


  }

  return (
    <div className="w-[80%] flex flex-row gap-[15px] justify-between my-20 mx-auto max-w-4xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
      <form className="space-y-6 w-[100%] max-w-xs" action="#" onSubmit={sendRequest}>
        <h5 className="text-xl font-medium text-primary dark:text-white">
          Registrate en nuestra Plataforma
        </h5>
        <div>
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Correo Electronico
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            placeholder="correo@correo.com"
            onChange={(event) => setEmail(event.target.value)}
            required
            
          />
        </div>
        <div>
          <label
            htmlFor="nombre"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Nombre
          </label>
          <input
            type="text"
            name="nombre"
            id="nombre"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            placeholder="Nombre"
            onChange={(event) => setName(event.target.value)}
            required
          />
        </div>
        <div>
          <label
            htmlFor="apellido"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Apellidos
          </label>
          <input
            type="text"
            name="apellido"
            id="apellido"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            placeholder="Apellido"
            onChange={(event) => setLastName(event.target.value)}
            required
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Contraseña
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="••••••••"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full text-white bg-primary hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Registrar
        </button>
        <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
          ¿Ya posees una cuenta?{" "}
          <Link
            href="/login"
            className=" text-primary hover:underline dark:text-blue-500">
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
