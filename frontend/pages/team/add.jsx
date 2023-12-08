import React, { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/Footer";
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Autocomplete from '@mui/material/Autocomplete';
import { rgb } from 'pdf-lib'
import { fetch } from 'pdf-lib';
import { Box, TextField, Typography, Button } from "@mui/material";
import Axios from "axios";
import { data } from "jquery";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import Swal from 'sweetalert2'
import { useRouter } from "next/router";
import { MdDeleteForever } from "react-icons/md";
import { IoMdPersonAdd } from "react-icons/io";

const add = () => {
    const [show , setShow] = useState([])
    const [search_input, setSearch_input] = useState("");
    const [list , setList] = useState([])
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    const Swal = require('sweetalert2')
    const [no , setNo] = useState([])
    const [data , setData] = useState([])
    const router = useRouter()
    const [teamdata , setTeamdata] = useState([])
    const [	status , setStatus] = useState([])
    const [id , setId] = useState("")

    useEffect(() => {
        let ida = sessionStorage.getItem("orid")
        setId(ida)
        const feactData = async () => {
            try {
                const res = await Axios.get("http://localhost:3001/api/getuserTeam/");
                const res1 = await Axios.get("http://localhost:3001/api/getuserTeamName/")
                console.log(res.data)
              //  console.log(res1.data)
                setData(res.data)
                setTeamdata(res1.data)
                
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        
        feactData();
    }, []); 


    const resultsearch = (e) => {
        if (e.length === 0) {
            setShow([]);
            setSearch_input("");
          } else {
            setSearch_input(e);
            const results1 = data.filter((w) => {
                return (
                  e &&
                  w &&
                  (w.em_fullname.toLowerCase().includes(e) ||
                    w.em_fullname.toUpperCase().includes(e))
                );
              });
              setShow(results1);
          }
    } 

    const add = (e) => {
        no.push(e)
        setNo([...no])
        
          const result = data.find(({ no }) => no === e);
          console.log("...........");
          console.log(result);
          setList([...list, result]);
          setShow([]);
          setSearch_input("");
    
          console.log(list);
       
      };

      const  handleclick = (e) => {
        console.log("handeChang")
       
       if(e === 2){
          removelist(e.idx)
          removeNo(e.no)
          
        }
        else {
            sendData()
        }
    }

    const sendData = () => {
        console.log("SendData")
        console.log(status)
        console.log(no)
        console.log(team)
        let load = {
            st : status,
            no : no ,
            team : team
        }
            const send = async () => {
                try{
                    const res = await Axios({
                        url : "http://localhost:3001/api/updateStutus",
                        method : "post",
                        data : load
                    })
    
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "เพิ่มสถานะสำเร็จ",
                        showConfirmButton: false,
                        timer: 1500
                      });
                     // router.push("/team/manage");
                       // pathname: '/team/manage',
                        // query: { team: team },
                      
    
                }  catch (error) {
                    console.error(error);
                    
                }
            }
            send()
       }




  return (
   

    
    <div>
        <Navbar/>

            <h1 style={{ textAlign: 'center' }}>เพิ่มผู้คนที่แสนพิเศษเพื่อรังสรรค์การทำงาน</h1>

          
         
         <div className="input-icons">
         <i className="fa fa-search icon"></i>
         <input
           placeholder="ค้าหาโดยชื่อผู้ใช้"
           className="in"
           value={search_input}
           onChange={(e) => resultsearch(e.target.value)}
         />
         <br />
       </div>
    
 
      <div className="show">
        {search_input.length
          ? show.map((value, idx) =>
             
                <p onClick={() => add(value.no)} key={value.idx}>
                  
                  {value.em_fullname}
                </p>
              
            )
          : null}
      </div>


      {
        list.length ? 
        <table className="C1A_styled-table">
        <thead>
          <tr>
            <th className="C1A_th1">ลำดับ</th>
            <th className="C1A_th2">ชื่อ</th>
            <th className="C1A_th3">การกระทำ</th>
          </tr>
        </thead>
        <tbody>
            {
                list && list.length > 0 ?
                    list.map((value , idx) => (
                        <tr key={idx}>
                            <td>{idx + 1}</td>
                            <td>{value.em_fullname}</td>
                            <td>
                            <div><button onClick={()=> handleclick(1)}> <IoMdPersonAdd />  ส่งคำเชิญ </button> <button onClick={()=> handleclick(2)}>  <MdDeleteForever />  นำออก</button></div>
                            </td>

                            </tr>
                    ))



                : null
            }
        </tbody>
      </table>
      : null
        
      }




        <Footer/>
    </div>
  )
}

export default add