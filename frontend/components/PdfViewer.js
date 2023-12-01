import React from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/pdf-viewer';

const PdfViewer = ({ pdfBytes }) => {
  return (
    <div>
      <Worker workerUrl={`https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`}>
        <Viewer fileUrl={`data:application/pdf;base64,${pdfBytes.toString('base64')}`} />
      </Worker>
    </div>
  );
};

export default PdfViewer;