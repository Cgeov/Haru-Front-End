import React from "react";
import html2pdf from "html2pdf.js";
import { BiSolidPhoneCall } from "react-icons/bi";
import { TfiWorld } from "react-icons/tfi";
import { ImLocation } from "react-icons/im";
import logo from "../../assets/img/logoTextResized.png";
import Image from "next/image";

class FacturaPDF extends React.Component {
  generarFacturaPDF = () => {
    const pdfOptions = {
      filename: "factura.pdf",
      image: { type: "jpg", quality: 0.99 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };

    const content = document.getElementById("factura");
    if (content) {
      html2pdf()
        .from(content)
        .set(pdfOptions)
        .outputImg()
        .then(async (pdf) => {
          let headers = new Headers();
          headers.append(
            "Access-Control-Allow-Origin",
            "http://localhost:3000"
          );
          headers.append("Access-Control-Allow-Credentials", "true");
          const binaryString = await atob(pdf.src.split(",")[1]);

          const length = binaryString.length;
          const bytes = new Uint8Array(length);
          for (let i = 0; i < length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
          }

          const blob = new Blob([bytes], { type: "image/png" });
          var fd = new FormData();
          fd.append("upl", blob, "image.png");
          console.log(blob);

          await fetch("http://localhost:5000/service/saveImage", {
            method: "POST",
            headers: headers,
            body: fd,
          })
            .then((response) => response.json())
            .then((data) => {
              console.log(data);
            });

            html2pdf()
            .from(content)
            .set(pdfOptions)
            .outputPdf().save()
        });
    } else {
      console.error(
        "El elemento con ID 'factura' no fue encontrado en el DOM."
      );
    }
  };

  render() {
    return (
      <div hidden={false}>
        <div
          id="factura"
          className="bg-gray-100 text-gray-600 py-[2cm] px-[3cm]">
          <div className="flex justify-between items-center py-[10px]">
            <div className="px-[20px]">
              <Image
                id="facturaimg"
                className="h-[50px] w-[120px]"
                src={logo}
                alt=""></Image>
            </div>
            <div className="text-primary text-2xl font-bold">Haru Flower</div>
          </div>
          <div className="flex justify-between mt-[2cm]">
            <div>
              <p className="text-primary text-3xl font-bold">Factura</p>
              <p className="flex justify-between gap-[40px] font-bold">
                <span className="text-gray-400">N° Factura</span>2342
              </p>
              <p className="flex justify-between gap-[40px] font-bold">
                <span className="text-gray-400">Pedido</span>2342
              </p>
              <p className="flex justify-between gap-[40px] font-bold">
                <span className="text-gray-400">Fecha</span>12/11/2023
              </p>
            </div>
            <div>
              <span className="text-primary">Facturado a</span>
              <p className="text-right font-bold">Name</p>
              <p className="text-right font-bold">Direction</p>
              <p className="text-right font-bold">Number</p>
            </div>
          </div>
          <div className="w-full mt-[2cm]">
            <table className="w-full">
              <thead>
                <tr className="bg-primary text-white">
                  <td className="text-right pr-[15px] pb-[10px]">N°</td>
                  <td className="pb-[10px]">Producto</td>
                  <td className="text-right pb-[10px]">Precio Unitario</td>
                  <td className="text-right pb-[10px]">Cantidad</td>
                  <td className="text-right pr-[10px] pb-[10px]">Total</td>
                </tr>
              </thead>
              <tbody>
                {

                  <tr className="bg-gray-200 odd:bg-gray-100">
                    <td className="text-right pr-[15px] py-[5px]">1</td>
                    <td>dsdsd</td>
                    <td className="text-right py-[5px]">$20.45</td>
                    <td className="text-right py-[5px]">1</td>
                    <td className="text-right pr-[10px] py-[5px]">$20.45</td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
          <div className="mt-[20px]">
            <p className="flex gap-[1cm] justify-end">
              <span className="text-left">Subtotal</span> $213.23
            </p>
            <p className="flex gap-[1cm] justify-end">
              <span className="text-left">Descuentos</span> $213.23
            </p>
            <p className="flex gap-[1cm] justify-end">
              <span className="text-left">Gastos Administrativos</span> $213.23
            </p>
            <p className="pb-[10px] mt-[5px] flex justify-end gap-[1cm] text-primary font-bold border-b-solid border-b-2 border-b-primary">
              <span>TOTAL</span> $213.23
            </p>
          </div>
          <div className="flex justify-between mt-[2cm]">
            <div>
              <p className="text-primary">Forma de Pago</p>
              <p>------</p>
            </div>
            <div>
              <p className="text-primary">Haru Flowers</p>
              <p>Dirección 1</p>
              <p>Codigo Postal</p>
              <p>El Salvador</p>
            </div>
          </div>
          <div className="flex justify-center gap-[1cm] mt-[2cm] pb-[1cm]">
            <div className="flex flex-col items-center gap-[10px]">
              <BiSolidPhoneCall size={25}></BiSolidPhoneCall> 2313-2343
            </div>
            <div className="flex flex-col items-center gap-[10px]">
              <TfiWorld size={25}></TfiWorld>www.haruFlowers.com
            </div>
            <div className="flex flex-col items-center gap-[10px]">
              <ImLocation size={25}></ImLocation>Street 0349
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default FacturaPDF;
