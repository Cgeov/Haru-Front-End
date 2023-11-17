import React, { useState } from 'react'

const Modal = ({ handleModal, Title = "", children }) => {

  return (
    <article className={`modal fixed z-50 top-0 left-0 w-full min-h-screen bg-black bg-opacity-50 flex justify-center items-center ${handleModal && "flex"}`} >
      <div className="bg-white shadow-md relative p-4 min-w-320 max-w-480 min-h-150 max-h-[600px] overflow-y-auto rounded-lg mt-4 mb-4">
        <button className="modal-close absolute top-4 right-4 px-2 border border-black rounded-lg text-white font-bold bg-red-600" onClick={handleModal}>
          <p className='pb-1 ml-1 mr-1'>x</p>
        </button>
        <div className="flex justify-center">
          <h1 className="text-black p-5 font-bold uppercase underline">{Title} Producto</h1>
        </div>
        <div className="flex justify-center items-center h-full">
          {children}
        </div>
      </div>
    </article>
  )
}
export default Modal