import React, { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/Footer";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Autocomplete from "@mui/material/Autocomplete";
import { rgb } from "pdf-lib";
import { fetch } from "pdf-lib";
import { Box, TextField, Typography, Button } from "@mui/material";
import Axios from "axios";
import { data } from "jquery";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import SendIcon from "@mui/icons-material/Send";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import DeleteIcon from "@mui/icons-material/Delete";
import { TiUserDelete } from "react-icons/ti";
import { FaUserPlus } from "react-icons/fa";
import { FcOk } from "react-icons/fc";

const createByfda = () => {
    const [data , setData] = useState([])

    useEffect(()=> {
        
    },[])

    const fetchData = async (e) => {
        console.log("e = " + e);
    
        try {
            const res = await Axios({
                url: "http://localhost:3001/api/fetchData",
                method: "get",
                params: {
                    data: e.target.value,
                }
            });
            setData(res.data)
            // Handle the response data as needed
            console.log("Response:", res.data);
        } catch (error) {
            // Handle errors
            console.error("Error fetching data:", error);
        }
    }
    fetchData()




  return (
    <div>
        <Navbar/>

            <div className='col-md-6'>
                <img src="/uploadAs.png" height = "500px" width = "500px" margin-top = "60px"/>
                
            </div>
            <div className="cool-md-6"> 

            <Typography>
                1.ข้อมูลทั่วไป
              </Typography>



              <Box
                sx={{
                  display: 'flex',  // Set display to flex
                  flexDirection: 'column',  // Align items in a row,

                  // Center items in Y axis,
                }}>
                <TextField onChange={(e) => { fetchData(e) }} id="regitnumber" variant="outlined" label="เลขที่จดแจ้ง" style={{ width: "50%", marginTop: "10px" }} />
              </Box>


              <Box>
                <TextField id="comName" label="ชื่อทางการค้า" style={{ width: "50%", marginTop: "10px" }} />
              </Box>

              <Box>
                <TextField id="cosName" label="ชื่อเครื่องสำอาง" style={{ width: "50%", marginTop: "10px" }}/>
              </Box>

              <Box >
                <TextField id="typeGoods" label="ประเภทของเครื่องสำอาง" style={{ width: "50%", marginTop: "10px" }}/>
              </Box>

              <Box >
                <TextField id="dateS" label="วันที่แจ้งจดแจ้ง" style={{ width: "50%", marginTop: "10px" }} />

              </Box>

              <Box>
                <TextField id="expDate" label="วันที่ใบอนุญาตหมดอายุ" style={{ width: "50%", marginTop: "10px" }}/>

              </Box>
              <Box >
                <TextField id="objGoods" label="จุดประสงค์การใช้" style={{ width: "50%", marginTop: "10px" }}/>
              </Box>

              <Box>
                <TextField id="py" label="ลักษณะทางกายภาพ" style={{ width: "50%", marginTop: "10px" }}/>
              </Box>


              <Box sx={{
                gap: { xs: "20px", md: "20px" },
                display: { xs: "block", md: "flex" },
                marginTop: { xs: "10px", md: "10px" },

              }}>
                <TextField

                  marginTop="10px"
                  id="entrepreneur"
                  label="ชื่อผู้ผลิต"
                  variant="outlined"
                  multiline
                  rows={4}
                  width={'40ch'}
                  m="1"
                />
                <TextField
                  id="fentrepreneur"
                  label="ชื่อผู้ผลิตต่างประเทศ"
                  variant="outlined"
                  multiline
                  rows={4}
                  width={'40ch'}
                  m="1"
                />
                <TextField
                  id="des"
                  label="รายละเอียดเพิ่มเติม"
                  variant="outlined"
                  multiline
                  rows={4}
                  width={'40ch'}
                  m="1"
                />
              </Box>

            </div>
              <br />
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
  <Button onClick={() => sendData()} variant="contained" color="success">
    บันทึก
  </Button>
  <Button onClick={() => sendData()} variant="contained" color="success">
    สร้าง PIF
  </Button>
</div>
        


        <Footer></Footer>
    </div>
  )
}

export default createByfda