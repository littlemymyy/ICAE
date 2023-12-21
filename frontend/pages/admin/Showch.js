import Navbar from '@/components/layout/Navbar'
import React, { isValidElement, useEffect, useRef, useState } from 'react'
import Axios from "axios";
import { AiOutlineDelete  } from "react-icons/ai";
import { FaRegEdit , FaExchangeAlt } from 'react-icons/fa';
import { useRouter } from 'next/router';
import Footer from "@/components/Footer"
import Popup from 'reactjs-popup';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import Swal from 'sweetalert2'


const Showch = () => {
    const [data , setData] = useState([])
    const [show, setShow] = useState([])
    const [showr, setShowr] = useState([])
    const [search_input, setSearch_input] = useState("");
    const page = useRef(1)
    const pager = useRef(1)
    const router = useRouter();
    const [arr , setArr] = useState([])
    const [numdata , setNumdata] = useState([])
    const Swal = require('sweetalert2')

    useEffect(() => {
        Axios({
            url : NEXT_PUBLIC_API_BASE_URL + `/api/getalldata` ,
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
      if (page.current > 1) {
        page.current -= 1;
        setShow(data.slice((page.current - 1) * 50, page.current * 50));
        // Scroll to the top of the page
        window.scrollTo(0, 0);
      }


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
      let cno = no
      let datano = -1
      for(let i = 0 ; i < data.length ; i++){
        if(data[i].no === no){
            datano = i
            break
        }
      }
      if(arr[datano] === 0 ){
        arr[datano] = 1
        setArr([...arr])
      }
      else {
        arr[datano] = 0
        setArr([...arr])
      }

      // alert(cno + " "+ datano)
    }


    const check = () => {
      for(let i = 0 ; i< arr.length ; i++) {
        if(arr[i] !== 0 ){
          return true
        }
      }
    }
    const changeClick = () => {

      if(check() === true){
        let str =""
        for(let i = 0 ; i < arr.length ; i++ ){
          if(arr[i] === 1) {
            if(str.length === 0){
              str += data[i].no
            }
            else {
              str += ","
              str += data[i].no
            }
          }
        }
         console.log(numdata)
          router.push({
          pathname : "/admin/Changegroup" ,
          query : {
        numdata : str
          }

       })
      }
      else {
        Swal.fire("กรุณาเลือกสารเคมี");
      }



    }



  return (
    <div>

        <Navbar/>

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
        <br/>





        <Stack direction="row" spacing={3} justifyContent="center">
          <Button onClick={() => mutPage()} variant="outlined"  startIcon={<SkipPreviousIcon />}>
             ย้อนกลับ
        </Button>

      <Button onClick={() => plusPage()} variant="outlined"  endIcon={<SkipNextIcon />}>
      ถัดไป
      </Button>

      <Button onClick={()=>changeClick()} variant="outlined"  endIcon={<ChangeCircleIcon />}>
        เปลี่ยนประเภทสารเคมี
      </Button>

    </Stack>

        <br/>
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



              </div>
              </th>
                  <th className='showch_th1'>ลำดับ</th>
                  <th className='showch_th2'>CAS NO</th>
                  <th className='showch_th3'>ชื่อสารเคมี</th>
                  <th className='showch_th4'>ประเภท</th>
                  <th className='showch_th5'>ความสามารถ</th>
                  <th className='showch_th6'>ตัวเลือก</th>
                </tr>
              </thead>
              <tbody>
                {
                    show.map((value, idx) => (
                      <tr key ={idx}>
                        <td className='showch_th1'> <div className='radioSelect'>
                        {

                          arr[(page.current - 1) * 50 + idx] === 0 ?
                              <input type="checkbox" className="form-check-input"  value="option1"   onChange={() => getType(value.no)}/>
                              :
                              <input type="checkbox" className="form-check-input"  value="option1"   onChange={() => getType(value.no)}checked/>

                        }
                          {/* <input type="checkbox" className="form-check-input"  value="option1"   /> */}

                        </div>
                        </td>
                        <td>{(page.current - 1) * 50 + idx + 1}</td>
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
                          <FaRegEdit className='icon_showch' onClick={() => clickEdit(value.no)} />
                          &nbsp;&nbsp;&nbsp;
                          <AiOutlineDelete className='icon_showch' onClick={() => clickDelete(idx)} />
                          </td>

                      </tr>
                    ))

                }
              </tbody>
            </table>
          </div>


          <Stack direction="row" spacing={3} justifyContent="center">
          <Button onClick={() => mutPage()} variant="outlined"  startIcon={<SkipPreviousIcon />}>
             ย้อนกลับ
        </Button>

      <Button onClick={() => plusPage()} variant="outlined"  endIcon={<SkipNextIcon />}>
      ถัดไป
      </Button>

      <Button onClick={()=>changeClick()} variant="outlined"  endIcon={<SkipNextIcon />}>
        เปลี่ยนประเภทสารเคมี
      </Button>

    </Stack>
    <br/>



          <Footer />
    </div>
  )
}

export default Showch
