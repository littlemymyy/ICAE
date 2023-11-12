import Navbar from '@/components/layout/Navbar'
import React, { useEffect, useRef, useState } from 'react'
import Axios from "axios";
import { AiOutlineDelete  } from "react-icons/ai";
import { FaRegEdit } from 'react-icons/fa';
import { useRouter } from 'next/router';

const Showch = () => {
    const [data , setData] = useState([])
    const [show, setShow] = useState([])
    const [showr, setShowr] = useState([])
    const [search_input, setSearch_input] = useState("");
    const page = useRef(1)
    const pager = useRef(1)
    const router = useRouter();  
    const [arr , setArr] = useState([])

    useEffect(() => {
        Axios({
            url : `http://localhost:3001/api/getalldata` ,
            method : 'get'
        }).then((response) => {
            setData(response.data)
            console.log(response.data)
            setShow(response.data.slice((page.current - 1) * 50, page.current * 50))
            setShowr(response.data.slice((page.current - 1) * 50, page.current * 50))
            for(let i=0 ; i < response.data.length; i++){
              arr.push(0)
              setArr([...arr])
            }
        })
    },[])

    const plusPage = () => {
      page.current += 1
      setShow(data.slice((page.current - 1) * 50, page.current * 50))
      // Scroll to the top of the page
      window.scrollTo(0, 0);

    }

    const mutPage = () => {
      page.current -= 1
      setShow(data.slice((page.current - 1) * 50, page.current * 50))
      // Scroll to the top of the page
      window.scrollTo(0, 0);

    }

    const resultsearch = (e) => {
      setSearch_input(e)
      // if (e.length == 0) {
      //   setShowr([])
      // }
      if (true) {
        const results1 = data.filter((w) => {
          return (
            (w.cname.toLowerCase().includes(e) || w.cas.includes(e) || w.cmname.toLowerCase().includes(e))
          );
        });
        setShowr(results1)
        pager.current = 1 

        console.log(results1)
      }
    } 
    const add = (e) => {
      const result = data.find(({ cas }) => cas === e)
      alert(result.cas)
      console.log(result)
    }
    const clickEdit = (no)  => {
      router.push({
        pathname : '/admin/Edit' , 
        query : {
          no : no ,
        }
      })
    }

    const getType = (no) => {
      alert(no)
    }

  return (
    <div>
      
        <Navbar/>
        <br/>
        <button onClick={() => plusPage()}>Next</button>
        <button onClick={() => mutPage()}>Black</button>
        <br/>
        <div className='C2_labal' >แก้ไขข้อมูลสารเคมี</div>
        <div className="logo1">
        </div>
        <br />
        <div className="input-icons">
        <i className="fa fa-search icon"></i>
        <input placeholder='ค้นหาโดยชื่อสารเคมี, CAS NO  etc'
          className="in"
          value={search_input}
          onChange={(e) => resultsearch(e.target.value)}
        />
        <br />
        <div className='show'>
        {/* {
          showr.length ?
            showr.map((value) => (
              value.cmname === "-" ?
                <p onClick={() => add(value.cas)} key={value.cas}>  {value.cname}</p>
                :
                <p onClick={() => add(value.cas)} key={value.cas}> {value.cmname}</p>
            ))
            : null
        } */}

      </div>
      </div>
      
          <div>
            <table className="showch_styled-table">
              <thead >
                <tr >
                 <th className='showch_th1'> <div className='radioSelect'> 
              
                <input type="checkbox" className="form-check-input"  value="option1" /> 
               
              </div>
              </th>
                  <th className='showch_th1'>ลำดับ</th>
                  <th className='showch_th2'>CAS NO</th>
                  <th className='showch_th3'>ชื่อสารเคมี</th>
                  <th className='showch_th4'>ประเภท</th>
                  <th className='showch_th5'>ความสามารถ</th>
                  <th>ตัวเลือก</th>
                </tr>
              </thead>
              <tbody>
                {
                    showr.map((value, idx) => (
                      <tr >
                        <td className='showch_th1'> <div className='radioSelect'> 
                        {
                          
                          arr[(page.current - 1) * 50 + idx] === 0 ?
                              <input type="checkbox" className="form-check-input"  value="option1"   onChange={() => getType((page.current - 1) * 50 + idx)}/>
                              :
                              <input type="checkbox" className="form-check-input"  value="option1"   onChange={() => getType((page.current - 1) * 50 + idx)} checked/>

                        }
                          {/* <input type="checkbox" className="form-check-input"  value="option1"   /> */}
             
                        </div>
                        </td>
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
                        <td>{value.des}</td>
                        <td> 
                          <FaRegEdit onClick={() => clickEdit(value.no)} />
                          &nbsp;&nbsp;&nbsp;
                          <AiOutlineDelete onClick={() => clickDelete(idx)} /></td>
                        
                      </tr>
                    ))
                    
                }
              </tbody>
            </table>
          </div>
        

          

     

        
    </div>
  )
}

export default Showch