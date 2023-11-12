import React, { useEffect, useState } from 'react'
import Axios from "axios"

const exp = () => {
    // const axios = require('axios');
    // const [data , setData] = useState([])
    // useEffect(() => {
    //     Axios({
    //         url : 'https://pertento.fda.moph.go.th/FDA_SEARCH_CENTER/PRODUCT/export_cmt_detail.aspx?regnos=1026100039039',
    //         method : 'get'
    //     }).then((response) => {
    //         console.log(response.data)
    //         setData(response.data)
    //     })
    // },[])


let xhr = XMLHttpRequest();

xhr.open("GET", 'https://pertento.fda.moph.go.th/FDA_SEARCH_CENTER/PRODUCT/export_cmt_detail.aspx?regnos=1026100039039', true);

xhr.onreadystatechange = function () {
  if (xhr.readyState === 4) {
    if (xhr.status === 200) {
      // Request was successful; process the response using xhr.responseText
      console.log("Success:", xhr.responseText);
    } else {
      // Request resulted in an error; handle it here
      console.error("Error:", xhr.status, xhr.statusText);
    }
  }
};

xhr.send();
  return (
    <div>exp</div>
  )
}

export default exp