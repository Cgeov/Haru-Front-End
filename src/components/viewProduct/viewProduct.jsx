import { BsCart3 } from "react-icons/bs";
import Star from "../stars/stars";
import { useContext } from "react";
import { ContextUser } from "@/context/context";
import showSweetAlert from "../Alerts/Alert";
import { useState, useEffect } from 'react'
import Layout from '@/pages/layout'



export default function ViewProduct() {
  const { user, cart, cartProducts, cleanCart } = useContext(ContextUser);
  const [flowers, setFlowers] = useState([]);
  const [loading, setLoading] = useState(true);
  //Manejo del modal
  const [isOpen, setIsOpen] = useState(false);
  //Datos
  const [idDocument, setIdDocument] = useState("");
  const [nameProduct, setNameProduct] = useState("");
  const [priceProduct, setPriceProduct] = useState(0);
  const [beforePriceProduct, setBeforePriceProduct] = useState(0);
  const [imgProduct, setImgProduct] = useState("");
  const [imgProductNew, setImgProductNew] = useState("");
  const [rateProduct, setRateProduct] = useState(0);
  
  const [opcionSeleccionada, setOpcionSeleccionada] = useState("Selecciona...");
  const [descriptionProduct, setDescriptionProduct] = useState('');
  const [categoryProduct, setCategoryProduct] = useState('');



  //Using services 
  const body = {
    collection: "products",
    id: idDocument
  };
  let headers = new Headers();

  headers.append("Content-Type", "application/json");
  headers.append("Accept", "application/json");
  headers.append("Access-Control-Allow-Origin", "http://localhost:3000");
  headers.append("Access-Control-Allow-Credentials", "true");
  headers.append("GET", "POST", "OPTIONS");

  useEffect(() => {
    fetch("http://localhost:5000/service/getCollection", {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        collection: "products",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setFlowers(data);
        setLoading(false);
        console.log(data);
      })
      .catch((error) => {
        setLoading(false);
      });
  }, []);





  const handleModal = (id) =>{
    setIdDocument(id)
    //showSweetAlert('El id de la flor 0ta es ' + idDocument + ' '+ isOpen, 'success')
    console.log(idDocument + isOpen)
    //SingleProduct(idDocument, isOpen)
  };
  const openModal = ()=>{
    setIsOpen(!isOpen)
  }
  //Obeteniendo información en fase al id
  useEffect(() => {
    if (idDocument !== "") {

      fetch("http://localhost:5000/service/getDoc", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
      })
        .then((response) => response.json())
        .then((data) => {
          setNameProduct(data.name);
          setDescriptionProduct(data.description);
          setCategoryProduct(data.category);
          setPriceProduct(data.price);
          setBeforePriceProduct(data.priceBefore);
          setImgProduct(data.img);
          setRateProduct(data.rate);
        })
        .catch((error) => {
        });
    }
  }, [isOpen]);


//Añadir los productos al carrito
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
  <Layout>
    <div className="mt-[50px] mb-[20px] mx-[50px]">
      <h2 className="text-2xl font-bold text-primary ml-[60px]">
        Nuestros floweros
      </h2>
      <div className='grid grid-rows-4 grid-flow-col gap-4'>
      {flowers.map((flower) => (
          <div
            key={flower.id}
            className="relative mx-auto my-10 w-full max-w-xs overflow-hidden rounded-lg bg-white shadow-md"
            
          >
            <a 
            onClick={()=> (handleModal(flower.id), openModal())}
            >
              <img
                className="h-60 rounded-t-lg object-cover w-[100%]"
                src={flower.img}
                alt={flower.name}
                
              />
            </a>
            <span className="absolute top-0 left-0 w-28 translate-y-4 -translate-x-6 -rotate-45 bg-primary text-center text-sm text-white">
              Sale
            </span>
            <div className="mt-4 px-5 pb-5">
              <a href="#">
                <h5 className="whitespace-nowrap overflow-hidden text-ellipsis text-xl font-semibold tracking-tight text-slate-900">
                  {flower.name}
                </h5>
              </a>
              <div className="mt-2.5 mb-5 flex items-center">
                <span className="mr-2 rounded bg-primary text-white px-2.5 py-0.5 text-xs font-semibold">
                  {flower.rate}
                </span>
                {Array(flower.rate)
                  .fill()
                  .map((_, index) => (
                    <Star key={index} />
                  ))}
              </div>
              <div className="flex items-center justify-between">
                <p>
                  <span className="text-3xl font-bold text-slate-900">
                    ${flower.price}
                  </span>
                  {flower.priceBefore != 0  && (
                    <span className="text-sm text-slate-900 line-through">
                      ${flower.priceBefore}
                    </span>
                  )}
                </p>
                <a
                  onClick={() => {
                    addProduct(flower);
                  }}
                  className="cursor-pointer flex items-center gap-[5px] rounded-md bg-primary px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-secondary focus:outline-none focus:ring-4 focus:ring-blue-300"
                >
                  <BsCart3 color="white" size={20}></BsCart3>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </Layout>
  )
}