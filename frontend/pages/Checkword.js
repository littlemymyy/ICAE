import Navbar from '@/components/layout/Navbar'
import React, { useEffect, useState } from 'react'
import Axios from "axios";

const Checkword = () => {
    const [warning , setWarning] = useState([]);
    const [status , setStatus] = useState(true);
    const [word , setWord] = useState("");
    useEffect(()=>{
        Axios.get(`http://localhost:3001/api/getWarningWord`).then((response) => {
        setWarning(response.data);
        console.log(response.data);
    });

    },[])

    const action = (e) => {
        setWord(e);
        setStatus(true);
        for(let i=0; i < warning.length; i++){
            if(e.includes(warning[i].warningname)){
                setStatus(false);
            }
        }

    }     
  return (
    <div className='App'>
      <Navbar/>
      <div className='cw'>
        <h3>ชื่อผลิตภัณฑ์</h3>
        {
            status ? 
            <>
                <input style={{color: 'black' }} onChange={(e)=> action(e.target.value)} />
            </>
            :
            <>
                <input style={{color: 'red' }} onChange={(e)=> action(e.target.value)} />
            </>
        }
        <br/> <br/>
        {
            word.length ?
            <>
                {
                    status ?
                    <>
                        <div class="w3-panel w3-pale-green w3-border">
                            <h3>Success!</h3>
                            <p>สามารถใช้ชื่อนี้ได้</p>
                        </div>
                    </>
                    :
                    <>
                        <div class="w3-panel w3-pale-yellow w3-border">
                            <h3>Warning!</h3>
                            <p>ไม่สามารถใช้ชื่อนี้ได้</p>
                        </div>
                    </>
                }
            </>
            : null
        }
      </div>
    </div>
  )
}

export default Checkword
