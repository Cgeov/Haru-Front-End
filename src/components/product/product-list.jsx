import React, { useState, useEffect, Children, useRef } from "react";
import { UploadButton } from "@bytescale/upload-widget-react";
import Modal from "@/components/modal/Modal";
import axios from "axios";
import Swal from "sweetalert2";
import showSweetAlert, {
  ManageError,
  confirmationAlert,
} from "../Alerts/AlertManage";
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
  const [featuredProduct, setFeaturedProduct] = useState("");
  const [descriptionProduct, setDescriptionProduct] = useState("");
  const [categoryProduct, setCategoryProduct] = useState("");
  const [idProducto, setIdProduct] = useState("");
  //Manejo de modal
  const [isOpenNew, setIsOpenNew] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const [isProductSuccess, setProductSuccess] = useState(false);
  const [isProductSuccessEdit, setProductSuccessEdit] = useState(false);
  const [isDeleteConfirm, setDeleteConfirm] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  //validaciones
  const [validaciones, setValidaciones] = useState([]);
  const [productsListShow, setProductsListShow] = useState(products);

  const handleModalNew = () => {
    setNameProduct("");
    setPriceProduct(0);
    setImgProduct("");
    setBeforePriceProduct(0);
    setDescriptionProduct("");
    setOpcionSeleccionada("Selecciona...");
    setOptionFeatured("Selecciona...");
    setFeaturedProduct("");
    setCategoryProduct("");
    setRateProduct(0);
    setIsOpenNew(!isOpenNew);
  };
  const handleModalEdit = () => {
    setNameProduct("");
    setPriceProduct(0);
    setImgProduct("");
    setBeforePriceProduct(0);
    setDescriptionProduct("");
    setOpcionSeleccionada("Selecciona...");
    setOptionFeatured("Selecciona...");
    setFeaturedProduct("");
    setCategoryProduct("");
    setRateProduct(0);
    setIsOpenEdit(!isOpenEdit);
  };
  const handleModalAlert = (validaciones) => {
    setValidaciones(validaciones);
    setIsOpenAlert(!isOpenAlert);
  };
  const handleModalSuccess = () => {
    setProductSuccess(!isProductSuccess);
  };
  const handleModalSuccessEdit = () => {
    setProductSuccessEdit(!isProductSuccessEdit);
  };
  const handleModalSuccessDelete = () => {
    setIsDelete(!isDelete);
  };
  const handleModalDelete = () => {
    setDeleteConfirm(!isDeleteConfirm);
  };

  //Using services
  const body = {
    collection: "products",
    id: idDocument,
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
    maxFileCount: 10,
  };

  useEffect(() => {
    setProductsListShow([...productsList]);
  }, [productsList]);

  //Nuevo Producto
  const form = useRef(null);
  const product = {
    collection: "products",
    document: {
      name: nameProduct,
      description: descriptionProduct,
      category: categoryProduct,
      price: parseFloat(priceProduct),
      priceBefore:
        beforePriceProduct === "" ? 0 : parseFloat(beforePriceProduct),
      img: imgProductNew,
      rate: parseInt(rateProduct),
      featured: featuredProduct,
    },
  };

  const handleSubmitNewProduct = async (e) => {
    e.preventDefault();
    const validaciones = [];
    const esDecimal = /^-?\d*\.?\d+$/;

    if (nameProduct === "") {
      validaciones.push("Nombre");
    }
    if (descriptionProduct === "") {
      validaciones.push("Descripción");
    }
    if (categoryProduct === "") {
      validaciones.push("Categoría");
    }
    if (priceProduct === 0) {
      validaciones.push("Precio");
    }
    if (!esDecimal.test(priceProduct)) {
      validaciones.push("Precio incorrecto");
    }
    if (beforePriceProduct !== "") {
      console.log(beforePriceProduct);
      if (!esDecimal.test(beforePriceProduct)) {
        validaciones.push("Precio anterior incorrecto");
      }
    }
    if (imgProductNew === "") {
      validaciones.push("Imagén");
    }
    if (rateProduct === 0) {
      validaciones.push("Rate");
    }
    if (featuredProduct === "") {
      validaciones.push("¿Es un producto destacado?");
    }
    if (validaciones.length === 0) {
      const res = await axios.post(
        "http://localhost:5000/service/add",
        product
      );
      console.log(res);
      form.current.reset();
      handleUpdateProductList();
      setImgProductNew("");
      setOpcionSeleccionada("Selecciona...");
      handleModalNew();
      showSweetAlert("¡Producto añadido con éxito!", "success");
    } else {
      ManageError(validaciones);
      //handleModalAlert(validaciones)
    }
  };

  //Editar producto
  const bodyProduct = {
    collection: "products",
    id: idDocument,
    document: {
      name: nameProduct,
      description: descriptionProduct,
      category: categoryProduct,
      price: parseFloat(priceProduct),
      priceBefore:
        beforePriceProduct === "" ? 0 : parseFloat(beforePriceProduct),
      img: imgProduct,
      rate: parseInt(rateProduct),
      featured: featuredProduct,
    },
  };
  const handleEdit = (id) => {
    setIdDocument(id);
  };

  const handleSearch = (e) => {
    const searchValue = e.target.value;
    const results = productsList.filter((result) => {
      return result.name.includes(searchValue);
    });
    setProductsListShow(results);
  };

  const handleSearchSelect = (e) => {
    console.log(e)
    const searchValue = e.target.value;
    const results = productsList.filter((result) => {
      return result.category == searchValue;
    });
    setProductsListShow(results);
  };

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
          setFeaturedProduct(data.featured);
        })
        .catch((error) => {});
    }
  }, [isOpenEdit]);

  const handleSubmitEditProduct = async (e) => {
    e.preventDefault();
    const validaciones = [];
    const esDecimal = /^-?\d*\.?\d+$/;
    if (nameProduct === "") {
      validaciones.push("Nombre");
    }
    if (descriptionProduct === "") {
      validaciones.push("Descripción");
    }
    if (categoryProduct === "") {
      validaciones.push("Categoría");
    }
    if (priceProduct === 0) {
      validaciones.push("Precio");
    }
    if (!esDecimal.test(priceProduct)) {
      validaciones.push("Precio incorrecto");
    }
    if (beforePriceProduct !== "") {
      console.log(beforePriceProduct);
      if (!esDecimal.test(beforePriceProduct)) {
        validaciones.push("Precio anterior incorrecto");
      }
    }
    if (imgProduct === "") {
      validaciones.push("Imagén");
    }
    if (rateProduct === 0) {
      validaciones.push("Rate");
    }
    if (featuredProduct === "") {
      validaciones.push("¿Es un producto destacado?");
    }
    if (validaciones.length === 0) {
      const res = await axios.put(
        "http://localhost:5000/service/update",
        bodyProduct
      );
      console.log(res);
      form.current.reset();
      handleModalEdit();
      handleUpdateProductList();
      showSweetAlert("¡Producto editado con éxito!", "success");
      //setProductSuccessEdit(!isProductSuccessEdit)
    } else {
      ManageError(validaciones);
      //handleModalAlert(validaciones)
    }
  };

  const handleNameProduct = (event) => {
    setNameProduct(event.target.value);
  };
  const handlePriceProduct = (event) => {
    setPriceProduct(event.target.value);
  };
  const handleBeforePriceProduct = (event) => {
    setBeforePriceProduct(event.target.value);
  };
  const handleImgProduct = (imagen) => {
    setImgProduct(imagen);
  };
  const handleImgProductNew = (imagen) => {
    setImgProductNew(imagen);
  };
  const handleRateProduct = (event) => {
    setRateProduct(event.target.value);
  };
  const handleDescriptionProduct = (event) => {
    setDescriptionProduct(event.target.value);
  };
  const handleSelectChange = (event) => {
    setOpcionSeleccionada(event.target.value);
    setCategoryProduct(event.target.value);
  };
  const handlefeatured = (event) => {
    setOptionFeatured(event.target.value);
    setFeaturedProduct(event.target.value);
  };

  //Eliminar
  const handleDelete = async (id) => {
    const result = await confirmationAlert("¿Desea eliminar este producto?");
    const productDeleted = {
      data: {
        collection: "products",
        id: id,
      },
    };
    //setDeleteConfirm(!isDeleteConfirm)
    //setIdProduct(id)
    if (result.isConfirmed) {
      const res = await axios.delete(
        "http://localhost:5000/service/delete",
        productDeleted
      );
      console.log(res);
      handleUpdateProductList();
      showSweetAlert("¡Producto eliminado con éxito!", "success");
      //setIdProduct('')
      //setIsDelete(!isDelete)
    } else if (result.isDismissed) {
      console.log("Se canceló la acción");
    }
  };
  //Actualizar lista de productos
  const handleUpdateProductList = async () => {
    const body = {
      collection: "products",
    };
    const res = await axios.post(
      "http://localhost:5000/service/getCollection",
      body
    );
    setProductsList(res.data);
  };

  return (
    <>
      <div className="mt-10">
        <h1 className="text-2xl font-semibold mx-10 mb-10 text-black text-primary">
          Lista de Productos
        </h1>
        <div className="mx-10">
          <button
            onClick={() => {
              handleModalNew();
            }}
            className="text-white bg-primary px-2 py-1 rounded hover:bg-secondary font-bold">
            Nuevo Producto
          </button>
        </div>

        <div className="flex gap-[20px]">
          <div className="flex justify-between">
            <div className="inline-flex border rounded w-7/12 px-2 lg:px-6 h-12 bg-transparent">
              <div className="flex flex-wrap items-stretch w-full h-full mb-6 relative">
                <div className="flex">
                  <span className="flex items-center leading-normal bg-transparent rounded rounded-r-none border border-r-0 border-none lg:px-3 py-2 whitespace-no-wrap text-grey-dark text-sm">
                    <svg
                      width="18"
                      height="18"
                      className="w-4 lg:w-auto"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M8.11086 15.2217C12.0381 15.2217 15.2217 12.0381 15.2217 8.11086C15.2217 4.18364 12.0381 1 8.11086 1C4.18364 1 1 4.18364 1 8.11086C1 12.0381 4.18364 15.2217 8.11086 15.2217Z"
                        stroke="#455A64"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M16.9993 16.9993L13.1328 13.1328"
                        stroke="#455A64"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </span>
                </div>
                <input
                  onChange={(e) => {
                    handleSearch(e);
                  }}
                  type="text"
                  className="flex-shrink flex-grow flex-auto leading-normal tracking-wide w-px flex-1 border border-none border-l-0 rounded rounded-l-none px-3 relative focus:outline-none text-sm lg:text-sm lg:text-base text-gray-500 font-thin"
                  placeholder="Buscar"
                />
              </div>
            </div>
          </div>
          <div>
            <div className="relative">
              <select
                onChange={(e) => {
                  handleSearchSelect(e);
                }}
                className="peer p-4 pe-9 block w-full border-secondary rounded-lg text-xs focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none bg-primary border-secondary text-white focus:ring-secondary
                      focus:pt-6
                      focus:pb-2
                      [&:not(:placeholder-shown)]:pt-6
                      [&:not(:placeholder-shown)]:pb-2
                      autofill:pt-6
                      autofill:pb-2">
                <option selected>Abre para seleccionar opciones</option>
                <option value="Mixtos">Mixtos</option>
                <option value="Canasta">Canastas</option>
                <option value="Girasoles">Girasoles</option>
                <option value="Detalles">Detalles</option>
                <option value="Rosas">Rosas</option>
              </select>
              <label
                className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent text-white peer-disabled:opacity-50 peer-disabled:pointer-events-none
    peer-focus:text-xs
    peer-focus:-translate-y-1.5
    peer-focus:text-gray-500
    peer-[:not(:placeholder-shown)]:text-xs
    peer-[:not(:placeholder-shown)]:-translate-y-1.5
    peer-[:not(:placeholder-shown)]:text-white">
                Categoría
              </label>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <table className="table-auto mt-5">
            <thead className="text-white bg-primary">
              <tr>
                <th className="border border-black px-3 w-15">#</th>
                <th className="border border-black px-3 w-45 overflow-hidden whitespace-normal break-all">
                  Nombre
                </th>
                <th className="border border-black px-5 w-60 overflow-hidden whitespace-normal break-all">
                  Descripción
                </th>
                <th className="border border-black px-5 w-30">Categoria</th>
                <th className="border border-black px-3 w-20 ">Precio</th>
                <th className="border border-black px-3 w-20 ">
                  Precio Anterior
                </th>
                <th className="border border-black px-3 w-20 ">Rate</th>
                <th className="border border-black px-5">Imagén</th>
                <th className="border border-black px-3 w-20 text-center">
                  Destacado
                </th>
                <th className="border border-black px-5">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-[#ffced3]  text-black">
              {productsListShow.map((product, index) => (
                <tr key={product.id}>
                  <td className="border border-black px-3 w-15">{index + 1}</td>
                  <td className="border border-black px-3 w-45 overflow-hidden whitespace-normal break-all">
                    {product.name}{" "}
                  </td>
                  <td className="border border-black px-5 w-60 overflow-hidden whitespace-normal break-all">
                    {product.description}{" "}
                  </td>
                  <td className="border border-black px-5 w-30">
                    {product.category}{" "}
                  </td>
                  <td className="border border-black px-3 w-20 text-center">
                    ${product.price}
                  </td>
                  <td className="border border-black px-3 w-20 text-center">
                    ${product.priceBefore}
                  </td>
                  <td className="border border-black px-3 w-20 text-center">
                    {product.rate}
                  </td>
                  <td className="border border-black px-5 bg-white">
                    <img
                      src={product.img}
                      alt={product.name}
                      width="100"
                      height="100"
                    />
                  </td>
                  <td className="border border-black px-3 w-20 text-center">
                    {product.featured}
                  </td>
                  <td className="border border-black px-5">
                    <div className="space-x-2">
                      <button
                        onClick={() => {
                          handleEdit(product.id), handleModalEdit();
                        }}
                        className=" text-white bg-primary px-2 py-1 rounded hover:bg-rose-800">
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="bg-secondary text-white px-2 py-1 rounded hover:bg-red-600">
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isOpenNew && (
        <Modal handleModal={handleModalNew} Title="Agregar">
          <form
            className="rounded-lg px-10 pb-8 mb-2"
            onSubmit={handleSubmitNewProduct}
            ref={form}>
            <label
              htmlFor="name"
              className="block text-gray-700 text-sm font-bold mb-2">
              Nombre
            </label>
            <input
              name="name"
              type="text"
              placeholder="Nombre"
              className="shadow appearance-none border rourded w-full py-1 px-3 text-black"
              onChange={handleNameProduct}
            />
            <label
              htmlFor="name"
              className="block text-gray-700 text-sm font-bold mb-2 mt-2">
              Descripción
            </label>
            <textarea
              name="name"
              placeholder="Descripción"
              className="shadow appearance-none border rourded w-full py-1 px-3 text-black"
              onChange={handleDescriptionProduct}
            />
            <label
              htmlFor="opciones"
              className=" text-gray-700 text-sm font-bold mb-2 mt-2">
              Selecciona una categoría:
            </label>
            <select
              id="opciones"
              className="shadow appearance-none border rourded w-full py-1 px-3 text-black"
              value={opcionSeleccionada}
              onChange={handleSelectChange}>
              <option value="">Selecciona...</option>
              <option value="Mixtos">Mixtos</option>
              <option value="Canasta">Canasta</option>
              <option value="Girasoles">Girasoles</option>
              <option value="Detalles">Detalles(regalos)</option>
              <option value="Rosas">Rosas</option>
            </select>
            <label
              htmlFor="name"
              className="block text-gray-700 text-sm font-bold mb-2 mt-2">
              Precio
            </label>
            <input
              name="price"
              type="text"
              placeholder="Precio"
              className="shadow appearance-none border rourded w-full py-1 px-3 text-black"
              onChange={handlePriceProduct}
            />
            <label
              htmlFor="name"
              className="block text-gray-700 text-sm font-bold mb-2 mt-2">
              Precio Anterior
            </label>
            <input
              name="priceBefore"
              type="text"
              placeholder="Precio Anterior"
              className="shadow appearance-none border rourded w-full py-1 px-3 text-black"
              onChange={handleBeforePriceProduct}
            />
            <label
              htmlFor="name"
              className="block text-gray-700 text-sm font-bold mb-2 mt-2">
              Imagen
            </label>
            <UploadButton
              options={options}
              onComplete={(files) =>
                handleImgProductNew(files.map((x) => x.fileUrl))
              }>
              {({ onClick }) => (
                <button
                  onClick={onClick}
                  className="text-white bg-blue-800 hover:bg-blue-700 font-bold py-1 px-4 rounded mb-3">
                  Upload a file...
                </button>
              )}
            </UploadButton>
            <input
              name="img"
              value={imgProductNew}
              type="text"
              placeholder="Imagen"
              className="shadow appearance-none border rourded w-full py-1 px-3 text-black"
              onChange={handleImgProductNew}
              disabled
            />
            <label
              htmlFor="name"
              className="block text-gray-700 text-sm font-bold mb-2 mt-2">
              Rate
            </label>
            <input
              name="rate"
              type="number"
              max={5}
              min={1}
              placeholder="rate"
              className="shadow appearance-none border rourded w-full py-1 px-3 text-black"
              onChange={handleRateProduct}
            />
            <label
              htmlFor="opcionesDestacado"
              className=" text-gray-700 text-sm font-bold mb-2 mt-4">
              ¿Es un producto destacado?
            </label>
            <select
              id="opcionesDestacado"
              className="shadow appearance-none border rourded w-full py-1 px-3 text-black"
              value={optionFeatured}
              onChange={handlefeatured}>
              <option value="">Selecciona...</option>
              <option value="Sí">Sí</option>
              <option value="No">No</option>
            </select>

            <button className="bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5">
              Guardar
            </button>
          </form>
        </Modal>
      )}
      {isOpenEdit && (
        <Modal handleModal={handleModalEdit} Title="Editar">
          <form
            className="rounded-lg px-10 pb-8 mb-4"
            onSubmit={handleSubmitEditProduct}
            ref={form}>
            <label
              htmlFor="name"
              className="block text-gray-700 text-sm font-bold mb-2">
              Nombre del Producto
            </label>
            <input
              name="name"
              value={nameProduct}
              type="text"
              placeholder="Nombre"
              className="shadow appearance-none border rourded w-full py-2 px-3 text-black"
              onChange={handleNameProduct}
            />
            <label
              htmlFor="name"
              className="block text-gray-700 text-sm font-bold mb-2 mt-2">
              Descripción
            </label>
            <textarea
              name="name"
              placeholder="Descripción"
              className="shadow appearance-none border rourded w-full py-1 px-3 text-black"
              onChange={handleDescriptionProduct}
              value={descriptionProduct}
            />
            <label
              htmlFor="opciones"
              className=" text-gray-700 text-sm font-bold mb-2 mt-2">
              Selecciona una categoría:
            </label>
            <select
              id="opciones"
              className="shadow appearance-none border rourded w-full py-1 px-3 text-black"
              value={categoryProduct}
              onChange={handleSelectChange}>
              <option value="">Selecciona...</option>
              <option value="Mixtos">Mixtos</option>
              <option value="Canasta">Canasta</option>
              <option value="Girasoles">Girasoles</option>
              <option value="Detalles">Detalles(regalos)</option>
              <option value="Rosas">Rosas</option>
            </select>
            <label
              htmlFor="name"
              className="block text-gray-700 text-sm font-bold mb-2 mt-2">
              Precio
            </label>
            <input
              name="price"
              value={priceProduct}
              type="text"
              placeholder="Precio"
              className="shadow appearance-none border rourded w-full py-2 px-3 text-black"
              onChange={handlePriceProduct}
            />
            <label
              htmlFor="name"
              className="block text-gray-700 text-sm font-bold mb-2 mt-2">
              Precio Anterior
            </label>
            <input
              name="priceBefore"
              value={beforePriceProduct}
              type="text"
              placeholder="Precio Anterior"
              className="shadow appearance-none border rourded w-full py-2 px-3 text-black"
              onChange={handleBeforePriceProduct}
            />
            <label
              htmlFor="name"
              className="block text-gray-700 text-sm font-bold mb-2 mt-2">
              Imagen
            </label>
            <UploadButton
              options={options}
              onComplete={(files) =>
                handleImgProduct(files.map((x) => x.fileUrl))
              }>
              {({ onClick }) => (
                <button
                  onClick={onClick}
                  className="text-white bg-blue-800 hover:bg-blue-700 font-bold py-2 px-4 rounded mb-3">
                  Upload a file...
                </button>
              )}
            </UploadButton>
            <input
              name="img"
              value={imgProduct}
              type="text"
              placeholder="Imagen"
              className="shadow appearance-none border rourded w-full py-2 px-3 text-black"
              onChange={handleImgProduct}
              disabled
            />
            <label
              htmlFor="name"
              className="block text-gray-700 text-sm font-bold mb-2 mt-2">
              Rate
            </label>
            <input
              name="rate"
              value={rateProduct}
              max={5}
              min={1}
              type="number"
              placeholder="rate"
              className="shadow appearance-none border rourded w-full py-2 px-3 text-black"
              onChange={handleRateProduct}
            />
            <label
              htmlFor="opcionesDestacado"
              className=" text-gray-700 text-sm font-bold mb-2 mt-4">
              ¿Es un producto destacado?
            </label>
            <select
              id="opcionesDestacado"
              className="shadow appearance-none border rourded w-full py-1 px-3 text-black"
              value={featuredProduct}
              onChange={handlefeatured}>
              <option value="">Selecciona...</option>
              <option value="Sí">Sí</option>
              <option value="No">No</option>
            </select>
            <button className="bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5">
              Editar
            </button>
          </form>
        </Modal>
      )}

      {isOpenAlert && (
        <ModalAlert handleModal={handleModalAlert} Title="¡Campos Requeridos!">
          <div>
            <ul>
              {validaciones.map((item, index) => (
                <li
                  className="block text-gray-700 text-sm font-bold mb-2 mt-2"
                  key={index}>
                  {item}
                </li>
              ))}
            </ul>
            <div className="flex justify-center">
              <button
                onClick={() => {
                  handleModalAlert();
                }}
                className="bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5">
                Aceptar
              </button>
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
