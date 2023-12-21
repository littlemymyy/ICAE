import Axios from "axios";
import React, { useEffect, useState } from 'react'

const notification = () => {
  const [id , setId] = useState("")
  const [email , setEmail] = useState("")
  const [fda , setFda] = useState([])
  const [date , setDate] = useState([])


  useEffect(()=>{
    let email = localStorage.getItem("uemail")
    let id = localStorage.getItem("orid") || "-"


    let load = {
      email : email,
      id : id ,
    }
    
    const feact = async () => {
      try{
        const res = await Axios.post("process.env.API_BASE_URL/getnotficationPIF",load)
        //console.log(res.data)
      } catch(error){
        console.log(error)
      }
    }
    feact()
  },[])


  return (
    <div></div>
  )
}

export default notification