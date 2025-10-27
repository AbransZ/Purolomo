// En: src/utils/pdfGenerator.js

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const logoBase64 = "data:image/jpeg;base64,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"; // <-- TU BASE64

export const generateHistoryPDF = (registros) => {
  const doc = new jsPDF();
  let currentY = 15;

  // --- Logo ---
  const logoWidth = 40;
  const logoHeight = 15;
  doc.addImage(logoBase64, 'JPEG', 14, currentY, logoWidth, logoHeight);
  currentY += logoHeight + 5;

  // --- Título y Fecha Generación ---
  const pageCenterX = doc.internal.pageSize.getWidth() / 2;
  doc.setFontSize(18);
  doc.text('Historial Completo de Versiones', pageCenterX, currentY, { align: 'center' });
  currentY += 8;
  doc.setFontSize(11);
  doc.setTextColor(100);
  const today = new Date().toLocaleDateString('es-VE');
  // Ajustamos X para centrar, Y usa currentY
  doc.text(`Generado el: ${today}`, pageCenterX, currentY, { align: 'center' });
  currentY += 15; // Más espacio antes de la siguiente sección

  // --- Ordenamos DESCENDENTE (Más reciente primero) ---
  let sortedRegistros = [];
  if (registros && registros.length > 0) {
      // CORRECCIÓN 2: Orden Descendente
      sortedRegistros = [...registros].sort((a, b) => {
          const dateA = a.fecha || '';
          const dateB = b.fecha || '';
          // Invierte la comparación para orden descendente
          if (dateA < dateB) return 1; 
          if (dateA > dateB) return -1;
          // Desempate por versión (también descendente) si las fechas son iguales
          const versionA = a.version || '';
          const versionB = b.version || '';
          if (versionA < versionB) return 1;
          if (versionA > versionB) return -1;
          return 0; 
      });
  }
  // --- Fin Ordenación ---

  // --- Sección Última Versión Registrada ---
  if (sortedRegistros.length > 0) {
    // CORRECCIÓN 1: Obtenemos el PRIMER elemento (el más reciente ahora)
    const latestReg = sortedRegistros[0]; 

    let latestDateFormatted = 'N/A';
    if (latestReg.fecha && typeof latestReg.fecha === 'string') {
        const dateParts = latestReg.fecha.split('-');
        if (dateParts.length === 3) latestDateFormatted = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;
    }

    doc.setFontSize(14); doc.setTextColor(0);
    doc.text('Última Versión Registrada:', 14, currentY); currentY += 7;
    doc.setFontSize(10); doc.setTextColor(50);
    const lineHeight = 6;

    doc.text(`Aplicación: ${latestReg.nombre || 'N/A'}`, 14, currentY); currentY += lineHeight;
    doc.text(`Versión: ${latestReg.version || 'N/A'}`, 14, currentY); currentY += lineHeight;
    doc.text(`Fecha: ${latestDateFormatted}`, 14, currentY); currentY += lineHeight;
    doc.text(`Autor: ${latestReg.autor || 'N/A'}`, 14, currentY); currentY += lineHeight;
    const descLines = doc.splitTextToSize(`Descripción: ${latestReg.descripcion || 'N/A'}`, 180);
    doc.text(descLines, 14, currentY); currentY += descLines.length * lineHeight;
    doc.text(`Hash: ${latestReg.hash_git || 'N/A'}`, 14, currentY);
    currentY += lineHeight + 5; // Espacio antes de la tabla
  } else {
    // Manejo si no hay registros
    doc.setTextColor(0);
    doc.text('No hay registros en el historial.', 14, currentY);
    doc.save('historial_versiones.pdf'); 
    return; 
  }

  // --- Tabla del Historial ---
  const tableColumn = ["Fecha", "App", "Versión", "Autor", "Hash", "Descripción"];
  const tableRows = [];

  // Iteramos sobre sortedRegistros (que ahora está ordenado descendente)
  sortedRegistros.forEach(reg => {
    let formattedDate = 'N/A';
    if (reg.fecha && typeof reg.fecha === 'string') {
        const dateParts = reg.fecha.split('-');
        if (dateParts.length === 3) formattedDate = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;
    }
    const rowData = [
        formattedDate,
        reg.nombre || 'N/A',
        reg.version || 'N/A',
        reg.autor || 'N/A',
        reg.hash_git || 'N/A',
        reg.descripcion ? reg.descripcion.substring(0, 100) : 'N/A' 
    ];
    tableRows.push(rowData);
  });

  autoTable(doc, { 
    head: [tableColumn],
    body: tableRows, // Filas ordenadas descendente
    startY: currentY, 
    theme: 'grid',
    headStyles: { fillColor: [200, 29, 37] },
    styles: { fontSize: 8 },
    columnStyles: { 5: { cellWidth: 'auto' } }
  });

  doc.save('historial_versiones.pdf');
};