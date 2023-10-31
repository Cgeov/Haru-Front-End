import React, { useState, useEffect, Children, useRef } from "react";
import { UploadButton } from "@bytescale/upload-widget-react";
import Modal from '@/components/modal/Modal'
import axios from 'axios'


const ProductList = ({ products }) => {
  //Datos
  const [idDocument, setIdDocument] = useState("");
  const [nameProduct, setNameProduct] = useState("");
  const [priceProduct, setPriceProduct] = useState(0);
  const [beforePriceProduct,setBeforePriceProduct] = useState(0);
  const [imgProduct, setImgProduct] = useState("");
  const [imgProductNew, setImgProductNew] = useState("");
  const [rateProduct, setRateProduct] = useState("");
  const [productsList,setProductsList] = useState(products);
  //Manejo de modal
  const [isOpenNew, setIsOpenNew] = useState(false)
  const [isOpenEdit, setIsOpenEdit] = useState(false)

  const handleModalNew = () => {
    setIsOpenNew(!isOpenNew)
  }
  const handleModalEdit = () => {
    setNameProduct("")
    setPriceProduct(0)
    setImgProduct("")
    setIsOpenEdit(!isOpenEdit)
  }


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

  //Byte Scale
  const options = {
    apiKey: "free", // Get API keys from: www.bytescale.com
    maxFileCount: 10
  };

 
  //Nuevo Producto
  const form = useRef(null);
  const product = {
    collection: "products",
    document: {
      name: nameProduct,
      price: priceProduct,
      priceBefore: beforePriceProduct,  
      img: imgProductNew,
      rate: rateProduct
    }
  }

  const handleSubmitNewProduct = async (e) => {
    e.preventDefault();
    const res = await axios.post('http://localhost:5000/service/add', product)
    console.log(res)
    form.current.reset();
    handleUpdateProductList();
    setImgProductNew(""); 
    handleModalNew();
  }

  //Editar producto
  const bodyProduct = {
    collection: "products",
    id: idDocument,
    document: {
      name: nameProduct,
      price: priceProduct,
      beforePrice: beforePriceProduct,
      img: imgProduct,
      rate: rateProduct
    }
  }
  const handleEdit = (id) => {
    setIdDocument(id);
  }

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
          setPriceProduct(data.price);
          setBeforePriceProduct(data.priceBefore);
          setImgProduct(data.img);
          setRateProduct(data.rate);
        })
        .catch((error) => {
        });
    }
  }, [isOpenEdit]);

  const handleSubmitEditProduct = async (e) => {
    e.preventDefault();
    const res = await axios.put('http://localhost:5000/service/update', bodyProduct)
    console.log(res)
    form.current.reset();
    handleUpdateProductList();  
    handleModalEdit()
  }

  const handleNameProduct = (event) => {
    setNameProduct(event.target.value);
  }
  const handlePriceProduct = (event) => {
    setPriceProduct(event.target.value);
  }
  const handleBeforePriceProduct = (event) => {
    setBeforePriceProduct(event.target.value);
  }
  const handleImgProduct = (imagen) => {
    setImgProduct(imagen);
  }
  const handleImgProductNew = (imagen) => {
    setImgProductNew(imagen);
  }
  const handleRateProduct = (event) => {
    setRateProduct(event.target.value);  
  }

  //Eliminar 
  const handleDelete = async (id) => {
    const productDeleted = {
      data: {
        collection: "products",
        id: id
      }
    }
    const res = await axios.delete('http://localhost:5000/service/delete', productDeleted)
    console.log(res)
    handleUpdateProductList();
  }
  //Actualizar lista de productos 
  const handleUpdateProductList = async () => {
    const body = {
      collection: "products",
    };
    const res = await axios.post('http://localhost:5000/service/getCollection',body)
    setProductsList(res.data);
  }

  return (
    <>
      <div className="mt-10">
        <h1 className="text-2xl font-semibold mx-10 mb-10 text-black">Lista de Productos</h1>
        <div className="mx-10">
          <button onClick={() => { handleModalNew() }} className="text-white bg-pink-700 px-2 py-1 rounded hover:bg-blue-600 font-bold">Nuevo Producto</button>
        </div>
        <div className="flex justify-center">
          <table className="table-auto mt-5">
            <thead className="text-white bg-red-600">
              <tr>
                <th className="border border-black px-5">Nombre</th>
                <th className="border border-black px-5">Precio</th>
                <th className="border border-black px-5">Precio Anterior</th>
                <th className="border border-black px-5">Rate</th>
                <th className="border border-black px-5">Imagén</th>
                <th className="border border-black px-5">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-red-300 text-black">
              {productsList.map((product) => (
                <tr key={product.id}>
                  <td className="border border-black px-5">{product.name} </td>
                  <td className="border border-black px-5">{product.price}</td>
                  <td className="border border-black px-5">{product.priceBefore}</td>
                  <td className="border border-black px-5">{product.rate}</td>
                  <td className="border border-black px-5 bg-white"><img src={product.img} alt={product.name} width="100" height="100" />
                  </td>
                  <td className="border border-black px-5">
                    <div className="space-x-2">
                      <button onClick={() => { handleEdit(product.id), handleModalEdit() }} className=" text-white bg-cyan-600 px-2 py-1 rounded hover:bg-blue-600">Editar</button>
                      <button onClick={() => handleDelete(product.id)} className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">Eliminar</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div >

      {isOpenNew && (
        <Modal handleModal={handleModalNew} Title="Agregar">
          <form className="rounded-lg px-10 pb-8 mb-4" onSubmit={handleSubmitNewProduct} ref={form}>
            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Nombre del Producto</label>
            <input name="name" type="text" placeholder="Nombre" className="shadow appearance-none border rourded w-full py-2 px-3 text-black" onChange={handleNameProduct} />
            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2 mt-2">Precio</label>
            <input name="price" type="text" placeholder="Precio" className="shadow appearance-none border rourded w-full py-2 px-3 text-black" onChange={handlePriceProduct} />
            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2 mt-2">Precio Anterior</label>
            <input name="priceBefore" type="text" placeholder="Precio Anterior" className="shadow appearance-none border rourded w-full py-2 px-3 text-black" onChange={handleBeforePriceProduct} />
            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2 mt-2">Imagen</label>
            <UploadButton options={options}
              onComplete={files => handleImgProductNew(files.map(x => x.fileUrl))}>
              {({ onClick }) =>
                <button onClick={onClick} className="text-white bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded mb-3">
                  Upload a file...
                </button>
              }
            </UploadButton>
            <input name="img" value={imgProductNew} type="text" placeholder="Imagen" className="shadow appearance-none border rourded w-full py-2 px-3 text-black" onChange={handleImgProductNew} disabled />
            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2 mt-2">Rate</label>
            <input name="rate" type="text" placeholder="rate" className="shadow appearance-none border rourded w-full py-2 px-3 text-black" onChange={handleRateProduct} />
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5">Guardar</button>
          </form>
        </Modal>
      )
      }
      {
        isOpenEdit && (
          <Modal handleModal={handleModalEdit} Title="Editar">
            <form className="rounded-lg px-10 pb-8 mb-4" onSubmit={handleSubmitEditProduct} ref={form}>
              <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Nombre del Producto</label>
              <input name="name" value={nameProduct} type="text" placeholder="Nombre" className="shadow appearance-none border rourded w-full py-2 px-3 text-black" onChange={handleNameProduct} />
              <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2 mt-2">Precio</label>
              <input name="price" value={priceProduct} type="text" placeholder="Precio" className="shadow appearance-none border rourded w-full py-2 px-3 text-black" onChange={handlePriceProduct} />
              <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2 mt-2">Precio Anterior</label>
              <input name="priceBefore" value={beforePriceProduct} type="text" placeholder="Precio Anterior" className="shadow appearance-none border rourded w-full py-2 px-3 text-black" onChange={handleBeforePriceProduct} />
              <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2 mt-2">Imagen</label>
              <UploadButton options={options}
                onComplete={files => handleImgProduct(files.map(x => x.fileUrl))}>
                {({ onClick }) =>
                  <button onClick={onClick} className="text-white bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded mb-3">
                    Upload a file...
                  </button>
                }
              </UploadButton>
              <input name="img" value={imgProduct} type="text" placeholder="Imagen" className="shadow appearance-none border rourded w-full py-2 px-3 text-black" onChange={handleImgProduct}  disabled/>
              <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2 mt-2">Rate</label>
              <input name="rate" value={rateProduct} type="text" placeholder="rate" className="shadow appearance-none border rourded w-full py-2 px-3 text-black" onChange={handleRateProduct} />
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5">Editar</button>
            </form>
          </Modal>
        )
      }


    </>
  );
};

export default ProductList;
