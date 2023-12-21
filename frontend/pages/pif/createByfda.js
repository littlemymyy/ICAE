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
import { data, error } from "jquery";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import SendIcon from "@mui/icons-material/Send";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import Swal from "sweetalert2";
import DeleteIcon from "@mui/icons-material/Delete";
import { TiUserDelete } from "react-icons/ti";
import { FaUserPlus } from "react-icons/fa";
import { FcOk } from "react-icons/fc";
import Skeleton from "@mui/material";
import { useRouter } from 'next/router';


const createByfda = () => {
  const [data, setData] = useState([])
  const [fda_num, setfda_num] = useState("")
  const [cosmeticname , setCosmeticname] = useState("")
  const [email, setEmail] = useState("")
  const [imageFile, setImageFile] = useState(null);
  const router = useRouter()
  const Swal = require('sweetalert2')
  const [id,setId] = useState("")


  // get email from session
  useEffect(() => {
    let userData = localStorage.getItem("uemail");
    let orid = localStorage.getItem("orid")
    setId(orid)
    setEmail(userData)
  }, [])

  const reformatDate = (input) => {
    let date = input.split("/")
    let day = date[0]
    let month = date[1]
    let year = (date[2]*1) - 543
    if (day.length == 1) {
      day = "0" + day
    }
    if (month.length == 1) {
      month = "0" + month
    }
    let newDate = year + "-" + month + "-" + day
    return newDate
  }

  //Get Data from Fda
  const fetchData = async (e) => {
    setfda_num(e.target.value)
    console.log( e);
    let num = e.target.value
    const res = await Axios({
      url: process.env.NEXT_PUBLIC_API_BASE_URL + "/api/fetchData",
      method: "get",
      params: {
        data: e.target.value,
      }
    })
      .then((res) => {

        console.log("arr")
        console.log(num)

        let dd = [{status : res.data[0] ,
          locationstatus : res.data[1],
          type : res.data[3],
          typeOfGoods : res.data[4] ,
          cosnameC : res.data[5] ,
          cosname : res.data[6],
          expdate : res.data[8],
          bodyPart : res.data[10],
          company : res.data[13] ,
          fcompany : res.data[14],
          fda_num : num,
          ordid : id ,
          email : localStorage.getItem("uemail")

}]

        // data[0]["cas"] = res.data[1]
        setData(dd)
        console.log(res.data)
        const updatedLabel = "MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiInputLabel-sizeMedium MuiInputLabel-outlined MuiFormLabel-colorPrimary MuiFormLabel-filled MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiInputLabel-sizeMedium MuiInputLabel-outlined css-1jy569b-MuiFormLabel-root-MuiInputLabel-root";

        if (res.data[0] == "N/A") {
          //do nothing
        } else {
          document.getElementById("comName-label").className = updatedLabel
          document.getElementById("comName-label").setAttribute('data-shrink', 'true')
          document.getElementById("comName").value = res.data[5]

          document.getElementById("cosName-label").className = updatedLabel
          document.getElementById("cosName-label").setAttribute('data-shrink', 'true')
          document.getElementById("cosName").value = res.data[6]

          document.getElementById("typeGoods-label").className = updatedLabel
          document.getElementById("typeGoods").value = res.data[9]

          document.getElementById("dateS-label").className = updatedLabel
          document.getElementById("dateS").value = reformatDate(res.data[7])

          document.getElementById("expDate-label").className = updatedLabel
          document.getElementById("expDate").value = reformatDate(res.data[8])

          document.getElementById("objGoods-label").className = updatedLabel
          document.getElementById("objGoods").value = res.data[11]

          document.getElementById("py-label").className = updatedLabel
          document.getElementById("py").value = res.data[10]

          document.getElementById("entrepreneur-label").className = updatedLabel
          document.getElementById("entrepreneur").value = res.data[13]

          document.getElementById("fentrepreneur-label").className = updatedLabel
          document.getElementById("fentrepreneur").value = res.data[14]
          console.log(res.data)
          console.log(res.data[0])
        }


      })
      .catch((error) => {
        console.log(error);
      });
  }

  const parseDateString = (dateString) => {
    const parts = dateString.split('/');
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // Months are zero-based in JavaScript
    const year = parseInt(parts[2], 10);

    return new Date(year, month, day);
  }

  const sendData = () => {

      try {
        var pif_product_data = JSON.stringify({
          "organization_id": localStorage.getItem("orid"),
          "created_by": localStorage.getItem("uemail"),
          "created_when": new Date().toISOString().split('T')[0],
          "pif_status": 0,
          "fda_license": document.getElementById("regitnumber").value,
          "product_name": document.getElementById("comName").value,
          "cosmetic_name": document.getElementById("cosName").value,
          "cosmetic_type": document.getElementById("typeGoods").value,
          "create_date": document.getElementById("dateS").value,
          "expire_date": document.getElementById("expDate").value,
          "cosmetic_reason": document.getElementById("objGoods").value,
          "cosmetic_physical": document.getElementById("py").value,
          "company_name": document.getElementById("entrepreneur").value,
          "company_eng_name": document.getElementById("fentrepreneur").value,
          "more_info": document.getElementById("des").value
        });
      } catch {
        Swal.fire({
          icon: 'error',
          title: 'เกิดข้อผิดพลาด',
          text: 'กรุณาตรวจสอบความถูกต้องของข้อมูล',
        })
      }


      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: process.env.NEXT_PUBLIC_API_BASE_URL + '/api/insertPifProduct',
        headers: {
          'Content-Type': 'application/json'
        },
        data : pif_product_data
      };

      Axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        Swal.fire({
          icon: 'success',
          title: 'สำเร็จ',
          text: 'สร้างผลิตภัณฑ์สำเร็จ',
        }).then((result) => {
          router.push("/pif/productslist")
        })
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'เกิดข้อผิดพลาด',
          text: 'กรุณาตรวจสอบความถูกต้องของข้อมูล',
        })
      });

  };

  return (
    <>
      <Navbar />


          <Box sx={{
            marginLeft: { xs: "10px", md: "50px" },
            marginBottom: { xs: "30px", md: "30px" },
            marginTop: { xs: "30px", md: "30px" },
          }}>
          <h3>กรอกข้อมูลเพื่อสร้างผลิตภัณฑ์</h3>
          <Box
            sx={{
              display: 'flex',  // Set display to flex
              flexDirection: 'column',  // Align items in a row,

              // Center items in Y axis,
            }}>
            <TextField onChange={(e) => { fetchData(e) }} id="regitnumber" variant="outlined" label="เลขที่จดแจ้ง" style={{ width: "50%", margin: "10px 0 0 0"  }} />
          </Box>

          <Box>
            <TextField id="comName" label="ชื่อทางการค้า" style={{ width: "50%", margin: "10px 0 0 0" }} />
          </Box>

          <Box>
            <TextField id="cosName" label="ชื่อเครื่องสำอาง" style={{ width: "50%", margin: "10px 0 0 0"}} />
          </Box>

          <Box >
            <TextField id="typeGoods" label="ประเภทของเครื่องสำอาง" style={{ width: "50%", margin: "10px 0 0 0" }} />
          </Box>

          <Box >
            <TextField id="dateS" type="date" label="วันที่แจ้งจดแจ้ง" InputLabelProps={{ shrink: true }}  style={{ width: "50%", margin: "10px 0 0 0"}} />

          </Box>

          <Box>
            <TextField id="expDate" type="date" InputLabelProps={{ shrink: true }} label="วันที่ใบอนุญาตหมดอายุ" style={{ width: "50%", margin: "10px 0 0 0" }} />

          </Box>
          <Box >
            <TextField id="objGoods" label="จุดประสงค์การใช้" style={{ width: "50%", margin: "10px 0 0 0" }} />
          </Box>

          <Box>
            <TextField id="py" label="ลักษณะทางกายภาพ" style={{ width: "50%", margin: "10px 0 0 0" }} />
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


        </Box>

        <Box sx={{
          textAlign: { xs: "center", md: "center" },

        }}>
        <Button  type="submit"
          textAlign="center"

        onClick={() => sendData()} variant="contained" color="success">
          บันทึก
        </Button>
        </Box>
        <Footer />

        </>
  )
}


export default createByfda
