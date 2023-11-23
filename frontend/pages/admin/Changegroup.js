import Axios from "axios";
import React, { useEffect, useState } from 'react'

const Changegroup = () => {
    const [st , setSt] = useState(0)
    const [data , setData] = useState([])
    const [num , setNum] = useState([])
    useEffect(() => {
        const queryString = window.location.search
        const searchParams = new URLSearchParams(queryString)
        const mydata = searchParams.get("numdata").split(",").map(String)
        
        setNum(mydata)


        Axios({
            url : "http://localhost:3001/api/getdatachangegroup",
            method: "post",
            data : mydata ,
        }).then((response) => {
            console.log(response.data)
            setData(response.data)
        })

        console.log(mydata)
    } ,[] )

    const savedata = () => {
        console.log(num)
        if(st !== 0) {
            let load = {
                st : st ,
                num : num
            }
            
            Axios({
                url : "http://localhost:3001/api/saveStfromchangegroup",
                method : "post" ,
                data : load,
            })
            
        }
       
    }
  return (
    <div>
        <p>Please select your favorite Web language:</p>
        {
            st === 2 ? 
            <input type="radio"  checked/>
            :
            <input type="radio" onChange={() => setSt(2)} />
        }
        
        <label >2</label>

        {
            st === 3 ? 
            <input type="radio"  checked/>
            :
            <input type="radio" onChange={() => setSt(3)} />
        }
        
        <label >3</label>
        {
            st === 4 ? 
            <input type="radio"  checked/>
            :
            <input type="radio" onChange={() => setSt(4)} />
        }
        <label >4</label>

        {
            st === 5 ? 
            <input type="radio"  checked/>
            :
            <input type="radio" onChange={() => setSt(5)} />
        }
        <label >5</label>

        {
            st === 6 ? 
            <input type="radio"  checked/>
            :
            <input type="radio" onChange={() => setSt(6)} />
        }
        <label >6</label>

        <table className="showch_styled-table">
              <thead >
                <tr >
                 <th className='showch_th1'> <div className='radioSelect'> 
              
                
               
              </div>
              </th>
                  <th className='showch_th1'>ลำดับ</th>
                  <th className='showch_th2'>CAS NO</th>
                  <th className='showch_th3'>ประเภท</th>
                 
                </tr>
              </thead>
              <tbody>
                {
                    data.map((value, idx) => (
                      <tr >
                        <td>{idx + 1}</td>
                        <td>{value.cas}</td>
                        {
                          value.cmname === '-' ?
                            <td>{value.cname}</td>
                            :
                            <td>{value.cmname}</td>
                        }
                        <td>
                          {value.st}
                        </td>
                        
                         
                      </tr>
                    ))
                    
                }
              </tbody>
            </table>

        <button onClick={() => savedata()}>save</button>
    </div>
  )
}

export default Changegroup