import React, { useState } from 'react'
import Axios from "axios";

const index4 = () => {
    const [xml , setXml]  = useState(null);
    const [alldata , setAlldata] = useState([]);

    const handleFile = (e) => {
        let selectFile = e.target.files[0];
        // console.log(selectFile.name)
        if(selectFile) {
            if(selectFile && selectFile.type === "text/xml"){
                setXml(selectFile.name);
            }
        }
        else {

        }
    }

    const handleFileSubmit = (e) => {
        e.preventDefault();
        if(xml !== null) {
            Axios.get(`http://localhost:3001/api/getXML/${xml}`).then((response) => {
                let res = response.data;
                setAlldata(response.data);
                console.log(response.data);
            });
        }
        
    }
    
  return (
    <div>
      <h3>Upload & view xml sheet</h3>
      <form onSubmit={handleFileSubmit}>
        <input type='file' required onChange={handleFile}/>
        <button type='submit'>Upload</button>
      </form>
    </div>
  )
}

export default index4
