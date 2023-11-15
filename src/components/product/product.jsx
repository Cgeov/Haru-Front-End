import { BsCart3 } from "react-icons/bs";
import Star from "../stars/stars";
import { Slide } from "react-slideshow-image";
import ViewProduct from "../viewProduct/ViewProduct";
import { Modal } from "flowbite";
import { useContext } from "react";
import { ContextUser } from "@/context/context";
import showSweetAlert from "../Alerts/Alert";

const responsiveSettings = [
  {
    breakpoint: 1300,
    settings: {
      slidesToShow: 4,
      slidesToScroll: 1,
    },
  },
  {
    breakpoint: 1000,
    settings: {
      slidesToShow: 3,
      slidesToScroll: 1,
    },
  },
  {
    breakpoint: 600,
    settings: {
      slidesToShow: 2,
      slidesToScroll: 1,
    },
  },
];

export default function Product({ products }) {
  const { user, cart, cartProducts } = useContext(ContextUser);
  const handleModalViewProduct = (id) => {
    console.log(localStorage.getItem("user")); {
      console.log(id, "hola");
      <Modal>
        <ViewProduct></ViewProduct>;
      </Modal>;
    }
  };

  const addProduct = (product) => {
    let alreadyExist = false;
    product.quantity = 1;
    if(cart.length > 0){
      cart.forEach((cartProduct)=>{
        if(cartProduct.id == product.id){
          cartProduct.quantity += 1;
          alreadyExist = true;
        }
      })
    }

    if(alreadyExist){
      console.log(cart)
      cartProducts([...cart]);
      localStorage.setItem("cart", JSON.stringify(cart));
    }else{
      cartProducts([...cart, product]);
      localStorage.setItem("cart", JSON.stringify(cart));
    }

    
    showSweetAlert('Producto agregado a tu carrito.', 'success');
    console.log(localStorage.getItem("cart"));
  };

  return (
    <div className="mt-[50px] mb-[20px] mx-[50px]">
      <h2 className="text-2xl font-bold text-primary ml-[60px]">
        Nuestros Productos
      </h2>
      <Slide
        slidesToScroll={1}
        slidesToShow={1}
        indicators={true}
        autoplay={false}
        responsive={responsiveSettings}
      >
        {products.map((product) => (
          <div
            key={product.id}
            className="relative mx-auto my-10 w-full max-w-xs overflow-hidden rounded-lg bg-white shadow-md"
          >
            <a href="#">
              <img
                onClick={() => {
                  handleModalViewProduct(product.id);
                }}
                className="h-60 rounded-t-lg object-cover w-[100%]"
                src={product.img}
                alt={product.name}
              />
            </a>
            <span className="absolute top-0 left-0 w-28 translate-y-4 -translate-x-6 -rotate-45 bg-primary text-center text-sm text-white">
              Sale
            </span>
            <div className="mt-4 px-5 pb-5">
              <a href="#">
                <h5 className="whitespace-nowrap overflow-hidden text-ellipsis text-xl font-semibold tracking-tight text-slate-900">
                  {product.name}
                </h5>
              </a>
              <div className="mt-2.5 mb-5 flex items-center">
                <span className="mr-2 rounded bg-primary text-white px-2.5 py-0.5 text-xs font-semibold">
                  {product.rate}
                </span>
                {Array(product.rate)
                  .fill()
                  .map((_, index) => (
                    <Star key={index} />
                  ))}
              </div>
              <div className="flex items-center justify-between">
                <p>
                  <span className="text-3xl font-bold text-slate-900">
                    ${product.price}
                  </span>
                  {product.priceBefore != 0  && (
                    <span className="text-sm text-slate-900 line-through">
                      ${product.priceBefore}
                    </span>
                  )}
                </p>
                <a
                  onClick={() => {
                    addProduct(product);
                  }}
                  className="cursor-pointer flex items-center gap-[5px] rounded-md bg-primary px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-secondary focus:outline-none focus:ring-4 focus:ring-blue-300"
                >
                  <BsCart3 color="white" size={20}></BsCart3>
                </a>
              </div>
            </div>
          </div>
        ))}
      </Slide>
    </div>
  );
}
