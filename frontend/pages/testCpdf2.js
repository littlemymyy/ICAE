import React from 'react'
import { useState } from 'react'
import { jsPDF } from 'jspdf';


const testCpdf2 = () => {
    const fontFile = '/NotoSansThai-Regular.ttf';
    const [txt1, setTxt1] = useState('')
    const [txt2, setTxt2] = useState('')
    const load = () => {
        setTxt1('สวัสดีครับ');
        setTxt2('เป็นอย่างไรบ้าง');
    }

  
    
      const loadFonts = () => {
        // You need to load and register the font here
        const fontFile = '/path/to/NotoSansThai-Regular.ttf';
    
        const font = new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = () => {
            resolve(reader.result);
          };
          reader.readAsArrayBuffer(fontFile);
        });
    
        font.then((fontData) => {
          // Register the font
          jsPDF.API.events.push([
            'addFont',
            fontData,
            'NotoSansThai-Regular',
            'normal',
          ]);
    
          // Set the default font
          jsPDF.API.setFont('NotoSansThai-Regular');
        });
      };
        
  return (
    <div>
        <input value={txt1}/>
        <br />
        <input value={txt2}/>
        <br />
        <button onClick={load}>Upload</button>
        <br /><br />
        <button onClick={() => generatePDF()}>Open PDF</button>
    </div>
  )
}

export default testCpdf2