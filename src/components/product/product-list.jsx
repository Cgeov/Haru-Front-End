import React, { useState, useEffect, Children, useRef } from "react";
import { UploadButton } from "@bytescale/upload-widget-react";
import Modal from '@/components/modal/Modal'
import axios from 'axios'


const ProductList = ({ products }) => {
  //Datos
  const [idDocument, setIdDocument] = useState("");
  const [nameProduct, setNameProduct] = useState("");
  const [priceProduct, setPriceProduct] = useState(0);
  const [beforePriceProduct, setBeforePriceProduct] = useState(0);
  const [imgProduct, setImgProduct] = useState("");
  const [imgProductNew, setImgProductNew] = useState("");
  const [rateProduct, setRateProduct] = useState(0);
  const [productsList, setProductsList] = useState(products);
  const [opcionSeleccionada, setOpcionSeleccionada] = useState("Selecciona...");
  const [descriptionProduct, setDescriptionProduct] = useState('');
  const [categoryProduct, setCategoryProduct] = useState('');
  //Manejo de modal
  const [isOpenNew, setIsOpenNew] = useState(false)
  const [isOpenEdit, setIsOpenEdit] = useState(false)

  const handleModalNew = () => {
    setImgProductNew("");
    setOpcionSeleccionada("Selecciona...")
    setIsOpenNew(!isOpenNew)
  }
  const handleModalEdit = () => {
    setNameProduct("")
    setPriceProduct(0)
    setImgProduct("")
    setBeforePriceProduct(0)
    setDescriptionProduct("")
    setOpcionSeleccionada("Selecciona...")
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
      description: descriptionProduct,
      category: categoryProduct,
      price: priceProduct,
      priceBefore: beforePriceProduct,
      img: imgProductNew,
      rate: parseInt(rateProduct)
    }
  }

  const handleSubmitNewProduct = async (e) => {
    e.preventDefault();
    const res = await axios.post('http://localhost:5000/service/add', product)
    console.log(res)
    form.current.reset();
    handleUpdateProductList();
    setImgProductNew("");
    setOpcionSeleccionada("Selecciona...")
    handleModalNew();
  }

  //Editar producto
  const bodyProduct = {
    collection: "products",
    id: idDocument,
    document: {
      name: nameProduct,
      description: descriptionProduct,
      category: categoryProduct,
      price: priceProduct,
      priceBefore: beforePriceProduct,
      img: imgProduct,
      rate: parseInt(rateProduct)
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
  const handleDescriptionProduct = (event) => {
    setDescriptionProduct(event.target.value)
  }
  const handleSelectChange = (event) => {
    setOpcionSeleccionada(event.target.value)
    setCategoryProduct(event.target.value)
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
    const res = await axios.post('http://localhost:5000/service/getCollection', body)
    setProductsList(res.data);
  }


  return (
    <>
      <div className="mt-10">
        <h1 className="text-2xl font-semibold mx-10 mb-10 text-black">Lista de Productos</h1>
        <div className="mx-10">
          <button onClick={() => { handleModalNew() }} className="text-white bg-primary px-2 py-1 rounded hover:bg-secondary font-bold">Nuevo Producto</button>
        </div>
        <div className="flex justify-center">
          <table className="table-auto mt-5">
            <thead className="text-white bg-primary">
              <tr>
                <th className="border border-black px-3">Nombre</th>
                <th className="border border-black px-8">Descripción</th>
                <th className="border border-black px-5">Categoria</th>
                <th className="border border-black px-5">Precio</th>
                <th className="border border-black px-5">Precio Anterior</th>
                <th className="border border-black px-5">Rate</th>
                <th className="border border-black px-5">Imagén</th>
                <th className="border border-black px-5">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-[#ffced3]  text-black">
              {productsList.map((product) => (
                <tr key={product.id}>
                  <td className="border border-black px-3">{product.name} </td>
                  <td className="border border-black px-8">{product.description} </td>
                  <td className="border border-black px-5">{product.category} </td>
                  <td className="border border-black px-5">{product.price}</td>
                  <td className="border border-black px-5">{product.priceBefore}</td>
                  <td className="border border-black px-5">{product.rate}</td>
                  <td className="border border-black px-5 bg-white"><img src={product.img} alt={product.name} width="100" height="100" />
                  </td>
                  <td className="border border-black px-5">
                    <div className="space-x-2">
                      <button onClick={() => { handleEdit(product.id), handleModalEdit() }} className=" text-white bg-blue-800 px-2 py-1 rounded hover:bg-blue-600">Editar</button>
                      <button onClick={() => handleDelete(product.id)} className="bg-secondary text-white px-2 py-1 rounded hover:bg-red-600">Eliminar</button>
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
          <form className="rounded-lg px-10 pb-8 mb-2" onSubmit={handleSubmitNewProduct} ref={form}>
            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Nombre</label>
            <input name="name" type="text" placeholder="Nombre" className="shadow appearance-none border rourded w-full py-1 px-3 text-black" onChange={handleNameProduct} />
            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2 mt-2">Descripción</label>
            <textarea name="name" placeholder="Descripción" className="shadow appearance-none border rourded w-full py-1 px-3 text-black" onChange={handleDescriptionProduct} />
            <label htmlFor="opciones" className=" text-gray-700 text-sm font-bold mb-2 mt-2">Selecciona una categoria:</label>
            <select id="opciones" className="shadow appearance-none border rourded w-full py-1 px-3 text-black" value={opcionSeleccionada} onChange={handleSelectChange}>
              <option value="">Selecciona...</option>
              <option value="opcion1">Opción 1</option>
              <option value="opcion2">Opción 2</option>
              <option value="opcion3">Opción 3</option>
            </select>
            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2 mt-2">Precio</label>
            <input name="price" type="text" placeholder="Precio" className="shadow appearance-none border rourded w-full py-1 px-3 text-black" onChange={handlePriceProduct} />
            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2 mt-2">Precio Anterior</label>
            <input name="priceBefore" type="text" placeholder="Precio Anterior" className="shadow appearance-none border rourded w-full py-1 px-3 text-black" onChange={handleBeforePriceProduct} />
            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2 mt-2">Imagen</label>
            <UploadButton options={options}
              onComplete={files => handleImgProductNew(files.map(x => x.fileUrl))}>
              {({ onClick }) =>
                <button onClick={onClick} className="text-white bg-blue-800 hover:bg-blue-700 font-bold py-1 px-4 rounded mb-3">
                  Upload a file...
                </button>
              }
            </UploadButton>
            <input name="img" value={imgProductNew} type="text" placeholder="Imagen" className="shadow appearance-none border rourded w-full py-1 px-3 text-black" onChange={handleImgProductNew} disabled />
            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2 mt-2">Rate</label>
            <input name="rate" type="number" placeholder="rate" className="shadow appearance-none border rourded w-full py-1 px-3 text-black" onChange={handleRateProduct} />
            <button className="bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5">Guardar</button>
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
              <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2 mt-2">Descripción</label>
              <textarea name="name" placeholder="Descripción" className="shadow appearance-none border rourded w-full py-1 px-3 text-black" onChange={handleDescriptionProduct}  value={descriptionProduct}/>
              <label htmlFor="opciones" className=" text-gray-700 text-sm font-bold mb-2 mt-2">Selecciona una categoria:</label>
              <select id="opciones" className="shadow appearance-none border rourded w-full py-1 px-3 text-black" value={categoryProduct} onChange={handleSelectChange}>
                <option value="">Selecciona...</option>
                <option value="opcion1">Opción 1</option>
                <option value="opcion2">Opción 2</option>
                <option value="opcion3">Opción 3</option>
              </select>
              <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2 mt-2">Precio</label>
              <input name="price" value={priceProduct} type="text" placeholder="Precio" className="shadow appearance-none border rourded w-full py-2 px-3 text-black" onChange={handlePriceProduct} />
              <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2 mt-2">Precio Anterior</label>
              <input name="priceBefore" value={beforePriceProduct} type="number" placeholder="Precio Anterior" className="shadow appearance-none border rourded w-full py-2 px-3 text-black" onChange={handleBeforePriceProduct} />
              <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2 mt-2">Imagen</label>
              <UploadButton options={options}
                onComplete={files => handleImgProduct(files.map(x => x.fileUrl))}>
                {({ onClick }) =>
                  <button onClick={onClick} className="text-white bg-blue-800 hover:bg-blue-700 font-bold py-2 px-4 rounded mb-3">
                    Upload a file...
                  </button>
                }
              </UploadButton>
              <input name="img" value={imgProduct} type="text" placeholder="Imagen" className="shadow appearance-none border rourded w-full py-2 px-3 text-black" onChange={handleImgProduct} disabled />
              <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2 mt-2">Rate</label>
              <input name="rate" value={rateProduct} type="number" placeholder="rate" className="shadow appearance-none border rourded w-full py-2 px-3 text-black" onChange={handleRateProduct} />
              <button className="bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5">Editar</button>
            </form>
          </Modal>
        )
      }


    </>
  );
};

export default ProductList;
