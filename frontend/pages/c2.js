import Navbar from '@/components/layout/Navbar'
import Axios from "axios";
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';

export const c2 = () => {
    const [gname , setGname] = useState([])
    const [show, setShow] = useState([])
    const router = useRouter();

    useEffect(() => {
        Axios.get(`http://localhost:3001/api/getGroupName`).then((response) => {
            setGname(response.data);
            setShow(response.data)
            console.log(response.data);
          });
      
    },[])

    const resultsearch = (e) => {
        if(e.length === 0 ) {
            setShow(gname)
        }
        else {
            const results1 = gname.filter((w) => {
                return (
                  e &&
                  w &&
                  (w.groupname.toLowerCase().includes(e) || w.udate.includes(e))
                );
              });
              console.log(results1)
              setShow(results1)
        }
        
    }

    const sendgroupname = (groupname) => {
        router.push({
            pathname : '/c3' , 
            query : {
              gname: groupname,
            }
          })
    }
  return (
    <div>
        <Navbar></Navbar>
        <div className='C2_labal'>
            ประวัติการตรวจสอบสูตรเครื่องสำอาง
        </div>
        
        <br />
      <div className="input-icons">
        <i className="fa fa-search icon"></i>
        <input placeholder='ค้นหาโดยชื่อเครื่องสำอาง'
          className="in"
          //value={search_input}
          onChange={(e) => resultsearch(e.target.value)}
        />
        <br />
        <div>
        {
          show.length ?
            <table>
                <thead>
                    <tr>
                        <th>ชื่อไฟล์</th>
                        <th>วันที่</th>
                    </tr>
                </thead>

                <tbody>
                    {
                show.map((value) => (
                    <tr onClick={()=>sendgroupname(value.groupname)}>
                        <td>{value.groupname}</td>
                        <td>{value.udate}</td>
                    </tr>
                    
                
                 ))
                 }
                </tbody>
            </table>
           
            : null
        }

      </div>

      </div>

       
        


    </div>
  )
}
export default c2