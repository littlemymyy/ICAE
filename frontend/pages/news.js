import React, { useEffect, useState } from 'react'
import Axios from "axios";
import { values } from 'pdf-lib';

const news = () => {
    const [newdata , setNewData] = useState([])
    useEffect(()=>{
        const feactData = async () => {
            try{
                const res = await Axios.get("https://newsapi.org/v2/everything?q=cosmetic&apiKey=4e20660dd2d64fc9ba8433c3a6dba2b9")
                setNewData(res.data)
                console.log(res.data)
            } catch(error){
                console.log(error)
            }
        }
        feactData()
    },[])
  
   
  return (
    <div>news

        {/* {
            newdata.map((value , idx)=>
                <p>value.urlToImage</p>
            )
        } */}
    </div>
  )
}

export default news