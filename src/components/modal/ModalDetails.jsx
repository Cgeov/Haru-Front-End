import React, { useState } from 'react'

const Modal = ({ handleModal, Title = "", children }) => {

    return (
        <article className={`modal fixed z-50 top-0 left-0 w-full min-h-screen bg-black bg-opacity-50 flex justify-center items-center ${handleModal && "flex"}`}>
            <div className="bg-white shadow-md relative p-4 overflow-y-auto rounded-lg mt-4 mb-4 w-full max-w-2xl min-h-150 max-h-[600px]">
                <button className="modal-close absolute top-4 right-4 p-5 text-black" onClick={handleModal}>X</button>
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
export default Modal