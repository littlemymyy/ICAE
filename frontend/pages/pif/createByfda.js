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

  const [imageName , setImageName] = useState("")

  // Handle the selected image file
  const handleImageChange = (event) => {
    let file = event.target.files[0];
    console.log(file)
    // alert(file.type)
    let str = file.type
    let n = str.indexOf("/")
    str = str.substring(n+1)
    // alert(str)
    let blob = file.slice(0, file.size, file.type);
    let newFile = new File([blob], fda_num+"."+str, {type: file.type});
    setImageName(fda_num+"."+str)
    console.log(newFile)
    setImageFile(newFile);
  };

  // Trigger the hidden file input
  // const handleButtonClick = () => {
  //   document.getElementById('fileInput').click();
  // };



  // get email from session
  useEffect(() => {
    let userData = localStorage.getItem("uemail");
    let orid = localStorage.getItem("orid")
    setId(orid)
    setEmail(userData)


  }, [])


  //Get Data from Fda
  const fetchData = async (e) => {
    setfda_num(e.target.value)
    console.log( e);
    let num = e.target.value
    const res = await Axios({
      url: "http://localhost:3001/api/fetchData",
      method: "get",
      params: {
        data: e.target.value,
      }
    })
      .then((res) => {

        // let arr = res.data[2].split("-")
        // let fda_no = ""
        // for(let i=0 ;i < arr.lenght ; i++){
        //   fda_no += arr[i]
        // }

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
          document.getElementById("dateS").value = res.data[7]

          document.getElementById("expDate-label").className = updatedLabel
          document.getElementById("expDate").value = res.data[8]

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

  const sendData = () => {
    let dd = data[0];
    //dd["photo"] = imageName;
    console.log(dd);

    const formData = new FormData();
    formData.append('image', imageFile);

    const fetchData = async () => {
      try {
        // const res = await Axios.post('http://localhost:3001/api/submitPif', formData, {

        // });
        // console.log(res.data);

        const res1 = await Axios.post("http://localhost:3001/api/storageProduct", dd);

        if (res1.data) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "บันทึกเรียบร้อย",
            showConfirmButton: false,
            timer: 1500
          });
          router.push("/pif/productslist");
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
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
            <TextField id="dateS" label="วันที่แจ้งจดแจ้ง" style={{ width: "50%", margin: "10px 0 0 0"}} />

          </Box>

          <Box>
            <TextField id="expDate" label="วันที่ใบอนุญาตหมดอายุ" style={{ width: "50%", margin: "10px 0 0 0" }} />

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
