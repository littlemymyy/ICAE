import React, { useEffect, useState } from 'react'
import Axios from "axios";
import 'bootstrap/dist/css/bootstrap.css'

const webservice_test = () => {
    const [data , setData] = useState([])

    useEffect(()=>{
      const today = new Date()
      const thisDay = today.getDate() + '-' + today.getMonth() + '-' + today.getFullYear()
      sessionStorage.setItem("emaildate" , thisDay);
      console.log(sessionStorage.getItem('emaildate'))
    },[])
    // useEffect(() => {
    //     const apiUrl = ""
    // },[])
    // const call = () => {
    //     var xhr = new XMLHttpRequest( ); 
    //     xhr.onload = (res)=>{ 
    //        if(res.target.status == 200){ 
    //          document.body.innerHTML +=  
    //          (res.target.responseText); 
    //        } 
    //     } 
    //     xhr.open("GET",".../todos/1",true); 
    //     xhr.send(); 
   
    // }
    // const axios = require('axios');
    // const parseString = require('xml2js').parseString;
    
    // // Define the SOAP request as a string
    // const soapRequest = `<?xml version="1.0" encoding="utf-8"?>
    // <soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">
    //   <soap12:Body>
    //     <GET_DATA_ALL xmlns="http://tempuri.org/">
    //       <DATAS>"10-1-6300015491"</DATAS>
    //     </GET_DATA_ALL>
    //   </soap12:Body>
    // </soap12:Envelope>`;
    
    // // Set the headers
    // const headers = {
    //   'Content-Type': 'application/soap+xml; charset=utf-8',
    //   'Content-Length': soapRequest.length,
    //   'Host': 'porta.fda.moph.go.th',
    // };
    
    // // Define the configuration for the axios request
    // const config = {
    //   method: 'post',
    //   url: 'http://porta.fda.moph.go.th/FDA_SEARCH_ALL/WS_LICENSE_SEARCH.asmx',
    //   headers: headers,
    //   data: soapRequest,
    // };
    
    // // Send the SOAP request using axios
    // axios(config)
    //   .then((response) => {
    //     // Handle the response here
    //     // Extract content from SOAP response
    //     parseString(response.data, (err, result) => {
    //       if (!err) {
    //         const content = result['soap12:Envelope']['soap12:Body'][0]['GET_DATA_ALLResponse'][0]['GET_DATA_ALLResult'][0];
    //         console.log(content);
    //       } else {
    //         console.error(err);
    //       }
    //     });
    //   })
    //   .catch((error) => {
    //     // Handle errors here
    //     console.error(error);
    //   });
    

    const soapEndpoint = 'https://porta.fda.moph.go.th/FDA_SEARCH_ALL/WS_LICENSE_SEARCH.asmx';

// Replace with your SOAP request XML
const soapRequest = `
<?xml version="1.0" encoding="utf-8"?>
<soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">
  <soap12:Body>
    <GET_DATA_CMT xmlns="http://tempuri.org/">
      <DATAS>"10-1-6300015491"</DATAS>
    </GET_DATA_CMT>
  </soap12:Body>
</soap12:Envelope>
`;

fetch(soapEndpoint, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/soap+xml; charset=utf-8',
  },
  body: soapRequest
})
  .then(response => response.text())
  .then(data => {
    // Parse and handle the SOAP response here
    console.log(data);
  })
  .catch(error => {
    console.error('Error:', error);
  });

  return (
    <>
      <div className='pt-2 pb-2 text-center mb-5' style={{backgroundColor: 'lightblue', color: 'white', border: '3px solid green'}}>
        Hello
      </div>
      <div>World</div>
      <div><input value='555' /></div>
     
<div class='radioSelect'>
  <div class="radio inline">
    <input type="checkbox" class="form-check-input" value="option1" onChange={() => getType(0, 1)} />
    <label>ผลิตภัณฑ์เกี่ยวกับผม</label>
  </div>

  <div class="radio inline">
    <input type="checkbox" class="form-check-input" value="option1" onChange={() => getType(1, 1)} />
    <label>ผลิตภัณฑ์เกี่ยวกับเล็บ</label>
  </div>

  <div class="radio inline">
    <input type="checkbox" class="form-check-input" value="option1" onChange={() => getType(2, 1)} />
    <label>ผลิตภัณฑ์เกี่ยวกับผิว</label>
        </div>

        <div class="radio inline">
    <input type="checkbox" class="form-check-input" value="option1" onChange={() => getType(2, 1)} />
    <label>ผลิตภัณฑ์เกี่ยวกับผิว</label>
        </div>
        <div class="radio inline">
    <input type="checkbox" class="form-check-input" value="option1" onChange={() => getType(2, 1)} />
    <label>ผลิตภัณฑ์เกี่ยวกับผิว</label>
        </div>

        <div class="radio inline">
    <input type="checkbox" class="form-check-input" value="option1" onChange={() => getType(2, 1)} />
    <label>ผลิตภัณฑ์เกี่ยวกับผิว</label>
        </div>

         </div>
         
         

      
    </>
       
  )
}

export default webservice_test