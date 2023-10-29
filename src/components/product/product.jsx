import { BsCart3 } from "react-icons/bs";
import Star from "../stars/stars";

export default function Product({ products }) {
  return (
    <div>
      <div className="ml-[40px]">
        <h2 className="text-2xl font-bold text-primary">Nuestros Productos</h2>
        <div className="grid grid-cols-1 lg:grid-cols-5 md:grid-cols-3 xs:grid-cols-2 gap-[20px]">
          {products.map((product) => (
            <div
              key={product.id}
              className="relative my-10 w-full max-w-xs overflow-hidden rounded-lg bg-white shadow-md">
              <a href="#">
                <img
                  className="h-60 rounded-t-lg object-contain w-[100%]"
                  src={product.img}
                  alt="product image"
                />
              </a>
              <span className="absolute top-0 left-0 w-28 translate-y-4 -translate-x-6 -rotate-45 bg-primary text-center text-sm text-white">
                Sale
              </span>
              <div className="mt-4 px-5 pb-5">
                <a href="#">
                  <h5 className="text-xl font-semibold tracking-tight text-slate-900">
                    {product.name}
                  </h5>
                </a>
                <div className="mt-2.5 mb-5 flex items-center">
                  <span className="mr-2 rounded bg-primary text-white px-2.5 py-0.5 text-xs font-semibold">
                    {product.rate}
                  </span>
                  {Array(product.rate).fill().map((_, index) => (
                      <Star key={index} />
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <p>
                    <span className="text-3xl font-bold text-slate-900">
                      ${product.price}
                    </span>
                    {product.priceBefore && <span className="text-sm text-slate-900 line-through">
                      ${product.priceBefore}
                    </span>}
                  </p>
                  <a
                    href="#"
                    className="flex items-center gap-[5px] rounded-md bg-primary px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300">
                    <BsCart3 color="white" size={20}></BsCart3>Agregar
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
