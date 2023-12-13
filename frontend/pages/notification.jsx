import Axios from "axios";
import React, { useEffect } from 'react'

const notification = () => {


  useEffect(()=>{
    let email = localStorage.getItem("uemail")
    let id = localStorage.getItem("orid")

    let load = {
      email : email,
      id : id ,
    }
    
    const feact = async () => {
      const res = await Axios.post("http://localhost:3001/api/getnotficationPIF")
    }



  },[])


  return (
    <div>notification</div>
  )
}

export default notification