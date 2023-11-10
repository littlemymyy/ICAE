import React, { useState } from 'react'
import './ReadCSVToMysql.css'
import Axios from 'axios'

const ReadCSVToMysql = () => {
    const [fileName,setFileName] = useState("A3.csv");
    const action1 = () => {
        Axios.get(`http://localhost:3001/api/getWithWord/${fileName}`).then((response) => {
            // const dd = response.data;
            // setDataWithWord(dd);
            console.log(response)
        })

    }
    
  return (
    <div>
        <input onChange={(e) => setFileName(e.target.value)} required value={fileName} />
        {
            fileName.length > 4 && fileName.substring(fileName.length-4)=== ".csv" ?
            <button onClick={() => action1()}>Add</button>
            :
            <button disabled>Add</button>
        }
        
    </div>
  )
}

export default ReadCSVToMysql
