export default function Quote() {
  return (
    <div className="w-screen bg-white">
      <div className="container mx-auto my-4 px-4 lg:px-20">
        <div className="w-full p-8 my-4 md:px-12 lg:w-9/12 lg:pl-20 lg:pr-40 mr-auto rounded-2xl shadow-2xl">
          <div className="flex">
            <h1 className="font-bold uppercase text-5xl text-primary">
              Contactanos
            </h1>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 mt-5">
            <input
              className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:ring-blue-500 focus:border-blue-500 "
              type="text"
              placeholder="First Name*"
            />
            <input
              className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:ring-blue-500 focus:border-blue-500 "
              type="text"
              placeholder="Last Name*"
            />
            <input
              className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:ring-blue-500 focus:border-blue-500 "
              type="email"
              placeholder="Email*"
            />
            <input
              className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:ring-blue-500 focus:border-blue-500 "
              type="number"
              placeholder="Phone*"
            />
          </div>
          <div className="my-4">
            <textarea
              placeholder="Message*"
              className="w-full h-32 bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            ></textarea>
          </div>
          <div className="my-2 w-1/2 lg:w-1/4">
            <button
              className="uppercase text-sm font-bold tracking-wide bg-primary text-gray-100 p-3 rounded-lg w-full 
                      focus:outline-none focus:shadow-outline"
            >
              enviar
            </button>
          </div>
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
                <h2 className="text-2xl">Call Us</h2>
                <p className="text-white">Tel: xxx-xxx-xxx</p>
              </div>
            </div>

            
          </div>
        </div>
      </div>
    </div>
  );
}
