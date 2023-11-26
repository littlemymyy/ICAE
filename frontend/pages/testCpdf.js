import React from 'react'
import  { useState } from 'react';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'
import fontkit from '@pdf-lib/fontkit'

const testCpdf = () => {
    const [userInput, setUserInput] = useState('');
    const [pdfUrl, setPdfUrl] = useState('');
    const [loveInput, setLoveInput] = useState('');
    const [whoInput, setWhoInput] = useState('');
    const [placeInput, setPlaceInput] = useState('');
    const [howToInput, setHowToInput] = useState('');
    const [relationshipInput, setRelationshipInput] = useState('');
    const [kissInput, setKissInput] = useState('');
   
  
    const handleInputChange = (setState) => (e) => {
      setState(e.target.value);
    };

      const generatePdf = async () => {
        const pdfDoc = await PDFDocument.create();
        pdfDoc.registerFontkit(fontkit)
        const page = pdfDoc.addPage();
        const { width, height } = page.getSize();

        const fontUrl = 'https://fonts.gstatic.com/s/thasarabunnew/v10/ifpU4PceAyhhJk2Rr6oUThTg.woff2'; // Replace with the actual URL
        const fontBytes = await fetch(fontUrl).then((res) => res.arrayBuffer());

        const font = await pdfDoc.embedFont(fontBytes);

    
        const frameWidth = 500;
        const frameHeight = 150;
        const frameX = 50;
        const frameY = height - 200;
        page.drawRectangle({
          x: frameX,
          y: frameY,
          width: 500,
          height: 700,
          borderColor: rgb(0, 0, 0),
          fillColor: rgb(1, 1, 1, 0),
        });
    
        // Define labels and values
        const data = [
          { label: 'Love', value: loveInput },
          { label: 'Who', value: "...." },
          { label: 'Place', value: "...." },
          { label: 'How To', value: "...." },
          { label: 'Relationship', value: "....." },
          { label: 'JUST', value: "........" },
        ];
    
        // Draw each label and value inside the frame
        data.forEach((item, index) => {
          const labelY = frameY + frameHeight - 30 - index * 60; // Adjust the spacing as needed
          const valueY = frameY + frameHeight - 30 - index * 60;
          page.drawText(`${item.label}:`, {
            x: frameX + 50,
            y: labelY+20 ,
            font: font,
            color: rgb(0, 0, 0),
          });
          page.drawText(item.value, {
            x: frameX + 200,
            y: valueY+20,
            font: font,
            color: rgb(0, 0, 0),
          });
        });

        
      
        const pdfBytes = await pdfDoc.save();

        const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });
        const pdfUrl = URL.createObjectURL(pdfBlob);
        setPdfUrl(pdfUrl);

    
        
        console.log(pdfBytes);
      };

  return (
    <div>
      {[
        { label: 'Love', state: loveInput, setState: setLoveInput },
        { label: 'Who', state: whoInput, setState: setWhoInput },
        { label: 'Place', state: placeInput, setState: setPlaceInput },
        { label: 'How To', state: howToInput, setState: setHowToInput },
        { label: 'Relationship', state: relationshipInput, setState: setRelationshipInput },
        { label: 'Have Kiss', state: kissInput, setState: setKissInput },
      ].map(({ label, state, setState }) => (
        <div key={label}>
          <label>{label}:</label>
          <br/>
          <input value={state} onChange={handleInputChange(setState)} />
        </div>
      ))}
      <button onClick={generatePdf}>Generate PDF</button>

      {pdfUrl && (
        <div>
          <h2>Generated PDF</h2>
          <iframe title="Generated PDF" src={pdfUrl} width="100%" height="600px" />
        </div>
      )}
    </div>
  )
}

const PdfViewer = ({ pdfBytes }) => {
    return (
      <div>
        <Worker workerUrl={`https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`}>
          <Viewer fileUrl={`data:application/pdf;base64,${pdfBytes.toString('base64')}`} />
        </Worker>
      </div>
    );
  };

  

export default testCpdf