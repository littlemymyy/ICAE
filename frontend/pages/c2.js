import Navbar from '@/components/layout/Navbar'
import Axios from "axios";
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import { AiOutlineDelete ,RiDraftFill } from "react-icons/ai";
import { FcOk } from "react-icons/fc";

export const c2 = () => {
    const [gname , setGname] = useState([])
    const [show, setShow] = useState([])
    const [status, setStatus] = useState([])
    const router = useRouter();

    useEffect(() => {
      const fetchdata = async () =>{
        try{
          const gn = await Axios.get(`http://localhost:3001/api/getGroupName`);
          console.log(gn.data)
          setGname(gn.data)
          setShow(gn.data)
          console.log(gn.data);
          for(let i = 0; i < gn.data.length; i++) {
            let load = {
              data : gn.data[i].groupname
            }
            const d = await Axios({
              url : `http://localhost:3001/api/getGroupNameSt`,
              method : 'post',
              data :  load  , 
            })

            //const d = Axios(gn.data[i].groupname)
            // const d = Axios with gn.data[i].groupname
            //console.log(gn.data[i].groupname + " " + d[0].sum)
            // status.push(d.data[0].sum)
            // setStatus([...status])
            // show[i]['status'] = d.data[0].sum
            // setShow([...show])
          }

        }catch(error){
          console.error(error)
        }
      }
        fetchdata()
      
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
                  <th></th>
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
                        {

                        }
                        
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