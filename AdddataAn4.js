import React from 'react'
import { useState } from 'react'
import Axios from "axios";
import * as XLSX from 'xlsx'

const AdddataAn4 = () => {
    const [excel1 , setExcel1]  = useState(null);
    const [data1,setData1] = useState([])
    const [st1,setSt1] = useState(0)

    const handleFile = (e) => {
        let fileTypes = ['application/vnd.ms-excel','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet','text/csv'];
        let selectFile = e.target.files[0];
        if(selectFile) {
            if(selectFile && fileTypes.includes(selectFile.type)){
                let reader = new FileReader();
                reader.readAsArrayBuffer(selectFile);
                reader.onload = (e) => {
                    setExcel1(e.target.result);
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
          console.log(data);
          // console.log(data[0])
          let st1 = Object.keys(data[0])[0]
          // console.log(st1)
          if(st1.includes("Annex II ")){
            setSt1(2)
          }
          else if(st1.includes("Annex III ")){
            setSt1(3)
          }
          else if(st1.includes("Annex IV ")){
            setSt1(4)
          }
          else if(st1.includes("Annex V ")){
            setSt1(5)
          }
          else if(st1.includes("Annex VI ")){
            setSt1(6)
          }
          // console.log(data.length);
          const head = Object.values(data[3]);
          console.log(head);
          for(let i = 4 ; i<data.length; i++) {
            let com = Object.values(data[i])
            if(com.length !== 16 ){
                // console.log(i)
            }
            
              const data3 = Object.values(data[i]);
             
  
              const data4 = {name : data3[4] , cas : data3[2] , cmname : "CI"+data3[7]  , parts : data3[10] , per : 100 , color : data3[8]}
              data1.push(data4);
              setData1([...data1]);
          } 
        }
      }

      const handleFileSubmit = () => {
        console.log(data1)
        console.log(st1);
        // for(let i = 0; i < data1.length; i++) {
          let load = {
            data: data1,
            st: st1,
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
       // }
              
      }

  return (
    <div className='App'>
        <h1>Upload Data 4 </h1>
        <div className='Add_data1'>
            <h3>Upload & view excel sheet</h3>
            {/* <form onSubmit={() => handleFileSubmit()}> */}
            <input type='file' required onChange={handleFile}/>
            <button type='submit' onClick={() => handleFileSubmit()}>Upload</button>
            {/* </form> */}
            {
            st1
            }
            <br/><br/>
            {
                data1.length ? 
                    data1.map((values, idx) => (
                        <p key={idx}>{idx} {values.maxT} {values.minT}</p>
                    ))
                : null
            }
            <br/>
        </div>

       
    </div>
  )
}

export default AdddataAn4