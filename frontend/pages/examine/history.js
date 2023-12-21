import React from 'react'
import Navbar from '@/components/layout/Navbar'
import { useRouter } from 'next/router';
import { AiOutlineDelete } from "react-icons/ai";
import { useState ,useEffect } from 'react';
import Axios from "axios";
import Footer from '@/components/Footer';
import Swal from 'sweetalert2'
import Button from '@mui/material/Button';
import { Box } from "@mui/material";

const history = () => {
  const router = useRouter()
  const [groupName, setGroupName] = useState("")
  const [list , setList] = useState([])
  const [unlist , setUnlist] = useState([])
  const [list2 , setList2] = useState([])
  const [data , setData] = useState([])
  const [oldData , setOldData] = useState([]);
  const [sum , setSum] = useState(0)
  const [search_input, setSearch_input] = useState("");
  const [show, setShow] = useState([])
  const [dd , setDd] = useState([])
  

  useEffect(() => {
      const queryString = window.location.search
      const searchParams = new URLSearchParams(queryString)
      const gname = searchParams.get("gname")
      setGroupName(gname)
      let splitArray = []
      
      // console.log(gname)
      let load = {
          gname : gname
      }
      Axios  ({
          url: "http://localhost:3001/api/getGroupNamebyname",
          method: "post",
          data : load,
        }).then ((response) => { 
          //console.log(response.data)
          setList(response.data)
          // console.log(response.data[0].fillterg.split(",").map(String))

          splitArray = response.data[0].fillterg.split(",").map(String)
         // console.log(splitArray)

       
          setDd(splitArray)
          getAll(splitArray)


          // setDd(splitArray);
          // dd.push(response.data[0].fillterg.split(",").map(String))
          // setDd([...dd])
          // setDd(response.data[0].fillterg.split(",").map(String))
        })

  },[])

  const getAll = (fillterg) =>{
      let dd = {
          fillterg : fillterg
        }
        //console.log(dd)
        Axios({
          url: "http://localhost:3001/api/searchBybodypartEdit",
          method: "post",
          data: dd ,
        }).then((response) => {
          setData(response.data)
          // console.log(response.data)
        })
  }

  const resultsearch = (e) => {
      setSearch_input(e)
      if (e.length == 0) {
        setShow([])
      }
      else {
        const results1 = data.filter((w) => {
          return (
            e &&
            w &&
            w.cas &&
            w.cname &&
            w.cmname &&
            (w.cname.toLowerCase().includes(e) || w.cas.includes(e) || w.cmname.toLowerCase().includes(e))
          );
        });
        setShow(results1)
        //console.log(results1)
      }
    }
  
    const add = (e) => {
      const result = data.find(({ cas }) => cas === e)
      if (result.st === 2) {
        unlist.push(result)
        setUnlist([...unlist])
        setShow([])
        setSearch_input("")
      }
  
      else {
        list.push(result)
        setList([...list])
        setShow([])
        setSearch_input("")
      }
      console.log(result)
    }

    const percentChange = (idx, e) => {
      //console.log(list[idx])
     // console.log(e)
      let l2 = list[idx]
      if( e.length === 0 ) {
        l2["per1"] = '0'
      }
      else {
        l2["per1"] = e
      }
     // console.log(l2)
      if (e > list[idx].per) {
        list2.push(l2)
        setList2([...list2])
        list.splice(idx, 1)
        setList([...list])
      }
      let total = 0
      for(let i = 0; i < list.length; i++){
        total += parseFloat(list[i].per1)
      }
      setSum(total)
  
    }
  
    const percentChange2 = (idx , e) => {
      // console.log(list2[idx])
      // console.log(e)
      let l1 = list2[idx]
      l1["per1"] = e
     // console.log(l1)
      if(l1.per1 <= l1.per) {
        list.push(l1)
        setList([...list])
        list2.splice(idx,1)
        setList2([...list2])
      }
    }
  

    const clickDelete = (e) => {
      list.splice(e, 1)
      setList([...list])
    }
  
    const clickDelete_unlist = (e) => {
      unlist.splice(e, 1)
      setUnlist([...list])
    }
    const clickDelete_list2 = (e) => {
      list2.splice(e, 1)
      setList2([...list])
    }
  
    const saveFile = () => {
      let load = {
        uname : localStorage.getItem("uname") ,
        gname : groupName, 
        fillterg : dd ,
        dd : list,
        email : localStorage.getItem("uemail")
      }
      Axios({
        url : "http://localhost:3001/api/savefile",
        method : "post" ,
        data : load ,
      }).then((response) => {
        alert("เพิ่มรายเรียบร้อย")
        router.push("/examine/record")
      }).catch(error => {
        console.error(error);
       // return res.status(500).json({ error: "Error sending email" });
    });
    }
  
    return (
      <div>
        <Navbar></Navbar>
        <Box className="preview"
        sx={{
            backgroundColor: { xs: "#F8F8F8", md: "#F8F8F8" },
            justifyContent: { xs: "", md: "center" },
            display: { xs: "block", md: "flex" },
            textAlign: { xs: "center", md: "center" },
          }}

        >
            <Box
            sx={{

                justifyContent: { xs: "", md: "center" },
                display: { xs: "block", md: "flex" },

            }}

            >
                <img src="/preview.png" style={{ maxWidth: 0 + "400px" }}/>

            </Box>
            <Box sx={{
              marginTop: "20px",
              marginBottom: "20px",
            }}>
                <h1>ตรวจสอบความถูกต้องก่อนจดแจ้ง</h1>

                <div className="litetext">
                    <p>ลดระยะเวลาในการแก้ไขและลดค่าใช้จ่ายของคุณในการจดแจ้งอย.  </p>
                    <p>เช็คสูตรหรือหาข้อมูลเพิ่มเติมกับเราได้เลย</p>
                </div>
            </Box>
        </Box>

      <link
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
        rel="stylesheet"
      />

      <div className='show'>
        {
          show.length ?
            show.map((value) => (
              value.cmname === "-" ?
                <p onClick={() => add(value.cas)} key={value.cas}>  {value.cname}</p>
                :
                <p onClick={() => add(value.cas)} key={value.cas}> {value.cmname}</p>
            ))
            : null
        }

      </div>


      {
        list.length ? (
          <div>
            <h3 className="label_G">สารที่สามารถใช้ได้</h3>
            <table className="C1_styled-table">
              <thead >
                <tr >
                  <th className='C1_th1'>ลำดับ</th>
                  <th className='C1_th2'>CAS NO</th>
                  <th className='C1_th3'>ชื่อ</th>
                  <th className='C1_th4'>ปริมาณสาร %</th>
                  <th className='C1_th5'>เหตุผล</th>
                  <th>ตัวเลือก</th>
                </tr>
              </thead>
              <tbody>
                {
                  list.length ?
                    list.map((value, idx) => (
                      <tr>
                        <td>{idx + 1}</td>
                        <td>{value.cas}</td>
                        {
                          value.cmname === '-' ?
                            <td>{value.cname}</td>
                            :
                            <td>{value.cmname}</td>
                        }
                        <td>
                          <input defaultValue={value.per1} onChange={(e) => percentChange(idx, e.target.value)} />
                        </td>
                        <td>{value.des}</td>
                        <td><AiOutlineDelete onClick={() => clickDelete(idx)} /></td>
                      </tr>
                    ))
                    : null
                }
              </tbody>
            </table>
          </div>
        )

          : null

      }

{
        
        list2.length  ? (
        <div>
        <h3 className="label_Y">สารกำหนดปริมาณ</h3>
        <table className="C3_styled-table">
          <thead >
            <tr >
              <th className='C3_th1'>ลำดับ</th>
              <th className='C3_th2'>CAS NO</th>
              <th className='C3_th3'>ชื่อ</th>
              <th className='C3_th4'>ปริมาณสาร %</th>
              <th className='C3_th5'>เหตุผล</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
              list2.length ?
                list2.map((value, idx) => (
                  <tr>
                    <td>{idx + 1}</td>
                    <td>{value.cas}</td>
                    {
                      value.cmname === '-' ?
                        <td>{value.cname}</td>
                        :
                        <td>{value.cmname}</td>
                    }
                    <td>
                      <input value={value.per1} onChange={(e) => percentChange2(idx, e.target.value)} />
                    </td>
                    <td>{value.des}</td>
                    <td></td>
                  </tr>
                ))
                : null
            }
          </tbody>
        </table>
      </div>
   
     ) : null

  }

{
        unlist.length ? (
          <div>
            <h3 className="label_Y">สารที่ไม่สามารถใช้ได้</h3>
            <table className="C2_styled-table">
              <thead >
                <tr >
                  <th className='C2_th1'>ลำดับ</th>
                  <th className='C2_th2'>CAS NO</th>
                  <th className='C2_th3'>ชื่อ</th>
                  <th className='C2_th4'>ปริมาณสาร %</th>
                  <th className='C2_th5'>เหตุผล</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {
                  unlist.length ?
                    unlist.map((value, idx) => (
                      <tr>
                        <td>{idx + 1}</td>
                        <td>{value.cas}</td>
                        {
                          value.cmname === '-' ?
                            <td>{value.cname}</td>
                            :
                            <td>{value.cmname}</td>
                        }
                        <td>
                          <input disabled onChange={(e) => percentChange(idx, e.target.value)} />
                        </td>
                        <td>{value.des}</td>
                        <th><AiOutlineDelete onClick={() => clickDelete(idx)} /></th>
                      </tr>
                    ))
                    : null
                }
              </tbody>
            </table>
          </div>
        ) : null

      }
      <div className='App'>ยอดรวมทั้งหมด {sum} 

      <div className="text-center">
      <Button variant="contained" color="success" onClick={()=>saveFile()} >
        บันทึก
      </Button>

      {/* <button className= "btn btn-success" onClick={()=>saveFile()}>
        บันทึก
      </button> */}
    </div>
      </div>

   
       
      

    </div>
  )
}
  

export default history
