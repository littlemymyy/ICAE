import React, { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/Footer";
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import { Box, TextField, Typography, Button } from "@mui/material";
import Axios from "axios";
import CancelIcon from '@mui/icons-material/Cancel';
import { useRouter } from "next/router";
import Swal from "sweetalert2";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));


const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

export default function manage() {
  const [expanded, setExpanded] = React.useState('panel1');
  const router = useRouter()
  const {product_id} = router.query
  const [product_data, setProductData] = useState([]);
  const [pif_data, setPifData] = useState([]);
  const [filename, setFilename] = useState('');
  const [img_path, setImgPath] = useState('');

  useEffect(() => {
    var userData = sessionStorage.getItem("uemail");
    console.log("product_id = " + product_id);
      Axios.request(
          {
              method: 'get',
              url: process.env.NEXT_PUBLIC_API_BASE_URL+'/getPifProductByID?id=' + product_id,
              headers: { },
              data : ''
          }
      ).then((response) => {
          let data = JSON.stringify(response.data.message)
          if (response.data.status === "ok"){
            setProductData(response.data.message);
            console.log(response.data.message)
            setFirstData(response.data.message[0]);
          }
          else {
            router.push("/pif/productslist")
          }
      }).catch((error) => {
          console.log(error);
          router.push("/pif/productslist")
      }
      )

      //for pif data (include file)
      Axios.request(
        {
            method: 'get',
            url: process.env.NEXT_PUBLIC_API_BASE_URL+'/getPifByID?product_id=' + product_id,
            headers: { },
            data : ''
        }
    ).then((response) => {
        if (response.data.status === "ok"){
          let resData = JSON.parse(JSON.stringify(response.data.message[0]))
          console.log(resData)

          // setPifData(resData);
          document.getElementById("expdate").value =  convertDate(resData.expdate)
          setFilename(resData.file_name)

          document.getElementById("filename").value = resData.file_name

          if (resData.img_path !== null){
            setImgPath(process.env.NEXT_PUBLIC_API_BASE_URL1 + resData.img_path)
            document.getElementById("photo").innerHTML = fullFilePath(resData.img_path)
          }

          for(let i = 0; i < 14; i++){
            console.log(resData.file1_path)
            if(resData["file"+(i+1)+"_path"] !== null){
              displayOldFile("file"+(i+1), resData["file"+(i+1)+"_path"], resData["file"+(i+1)+"_exp"])
            }
          }
        }else if (response.data.message === "No data found"){
          console.log("No data pif found")
        }else{
          console.log("error")
          // router.push("/pif/productslist")
        }
    }).catch((error) => {
      // router.push("/pif/productslist")
    }
    )
  }, [product_id]);

  const setFirstData = async (e) => {
    const updatedLabel = "MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiInputLabel-sizeMedium MuiInputLabel-outlined MuiFormLabel-colorPrimary MuiFormLabel-filled MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiInputLabel-sizeMedium MuiInputLabel-outlined css-1jy569b-MuiFormLabel-root-MuiInputLabel-root";

    document.getElementById("regitnumber-label").className = updatedLabel
    document.getElementById("regitnumber").value = e.fda_license

    document.getElementById("comName-label").className = updatedLabel
    document.getElementById("comName").value = e.product_name

    document.getElementById("cosName-label").className = updatedLabel
    document.getElementById("cosName").value = e.cosmetic_name

    document.getElementById("typeGoods-label").className = updatedLabel
    document.getElementById("typeGoods").value = e.cosmetic_type

    document.getElementById("dateS-label").className = updatedLabel
    document.getElementById("dateS").value = new Date(e.create_date).toISOString().slice(0, 10)

    document.getElementById("expDate-label").className = updatedLabel
    document.getElementById("expDate").value = new Date(e.expire_date).toISOString().slice(0, 10)

    document.getElementById("objGoods-label").className = updatedLabel
    document.getElementById("objGoods").value = e.cosmetic_reason

    document.getElementById("py-label").className = updatedLabel
    document.getElementById("py").value = e.cosmetic_physical

    document.getElementById("entrepreneur-label").className = updatedLabel
    document.getElementById("entrepreneur").value = e.company_name

    document.getElementById("fentrepreneur-label").className = updatedLabel
    document.getElementById("fentrepreneur").value = e.company_eng_name

    document.getElementById("des-label").className = updatedLabel
    document.getElementById("des").value = e.more_info
  }

  const fetchData = async (e) => {
    console.log("e = " + e);
    const res = await Axios({
      url: process.env.NEXT_PUBLIC_API_BASE_URL+"/fetchData",
      method: "get",
      params: {
        data: e.target.value,
      }
    })
      .then((res) => {

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
        }


      })
      .catch((error) => {
        console.log(error);
      });
  }

  const convertDate = (input) => {
    let date = new Date(input);
    // Format to yyyy-mm-dd
    let month = ('0' + (date.getMonth() + 1)).slice(-2);

    let day = ('0' + date.getDate()).slice(-2);

    let year = date.getFullYear();
    let newDate = [year, month, day].join('-');
    return newDate;
  }

  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);
  const [file3, setFile3] = useState(null);
  const [file4, setFile4] = useState(null);
  const [file5, setFile5] = useState(null);
  const [file6, setFile6] = useState(null);
  const [file7, setFile7] = useState(null);
  const [file8, setFile8] = useState(null);
  const [file9, setFile9] = useState(null);
  const [file10, setFile10] = useState(null);
  const [file11, setFile11] = useState(null);
  const [file12, setFile12] = useState(null);
  const [file13, setFile13] = useState(null);
  const [file14, setFile14] = useState(null);
  const [photo, setFilePhoto] = useState(null);

  const [pdfFile1, setPdfFile1] = useState('');
  const [pdfFile2, setPdfFile2] = useState('');
  const [pdfFile3, setPdfFile3] = useState('');
  const [pdfFile4, setPdfFile4] = useState('');
  const [pdfFile5, setPdfFile5] = useState('');
  const [pdfFile6, setPdfFile6] = useState('');
  const [pdfFile7, setPdfFile7] = useState('');
  const [pdfFile8, setPdfFile8] = useState('');
  const [pdfFile9, setPdfFile9] = useState('');
  const [pdfFile10, setPdfFile10] = useState('');
  const [pdfFile11, setPdfFile11] = useState('');
  const [pdfFile12, setPdfFile12] = useState('');
  const [pdfFile13, setPdfFile13] = useState('');
  const [pdfFile14, setPdfFile14] = useState('');

  const fullFilePath = (filePath) => {
    let splitParts = filePath.split("-")
    let resultString = splitParts.slice(1).join('-');
    return resultString
  }

  const displayOldFile = (inputName, filePath, expDate) => {
    let baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL1
    console.log(inputName);

    document.getElementById(inputName).innerHTML = fullFilePath(filePath)

    switch (inputName) {
      case 'file1':
        setPdfFile1(baseUrl+filePath);
        document.getElementById("del1").style.display = "block";
        if (expDate !== null){
          document.getElementById("file1_exp").value = convertDate(expDate)
        }
        console.log("expDate = " + expDate)
        break;
      case 'file2':
        setPdfFile2(baseUrl+filePath);
        document.getElementById("del2").style.display = "block";
        if (expDate !== null){
        document.getElementById("file2_exp").value = convertDate(expDate)
        }
        break;
      case 'file3':
        setPdfFile3(baseUrl+filePath);
        document.getElementById("del3").style.display = "block";
        if (expDate !== null){
        document.getElementById("file3_exp").value = convertDate(expDate)
        }
        break;
      case 'file4':
        setPdfFile4(baseUrl+filePath);
        document.getElementById("del4").style.display = "block";
        if (expDate !== null){
        document.getElementById("file4_exp").value = convertDate(expDate)
        }
        break;
      case 'file5':
        setPdfFile5(baseUrl+filePath);
        document.getElementById("del5").style.display = "block";
        if (expDate !== null){
        document.getElementById("file5_exp").value = convertDate(expDate)
        }
        break;
      case 'file6':
        setPdfFile6(baseUrl+filePath);
        document.getElementById("del6").style.display = "block";
        if (expDate !== null){
        document.getElementById("file6_exp").value = convertDate(expDate)
        }
        break;
      case 'file7':
        setPdfFile7(baseUrl+filePath);
        document.getElementById("del7").style.display = "block";
        if (expDate !== null){
        document.getElementById("file7_exp").value = convertDate(expDate)
        }
        break;
      case 'file8':
        setPdfFile8(baseUrl+filePath);
        document.getElementById("del8").style.display = "block";
        if (expDate !== null){
        document.getElementById("file8_exp").value = convertDate(expDate)
        }
        break;
      case 'file9':
        setPdfFile9(baseUrl+filePath);
        document.getElementById("del9").style.display = "block";
        if (expDate !== null){
        document.getElementById("file9_exp").value = convertDate(expDate)
        }
        break;
      case 'file10':
        setPdfFile10(baseUrl+filePath);
        document.getElementById("del10").style.display = "block";
        if (expDate !== null){
        document.getElementById("file10_exp").value = convertDate(expDate)
        }
        break;
      case 'file11':
        setPdfFile11(baseUrl+filePath);
        document.getElementById("del11").style.display = "block";
        if (expDate !== null){
        document.getElementById("file11_exp").value = convertDate(expDate)
        }
        break;
      case 'file12':
        setPdfFile12(baseUrl+filePath);
        document.getElementById("del12").style.display = "block";
        if (expDate !== null){
        document.getElementById("file12_exp").value = convertDate(expDate)
        }
        break;
      case 'file13':
        setPdfFile13(baseUrl+filePath);
        document.getElementById("del13").style.display = "block";
        if (expDate !== null){
        document.getElementById("file13_exp").value = convertDate(expDate)
        }
        break;
      case 'file14':
        setPdfFile14(baseUrl+filePath);
        document.getElementById("del14").style.display = "block";
        if (expDate !== null){
        document.getElementById("file14_exp").value = convertDate(expDate)
        }
        break;
      // Add more cases for additional inputs
      default:
        break;
    }
  };

  const handleFileChange = (inputName, event) => {
    const file = event.target.files[0];
    console.log(inputName);
    document.getElementById(inputName).innerHTML = event.target.files[0].name

    switch (inputName) {
      case 'file1':
        setFile1(file);
        setPdfFile1(URL.createObjectURL(file));
        document.getElementById("del1").style.display = "block";
        break;
      case 'file2':
        setFile2(file);
        setPdfFile2(URL.createObjectURL(file));
        document.getElementById("del2").style.display = "block";
        break;
      case 'file3':
        setFile3(file);
        setPdfFile3(URL.createObjectURL(file));
        document.getElementById("del3").style.display = "block";
        break;
      case 'file4':
        setFile4(file);
        setPdfFile4(URL.createObjectURL(file));
        document.getElementById("del4").style.display = "block";
        break;
      case 'file5':
        setFile5(file);
        setPdfFile5(URL.createObjectURL(file));
        document.getElementById("del5").style.display = "block";
        break;
      case 'file6':
        setFile6(file);
        setPdfFile6(URL.createObjectURL(file));
        document.getElementById("del6").style.display = "block";
        break;
      case 'file7':
        setFile7(file);
        setPdfFile7(URL.createObjectURL(file));
        document.getElementById("del7").style.display = "block";
        break;
      case 'file8':
        setFile8(file);
        setPdfFile8(URL.createObjectURL(file));
        document.getElementById("del8").style.display = "block";
        break;
      case 'file9':
        setFile9(file);
        setPdfFile9(URL.createObjectURL(file));
        document.getElementById("del9").style.display = "block";
        break;
      case 'file10':
        setFile10(file);
        setPdfFile10(URL.createObjectURL(file));
        document.getElementById("del10").style.display = "block";
        break;
      case 'file11':
        setFile11(file);
        setPdfFile11(URL.createObjectURL(file));
        document.getElementById("del11").style.display = "block";
        break;
      case 'file12':
        setFile12(file);
        setPdfFile12(URL.createObjectURL(file));
        document.getElementById("del12").style.display = "block";
        break;
      case 'file13':
        setFile13(file);
        setPdfFile13(URL.createObjectURL(file));
        document.getElementById("del13").style.display = "block";
        break;
      case 'file14':
        setFile14(file);
        setPdfFile14(URL.createObjectURL(file));
        document.getElementById("del14").style.display = "block";
        break;
      case 'photo':
        setFilePhoto(file);
        setImgPath(URL.createObjectURL(file));
        break;
      // Add more cases for additional inputs
      default:
        break;
    }
  };

  const handleRemoveFile = (inputName) => {
    //input name is stateVariable name and then clear variable is = inputName
    switch (inputName) {
      case 'file1':
        setFile1(null);
        setPdfFile1('');
        document.getElementById("file1").innerHTML = "ไม่ได้เลือกไฟล์ใด";
        document.getElementById("del1").style.display = "none";
        break;
      case 'file2':
        setFile2(null);
        setPdfFile2('');
        document.getElementById("file2").innerHTML = "ไม่ได้เลือกไฟล์ใด";
        document.getElementById("del2").style.display = "none";
        break;
      case 'file3':
        setFile3(null);
        setPdfFile3('');
        document.getElementById("file3").innerHTML = "ไม่ได้เลือกไฟล์ใด";
        document.getElementById("del3").style.display = "none";
        break;
      case 'file4':
        setFile4(null);
        setPdfFile4('');
        document.getElementById("file4").innerHTML = "ไม่ได้เลือกไฟล์ใด";
        document.getElementById("del4").style.display = "none";
        break;
      case 'file5':
        setFile5(null);
        setPdfFile5('');
        document.getElementById("file5").innerHTML = "ไม่ได้เลือกไฟล์ใด";
        document.getElementById("del5").style.display = "none";
        break;
      case 'file6':
        setFile6(null);
        setPdfFile6('');
        document.getElementById("file6").innerHTML = "ไม่ได้เลือกไฟล์ใด";
        document.getElementById("del6").style.display = "none";
        break;
      case 'file7':
        setFile7(null);
        setPdfFile7('');
        document.getElementById("file7").innerHTML = "ไม่ได้เลือกไฟล์ใด";
        document.getElementById("del7").style.display = "none";
        break;
      case 'file8':
        setFile8(null);
        setPdfFile8('');
        document.getElementById("file8").innerHTML = "ไม่ได้เลือกไฟล์ใด";
        document.getElementById("del8").style.display = "none";
        break;
      case 'file9':
        setFile9(null);
        setPdfFile9('');
        document.getElementById("file9").innerHTML = "ไม่ได้เลือกไฟล์ใด";
        document.getElementById("del9").style.display = "none";
        break;
      case 'file10':
        setFile10(null);
        setPdfFile10('');
        document.getElementById("file10").innerHTML = "ไม่ได้เลือกไฟล์ใด";
        document.getElementById("del10").style.display = "none";
        break;
      case 'file11':
        setFile11(null);
        setPdfFile10('');
        document.getElementById("file11").innerHTML = "ไม่ได้เลือกไฟล์ใด";
        document.getElementById("del11").style.display = "none";
        break;
      case 'file12':
          setFile12(null);
          setPdfFile12('');
          document.getElementById("file12").innerHTML = "ไม่ได้เลือกไฟล์ใด";
          document.getElementById("del12").style.display = "none";
          break;
        case 'file13':
          setFile13(null);
          setPdfFile13('');
          document.getElementById("file13").innerHTML = "ไม่ได้เลือกไฟล์ใด";
          document.getElementById("del13").style.display = "none";
          break;
        case 'file14':
          setFile14(null);
          setPdfFile14('');
          document.getElementById("file14").innerHTML = "ไม่ได้เลือกไฟล์ใด";
          document.getElementById("del14").style.display = "none";
          break;
    }
  }

  const saveOnly = async (e) => {
    console.log("SAVE ONLY")
    Axios.get(process.env.NEXT_PUBLIC_API_BASE_URL+'/getStatusByEmail?email=' + localStorage.getItem("uemail"))
    .then((response) => {
      if (response.data.status === "ok"){
        console.log(response.data.message[0].status)
        if (response.data.message[0].status === "U2" || response.data.message[0].status === "U"){
          Swal.fire({
            icon: 'error',
            title: 'ไม่สามารถบันทึกข้อมูลได้',
            text: 'ผู้ใช้งานไม่มีสิทธิ์ในการบันทึกข้อมูล'
          })
        }
        else{
          saveOnlyBatch(e);
        }
      }
      else{
        console.log("error")
        Swal.fire({
          icon: 'error',
          title: 'ไม่สามารถบันทึกข้อมูลได้',
          text: 'เกิดข้อผิดพลาดในการบันทึกข้อมูล'
        })
      }
    }).catch((error) => {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'ไม่สามารถบันทึกข้อมูลได้',
        text: 'เกิดข้อผิดพลาดในการบันทึกข้อมูล'
      })
    })
  }

  const saveOnlyBatch = async (e) => {
    if (document.getElementById("filename").value === "") {
      Swal.fire({
        icon: 'error',
        title: 'กรุณากรอกชื่อผลิตภัณฑ์',
      })
      return;
    }else if(document.getElementById("expdate").value === ""){
      Swal.fire({
        icon: 'error',
        title: 'กรุณากรอกวันหมดอายุของเอกสาร',
      })
      return;
    }

    let data = JSON.stringify({
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
      "more_info": document.getElementById("des").value,

      //generic data
      "expdate": document.getElementById("expdate").value,
      "file_name": document.getElementById("filename").value,
      "email": localStorage.getItem("uemail"),
      "product_id": product_id,
      "pif_status": 1,

      //file_exp
      "file1_exp" : document.getElementById("file1_exp").value,
      "file2_exp" : document.getElementById("file2_exp").value,
      "file3_exp" : document.getElementById("file3_exp").value,
      "file4_exp" : document.getElementById("file4_exp").value,
      "file5_exp" : document.getElementById("file5_exp").value,
      "file6_exp" : document.getElementById("file6_exp").value,
      "file7_exp" : document.getElementById("file7_exp").value,
      "file8_exp" : document.getElementById("file8_exp").value,
      "file9_exp" : document.getElementById("file9_exp").value,
      "file10_exp" : document.getElementById("file10_exp").value,
      "file11_exp" : document.getElementById("file11_exp").value,
      "file12_exp" : document.getElementById("file12_exp").value,
      "file13_exp" : document.getElementById("file13_exp").value,
      "file14_exp" : document.getElementById("file14_exp").value,

      //check old pdf has removed
      "pdfFile1" : pdfFile1,
      "pdfFile2" : pdfFile2,
      "pdfFile3" : pdfFile3,
      "pdfFile4" : pdfFile4,
      "pdfFile5" : pdfFile5,
      "pdfFile6" : pdfFile6,
      "pdfFile7" : pdfFile7,
      "pdfFile8" : pdfFile8,
      "pdfFile9" : pdfFile9,
      "pdfFile10" : pdfFile10,
      "pdfFile11" : pdfFile11,
      "pdfFile12" : pdfFile12,
      "pdfFile13" : pdfFile13,
      "pdfFile14" : pdfFile14,

    });

    //for upload file
    const formData = new FormData();

    file1 && formData.append('file1', file1);
    file2 && formData.append('file2', file2);
    file3 && formData.append('file3', file3);
    file4 && formData.append('file4', file4);
    file5 && formData.append('file5', file5);
    file6 && formData.append('file6', file6);
    file7 && formData.append('file7', file7);
    file8 && formData.append('file8', file8);
    file9 && formData.append('file9', file9);
    file10 && formData.append('file10', file10);
    file11 && formData.append('file11', file11);
    file12 && formData.append('file12', file12);
    file13 && formData.append('file13', file13);
    file14 && formData.append('file14', file14);
    formData.append('data', data);
    photo && formData.append('photo', photo);
    // file3 && formData.append('file3', file3);

    console.log(data)

    try {
      const response = await Axios.post(process.env.NEXT_PUBLIC_API_BASE_URL+'/savePdf', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        data: data
      })
      .then (res => {
        console.log(res);
        if (res.data === "latest_ok") {
          Swal.fire({
            icon: 'success',
            title: 'บันทึกข้อมูลสำเร็จ',
          }).then(() => {
            router.push("/pif/productslist")
          })
        }
        else {
          Swal.fire({
            icon: 'error',
            title: 'บันทึกข้อมูลไม่สำเร็จ',
            text: 'บันทึกข้อมูลไม่สำเร็จ กรุณาลองใหม่อีกครั้ง'
          })
        }

      })
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'บันทึกข้อมูลไม่สำเร็จ',
        text: 'บันทึกข้อมูลไม่สำเร็จ กรุณาลองใหม่อีกครั้ง'
      }).then(() => {
        console.error('Error uploading files:', error);
      })
    }
  };

  const generatePDF = async (e) => {
    Axios.get(process.env.NEXT_PUBLIC_API_BASE_URL+'/getStatusByEmail?email=' + localStorage.getItem("uemail"))
    .then((response) => {
      if (response.data.status === "ok"){
        if (response.data.message[0].status === "U2" || response.data.message[0].status === "U"){
          Swal.fire({
            icon: 'error',
            title: 'ไม่สามารถบันทึกข้อมูลได้',
            text: 'ผู้ใช้งานไม่มีสิทธิ์ในการบันทึกข้อมูล'
          })
        }
        else {
          generatePDFBatch(e);
        }
      }
      else{
        console.log("error")
        Swal.fire({
          icon: 'error',
          title: 'ไม่สามารถบันทึกข้อมูลได้',
          text: 'เกิดข้อผิดพลาดในการบันทึกข้อมูล'
        })
      }
    }).catch((error) => {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'ไม่สามารถบันทึกข้อมูลได้',
        text: 'เกิดข้อผิดพลาดในการบันทึกข้อมูล'
      })
    })
  }


  const generatePDFBatch = async (e) => {
    if (document.getElementById("filename").value === "") {
      Swal.fire({
        icon: 'error',
        title: 'กรุณากรอกชื่อผลิตภัณฑ์',
      })
      return;
    }else if(document.getElementById("expdate").value === ""){
      Swal.fire({
        icon: 'error',
        title: 'กรุณากรอกวันหมดอายุของเอกสาร',
      })
      return;
    }

    let data = JSON.stringify({
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
      "more_info": document.getElementById("des").value,

      //generic data
      "expdate": document.getElementById("expdate").value,
      "file_name": document.getElementById("filename").value,
      "email": localStorage.getItem("uemail"),
      "product_id": product_id,
      "pif_status": 1,

      //file_exp
      "file1_exp" : document.getElementById("file1_exp").value,
      "file2_exp" : document.getElementById("file2_exp").value,
      "file3_exp" : document.getElementById("file3_exp").value,
      "file4_exp" : document.getElementById("file4_exp").value,
      "file5_exp" : document.getElementById("file5_exp").value,
      "file6_exp" : document.getElementById("file6_exp").value,
      "file7_exp" : document.getElementById("file7_exp").value,
      "file8_exp" : document.getElementById("file8_exp").value,
      "file9_exp" : document.getElementById("file9_exp").value,
      "file10_exp" : document.getElementById("file10_exp").value,
      "file11_exp" : document.getElementById("file11_exp").value,
      "file12_exp" : document.getElementById("file12_exp").value,
      "file13_exp" : document.getElementById("file13_exp").value,
      "file14_exp" : document.getElementById("file14_exp").value,

      //check old pdf has removed
      "pdfFile1" : pdfFile1,
      "pdfFile2" : pdfFile2,
      "pdfFile3" : pdfFile3,
      "pdfFile4" : pdfFile4,
      "pdfFile5" : pdfFile5,
      "pdfFile6" : pdfFile6,
      "pdfFile7" : pdfFile7,
      "pdfFile8" : pdfFile8,
      "pdfFile9" : pdfFile9,
      "pdfFile10" : pdfFile10,
      "pdfFile11" : pdfFile11,
      "pdfFile12" : pdfFile12,
      "pdfFile13" : pdfFile13,
      "pdfFile14" : pdfFile14,

    });

    //for upload file
    const formData = new FormData();

    file1 && formData.append('file1', file1);
    file2 && formData.append('file2', file2);
    file3 && formData.append('file3', file3);
    file4 && formData.append('file4', file4);
    file5 && formData.append('file5', file5);
    file6 && formData.append('file6', file6);
    file7 && formData.append('file7', file7);
    file8 && formData.append('file8', file8);
    file9 && formData.append('file9', file9);
    file10 && formData.append('file10', file10);
    file11 && formData.append('file11', file11);
    file12 && formData.append('file12', file12);
    file13 && formData.append('file13', file13);
    file14 && formData.append('file14', file14);
    formData.append('data', data);
    photo && formData.append('photo', photo);
    // file3 && formData.append('file3', file3);

    console.log(data)

    try {
      const response = await Axios.post(process.env.NEXT_PUBLIC_API_BASE_URL+'/savePdf', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        data: data
      })
      .then (res => {
        console.log(res);
        if (res.data === "latest_ok") {
          //create pdf
          Axios.request(process.env.NEXT_PUBLIC_API_BASE_URL+'/mergePdf', {
            method: 'post',
            data: {
              "product_id": product_id,
              "email": localStorage.getItem("uemail"),
            }
          }).then((response) => {
            if (response.data === "createdOk"){
              console.log("create pdf success")
              Swal.fire({
                icon: 'success',
                title: 'บันทึกและสร้างไฟล์ข้อมูลสำเร็จ',
              }).then(() => {
                router.push("/pif/showpif")
              })
            }else{
              console.log("create pdf fail")
              Swal.fire({
                icon: 'error',
                title: 'บันทึกข้อมูลไม่สำเร็จ',
                text: 'บันทึกข้อมูลไม่สำเร็จ กรุณาลองใหม่อีกครั้ง'
              })
            }
          })

          //end
        }
        else {
          Swal.fire({
            icon: 'error',
            title: 'บันทึกข้อมูลไม่สำเร็จ',
            text: 'บันทึกข้อมูลไม่สำเร็จ กรุณาลองใหม่อีกครั้ง'
          })
        }

      })
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'บันทึกข้อมูลไม่สำเร็จ',
        text: 'บันทึกข้อมูลไม่สำเร็จ กรุณาลองใหม่อีกครั้ง'
      }).then(() => {
        console.error('Error uploading files:', error);
      })
    }
  };

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };


  return (
    <>
      <Navbar />
      <Box className="home_Knowledge"
        sx={{
          backgroundColor: { xs: "#F8F8F8", md: "#F8F8F8" },
          justifyContent: { xs: "center", md: "center" },
          display: { xs: "block", md: "flex" },
          textAlign: { xs: "center", md: "center" },
          paddingBottom: { xs: "50px", md: "50px" },
        }}

      >
        <Box className="upload_left"
          sx={{

            justifyContent: { xs: "", md: "center" },
            display: { xs: "block", md: "flex" },
            paddingTop: { xs: "50px", md: "50px" }

          }}

        >
          <img src="/secret-file.png" style={{ maxWidth: 0 + "150px" }} />

        </Box>
        <Box className="upload_right"
          sx={{
            textAlign: { xs: 'center', md: "center" },
            justifyContent: { xs: "center", md: "center" }
          }}

        >
          <Typography variant="h3"
            sx={{
              marginTop: { xs: "100px", md: "100px" },
              marginLeft: { xs: "50px", md: "50px" }
            }}
          >ระบบจัดการ PIF</Typography>
        </Box>
      </Box>

      <Box className="pif1">
        <Typography variant="h6"
          sx={{
            marginTop: { xs: "20px", md: "20px" },
            marginLeft: { xs: "80px", md: "80px" }
          }}

        >
          จัดทำข้อมูลเกี่ยวกับเครื่องสำอาง (PRODUCTS INFORMATION FILE : PIF)
        </Typography>

        <Box
          sx={{
            justifyContent: { xs: "", md: "center" },
            display: { xs: "block", md: "flex" },
            textAlign: { xs: "center", md: "center" },
            paddingTop: { xs: "30px", md: "30px" },
          }}>

        </Box>

        <Box
          sx={{
            display: { xs: "block", md: "flex" },
            justifyContent: { xs: "", md: "center" },
            textAlign: { xs: "center", md: "center" },
            paddingTop: { xs: "30px", md: "30px" },
            paddingBottom: { xs: "10px", md: "10px" },
            gap: { xs: "50px", md: "50px" },
          }}
        >
          <Box>
            <Typography variant="h6">ชื่อผลิตภัณฑ์</Typography>
            {
              filename ?
                <TextField label="ชื่อผลิตภัณฑ์" id='filename' InputLabelProps={{ shrink: true }} />
                :
                <TextField label="ชื่อผลิตภัณฑ์" id='filename' onChange={(e) => {setFilename(e.target.value)}} InputLabelProps={{ shrink: false }} />
            }
          </Box>

          <Box>
            <Typography variant="h6">วันหมดอายุ</Typography>
            <TextField type="date" id='expdate' />
          </Box>
        </Box>

        <Box
          sx={{
            display: { xs: "grid", md: "grid" },
            justifyContent: { xs: "", md: "center" },
            textAlign: { xs: "center", md: "center" },
            paddingTop: { xs: "30px", md: "30px" },
            paddingBottom: { xs: "10px", md: "10px" },
          }}>

          <Typography variant="h6">รูปภาพผลิตภัณฑ์</Typography>
          {
              img_path ?
              <img src={img_path} style={{ maxWidth: 0 + "150px", margin: "auto" }} />
              :
              <img src="" style={{ display: "none" }} />
            }
          <Box style={{
                width: "100%",
                borderRadius: '5px',
                boxShadow: '0px 0px 3px 2px rgba(0, 0, 0, 0.25)',
                marginTop: "10px"
          }}>


            <Button width="80%" variant="contained" component="label">
              <input
                id="img_file"
                type="file"
                accept="image/png, image/gif, image/jpeg"
                onChange={(event) => handleFileChange('photo', event)}
                hidden
              />เลือกไฟล์
            </Button>

            <span id="photo" style={{ marginLeft: "5px", marginRight: "5px" }}>ไม่ได้เลือกไฟล์ใด</span>

          </Box>


        </Box>



        <Box sx={{


          justifyContent: { xs: "", md: "center" },
          textAlign: { xs: "center", md: "center" },
          display: { xs: "block", md: "flex" },

        }}>

        </Box>

        <Box sx={{ width: '100%', marginLeft: { xs: "80px", md: "80px" }, marginRight: { xs: "80px", md: "80px" }, marginTop: { xs: "30px", md: "30px" } }}>
          <h6>อัพโหลดเอกสารหรือกรอกข้อมูลเกี่ยวกับเครื่องสำอางในแต่ละส่วน</h6>
        </Box>

        <Box sx={{ width: '90%', marginLeft: { xs: "80px", md: "80px" }, marginRight: { xs: "80px", md: "80px" }, marginTop: { xs: "30px", md: "30px" } }}>
          <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
            <AccordionSummary>
              <Typography>อัพโหลดเอกสารหรือกรอกข้อมูล PIF ส่วนที่ 1</Typography>
            </AccordionSummary>
            <AccordionDetails


            >
              <Typography variant="h6">
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
                <TextField id="dateS" type="date" InputLabelProps={{ shrink: true }} label="วันที่แจ้งจดแจ้ง" style={{ width: "50%", marginTop: "10px" }} />
              </Box>

              <Box>
                <TextField id="expDate" type="date" InputLabelProps={{ shrink: true }} label="วันที่ใบอนุญาตหมดอายุ" style={{ width: "50%", marginTop: "10px" }}/>

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
              <hr></hr>
              <Typography variant="h6"
                sx={{
                  marginTop: { xs: "10px", md: "10px" },
                  maeginbottom: { xs: "10px", md: "10px" }
                }}

              >สำเนาใบรับจดแจ้งเครื่องสำอาง</Typography>
              <Box sx={{
                display: { xs: "", md: "table-caption" },

              }}>
                <Typography variant="h8" >วันหมดอายุของเอกสาร</Typography>
                <TextField type="date" id='file1_exp' />
              </Box>

              <embed src={pdfFile1} width="300px" height="450px" style={{display:pdfFile1===''? 'none' : 'block'}}/>

              <Box
                style={{

                  borderRadius: '5px',
                  boxShadow: '0px 0px 3px 2px rgba(0, 0, 0, 0.25)',
                  marginTop: "10px"

                }}>
                <Button
                  width="100%"
                  variant="contained"
                  component="label"
                  marginTop="10px"
                >
                  <input
                    id="filename1"
                    type="file"
                    onChange={(event) => handleFileChange('file1', event)}
                    accept="application/pdf"
                    hidden
                  />เลือกไฟล์


                </Button>

                <span  id="file1" style={{ marginLeft: "10px" }}>ไม่ได้เลือกไฟล์ใด


                </span>

                <CancelIcon  id="del1" onClick={() => handleRemoveFile('file1')}
                sx={{
                  fontSize: "20px",
                  float:'right',
                  marginTop:"7px",
                  marginRight:"15px",
                  color:"red",
                  display:"none"
              }} />

              </Box>


                <hr></hr>
              <Typography variant="h6"
                sx={{
                  marginTop: { xs: "10px", md: "10px" },
                  marginbottom: { xs: "10px", md: "10px" }
                }}

              >หนังสือยืนยันการเป็นเจ้าของเครื่องสำอาง /  Letter of Authorization </Typography>
               <Box sx={{
                display: { xs: "", md: "table-caption" },

              }}>
                <Typography variant="h8" >วันหมดอายุของเอกสาร</Typography>
                <TextField type="date" id='file2_exp' />
              </Box>

              <embed src={pdfFile2} width="300px" height="450px" style={{display:pdfFile2===''? 'none' : 'block'}}/>

              <Box
                style={{
                  borderRadius: '5px',
                  boxShadow: '0px 0px 3px 2px rgba(0, 0, 0, 0.25)',
                  marginTop: "10px"
                }}>
                <Button
                  variant="contained"
                  component="label"
                >
                  <input
                    id="filename2"
                    type="file"
                    onChange={(event) => handleFileChange('file2', event)}
                    accept="application/pdf"
                    hidden
                  />เลือกไฟล์
                </Button>
                <span id="file2" style={{ marginLeft: "10px" }}>ไม่ได้เลือกไฟล์ใด</span>
                <CancelIcon id="del2" onClick={() => handleRemoveFile('file2')}
                sx={{
                  fontSize: "20px",
                  float:'right',
                  marginTop:"7px",
                  marginRight:"15px",
                  color:"red",
                  display:"none"
                }}/>

              </Box>
              <hr></hr>

              <Typography variant="h6">
                2. สูตรส่วนประกอบของเครื่องสำอาง
              </Typography>
              <Box sx={{
                display: { xs: "", md: "table-caption" },

              }}>
                <Typography variant="h8" >วันหมดอายุของเอกสาร</Typography>
                <TextField type="date" id='file3_exp' />
              </Box>



              <embed src={pdfFile3} width="300px" height="450px" style={{display:pdfFile3===''? 'none' : 'block'}}/>


              <Box
                style={{
                  borderRadius: '5px',
                  boxShadow: '0px 0px 3px 2px rgba(0, 0, 0, 0.25)',
                  marginTop: "10px"
                }}>
                <Button
                  variant="contained"
                  component="label"
                >
                  <input
                    id="filename3"
                    type="file"
                    onChange={(event) => handleFileChange('file3', event)}
                    accept="application/pdf"
                    hidden
                  />เลือกไฟล์
                </Button>
                <span id="file3" style={{ marginLeft: "10px" }}>ไม่ได้เลือกไฟล์ใด</span>
                <CancelIcon  id="del3" onClick={() => handleRemoveFile('file3')}
                sx={{
                  fontSize: "20px",
                  float:'right',
                  marginTop:"7px",
                  marginRight:"15px",
                  color:"red",
                  display:"none"
                }}/>


              </Box>

              <hr></hr>
              <Typography variant="h6">3. ฉลากเครื่องสำอาง</Typography>
              <Box sx={{
                display: { xs: "", md: "table-caption" },

              }}>
                <Typography variant="h8" >วันหมดอายุของเอกสาร</Typography>
                <TextField type="date" id='file4_exp' />
              </Box>


              <embed src={pdfFile4} width="300px" height="450px" style={{display:pdfFile4===''? 'none' : 'block'}}/>

              <Box
                style={{
                  borderRadius: '5px',
                  boxShadow: '0px 0px 3px 2px rgba(0, 0, 0, 0.25)',
                  marginTop: "10px"
                }}>
                <Button
                  variant="contained"
                  component="label"
                >
                  <input
                    id="filename4"
                    type="file"
                    onChange={(event) => handleFileChange('file4', event)}
                    accept="application/pdf"
                    hidden
                  />เลือกไฟล์
                </Button>
                <span id="file4" style={{ marginLeft: "10px" }}>ไม่ได้เลือกไฟล์ใด</span>
                <CancelIcon  id="del4" onClick={() => handleRemoveFile('file4')}
                sx={{
                  fontSize: "20px",
                  float:'right',
                  marginTop:"7px",
                  marginRight:"15px",
                  color:"red",
                  display:"none"
                }}/>

              </Box>
              <hr></hr>

              <Typography variant="h6">
                4. ข้อมูลเกี่ยวกับการผลิต
              </Typography>

              <Typography variant="h6"
                sx={{
                  marginTop: { xs: "10px", md: "10px" },
                  maeginbottom: { xs: "10px", md: "10px" }
                }}

              >ข้อมูลการผลิต</Typography>
               <Box sx={{
                display: { xs: "", md: "table-caption" },

              }}>
                <Typography variant="h8" >วันหมดอายุของเอกสาร</Typography>
                <TextField type="date" id='file5_exp' />
              </Box>


              <embed src={pdfFile5} width="300px" height="450px" style={{display:pdfFile5===''? 'none' : 'block'}}/>

              <Box
                style={{
                  borderRadius: '5px',
                  boxShadow: '0px 0px 3px 2px rgba(0, 0, 0, 0.25)',
                  marginTop: "10px"
                }}>
                <Button
                  variant="contained"
                  component="label"
                >
                  <input
                    id="filename5"
                    type="file"
                    onChange={(event) => handleFileChange('file5', event)}
                    accept="application/pdf"
                    hidden
                  />เลือกไฟล์
                </Button>
                <span id="file5" style={{ marginLeft: "10px" }}>ไม่ได้เลือกไฟล์ใด</span>
                <CancelIcon  id="del5" onClick={() => handleRemoveFile('file5')}
                sx={{
                  fontSize: "20px",
                  float:'right',
                  marginTop:"7px",
                  marginRight:"15px",
                  color:"red",
                  display:"none"
                }}/>

              </Box>
                <hr></hr>
              <Typography variant="h6"
                sx={{
                  marginTop: { xs: "10px", md: "10px" },
                  maeginbottom: { xs: "10px", md: "10px" }
                }}

              >GMP / ISO</Typography>
               <Box sx={{
                display: { xs: "", md: "table-caption" },

              }}>
                <Typography variant="h8" >วันหมดอายุของเอกสาร</Typography>
                <TextField type="date" id='file6_exp' />
              </Box>


              <embed src={pdfFile6} width="300px" height="450px" style={{display:pdfFile6===''? 'none' : 'block'}}/>

              <Box
                style={{
                  borderRadius: '5px',
                  boxShadow: '0px 0px 3px 2px rgba(0, 0, 0, 0.25)',
                  marginTop: "10px"
                }}>
                <Button
                  variant="contained"
                  component="label"
                >
                  <input
                    id="filename6"
                    type="file"
                    onChange={(event) => handleFileChange('file6', event)}
                    accept="application/pdf"
                    hidden
                  />เลือกไฟล์
                </Button>
                <span id="file6" style={{ marginLeft: "10px" }}>ไม่ได้เลือกไฟล์ใด</span>
                <CancelIcon  id="del6" onClick={() => handleRemoveFile('file6')}
                sx={{
                  fontSize: "20px",
                  float:'right',
                  marginTop:"7px",
                  marginRight:"15px",
                  color:"red",
                  display:"none"
                }}/>

              </Box>
              <hr></hr>

              <Typography variant="h6">
                5.รายงานสรุปอาการอันไม่พึงประสงค์จากการใช้เครื่องสำอาง
              </Typography>
               <Box sx={{
                display: { xs: "", md: "table-caption" },

              }}>
                <Typography variant="h8" >วันหมดอายุของเอกสาร</Typography>
                <TextField type="date" id='file7_exp' />
              </Box>

              <embed src={pdfFile7} width="300px" height="450px" style={{display:pdfFile7===''? 'none' : 'block'}}/>


              <Box
                style={{
                  borderRadius: '5px',
                  boxShadow: '0px 0px 3px 2px rgba(0, 0, 0, 0.25)',
                  marginTop: "10px"
                }}>
                <Button
                  variant="contained"
                  component="label"
                >
                  <input
                    id="filename7"
                    type="file"
                    onChange={(event) => handleFileChange('file7', event)}
                    accept="application/pdf"
                    hidden
                  />เลือกไฟล์
                </Button>
                <span id="file7" style={{ marginLeft: "10px" }}>ไม่ได้เลือกไฟล์ใด</span>
                <CancelIcon  id="del7" onClick={() => handleRemoveFile('file7')}
                sx={{
                  fontSize: "20px",
                  float:'right',
                  marginTop:"7px",
                  marginRight:"15px",
                  color:"red",
                  display:"none"
                }}/>

              </Box>
              <hr></hr>

              <Typography variant="h6">
                6. การประเมินความสอดคล้องของการกล่าวอ้างสรรพคุณเครื่องสำอาง
              </Typography>
               <Box sx={{
                display: { xs: "", md: "table-caption" },

              }}>
                <Typography variant="h8" >วันหมดอายุของเอกสาร</Typography>
                <TextField type="date" id='file8_exp' />
              </Box>


              <embed src={pdfFile8} width="300px" height="450px" style={{display:pdfFile8===''? 'none' : 'block'}}/>


              <Box
                style={{
                  borderRadius: '5px',
                  boxShadow: '0px 0px 3px 2px rgba(0, 0, 0, 0.25)',
                  marginTop: "10px"
                }}>
                <Button
                  variant="contained"
                  component="label"
                >
                  <input
                    id="filename8"
                    type="file"
                    onChange={(event) => handleFileChange('file8', event)}
                    accept="application/pdf"
                    hidden
                  />เลือกไฟล์
                </Button>
                <span id="file8" style={{ marginLeft: "10px" }}>ไม่ได้เลือกไฟล์ใด</span>
                <CancelIcon  id="del8" onClick={() => handleRemoveFile('file8')}
                sx={{
                  fontSize: "20px",
                  float:'right',
                  marginTop:"7px",
                  marginRight:"15px",
                  color:"red",
                  display:"none"
                }}/>

              </Box>
            </AccordionDetails>
          </Accordion>

          <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
            <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
              <Typography >อัพโหลดเอกสารหรือกรอกข้อมูล PIF ส่วนที่ 2</Typography>
            </AccordionSummary>
            <AccordionDetails>

              <Typography variant="h6">
                1. ข้อกำหนดของวัตถุดิบ
              </Typography>
               <Box sx={{
                display: { xs: "", md: "table-caption" },

              }}>
                <Typography variant="h8" >วันหมดอายุของเอกสาร</Typography>
                <TextField type="date" id='file9_exp' />
              </Box>


              <embed src={pdfFile9} width="300px" height="450px" style={{display:pdfFile9===''? 'none' : 'block'}}/>


              <Box
                style={{
                  borderRadius: '5px',
                  boxShadow: '0px 0px 3px 2px rgba(0, 0, 0, 0.25)',
                  marginTop: "10px"
                }}>
                <Button
                  variant="contained"
                  component="label"
                >
                  <input
                    id="filename9"
                    type="file"
                    onChange={(event) => handleFileChange('file9', event)}
                    accept="application/pdf"
                    hidden
                  />เลือกไฟล์
                </Button>
                <span id="file9" style={{ marginLeft: "10px" }}>ไม่ได้เลือกไฟล์ใด</span>
                <CancelIcon id="del9" onClick={() => handleRemoveFile('file9')}
                sx={{
                  fontSize: "20px",
                  float:'right',
                  marginTop:"7px",
                  marginRight:"15px",
                  color:"red",
                  display:"none"
                }}/>

              </Box>

                <hr></hr>
              <Typography variant="h6" sx={{ marginTop: { xs: "10px", md: "10px" } }}>
                certificate of analysis (COA)
              </Typography>
               <Box sx={{
                display: { xs: "", md: "table-caption" },

              }}>
                <Typography variant="h8" >วันหมดอายุของเอกสาร</Typography>
                <TextField type="date" id='file10_exp' />
              </Box>


              <embed src= {pdfFile10} width="300px" height="450px" style={{display:pdfFile10===''? 'none' : 'block'}}/>


              <Box
                style={{
                  borderRadius: '5px',
                  boxShadow: '0px 0px 3px 2px rgba(0, 0, 0, 0.25)',
                  marginTop: "10px"
                }}>
                <Button
                  variant="contained"
                  component="label"
                >
                  <input
                    id="filename10"
                    type="file"
                    onChange={(event) => handleFileChange('file10', event)}
                    accept="application/pdf"
                    hidden
                  />เลือกไฟล์
                </Button>
                <span id="file10" style={{ marginLeft: "10px" }}>ไม่ได้เลือกไฟล์ใด</span>
                <CancelIcon  id="del10" onClick={() => handleRemoveFile('file10')}
                sx={{
                  fontSize: "20px",
                  float:'right',
                  marginTop:"7px",
                  marginRight:"15px",
                  color:"red",
                  display:"none"
                }}/>

              </Box>
              <hr></hr>

              <Typography variant="h6">
                2. ข้อมูลแสดงความปลอดภัยของวัตถุดิบทุกรายการ (Safety Data Sheet : SDS)
              </Typography>
               <Box sx={{
                display: { xs: "", md: "table-caption" },

              }}>
                <Typography variant="h8" >วันหมดอายุของเอกสาร</Typography>
                <TextField type="date" id='file11_exp' />
              </Box>

              <embed src={pdfFile11} width="300px" height="450px"style={{display:pdfFile11===''? 'none' : 'block'}} />


              <Box
                style={{
                  borderRadius: '5px',
                  boxShadow: '0px 0px 3px 2px rgba(0, 0, 0, 0.25)',
                  marginTop: "10px"
                }}>
                <Button
                  variant="contained"
                  component="label"
                >
                  <input
                    id="filename11"
                    type="file"
                    onChange={(event) => handleFileChange('file11', event)}
                    accept="application/pdf"
                    hidden
                  />เลือกไฟล์
                </Button>
                <span id="file11" style={{ marginLeft: "10px" }}>ไม่ได้เลือกไฟล์ใด</span>
                <CancelIcon  id="del11" onClick={() => handleRemoveFile('file11')}
                sx={{
                  fontSize: "20px",
                  float:'right',
                  marginTop:"7px",
                  marginRight:"15px",
                  color:"red",
                  display:"none"
                }}/>

              </Box>


            </AccordionDetails>
          </Accordion>
          <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
            <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
              <Typography>อัพโหลดเอกสารหรือกรอกข้อมูล PIF ส่วนที่ 3</Typography>
            </AccordionSummary>
            <AccordionDetails>

              <Typography variant="h6">1. สูตรแม่บท (Master formula)</Typography>
              <Box sx={{
                display: { xs: "", md: "table-caption" },

              }}>
                <Typography variant="h8" >วันหมดอายุของเอกสาร</Typography>
                <TextField type="date" id='file12_exp' />
              </Box>

              <embed src={pdfFile12} width="300px" height="450px" style={{display:pdfFile12===''? 'none' : 'block'}}/>

              <Box
                style={{
                  borderRadius: '5px',
                  boxShadow: '0px 0px 3px 2px rgba(0, 0, 0, 0.25)',
                  marginTop: "10px"
                }}>
                <Button
                  variant="contained"
                  component="label"
                >
                  <input
                    id="filename12"
                    type="file"
                    onChange={(event) => handleFileChange('file12', event)}
                    accept="application/pdf"
                    hidden
                  />เลือกไฟล์
                </Button>
                <span id="file12" style={{ marginLeft: "10px" }}>ไม่ได้เลือกไฟล์ใด</span>
                <CancelIcon  id="del12" onClick={() => handleRemoveFile('file12')}
                sx={{
                  fontSize: "20px",
                  float:'right',
                  marginTop:"7px",
                  marginRight:"15px",
                  color:"red",
                  display:"none"
                }}/>

              </Box>
              <hr></hr>

              <Typography variant="h6">2. ข้อกำหนดของเครื่องสำอางสำเร็จรูป (Specification of cosmetic finished product)</Typography>
              <Box sx={{
                display: { xs: "", md: "table-caption" },

              }}>
                <Typography variant="h8" >วันหมดอายุของเอกสาร</Typography>
                <TextField type="date" id='file13_exp' />
              </Box>

              <embed src={pdfFile13} width="300px" height="450px" style={{display:pdfFile13===''? 'none' : 'block'}} />

              <Box
                style={{
                  borderRadius: '5px',
                  boxShadow: '0px 0px 3px 2px rgba(0, 0, 0, 0.25)',
                  marginTop: "10px"
                }}>
                <Button
                  variant="contained"
                  component="label"
                >
                  <input
                    id="filename13"
                    type="file"
                    onChange={(event) => handleFileChange('file13', event)}
                    accept="application/pdf"
                    hidden
                  />เลือกไฟล์
                </Button>
                <span id="file13" style={{ marginLeft: "10px" }}>ไม่ได้เลือกไฟล์ใด</span>
                <CancelIcon  id="del13" onClick={() => handleRemoveFile('file13')}
                sx={{
                  fontSize: "20px",
                  float:'right',
                  marginTop:"7px",
                  marginRight:"15px",
                  color:"red",
                  display:"none"
                }}/>

              </Box>
              <hr></hr>

              <Typography variant="h6">3. วิธีการทดสอบเครื่องสำอางสำเร็จรูป (Testing method for cosmetic finished product) </Typography>
              <Box sx={{
                display: { xs: "", md: "table-caption" },

              }}>
                <Typography variant="h8" >วันหมดอายุของเอกสาร</Typography>
                <TextField type="date" id='file14_exp' />
              </Box>

              <embed src={pdfFile14} width="300px" height="450px" style={{display:pdfFile14===''? 'none' : 'block'}}/>


              <Box
                style={{
                  borderRadius: '5px',
                  boxShadow: '0px 0px 3px 2px rgba(0, 0, 0, 0.25)',
                  marginTop: "10px"
                }}>
                <Button
                  variant="contained"
                  component="label"
                >
                  <input
                    id="filename14"
                    type="file"
                    onChange={(event) => handleFileChange('file14', event)}
                    accept="application/pdf"
                    hidden
                  />เลือกไฟล์
                </Button>

                <span id="file14" style={{ marginLeft: "10px" }}>ไม่ได้เลือกไฟล์ใด</span>


                 <CancelIcon  id="del14" onClick={() => handleRemoveFile('file14')}
                sx={{
                  fontSize: "20px",
                  float:'right',
                  marginTop:"7px",
                  marginRight:"15px",
                  color:"red",
                  display:"none"
                }}/>

              </Box>

            </AccordionDetails>
          </Accordion>

        </Box>



      </Box>
    <Box sx={{
      display: { xs: "", md: "flex" },
      textAlign: { xs: "center", md: "center" },
      gap: { xs: "20px", md: "20px" },
      justifyContent: { xs: "", md: "center" },
    }}>
      <Box sx={{
        textAlign: { xs: "center", md: "center" },
      }}>
        <Button
          type="submit"
          textAlign="center"
          variant="contained"
          color="success"
          onClick={(e) => { saveOnly(e) }}

          sx={{ mt: 3, mb: 2 }}
        >
          บันทึก
        </Button>
        </Box>

      <Box sx={{
        textAlign: { xs: "center", md: "center" },
      }}>
        <Button
          type="submit"
          textAlign="center"
          variant="contained"
          color="success"
          onClick={(e) => { generatePDF(e) }}
          sx={{ mt: 3, mb: 2 }}
        >
         รวมข้อมูลและบันทึกเป็นไฟล์ PDF
        </Button>
      </Box>
    </Box>
      {/* <Button onClick={(e) => { generatePDF(e) }}>Generate PDF</Button> */}

      <Footer />
    </>
  )

}
