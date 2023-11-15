import React, {useState } from 'react'


const ModalAlert = ({ handleModal, Title="",children }) => {
  
  return (
    <article className={`modal fixed z-50 top-0 left-0 w-full min-h-screen bg-black bg-opacity-50 flex justify-center items-center ${handleModal && "flex"}`} >
      <div className="bg-white shadow-md relative p-4 min-w-320 max-w-480 min-h-150 max-h-[600px] overflow-y-auto rounded-lg mt-4 mb-4">
        <div className="flex justify-center">
          <h1 className="text-black p-5 font-bold uppercase">{Title}</h1>
        </div>
        <div className="flex justify-center items-center h-full">
          {children}
        </div>
      </div>
    </article>
  )
}
export default ModalAlert