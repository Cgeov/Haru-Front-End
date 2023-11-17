import React, { useState, useEffect, Children, useRef } from "react";
import { UploadButton } from "@bytescale/upload-widget-react";
import Modal from '@/components/modal/Modal'
import axios from 'axios'
import Swal from 'sweetalert2';
import showSweetAlert, { ManageError, confirmationAlert } from '../Alerts/AlertManage';
import ModalAlert from "../modal/ModalAlert";


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
  const [optionFeatured, setOptionFeatured] = useState("Selecciona...");
  const [featuredProduct, setFeaturedProduct] = useState('');
  const [descriptionProduct, setDescriptionProduct] = useState('');
  const [categoryProduct, setCategoryProduct] = useState('');
  const [idProducto, setIdProduct] = useState('')
  //Manejo de modal
  const [isOpenNew, setIsOpenNew] = useState(false)
  const [isOpenEdit, setIsOpenEdit] = useState(false)
  const [isOpenAlert, setIsOpenAlert] = useState(false)
  const [isProductSuccess, setProductSuccess] = useState(false)
  const [isProductSuccessEdit, setProductSuccessEdit] = useState(false)
  const [isDeleteConfirm, setDeleteConfirm] = useState(false)
  const [isDelete, setIsDelete] = useState(false)
  //validaciones 
  const [validaciones, setValidaciones] = useState([])

  const handleModalNew = () => {
    setNameProduct("")
    setPriceProduct(0)
    setImgProduct("")
    setBeforePriceProduct(0)
    setDescriptionProduct("")
    setOpcionSeleccionada("Selecciona...")
    setOptionFeatured("Selecciona...")
    setFeaturedProduct('')
    setCategoryProduct('')
    setRateProduct(0)
    setIsOpenNew(!isOpenNew)
  }
  const handleModalEdit = () => {
    setNameProduct("")
    setPriceProduct(0)
    setImgProduct("")
    setBeforePriceProduct(0)
    setDescriptionProduct("")
    setOpcionSeleccionada("Selecciona...")
    setOptionFeatured("Selecciona...")
    setFeaturedProduct('')
    setCategoryProduct('')
    setRateProduct(0)
    setIsOpenEdit(!isOpenEdit)
  }
  const handleModalAlert = (validaciones) => {
    setValidaciones(validaciones);
    setIsOpenAlert(!isOpenAlert);
  }
  const handleModalSuccess = () => {
    setProductSuccess(!isProductSuccess)
  }
  const handleModalSuccessEdit = () => {
    setProductSuccessEdit(!isProductSuccessEdit)
  }
  const handleModalSuccessDelete = () => {
    setIsDelete(!isDelete)
  }
  const handleModalDelete = () => {
    setDeleteConfirm(!isDeleteConfirm)
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
      price: parseFloat(priceProduct),
      priceBefore: (beforePriceProduct === "") ? 0 : parseFloat(beforePriceProduct),
      img: imgProductNew,
      rate: parseInt(rateProduct),
      featured: featuredProduct
    }
  }

  const handleSubmitNewProduct = async (e) => {
    e.preventDefault();
    const validaciones = []
    const esDecimal = /^-?\d*\.?\d+$/

    if (nameProduct === "") {
      validaciones.push('Nombre')
    }
    if (descriptionProduct === "") {
      validaciones.push('Descripción')
    }
    if (categoryProduct === "") {
      validaciones.push('Categoría')
    }
    if (priceProduct === 0) {
      validaciones.push('Precio')
    }
    if (!esDecimal.test(priceProduct)) {
      validaciones.push('Precio incorrecto')
    }
    if (beforePriceProduct !== "") {
      console.log(beforePriceProduct)
      if (!esDecimal.test(beforePriceProduct)) {
        validaciones.push('Precio anterior incorrecto')
      }
    }
    if (imgProductNew === "") {
      validaciones.push('Imagén')
    }
    if (rateProduct === 0) {
      validaciones.push('Rate')
    }
    if (featuredProduct === "") {
      validaciones.push('¿Es un producto destacado?')
    }
    if (validaciones.length === 0) {
      const res = await axios.post('http://localhost:5000/service/add', product)
      console.log(res)
      form.current.reset();
      handleUpdateProductList();
      setImgProductNew("");
      setOpcionSeleccionada("Selecciona...")
      handleModalNew();
      showSweetAlert("¡Producto añadido con éxito!", "success");
    } else {
      ManageError(validaciones);
      //handleModalAlert(validaciones)
    }
  }

  //Editar producto
  const bodyProduct = {
    collection: "products",
    id: idDocument,
    document: {
      name: nameProduct,
      description: descriptionProduct,
      category: categoryProduct,
      price: parseFloat(priceProduct),
      priceBefore: (beforePriceProduct === "") ? 0 : parseFloat(beforePriceProduct),
      img: imgProduct,
      rate: parseInt(rateProduct),
      featured: featuredProduct
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
          setPriceProduct(parseFloat(data.price));
          setBeforePriceProduct(parseFloat(data.priceBefore));
          setImgProduct(data.img);
          setRateProduct(data.rate);
          setFeaturedProduct(data.featured)
        })
        .catch((error) => {
        });
    }
  }, [isOpenEdit]);

  const handleSubmitEditProduct = async (e) => {
    e.preventDefault();
    const validaciones = []
    const esDecimal = /^-?\d*\.?\d+$/
    if (nameProduct === "") {
      validaciones.push('Nombre')
    }
    if (descriptionProduct === "") {
      validaciones.push('Descripción')
    }
    if (categoryProduct === "") {
      validaciones.push('Categoría')
    }
    if (priceProduct === 0) {
      validaciones.push('Precio')
    }
    if (!esDecimal.test(priceProduct)) {
      validaciones.push('Precio incorrecto')
    }
    if (beforePriceProduct !== "") {
      console.log(beforePriceProduct)
      if (!esDecimal.test(beforePriceProduct)) {
        validaciones.push('Precio anterior incorrecto')
      }
    }
    if (imgProduct === "") {
      validaciones.push('Imagén')
    }
    if (rateProduct === 0) {
      validaciones.push('Rate')
    }
    if (featuredProduct === "") {
      validaciones.push('¿Es un producto destacado?')
    }
    if (validaciones.length === 0) {
      const res = await axios.put('http://localhost:5000/service/update', bodyProduct)
      console.log(res)
      form.current.reset();
      handleModalEdit()
      handleUpdateProductList();
      showSweetAlert("¡Producto editado con éxito!", "success");
      //setProductSuccessEdit(!isProductSuccessEdit)
    }
    else {
      ManageError(validaciones);
      //handleModalAlert(validaciones)
    }
  }

  const handleNameProduct = (event) => {
    setNameProduct(event.target.value);
  }
  const handlePriceProduct = (event) => {
    setPriceProduct((event.target.value));
  }
  const handleBeforePriceProduct = (event) => {
    setBeforePriceProduct((event.target.value));
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
  const handlefeatured = (event) => {
    setOptionFeatured(event.target.value)
    setFeaturedProduct(event.target.value)

  }


  //Eliminar 
  const handleDelete = async (id) => {
    const result = await confirmationAlert("¿Desea eliminar este producto?");
    const productDeleted = {
      data: {
        collection: "products",
        id: id
      }
    }
    //setDeleteConfirm(!isDeleteConfirm)
    //setIdProduct(id)
    if (result.isConfirmed) {
      const res = await axios.delete('http://localhost:5000/service/delete', productDeleted)
      console.log(res)
      handleUpdateProductList();
      showSweetAlert("¡Producto eliminado con éxito!", "success");
      //setIdProduct('')
      //setIsDelete(!isDelete)
    } else if (result.isDismissed) {
      console.log("Se canceló la acción");
    }
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
        <h1 className="text-2xl font-semibold mx-10 mb-10  text-primary">Lista de Productos</h1>
        <div className="mx-10">
          <button onClick={() => { handleModalNew() }} className="text-white bg-primary px-2 py-1 rounded hover:bg-rose-800 font-bold">Nuevo Producto</button>
        </div>
        <div className="flex justify-center">
          <table className="table-auto mt-5">
            <thead className="text-white bg-primary">
              <tr>
                <th className="border border-black px-3 w-15">#</th>
                <th className="border border-black px-3 w-45 overflow-hidden whitespace-normal break-all">Nombre</th>
                <th className="border border-black px-5 w-60 overflow-hidden whitespace-normal break-all">Descripción</th>
                <th className="border border-black px-5 w-30">Categoria</th>
                <th className="border border-black px-3 w-20 ">Precio</th>
                <th className="border border-black px-3 w-20 ">Precio Anterior</th>
                <th className="border border-black px-3 w-20 ">Rate</th>
                <th className="border border-black px-5">Imagén</th>
                <th className="border border-black px-3 w-20 text-center">Destacado</th>
                <th className="border border-black px-5">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-[#ffced3]  text-black">
              {productsList.map((product, index) => (
                <tr key={product.id}>
                  <td className="border border-black px-3 w-15">{index + 1}</td>
                  <td className="border border-black px-3 w-45 overflow-hidden whitespace-normal break-all">{product.name} </td>
                  <td className="border border-black px-5 w-60 overflow-hidden whitespace-normal break-all">{product.description} </td>
                  <td className="border border-black px-5 w-30">{product.category} </td>
                  <td className="border border-black px-3 w-20 text-center">${product.price}</td>
                  <td className="border border-black px-3 w-20 text-center">${product.priceBefore}</td>
                  <td className="border border-black px-3 w-20 text-center">{product.rate}</td>
                  <td className="border border-black px-5 bg-white"><img src={product.img} alt={product.name} width="100" height="100" /></td>
                  <td className="border border-black px-3 w-20 text-center">{product.featured}</td>
                  <td className="border border-black px-5">
                    <div className="space-x-2">
                      <button onClick={() => { handleEdit(product.id), handleModalEdit() }} className=" text-white bg-primary px-2 py-1 rounded hover:bg-rose-800">Editar</button>
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
            <label htmlFor="opciones" className=" text-gray-700 text-sm font-bold mb-2 mt-2">Selecciona una categoría:</label>
            <select id="opciones" className="shadow appearance-none border rourded w-full py-1 px-3 text-black" value={opcionSeleccionada} onChange={handleSelectChange}>
              <option value="">Selecciona...</option>
              <option value="Mixtos">Mixtos</option>
              <option value="Canasta">Canasta</option>
              <option value="Girasoles">Girasoles</option>
              <option value="Detalles">Detalles(regalos)</option>
              <option value="Rosas">Rosas</option>
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
            <input name="rate" type="number" max={5} min={1} placeholder="rate" className="shadow appearance-none border rourded w-full py-1 px-3 text-black" onChange={handleRateProduct} />
            <label htmlFor="opcionesDestacado" className=" text-gray-700 text-sm font-bold mb-2 mt-4">¿Es un producto destacado?</label>
            <select id="opcionesDestacado" className="shadow appearance-none border rourded w-full py-1 px-3 text-black" value={optionFeatured} onChange={handlefeatured}>
              <option value="">Selecciona...</option>
              <option value="Sí">Sí</option>
              <option value="No">No</option>
            </select>

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
              <textarea name="name" placeholder="Descripción" className="shadow appearance-none border rourded w-full py-1 px-3 text-black" onChange={handleDescriptionProduct} value={descriptionProduct} />
              <label htmlFor="opciones" className=" text-gray-700 text-sm font-bold mb-2 mt-2">Selecciona una categoría:</label>
              <select id="opciones" className="shadow appearance-none border rourded w-full py-1 px-3 text-black" value={categoryProduct} onChange={handleSelectChange}>
                <option value="">Selecciona...</option>
                <option value="Mixtos">Mixtos</option>
                <option value="Canasta">Canasta</option>
                <option value="Girasoles">Girasoles</option>
                <option value="Detalles">Detalles(regalos)</option>
                <option value="Rosas">Rosas</option>
              </select>
              <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2 mt-2">Precio</label>
              <input name="price" value={priceProduct} type="text" placeholder="Precio" className="shadow appearance-none border rourded w-full py-2 px-3 text-black" onChange={handlePriceProduct} />
              <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2 mt-2">Precio Anterior</label>
              <input name="priceBefore" value={beforePriceProduct} type="text" placeholder="Precio Anterior" className="shadow appearance-none border rourded w-full py-2 px-3 text-black" onChange={handleBeforePriceProduct} />
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
              <input name="rate" value={rateProduct} max={5} min={1} type="number" placeholder="rate" className="shadow appearance-none border rourded w-full py-2 px-3 text-black" onChange={handleRateProduct} />
              <label htmlFor="opcionesDestacado" className=" text-gray-700 text-sm font-bold mb-2 mt-4">¿Es un producto destacado?</label>
              <select id="opcionesDestacado" className="shadow appearance-none border rourded w-full py-1 px-3 text-black" value={featuredProduct} onChange={handlefeatured}>
                <option value="">Selecciona...</option>
                <option value="Sí">Sí</option>
                <option value="No">No</option>
              </select>
              <button className="bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5">Editar</button>
            </form>
          </Modal>
        )
      }

      {isOpenAlert && (
        <ModalAlert handleModal={handleModalAlert} Title="¡Campos Requeridos!" >
          <div>
            <ul>
              {validaciones.map((item, index) => (
                <li className="block text-gray-700 text-sm font-bold mb-2 mt-2" key={index}>{item}</li>
              ))}
            </ul>
            <div className="flex justify-center">
              <button onClick={() => { handleModalAlert() }} className="bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5">Aceptar</button>
            </div>
          </div>
        </ModalAlert>

      )}
      {/*isProductSuccess && (
        <ModalAlert handleModal={handleModalAlert} Title="¡Producto Añadido con Éxito!" >
          <div>
            <div className="flex justify-center">
              <button onClick={() => { handleModalSuccess() }} className="bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5">Aceptar</button>
            </div>
          </div>
        </ModalAlert>

      )
      */}
      {/* isProductSuccessEdit && (
        <ModalAlert handleModal={handleModalAlert} Title="¡Producto Editado con Éxito!" >
          <div>
            <div className="flex justify-center">
              <button onClick={() => { handleModalSuccessEdit() }} className="bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5">Aceptar</button>
            </div>
          </div>
        </ModalAlert>
      )
      */}
      {/*isDeleteConfirm && (
        <ModalAlert handleModal={handleModalAlert} Title="¿Seguro que desea eliminar el producto?" >
          <div>
            <div className="flex justify-center">
              <button onClick={() => { handleDelete(idProducto) }} className="bg-red-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5">Aceptar</button>
              <button onClick={() => { handleModalDelete() }} className="bg-gray-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5  ml-5">Cancelar</button>
            </div>
          </div>
        </ModalAlert>
      )
     */}
      {/*isDelete && (
        <ModalAlert handleModal={handleModalAlert} Title="¡Producto eliminado con éxito" >
          <div>
            <div className="flex justify-center">
              <button onClick={() => { handleModalSuccessDelete() }} className="bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5">Aceptar</button>
            </div>
          </div>
        </ModalAlert>
      )
      */}




    </>
  );
};

export default ProductList;
