import react from "react";

export default function AboutUsHome() {
  return (
    <div>
      <h1 className="font-bold text-center mb-50 text-2xl text-primary">
        Acerca de nosotros
      </h1>
      <div className="flex justify-center flex-wrap gap-10 mt-[30px]">
        <div className="flex-col bg-[#ffced3] py-4 px-10 w-[375px] rounded-lg">
          <h3 className="text-2xl text-primary text-center">Bienvenidos a nuestra floristeria en línea</h3>
          <h4 className="text-xl text-primary text-justify">Donde podras encontar variedad de diseño,flores y muchos colores. Estamos para servirte.

¡Bienvenido a nuestra floristería en línea! 
Acá encontrarás variedad de diseños, flores y muchos colores. 
Estamos para servirte</h4>
        </div>
        <div className="flex-col bg-[#ffced3] py-4 px-10 w-[375px] rounded-lg">
        <h3 className="text-2xl text-primary text-center">Nuestro horario</h3>
          <h4 className="text-xl text-primary text-justify">El horario para realizar tu pedido es de 9 am a 7 pm de lunes a  domingo.</h4>
        </div>
        <div className="flex-col bg-[#ffced3] py-4 px-10 w-[375px] rounded-lg">
        <h3 className="text-2xl text-primary text-center">Nuestros valores</h3>
        <h4 className="text-xl text-primary text-justify">Desde nuestro primer día de operaciones, Haruflowers a ofrecido al publico la mas amplia secciones de nuestro productos a precios cómodo  para las personas. Nuestra tienda en linea es sinónimo de calidad, por lo que te garantizamos contar con la mayor variedad de arreglos disponibles así como productos de temporadas.</h4>
        </div>
      </div>
    </div>
  );
}
