import React, { useState } from 'react'
import Axios from "axios";
import * as XLSX from 'xlsx'

const index3 = () => {
    const [excel , setExcel]  = useState(null);
    const [alldata , setAlldata] = useState([]);
    const [st , setSt] = useState(0);

    const handleFile = (e) => {
        let fileTypes = ['application/vnd.ms-excel','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet','text/csv'];
        let selectFile = e.target.files[0];
        if(selectFile) {
            if(selectFile && fileTypes.includes(selectFile.type)){
                let reader = new FileReader();
                reader.readAsArrayBuffer(selectFile);
                reader.onload = (e) => {
                    setExcel(e.target.result);
                    readData(e.target.result);
                }
            }
        }
        else {

        }
    }
    const readData = (e) => {
      if(e !== null) {
        const workbook = XLSX.read(e , {type : "buffer"});
        const worksheetname = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[worksheetname];
        const data = XLSX.utils.sheet_to_json(worksheet);
        // console.log(data);
        // console.log(data[0])
        let st1 = Object.keys(data[0])[0]
        // console.log(st1)
        if(st1.includes("Annex II ")){
          setSt(2)
        }
        else if(st1.includes("Annex III ")){
          setSt(3)
        }
        else if(st1.includes("Annex IV ")){
          setSt(4)
        }
        else if(st1.includes("Annex V ")){
          setSt(5)
        }
        else if(st1.includes("Annex VI ")){
          setSt(6)
        }
        // console.log(data.length);
        const head = Object.values(data[3]);
        // console.log(head);
        for(let i = 4 ; i<data.length; i++) {
            const data1 = Object.values(data[i]);
            let max = 0 , min = 0 ;
            if(data1[9].length > 0 ){
              let maxs = data1[9].substring(0,data1[9].length-2);
              max = parseFloat(maxs)
            }

            if(data1[10].length > 0 ){
              let mins = data1[10].substring(0,data1[10].length-2);
              min = parseFloat(mins);
            }

            const data2 = {name : data1[0] , cas : data1[1] , ec : data1[2] , parts : data1[7] , maxt : max, mint : min}
            alldata.push(data2);
            setAlldata([...alldata]);
            if(i === 100) {
              console.log(data1)
              console.log(data2)
              console.log(st);
            }
        } 
      }
    }
    const handleFileSubmit = () => {
      console.log(alldata)
      console.log(st);
      for(let i = 0; i < alldata.length; i++) {
        let load = {
          data: alldata[i],
          st: st,
        };
        Axios({
          url: "http://localhost:3001/api/setdata",
          method: "post",
          data: load,
        })
          .then(function (response) {
            if (response.data) {
              console.log(response);
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      }
            
    }
  

  return (
    <div>
      <h3>Upload & view excel sheet</h3>
      {/* <form onSubmit={() => handleFileSubmit()}> */}
        <input type='file' required onChange={handleFile}/>
        <button type='submit' onClick={() => handleFileSubmit()}>Upload</button>
      {/* </form> */}
      {
        st
      }
      <br/><br/>
      {
        alldata.length ? 
            alldata.map((values, idx) => (
                <p key={idx}>{idx} {values.maxT} {values.minT}</p>
            ))
        : null
      }
      <br/>
     
    </div>
  )
}

export default index3
