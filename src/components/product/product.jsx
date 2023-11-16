import { BsCart3 } from "react-icons/bs";
import Star from "../stars/stars";
import { Slide } from "react-slideshow-image";
import ViewProduct from "../../components/viewProduct/viewProduct";
import { Modal } from "flowbite";
import { Fragment, useContext, useState } from "react";
import { ContextUser } from "@/context/context";
import showSweetAlert from "../Alerts/Alert";
import { Dialog, RadioGroup, Transition } from "@headlessui/react";
import { GrClose } from "react-icons/gr";

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
  const [open, setOpen] = useState(false);
  const [productSelected, setProductSelected] = useState({});

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  const { cart, cartProducts } = useContext(ContextUser);

  const handleModalViewProduct = (product, event) => {
    event.preventDefault();
    setProductSelected(product);
    setOpen(true);
  };

  const addProduct = (product) => {
    let alreadyExist = false;
    product.quantity = 1;
    if (cart.length > 0) {
      cart.forEach((cartProduct) => {
        if (cartProduct.id == product.id) {
          cartProduct.quantity += 1;
          alreadyExist = true;
        }
      });
    }

    if (alreadyExist) {
      console.log(cart);
      cartProducts([...cart]);
      localStorage.setItem("cart", JSON.stringify(cart));
    } else {
      cartProducts([...cart, product]);
      localStorage.setItem("cart", JSON.stringify(cart));
    }

    showSweetAlert("Producto agregado a tu carrito.", "success");
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
        responsive={responsiveSettings}>
        {products.map((product) => (
          <div
            key={product.id}
            className="relative mx-auto my-10 w-full max-w-xs overflow-hidden rounded-lg bg-white shadow-md">
            <a href="#">
              <img
                onClick={(e) => {
                  handleModalViewProduct(product, e);
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
                    ${product.price.toFixed(2)}
                  </span>
                  {product.priceBefore != 0 && (
                    <span className="text-sm text-slate-900 line-through">
                      ${product.priceBefore.toFixed(2)}
                    </span>
                  )}
                </p>
                <a
                  onClick={() => {
                    addProduct(product);
                  }}
                  className="cursor-pointer flex items-center gap-[5px] rounded-md bg-primary px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-secondary focus:outline-none focus:ring-4 focus:ring-blue-300">
                  <BsCart3 color="white" size={20}></BsCart3>
                </a>
              </div>
            </div>
          </div>
        ))}
      </Slide>

      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0">
            <div className="fixed inset-0 hidden bg-gray-500 bg-opacity-75 transition-opacity md:block" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
                enterTo="opacity-100 translate-y-0 md:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 md:scale-100"
                leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95">
                <Dialog.Panel className="flex w-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl">
                  <div className="rounded-2xl relative flex w-full items-center overflow-hidden bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                    <button
                      type="button"
                      className="absolute right-4 top-4 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8"
                      onClick={() => setOpen(false)}>
                      <span className="sr-only">Close</span>
                      <GrClose className="h-6 w-6" aria-hidden="true" />
                    </button>

                    <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
                      <div className="aspect-h-3 aspect-w-2 overflow-hidden rounded-lg bg-gray-100 sm:col-span-4 lg:col-span-5">
                        <img
                          src={productSelected.img}
                          alt={productSelected.name}
                          className="object-cover object-center"
                        />
                      </div>
                      <div className="sm:col-span-8 lg:col-span-7 pb-8 sm:px-6 md:px-6 lg:px-8 h-[100%]">
                        <h2 className="text-2xl font-bold text-gray-900 sm:pr-12 text-primary">
                          {productSelected.name}
                        </h2>
                        <div className="flex flex-col justify-between" style={{height: 'inherit'}}>
                        <section
                          aria-labelledby="information-heading"
                          className="mt-2">
                          <h3 id="information-heading" className="sr-only">
                            Product information
                          </h3>

                          <p className="text-2xl text-gray-800 font-medium">
                            ${productSelected.price ? productSelected.price.toFixed(2) : 0.00} 
                            <span className="text-sm text-slate-900 line-through">{productSelected.priceBefore ? productSelected.priceBefore.toFixed(2) : null}</span>
                          </p>

                          {/* Reviews */}
                          <div className="mt-6">
                            <h4 className="sr-only">Reviews</h4>
                            <div className="flex items-center">
                              <div className="flex items-center">
                                {Array(productSelected.rate)
                                  .fill()
                                  .map((_, index) => (
                                    <Star key={index} />
                                  ))}
                              </div>
                              <p className="sr-only">
                                {productSelected.rate} out of 5 stars
                              </p>
                            </div>
                          </div>
                          <div className="mt-10">
                              <div className="flex items-center justify-between">
                                <h4 className="text-sm font-bold text-primary">
                                  Descripción
                                </h4>
                              </div>

                              <p className="text-gray-800">
                                {productSelected.description}
                              </p>
                            </div>
                        </section>

                        <section
                          aria-labelledby="options-heading"
                          className="mt-10">
                            <button        
                              className="mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-primary px-8 py-3 text-base font-medium text-white hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                              Añadir al Carrito
                            </button>
                        </section>
                        </div>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
}
