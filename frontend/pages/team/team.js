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


const team = () => {
    const [team , setTeam] = useState("")
    const router = useRouter()
    const [data , setData] = useState([])
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    const [list , setList] = useState([])
    const [status , setStatus] = useState([])
    const [statusU, setStatusU] = useState("");
    const [userID, setUserID] = useState("");
    const Swal = require('sweetalert2')


    useEffect(() => {
      if(localStorage.getItem("uemail") === null ){
        router.push("/")
      }
      if(localStorage.getItem("orid") !== "null" && localStorage.getItem("orid") !== null){
          console.log("PUST TO MANAGE")
          router.push("/team/manage")
      }
      let id = localStorage.getItem("orid");
      let email = localStorage.getItem("uemail")

      Axios.get(process.env.NEXT_PUBLIC_API_BASE_URL + "/api/getStatusByEmail?email="+email)
      .then((res) => {
          console.log(res.data.message[0].status)
          setStatusU(res.data.message[0].status)
          localStorage.setItem("status", res.data.message[0].status)
          setUserID(res.data.message[0].no)
      })
      .catch((err) => {
          console.log(err)
      });
    }, []);


    const handleChick = async() => {
      Axios.get(process.env.NEXT_PUBLIC_API_BASE_URL + "/api/getCountTeam?team="+team)
      .then((res) => {
        console.log(res.data)
          if (res.data.status === "ok") {
            if (res.data.message[0].num === 0) {
              Axios.post(process.env.NEXT_PUBLIC_API_BASE_URL + "/api/createTeam", {
                team: team,
                userID: userID,
              }).then((res) => {
                console.log(res.data)
                if (res.data.status === "ok") {
                  Swal.fire({
                    icon: 'success',
                    title: 'สร้างทีมสำเร็จ!',
                    text: 'คุณสามารถเพิ่มข้อมูล Pif ได้ทันที',
                  })
                  localStorage.setItem("orid", team)
                  router.push("/pif/productslist")
                }
                else {
                  Swal.fire({
                    icon: 'error',
                    title: 'พบข้อผิดพลาด!',
                    text: 'กรุณาลองใหม่อีกครั้ง',
                  })
                }
              }).catch((err) => {
                console.log(err)
                Swal.fire({
                  icon: 'error',
                  title: 'พบข้อผิดพลาด!',
                  text: 'กรุณาลองใหม่อีกครั้ง',
                });
              });
            }else{
              Swal.fire({
                icon: 'error',
                title: 'ชื่อทีมซ้ำ!',
                text: 'กรุณาใช้ชื่อทีมอื่น',
              })
            }
          } else {
            Swal.fire({
              icon: 'error',
              title: 'พบข้อผิดพลาด!',
              text: 'กรุณาลองใหม่อีกครั้ง',
            })
          }
    }).catch((err) => {
      console.log(err)
      Swal.fire({
        icon: 'error',
        title: 'พบข้อผิดพลาด!',
        text: 'กรุณาลองใหม่อีกครั้ง',
      });
    });
  }


  return (
    <div>
        <Navbar/>

        <h1 style={{ textAlign: 'center' }}>สร้างทีมของคุณเพื่อรังสรรค์การทำงาน</h1>
        <Box
            display="flex"
            flexDirection="row"
            justifyContent="center"
            alignItems="center"
            marginTop="20px"
            marginBottom="30px"
            marginLeft="auto"
            marginRight="auto"
        >
            <input
                style={{
                    width: "400px",
                    height: "42px",
                    borderRadius: "5px",
                    border: "1px solid #C4C4C4",
                    padding: "10px",
                }}
                type="text"
                placeholder="ใส่ชื่อบริษัท หรือ ชือทีมของคุณ"
                onChange={(e) => setTeam(e.target.value)}
                defaultValue={team}
            />
            <button
                style={{
                    width: "80px",
                    height: "42px",
                    borderRadius: "5px",
                    border: "1px solid #C4C4C4",
                    padding: "10px",
                    backgroundColor: "#7e57c2",
                    marginLeft: "5px",
                }}
                onClick={() => handleChick()}
            >
                <span style={{ color: "white" }}>สร้าง</span>
            </button>
        </Box>

        <Footer/>
    </div>
  )
}

export default team
