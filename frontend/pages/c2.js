import Navbar from '@/components/layout/Navbar'
import Axios from "axios";
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import { AiOutlineDelete } from "react-icons/ai";

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
      <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet"></link>
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
     
      </div>

      </div>

      <table className="C2E_styled-table">
              <thead >
                <tr >
                  <th className='C1A_th1'>ลำดับ</th>
                  <th className='C1A_th2'>วันที่</th>
                  <th className='C1A_th3'>ชื่อไฟล์</th>
                  <th style={{ textAlign: 'center' }}>ตัวเลือก</th>
                </tr>
              </thead>
              <tbody>
                {
                  show.length ?
                    show.map((value, idx) => (
                      <tr onClick={()=>sendgroupname(value.groupname)}>
                        <td>{idx + 1}</td>
                        <td>{value.udate}</td>
                        <td>{value.groupname}</td>
                        
                       
                        <td><AiOutlineDelete onClick={() => clickDelete(idx)} /></td>
                      </tr>
                    ))
                    : null
                }
              </tbody>
            </table>

    </div>
  )
}
export default c2