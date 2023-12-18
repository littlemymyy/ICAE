import Navbar from '@/components/layout/Navbar'
import Axios from "axios";
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import { AiOutlineDelete ,RiDraftFill } from "react-icons/ai";
import { FcOk } from "react-icons/fc";
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import EditNoteIcon from '@mui/icons-material/EditNote';
import Swal from 'sweetalert2';

const record = () => {
  const [gname , setGname] = useState([])
  const [show, setShow] = useState([])
  const [status, setStatus] = useState([])
  const router = useRouter();

  useEffect(() => {
    let email = localStorage.getItem("uemail")
    let load = {
      email : email
    }
    console.log(email)
    const fetchdata = async () =>{
      try{
        const gn = await Axios.post(`http://localhost:3001/api/getGroupName`,load);
        console.log(gn.data)
        setGname(gn.data)
        setShow(gn.data)
        console.log(gn.data);
        // for(let i = 0; i < gn.data.length; i++) {
        //   let load = {
        //     data : gn.data[i].groupname
        //   }
          // const d = await Axios({
          //   // url : `http://localhost:3001/api/getGroupNameSt`,
          //   // method : 'post',
          //   // data :  load  ,
          // })

          //const d = Axios(gn.data[i].groupname)
          // const d = Axios with gn.data[i].groupname
          //console.log(gn.data[i].groupname + " " + d[0].sum)
          // status.push(d.data[0].sum)
          // setStatus([...status])
          // show[i]['status'] = d.data[0].sum
          // setShow([...show])
        //}

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
          pathname : '/examine/history' ,
          query : {
            gname: groupname,
          }
        })
  }

  const clickDelete = (idx , groupName) => {
    Swal.fire({
      title: 'คุณต้องการลบข้อมูลใช่หรือไม่?',
      text: "ข้อมูลทั้งหมดในไฟล์นี้จะถูกลบอย่างถาวร!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#ff0000',
      confirmButtonText: 'ใช่',
      cancelButtonText: 'ยกเลิก'
    }).then((result) => {
      if (result.isConfirmed) {
        clickDeleted(idx , groupName)
        Swal.fire(
          'ลบข้อมูลสำเร็จ!',
          'ข้อมูลของคุณถูกลบเรียบร้อยแล้ว',
          'success'
        )
      }
    })
  }

  const clickDeleted = (idx , groupName) => {
    show.splice(idx,1);
    setShow([...show])
    let load = {
      email : localStorage.getItem("uemail") ,
      groupName : groupName
    }
    Axios.post("http://localhost:3001/api/DeleteGroupName" ,load)
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
                      <tr>
                        <td>{idx + 1}</td>
                        <td>{value.udate}</td>
                        <td>{value.groupname}</td>
                        <td style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>  <Stack direction="row" spacing={2}>

                        <Button variant="outlined" endIcon={<EditNoteIcon />}onClick={()=>sendgroupname(value.groupname)}>
                          แก้ไข
                        </Button>
                      <Button variant="outlined" endIcon={<DeleteIcon />} onClick={() => clickDelete(idx , value.groupname)} >
                        ลบ
                     </Button>
                       </Stack></td>
                      </tr>
                    ))
                    : null
                }
              </tbody>
            </table>

    </div>
  )
}

export default record



