import React from 'react';
import html2pdf from 'html2pdf.js';

class FacturaPDF extends React.Component {
  generarFacturaPDF = () => {
    // Configuración para la generación de PDF
    const pdfOptions = {
      margin: 10,
      filename: 'factura.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    };

    // Obtener el elemento HTML que deseas convertir a PDF
    const content = document.getElementById('factura-content');

    // Generar el PDF
    html2pdf().from(content).set(pdfOptions).outputPdf();
  };

  render() {
    return (
      <div>
        <h1>Generador de Facturas</h1>
        <button onClick={this.generarFacturaPDF}>Generar Factura PDF</button>

        <div id="factura-content" style={{ marginTop: '20px' }}>
          <div style={{ textAlign: 'center' }}>
            <h2>Factura</h2>
          </div>
          <div>
            <p>Cliente: John Doe</p>
            <p>Productos:</p>
            <ul>
              <li>Producto 1: $10</li>
              <li>Producto 2: $20</li>
            </ul>
            <p>Total: $30</p>
          </div>
        </div>
      </div>
    );
  }
}

export default FacturaPDF;
