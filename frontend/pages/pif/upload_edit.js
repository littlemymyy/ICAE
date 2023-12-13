import React, { useState, useEffect, useRef } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/Footer";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import { Box, TextField, Typography, Button } from "@mui/material";
import Axios from "axios";
import { set } from "react-hook-form";
import ClearIcon from "@mui/icons-material/Clear";
import CloseIcon from "@mui/icons-material/Close";
import CancelIcon from "@mui/icons-material/Cancel";
import DatePicker from "react-datepicker";
import { useRouter } from "next/router";
import { FaFilePdf } from "react-icons/fa6";
import { GrDocumentTime } from "react-icons/gr";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

export default function manage() {
  const [expanded, setExpanded] = React.useState("panel1");
  const [fda_num, setFda_num] = useState("");
  const router = useRouter();

  //exp date All
  const [fdadoc_date, setFdadoc_date] = useState(null);
  const [letter_authorization_date, setLetter_authorization_date] =
    useState(null);
  const [formula_doc_date, setFormula_doc_date] = useState(null);
  const [label_doc_date, setLabel_doc_date] = useState(null);
  const [manufacture_doc_date, setManufacture_doc_date] = useState(null);
  const [gmp_iso_date, setGmp_iso] = useState(null);
  const [eff_report_date, setEff_report_date] = useState(null);
  const [efficient_report_date, setEfficient_report_date] = useState(null);
  const [sds_date, setSds_date] = useState(null);
  const [masterformula_date, setMasterformula_date] = useState(null);
  const [specification_date, setSpecification_date] = useState(null);
  const [testing_doc_date, setTesting_doc_date] = useState(null);
  const [coa, setCoa] = useState(null);
  const [fda, setFda] = useState("");
  const [data, setData] = useState([]);
  const [showData, setShowData] = useState(["", "","","","","","","","","","","","","",""]);
  const [showDate, setShowDate] = useState([0, 0 ,0,0,0,0,0,0,0,0,0,0,0]);
  const [change, setChange] = useState([0, 0 , 0 ,0,0,0,0,0,0,0,0,0,0,0]);

  let arr = [
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
  ]; //for update button click update file

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const fdaNo = searchParams.get("fdaNo");
    const getFda = async () => {
      const res0 = await Axios({
        url: "http://localhost:3001/api/fetchData",
        method: "get",
        params: {
          data: fdaNo,
        },
      });
      console.log(res0.data);
      showData[0] = res0.data[0];
      showData[1] = res0.data[1]
      showData[2] = res0.data[2]
      showData[3] = res0.data[3]
      showData[4] = res0.data[4]
      showData[5] = res0.data[5]
      showData[6] = res0.data[6]
      showData[7] = res0.data[7]
      showData[8] = res0.data[8]
      showData[9] = res0.data[9]
      showData[10] = res0.data[10]
      showData[11] = res0.data[11]
      showData[12] = res0.data[12]
      showData[13] = res0.data[13]
      showData[14] = res0.data[14]
      setShowData([...showData]);
    };
    getFda();
    var userData = sessionStorage.getItem("uemail");
    setFda(fdaNo);
    console.log(userData);
    console.log(fdaNo);

    const getdata = async () => {
      let load = {
        id: sessionStorage.getItem("orid"),
        fda: fdaNo,
      };
      const res = await Axios.post("http://localhost:3001/api/pifData", load);

     

      console.log("First");
      console.log(res.data);
      let newDate0 = new Date(res.data[0].fdadoc_date);
      let newDate1 = new Date(res.data[0].letter_authorization_date)
      let newDate2 = new Date(res.data[0].formula_doc_date)
      let newDate3 = new Date(res.data[0].label_doc_date)
      let newDate4 = new Date(res.data[0].manufacture_doc_date)
      let newDate5 = new Date(res.data[0].gmp_iso_date)
      let newDate6 = new Date(res.data[0].eff_report_date)
      let newDate7 = new Date(res.data[0].efficient_report_date)
      let newDate8 = new Date(res.data[0].sds_date)
      let newDate9 = new Date(res.data[0].masterformula_date)
      let newDate10 = new Date(res.data[0].specification_date)
      let newDate11 = new Date(res.data[0].testing_doc_date)
      let newDate12 = new Date(res.data[0].coa_date)

      let dateToCheck = new Date("Thu Nov 30 1899 00:00:00");

      if(newDate0  === dateToCheck.getTime() ){
          showDate[0] = "ไม่ได้มีการลงวันหมดอายุ";
          setShowDate([...showDate]);
      }
      else if(newDate1  === dateToCheck.getTime() ){
        showDate[1] = "ไม่ได้มีการลงวันหมดอายุ";
        setShowDate([...showDate]);
      }
      else if(newDate2  === dateToCheck.getTime() ){
        showDate[2] = "ไม่ได้มีการลงวันหมดอายุ";
        setShowDate([...showDate]);
      }
      else if(newDate3  === dateToCheck.getTime() ){
        showDate[3] = "ไม่ได้มีการลงวันหมดอายุ";
        setShowDate([...showDate]);
      }
      else if(newDate4  === dateToCheck.getTime() ){
        showDate[4] = "ไม่ได้มีการลงวันหมดอายุ";
        setShowDate([...showDate]);
      }
      else if(newDate5  === dateToCheck.getTime() ){
        showDate[5] = "ไม่ได้มีการลงวันหมดอายุ";
        setShowDate([...showDate]);
      }
      else if(newDate6  === dateToCheck.getTime() ){
        showDate[6] = "ไม่ได้มีการลงวันหมดอายุ";
        setShowDate([...showDate]);
      }
      else if(newDate7  === dateToCheck.getTime() ){
        showDate[7] = "ไม่ได้มีการลงวันหมดอายุ";
        setShowDate([...showDate]);
      }
      else if(newDate8  === dateToCheck.getTime() ){
        showDate[8] = "ไม่ได้มีการลงวันหมดอายุ";
        setShowDate([...showDate]);
      }
      else if(newDate9  === dateToCheck.getTime() ){
        showDate[9] = "ไม่ได้มีการลงวันหมดอายุ";
        setShowDate([...showDate]);
      }
      else if(newDate10  === dateToCheck.getTime() ){
        showDate[10] = "ไม่ได้มีการลงวันหมดอายุ";
        setShowDate([...showDate]);
      }
      else if(newDate11  === dateToCheck.getTime() ){
        showDate[11] = "ไม่ได้มีการลงวันหมดอายุ";
        setShowDate([...showDate]);
      }
      else if(newDate12  === dateToCheck.getTime() ){
        showDate[12] = "ไม่ได้มีการลงวันหมดอายุ";
        setShowDate([...showDate]);
      }
      else {
        let nowDate0 = new Date();
        let diff = [0,0,0,0,0,0,0,0,0,0,0,0,0]
  
        diff[0] = newDate0 - nowDate0;
        diff[1] = newDate1 - nowDate0;
        diff[2] = newDate2 - nowDate0;
        diff[3] = newDate3 - nowDate0;
        diff[4] = newDate4 - nowDate0;
        diff[5] = newDate5 - nowDate0;
        diff[6] = newDate6 - nowDate0;
        diff[7] = newDate7 - nowDate0;
        diff[8] = newDate8 - nowDate0;
        diff[9] = newDate9 - nowDate0;
        diff[10] = newDate10 - nowDate0;
        diff[11] = newDate11 - nowDate0;
        diff[12] = newDate12 - nowDate0;
        
        console.log("firsaat")
        console.log(newDate12)
        // for(let i = 0 ; i< 13 ;i++){
        //   console.log(diff[i])
        // }
       // console.log(diff[0])
       
        for(let i = 0 ; i<13 ; i++){
        
  
          if (diff[i] < 0) {
            console.log("หมดอาย6");
            showDate[i] = "หมดอายุแล้ว";
            setShowDate([...showDate]);
          } else {
            console.log("OK");
            showDate[i] = "ยังไม่หมดอายุ";
            setShowDate([...showDate]);
          }
      }
      }

      console.log(arr);
      setData(res.data);
      setPdfFile1('http://localhost:3001/'+res.data[0].fdadoc);
      setPdfFile2('http://localhost:3001/'+res.data[0].letter_authorization);
      setPdfFile3('http://localhost:3001/'+res.data[0].formula_doc);
      setPdfFile4('http://localhost:3001/'+res.data[0].label_doc);
      setPdfFile5('http://localhost:3001/'+res.data[0].manufacture_doc);
      setPdfFile6('http://localhost:3001/'+res.data[0].gmp_iso);
      setPdfFile7('http://localhost:3001/'+res.data[0].eff_report);
      setPdfFile8('http://localhost:3001/'+res.data[0].efficient_report);
      setPdfFile9('http://localhost:3001/'+res.data[0].spec);
      setPdfFile10('http://localhost:3001/'+res.data[0].coa);
      setPdfFile11('http://localhost:3001/'+res.data[0].sds )
      setPdfFile12('http://localhost:3001/'+res.data[0].masterformula)
      setPdfFile13('http://localhost:3001/'+res.data[0].specification)
      setPdfFile14('http://localhost:3001/'+res.data[0].testing_doc)

      //console.log(res.data)
    };
    getdata();
  }, []);

  // data from Thai FDA By Fda number
  const fetchData = async (e) => {
    console.log(fda);
    console.log("e = " + e);
    setFda_num(e.target.value);
    const res = await Axios({
      url: "http://localhost:3001/api/fetchData",
      method: "get",
      params: {
        data: e.target.value,
      },
    })
      .then((res) => {
        const updatedLabel =
          "MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiInputLabel-sizeMedium MuiInputLabel-outlined MuiFormLabel-colorPrimary MuiFormLabel-filled MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiInputLabel-sizeMedium MuiInputLabel-outlined css-1jy569b-MuiFormLabel-root-MuiInputLabel-root";

        if (res.data[0] == "N/A") {
          //do nothing
        } else {
          document.getElementById("comName-label").className = updatedLabel;
          document
            .getElementById("comName-label")
            .setAttribute("data-shrink", "true");
          document.getElementById("comName").value = res.data[5];

          document.getElementById("cosName-label").className = updatedLabel;
          document
            .getElementById("cosName-label")
            .setAttribute("data-shrink", "true");
          document.getElementById("cosName").value = res.data[6];

          document.getElementById("typeGoods-label").className = updatedLabel;
          document.getElementById("typeGoods").value = res.data[9];

          document.getElementById("dateS-label").className = updatedLabel;
          document.getElementById("dateS").value = res.data[7];

          document.getElementById("expDate-label").className = updatedLabel;
          document.getElementById("expDate").value = res.data[8];

          document.getElementById("objGoods-label").className = updatedLabel;
          document.getElementById("objGoods").value = res.data[11];

          document.getElementById("py-label").className = updatedLabel;
          document.getElementById("py").value = res.data[10];

          document.getElementById("entrepreneur-label").className =
            updatedLabel;
          document.getElementById("entrepreneur").value = res.data[13];

          document.getElementById("fentrepreneur-label").className =
            updatedLabel;
          document.getElementById("fentrepreneur").value = res.data[14];
          console.log(res.data);
          console.log(res.data[0]);
          setStatus(res.data[0]);
          setLocationStatus(res.data[1]);
          setTypeRegis(res.data[3]);
          setFormatRegis(res.data[4]);
          setComName(res.data[5]);
          setCosName(res.data[6]);
          setDateS(res.data[7]);
          setExpDate(res.data[8]);
          setTypeGoods(res.data[9]);
          setBodypart(res.data[10]);
          setObjGoods(res.data[11]);
          setEntrepreneur(res.data[13]);
          setConGoods(res.data[12]);
          setFentrepreneur(res.data[14]);
        }

        console.log("isFdaCoc");
        console.log(fdadoc_date);
      })
      .catch((error) => {
        console.log(error);
      });
  };

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

  const [pdfFile1, setPdfFile1] = useState("");
  const [pdfFile2, setPdfFile2] = useState("");
  const [pdfFile3, setPdfFile3] = useState("");
  const [pdfFile4, setPdfFile4] = useState("");
  const [pdfFile5, setPdfFile5] = useState("");
  const [pdfFile6, setPdfFile6] = useState("");
  const [pdfFile7, setPdfFile7] = useState("");
  const [pdfFile8, setPdfFile8] = useState("");
  const [pdfFile9, setPdfFile9] = useState("");
  const [pdfFile10, setPdfFile10] = useState("");
  const [pdfFile11, setPdfFile11] = useState("");
  const [pdfFile12, setPdfFile12] = useState("");
  const [pdfFile13, setPdfFile13] = useState("");
  const [pdfFile14, setPdfFile14] = useState("");

  const handleFileChange = (inputName, event) => {
    const file = event.target.files[0];
    console.log(inputName);
    document.getElementById(inputName).innerHTML = event.target.files[0].name;

    switch (inputName) {
      case "file1":
        setFile1(file);
        setPdfFile1(URL.createObjectURL(file));
        change[0] = 1;
        setChange([...change]);
        document.getElementById("del1").style.display = "block";
        break;
      case "file2":
        setFile2(file);
        setPdfFile2(URL.createObjectURL(file));
        change[1] = 1
        setChange([...change])
        document.getElementById("del2").style.display = "block";
        break;
      case "file3":
        setFile3(file);
        setPdfFile3(URL.createObjectURL(file));
        change[2] = 1
        setChange([...change])
        document.getElementById("del3").style.display = "block";
        break;
      case "file4":
        setFile4(file);
        setPdfFile4(URL.createObjectURL(file));
        change[3] = 1
        setChange([...change])
        document.getElementById("del4").style.display = "block";
        break;
      case "file5":
        setFile5(file);
        console.log('URL',URL.createObjectURL(file));
        setPdfFile5(URL.createObjectURL(file));
        change[4] = 1
        setChange[4] = 1
        setChange([...change])
        document.getElementById("del5").style.display = "block";
        break;
      case "file6":
        setFile6(file);
        setPdfFile6(URL.createObjectURL(file));
        change[5] = 1
        setChange[5] = 1
        setChange([...change])
        document.getElementById("del6").style.display = "block";
        break;
      case "file7":
        setFile7(file);
        setPdfFile7(URL.createObjectURL(file));
        change[6] = 1
        setChange[6] = 1
        setChange([...change])
        document.getElementById("del7").style.display = "block";
        break;
      case "file8":
        setFile8(file);
        setPdfFile8(URL.createObjectURL(file));
        change[7] = 1
        setChange[7] = 1
        setChange([...change])
        document.getElementById("del8").style.display = "block";
        break;
      case "file9":
        setFile9(file);
        setPdfFile9(URL.createObjectURL(file));
        change[8] = 1
        setChange[8] = 1
        setChange([...change])
        document.getElementById("del9").style.display = "block";
        break;
      case "file10":
        setFile10(file);
        setPdfFile10(URL.createObjectURL(file));
        change[9] = 1
        setChange[9] = 1
        setChange([...change])
        document.getElementById("del10").style.display = "block";
        break;
      case "file11":
        setFile11(file);
        setPdfFile11(URL.createObjectURL(file));
        change[10] = 1
        setChange[10] = 1
        setChange([...change])
        document.getElementById("del11").style.display = "block";
        break;
      case "file12":
        setFile12(file);
        setPdfFile12(URL.createObjectURL(file));
        change[11] = 1
        setChange[11] = 1
        setChange([...change])
        document.getElementById("del12").style.display = "block";
        break;
      case "file13":
        setFile13(file);
        setPdfFile13(URL.createObjectURL(file));
        change[12] = 1
        setChange[12] = 1
        setChange([...change])
        document.getElementById("del13").style.display = "block";
        break;
      case "file14":
        setFile14(file);
        setPdfFile14(URL.createObjectURL(file));
        change[13] = 1
        setChange[13] = 1
        setChange([...change])
        document.getElementById("del14").style.display = "block";
        break;
        // Photo
      case "photo":
        setFilePhoto(file);
        break;
      // Add more cases for additional inputs
      default:
        break;
    }
  };

  const handleRemoveFile = (inputName) => {
    //input name is stateVariable name and then clear variable is = inputName
    switch (inputName) {
      case "file1":
        setFile1(null);
        setPdfFile1("");
        document.getElementById("file1").innerHTML = "ไม่ได้เลือกไฟล์ใด";
        document.getElementById("del1").style.display = "none";
        break;
      case "file2":
        setFile2(null);
        setPdfFile2("");
        document.getElementById("file2").innerHTML = "ไม่ได้เลือกไฟล์ใด";
        document.getElementById("del2").style.display = "none";
        break;
      case "file3":
        setFile3(null);
        setPdfFile3("");
        document.getElementById("file3").innerHTML = "ไม่ได้เลือกไฟล์ใด";
        document.getElementById("del3").style.display = "none";
        break;
      case "file4":
        setFile4(null);
        setPdfFile4("");
        document.getElementById("file4").innerHTML = "ไม่ได้เลือกไฟล์ใด";
        document.getElementById("del4").style.display = "none";
        break;
      case "file5":
        setFile5(null);
        setPdfFile5("");
        document.getElementById("file5").innerHTML = "ไม่ได้เลือกไฟล์ใด";
        document.getElementById("del5").style.display = "none";
        break;
      case "file6":
        setFile6(null);
        setPdfFile6("");
        document.getElementById("file6").innerHTML = "ไม่ได้เลือกไฟล์ใด";
        document.getElementById("del6").style.display = "none";
        break;
      case "file7":
        setFile7(null);
        setPdfFile7("");
        document.getElementById("file7").innerHTML = "ไม่ได้เลือกไฟล์ใด";
        document.getElementById("del7").style.display = "none";
        break;
      case "file8":
        setFile8(null);
        setPdfFile8("");
        document.getElementById("file8").innerHTML = "ไม่ได้เลือกไฟล์ใด";
        document.getElementById("del8").style.display = "none";
        break;
      case "file9":
        setFile9(null);
        setPdfFile9("");
        document.getElementById("file9").innerHTML = "ไม่ได้เลือกไฟล์ใด";
        document.getElementById("del9").style.display = "none";
        break;
      case "file10":
        setFile10(null);
        setPdfFile10("");
        document.getElementById("file10").innerHTML = "ไม่ได้เลือกไฟล์ใด";
        document.getElementById("del10").style.display = "none";
        break;
      case "file11":
        setFile11(null);
        setPdfFile10("");
        document.getElementById("file11").innerHTML = "ไม่ได้เลือกไฟล์ใด";
        document.getElementById("del11").style.display = "none";
        break;
      case "file12":
        setFile12(null);
        setPdfFile12("");
        document.getElementById("file12").innerHTML = "ไม่ได้เลือกไฟล์ใด";
        document.getElementById("del12").style.display = "none";
        break;
      case "file13":
        setFile13(null);
        setPdfFile13("");
        document.getElementById("file13").innerHTML = "ไม่ได้เลือกไฟล์ใด";
        document.getElementById("del13").style.display = "none";
        break;
      case "file14":
        setFile14(null);
        setPdfFile14("");
        document.getElementById("file14").innerHTML = "ไม่ได้เลือกไฟล์ใด";
        document.getElementById("del14").style.display = "none";
        break;
    }
  };

  const generatePDF = async (e) => {
    const formatDate = (date) =>
      date instanceof Date ? date.toISOString() : "-";

    let data = JSON.stringify({
      inputregisNumber: document.getElementById("regitnumber").value,
      inputcomName: document.getElementById("comName").value,
      inputcosName: document.getElementById("cosName").value,
      inputtypeGoods: document.getElementById("typeGoods").value,
      inputdateS: document.getElementById("dateS").value,
      inputexpDate: document.getElementById("expDate").value,
      inputobjGoods: document.getElementById("objGoods").value,
      Inputpy: document.getElementById("py").value,
      inputentrepreneur: document.getElementById("entrepreneur").value,
      inputFentrepreneur: document.getElementById("fentrepreneur").value,
      setDes: document.getElementById("des").value,
      rec_create_when: new Date(),
      expdate: document.getElementById("expdate").value,
      filename: document.getElementById("filename").value,
      email: sessionStorage.getItem("uemail"),
      id: sessionStorage.getItem("orid"),
      fda_num: fda_num,
      fdadoc_date: fdadoc_date || '-',
      formula_doc_date: formula_doc_date || '-',
      letter_authorization_date: letter_authorization_date || '-',
      label_doc_date: label_doc_date || '-',
      manufacture_doc_date: manufacture_doc_date || '-',
      gmp_iso_date: gmp_iso_date || '-',
      eff_report_date: eff_report_date || '-',
      efficient_report_date: efficient_report_date || '-',
      sds_date: sds_date || '-',
      masterformula_date: masterformula_date || '-',
      specification_date: specification_date || '-',
      testing_doc_date: testing_doc_date || '-',
      coa: coa || '-',
    });

    //for upload file
    const formData = new FormData();

    file1 && formData.append("file1", file1);
    file2 && formData.append("file2", file2);
    file3 && formData.append("file3", file3);
    file4 && formData.append("file4", file4);
    file5 && formData.append("file5", file5);
    file6 && formData.append("file6", file6);
    file7 && formData.append("file7", file7);
    file8 && formData.append("file8", file8);
    file9 && formData.append("file9", file9);
    file10 && formData.append("file10", file10);
    file11 && formData.append("file11", file11);
    file12 && formData.append("file12", file12);
    file13 && formData.append("file13", file13);
    file14 && formData.append("file14", file14);
    formData.append("data", data);
    photo && formData.append("photo", photo);
    // file3 && formData.append('file3', file3);

    
      if(e === 1){
        try {
          const response = await Axios.post(
            "http://localhost:3001/api/submitPifEdit",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
              data: data,
            }
          ).then((res) => {
            console.log(res);
            if (res.data === "Comple") {
              alert("อัพโหลดเอกสารสำเร็จ");
              //redirect to http://localhost:3000/pif/productslist
              if (e === 1) {
                router.push("/pif/productslist");
              } else if (e === 2) {
                window.location.href = "/pif/showpif";
              }
            } else {
              alert("อัพโหลดเอกสารไม่สำเร็จ กรุณาลองใหม่อีกครั้ง");
            }
          });
        } catch (error) {
          console.error("Error uploading files:", error);
        }
    }
    else {
      
    }
      
  };

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const calculateCountdown = (expdate) => {
    const expDate = new Date(expirationDate);
  };

  const setNewData = (idx, e) => {
    showData[idx] = e;
    setShowData([...showData]);
  };

  console.log("is data");
  console.log(data);
  return (
    <>
      <Navbar />
      <Box
        className="home_Knowledge"
        sx={{
          backgroundColor: { xs: "#F8F8F8", md: "#F8F8F8" },
          justifyContent: { xs: "center", md: "center" },
          display: { xs: "block", md: "flex" },
          textAlign: { xs: "center", md: "center" },
          paddingBottom: { xs: "50px", md: "50px" },
        }}
      >
        <Box
          className="upload_left"
          sx={{
            justifyContent: { xs: "", md: "center" },
            display: { xs: "block", md: "flex" },
            paddingTop: { xs: "50px", md: "50px" },
          }}
        >
          <img src="/secret-file.png" style={{ maxWidth: 0 + "150px" }} />
        </Box>
        <Box
          className="upload_right"
          sx={{
            textAlign: { xs: "center", md: "center" },
            justifyContent: { xs: "center", md: "center" },
          }}
        >
          <Typography
            variant="h3"
            sx={{
              marginTop: { xs: "100px", md: "100px" },
              marginLeft: { xs: "50px", md: "50px" },
            }}
          >
            ระบบจัดการ PIF
          </Typography>
        </Box>
      </Box>

      <Box className="pif1">
        <Typography
          variant="h6"
          sx={{
            marginTop: { xs: "20px", md: "20px" },
            marginLeft: { xs: "80px", md: "80px" },
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
          }}
        ></Box>

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
            <TextField
              onChange={(e) => setNewData(0, e.target.value)}
              label="ชื่อผลิตภัณฑ์"
              id="filename"
              value={showData[6]}
            />
            <p>{showData[6]}</p>
          </Box>

          <Box>
            <Typography variant="h6">วันหมดอายุ</Typography>
            <TextField type="date" id="expdate" />
          </Box>
        </Box>

        <Box
          sx={{
            display: { xs: "grid", md: "grid" },
            justifyContent: { xs: "", md: "center" },
            textAlign: { xs: "center", md: "center" },
            paddingTop: { xs: "30px", md: "30px" },
            paddingBottom: { xs: "10px", md: "10px" },
          }}
        >
          <Typography variant="h6">รูปภาพผลิตภัณฑ์</Typography>

          <Box
            style={{
              width: "100%",
              borderRadius: "5px",
              boxShadow: "0px 0px 3px 2px rgba(0, 0, 0, 0.25)",
              marginTop: "10px",
            }}
          >
            <Button width="80%" variant="contained" component="label">
              <input
                id="filename"
                type="file"
                accept="image/png, image/gif, image/jpeg"
                onChange={(event) => handleFileChange("photo", event)}
                hidden
              />
              เลือกไฟล์
            </Button>

            <span id="photo" style={{ marginLeft: "5px", marginRight: "5px" }}>
              ไม่ได้เลือกไฟล์ใด
            </span>
          </Box>
        </Box>

        <Box
          sx={{
            justifyContent: { xs: "", md: "center" },
            textAlign: { xs: "center", md: "center" },
            display: { xs: "block", md: "flex" },
          }}
        ></Box>

        <Box
          sx={{
            width: "100%",
            marginLeft: { xs: "80px", md: "80px" },
            marginRight: { xs: "80px", md: "80px" },
            marginTop: { xs: "30px", md: "30px" },
          }}
        >
          <h6>อัพโหลดเอกสารหรือกรอกข้อมูลเกี่ยวกับเครื่องสำอางในแต่ละส่วน</h6>
        </Box>

        <Box
          sx={{
            width: "90%",
            marginLeft: { xs: "80px", md: "80px" },
            marginRight: { xs: "80px", md: "80px" },
            marginTop: { xs: "30px", md: "30px" },
          }}
        >
          <Accordion
            expanded={expanded === "panel1"}
            onChange={handleChange("panel1")}
          >
            <AccordionSummary>
              <Typography>อัพโหลดเอกสารหรือกรอกข้อมูล PIF ส่วนที่ 1</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="h6">1.ข้อมูลทั่วไป</Typography>
              <Box
                sx={{
                  display: "flex", // Set display to flex
                  flexDirection: "column", // Align items in a row,

                  // Center items in Y axis,
                }}
              >
                <TextField
                  onChange={(e) => {
                    fetchData(e);
                  }}
                  id="regitnumber"
                  variant="outlined"
                  label="เลขที่จดแจ้ง"
                  style={{ width: "50%", marginTop: "10px" }}
                  value={fda}
                />
              </Box>
              <Box>
                <TextField
                  id="comName"
                  label="ชื่อทางการค้า"
                  style={{ width: "50%", marginTop: "10px" }}
                  value={showData[5]}
                />
              </Box>
              <Box>
                <TextField
                  id="cosName"
                  label="ชื่อเครื่องสำอาง"
                  style={{ width: "50%", marginTop: "10px" }}
                  value={showData[6]}
                />
              </Box>
              <Box>
                <TextField
                  id="typeGoods"
                  label="ประเภทของเครื่องสำอาง"
                  style={{ width: "50%", marginTop: "10px" }}
                  value={showData[4]}
                />
              </Box>
              <Box>
                <TextField
                  id="dateS"
                  label="วันที่แจ้งจดแจ้ง"
                  style={{ width: "50%", marginTop: "10px" }}
                  value={showData[7]}
                />
              </Box>
              <Box>
                <TextField
                  id="expDate"
                  label="วันที่ใบอนุญาตหมดอายุ"
                  style={{ width: "50%", marginTop: "10px" }}
                  value={showData[8]}
                />
              </Box>
              <Box>
                <TextField
                  id="objGoods"
                  label="จุดประสงค์การใช้"
                  style={{ width: "50%", marginTop: "10px" }}
                  value={showData[11]}
                />
              </Box>
              <Box>
                <TextField
                  id="py"
                  label="ลักษณะทางกายภาพ"
                  style={{ width: "50%", marginTop: "10px" }}
                  value={showData[12]}
                />
              </Box>
              <Box
                sx={{
                  gap: { xs: "20px", md: "20px" },
                  display: { xs: "block", md: "flex" },
                  marginTop: { xs: "10px", md: "10px" },
                }}
              >
                <TextField
                  marginTop="10px"
                  id="entrepreneur"
                  label="ชื่อผู้ผลิต / ชื่อผู้นำเข้า"
                  variant="outlined"
                  multiline
                  rows={4}
                  width={"40ch"}
                  m="1"
                  value={showData[13]}
                />
                <TextField
                  id="fentrepreneur"
                  label="ชื่อผู้ผลิตต่างประเทศ"
                  variant="outlined"
                  multiline
                  rows={4}
                  width={"40ch"}
                  m="1"
                  value={showData[14]}
                />
                <TextField
                  id="des"
                  label="รายละเอียดเพิ่มเติม"
                  variant="outlined"
                  multiline
                  rows={4}
                  width={"40ch"}
                  m="1"
                />
              </Box>
              <hr></hr>
              //countDown
              <Typography
                variant="h6"
                sx={{
                  marginTop: { xs: "10px", md: "10px" },
                  maeginbottom: { xs: "10px", md: "10px" },
                }}
              >
                สำเนาใบรับจดแจ้งเครื่องสำอาง
              </Typography>
              <Box
                sx={{
                  display: { xs: "", md: "table-caption" },
                }}
              >
                <Typography variant="h8">วันหมดอายุของเอกสาร</Typography>
                <TextField
                  type="date"
                  id="expdate"
                  onChange={(e) => setFdadoc_date(e.target.value)}
                />
              </Box>
              {/* previewpdf */}
              {pdfFile1 === "" ? (
                <Box
                  sx={{
                    width: "300px",
                    height: "200px",
                    borderRadius: "5px",
                    boxShadow: "0px 0px 3px 2px rgba(0, 0, 0, 0.15)",
                    marginTop: "20px",
                    backgroundColor: { xs: "#F8F8F8", md: "#F8F8F8" },
                  }}
                >
                  <Box
                    sx={{
                      justifyContent: { xs: "", md: "center" },
                      textAlign: { xs: "center", md: "center" },
                    }}
                  >
                    <img
                      disabled
                      src="/previewpdf.png"
                      style={{
                        maxWidth: 0 + "50px",
                        marginTop: "70px",
                        justifyContent: "center",
                        marginBottom: "5px",
                      }}
                    />
                    <Typography disabled fontSize={12}>
                      ไม่ได้เลือกไฟล์ใด
                    </Typography>
                  </Box>
                </Box>
              ) : change[0] === 0 ? (
                <embed
                  src={`${pdfFile1}`}
                  width="300px"
                  height="450px"
                />
              ) : (
                <embed src={pdfFile1} width="300px" height="450px" />
              )}
              {/* previewpdf */}
              {/* label for info of file */}
              <p>
                {" "}
                <FaFilePdf /> (PDF) : &nbsp; {data &&
                  data[0] &&
                  data[0].fdadoc}{" "}
                ({showDate[0]}){" "}
              </p>
              <p>
                {" "}
                <GrDocumentTime /> (เวลาที่อัพโหลดล่าสุด) : &nbsp;{" "}
                {data && data[0] && data[0].rec_create_when}{" "}
              </p>
              {/* label for info of file */}
              <Box
                style={{
                  borderRadius: "5px",
                  boxShadow: "0px 0px 3px 2px rgba(0, 0, 0, 0.25)",
                  marginTop: "10px",
                }}
              >
                <Button
                  width="100%"
                  variant="contained"
                  component="label"
                  marginTop="10px"
                >
                  <input
                    id="filename"
                    type="file"
                    onChange={(event) => handleFileChange("file1", event)}
                    hidden
                  />
                  แก้ไขไฟล์
                </Button>

                <span id="file1" style={{ marginLeft: "10px" }}>
                  ไม่ได้เลือกไฟล์ใด
                </span>

                <CancelIcon
                  id="del1"
                  onClick={() => handleRemoveFile("file1")}
                  sx={{
                    fontSize: "20px",
                    float: "right",
                    marginTop: "7px",
                    marginRight: "15px",
                    color: "red",
                    display: "none",
                  }}
                />
              </Box>
              <hr></hr>
              <Typography
                variant="h6"
                sx={{
                  marginTop: { xs: "10px", md: "10px" },
                  marginbottom: { xs: "10px", md: "10px" },
                }}
              >
                หนังสือยืนยันการเป็นเจ้าของเครื่องสำอาง / Letter of
                Authorization{" "}
              </Typography>
              <Box
                sx={{
                  display: { xs: "", md: "table-caption" },
                }}
              >
                <Typography variant="h8">วันหมดอายุของเอกสาร</Typography>
                <TextField
                  type="date"
                  id="expdate"
                  onChange={(e) => setLetter_authorization_date(e.target.value)}
                />
              </Box>
              {/* previewpdf */}
              {pdfFile2 === "" ? (
                <Box
                  sx={{
                    width: "300px",
                    height: "200px",
                    borderRadius: "5px",
                    boxShadow: "0px 0px 3px 2px rgba(0, 0, 0, 0.15)",
                    marginTop: "20px",
                    backgroundColor: { xs: "#F8F8F8", md: "#F8F8F8" },
                  }}
                >
                  <Box
                    sx={{
                      justifyContent: { xs: "", md: "center" },
                      textAlign: { xs: "center", md: "center" },
                    }}
                  >
                    <img
                      disabled
                      src="/previewpdf.png"
                      style={{
                        maxWidth: 0 + "50px",
                        marginTop: "70px",
                        justifyContent: "center",
                        marginBottom: "5px",
                      }}
                    />
                    <Typography disabled fontSize={12}>
                      ไม่ได้เลือกไฟล์ใด
                    </Typography>
                  </Box>
                </Box>
              ) : change[0] === 0 ? (
                <embed
                  src={`${pdfFile2}`}
                  width="300px"
                  height="450px"
                />
              ) : (
                <embed src={pdfFile2} width="300px" height="450px" />
              )}
              {/* previewpdf */}


              {/* label for info of file */}
              <p>
                {" "}
                <FaFilePdf /> (PDF) : &nbsp; {data &&
                  data[0] &&
                  data[0].letter_authorization}{" "}
                ({showDate[1]}){" "}
              </p>
              <p>
                {" "}
                <GrDocumentTime /> (เวลาที่อัพโหลดล่าสุด) : &nbsp;{" "}
                {data && data[0] && data[0].rec_create_when}{" "}
              </p>
              {/* label for info of file */}
              <Box
                style={{
                  borderRadius: "5px",
                  boxShadow: "0px 0px 3px 2px rgba(0, 0, 0, 0.25)",
                  marginTop: "10px",
                }}
              >
                <Button variant="contained" component="label">
                  <input
                    id="filename"
                    type="file"
                    onChange={(event) => handleFileChange("file2", event)}
                    hidden
                  />
                  แก้ไขไฟล์
                </Button>
                <span id="file2" style={{ marginLeft: "10px" }}>
                  ไม่ได้เลือกไฟล์ใด
                </span>
                <CancelIcon
                  id="del2"
                  onClick={() => handleRemoveFile("file2")}
                  sx={{
                    fontSize: "20px",
                    float: "right",
                    marginTop: "7px",
                    marginRight: "15px",
                    color: "red",
                    display: "none",
                  }}
                />
              </Box>
              <hr></hr>
              
              <Typography variant="h6">
                2. สูตรส่วนประกอบของเครื่องสำอาง
              </Typography>
              <Box
                sx={{
                  display: { xs: "", md: "table-caption" },
                }}
              >
                <Typography variant="h8">วันหมดอายุของเอกสาร</Typography>
                <TextField
                  type="date"
                  id="expdate"
                  onChange={(e) => setFormula_doc_date(e.target.value)}
                />
              </Box>
               {/* previewpdf */}
               {pdfFile3 === "" ? (
                <Box
                  sx={{
                    width: "300px",
                    height: "200px",
                    borderRadius: "5px",
                    boxShadow: "0px 0px 3px 2px rgba(0, 0, 0, 0.15)",
                    marginTop: "20px",
                    backgroundColor: { xs: "#F8F8F8", md: "#F8F8F8" },
                  }}
                >
                  <Box
                    sx={{
                      justifyContent: { xs: "", md: "center" },
                      textAlign: { xs: "center", md: "center" },
                    }}
                  >
                    <img
                      disabled
                      src="/previewpdf.png"
                      style={{
                        maxWidth: 0 + "50px",
                        marginTop: "70px",
                        justifyContent: "center",
                        marginBottom: "5px",
                      }}
                    />
                    <Typography disabled fontSize={12}>
                      ไม่ได้เลือกไฟล์ใด
                    </Typography>
                  </Box>
                </Box>
              ) : change[0] === 0 ? (
                <embed
                  src={`${pdfFile3}`}
                  width="300px"
                  height="450px"
                />
              ) : (
                <embed src={pdfFile3} width="300px" height="450px" />
              )}
              {/* previewpdf */}


              {/* label for info of file */}
              <p>
                {" "}
                <FaFilePdf /> (PDF) : &nbsp; {data &&
                  data[0] &&
                  data[0].letter_authorization}{" "}
                ({showDate[3]}){" "}
              </p>
              <p>
                {" "}
                <GrDocumentTime /> (เวลาที่อัพโหลดล่าสุด) : &nbsp;{" "}
                {data && data[0] && data[0].rec_create_when}{" "}
              </p>
              {/* label for info of file */}
              <Box
                style={{
                  borderRadius: "5px",
                  boxShadow: "0px 0px 3px 2px rgba(0, 0, 0, 0.25)",
                  marginTop: "10px",
                }}
              >
                <Button variant="contained" component="label">
                  <input
                    id="filename"
                    type="file"
                    onChange={(event) => handleFileChange("file3", event)}
                    hidden
                  />
                  แก้ไขไฟล์
                </Button>
                <span id="file3" style={{ marginLeft: "10px" }}>
                  ไม่ได้เลือกไฟล์ใด
                </span>
                <CancelIcon
                  id="del3"
                  onClick={() => handleRemoveFile("file3")}
                  sx={{
                    fontSize: "20px",
                    float: "right",
                    marginTop: "7px",
                    marginRight: "15px",
                    color: "red",
                    display: "none",
                  }}
                />
              </Box>
              <hr></hr>
              <Typography variant="h6">3. ฉลากเครื่องสำอาง</Typography>
              <Box
                sx={{
                  display: { xs: "", md: "table-caption" },
                }}
              >
                <Typography variant="h8">วันหมดอายุของเอกสาร</Typography>
                <TextField
                  type="date"
                  id="expdate"
                  onChange={(e) => setLabel_doc_date(e.target.value)}
                />
              </Box>

               {/* previewpdf */}
               {pdfFile4 === "" ? (
                <Box
                  sx={{
                    width: "300px",
                    height: "200px",
                    borderRadius: "5px",
                    boxShadow: "0px 0px 3px 2px rgba(0, 0, 0, 0.15)",
                    marginTop: "20px",
                    backgroundColor: { xs: "#F8F8F8", md: "#F8F8F8" },
                  }}
                >
                  <Box
                    sx={{
                      justifyContent: { xs: "", md: "center" },
                      textAlign: { xs: "center", md: "center" },
                    }}
                  >
                    <img
                      disabled
                      src="/previewpdf.png"
                      style={{
                        maxWidth: 0 + "50px",
                        marginTop: "70px",
                        justifyContent: "center",
                        marginBottom: "5px",
                      }}
                    />
                    <Typography disabled fontSize={12}>
                      ไม่ได้เลือกไฟล์ใด
                    </Typography>
                  </Box>
                </Box>
              ) : change[0] === 0 ? (
                <embed
                  src={`${pdfFile4}`}
                  width="300px"
                  height="450px"
                />
              ) : (
                <embed src={pdfFile4} width="300px" height="450px" />
              )}
              {/* previewpdf */}


              {/* label for info of file */}
              <p>
                {" "}
                <FaFilePdf /> (PDF) : &nbsp; {data &&
                  data[0] &&
                  data[0].label_doc}{" "}
                ({showDate[4]}){" "}
              </p>
              <p>
                {" "}
                <GrDocumentTime /> (เวลาที่อัพโหลดล่าสุด) : &nbsp;{" "}
                {data && data[0] && data[0].rec_create_when}{" "}
              </p>
              {/* label for info of file */}
              <Box
                style={{
                  borderRadius: "5px",
                  boxShadow: "0px 0px 3px 2px rgba(0, 0, 0, 0.25)",
                  marginTop: "10px",
                }}
              >
                <Button variant="contained" component="label">
                  <input
                    id="filename"
                    type="file"
                    onChange={(event) => handleFileChange("file4", event)}
                    hidden
                  />
                  แก้ไขไฟล์
                </Button>
                <span id="file4" style={{ marginLeft: "10px" }}>
                  ไม่ได้เลือกไฟล์ใด
                </span>
                <CancelIcon
                  id="del4"
                  onClick={() => handleRemoveFile("file4")}
                  sx={{
                    fontSize: "20px",
                    float: "right",
                    marginTop: "7px",
                    marginRight: "15px",
                    color: "red",
                    display: "none",
                  }}
                />
              </Box>
              <hr></hr>
              <Typography variant="h6">4. ข้อมูลเกี่ยวกับการผลิต</Typography>
              <Typography
                variant="h6"
                sx={{
                  marginTop: { xs: "10px", md: "10px" },
                  maeginbottom: { xs: "10px", md: "10px" },
                }}
              >
                ข้อมูลการผลิต
              </Typography>
              <Box
                sx={{
                  display: { xs: "", md: "table-caption" },
                }}
              >
                <Typography variant="h8">วันหมดอายุของเอกสาร</Typography>
                <TextField
                  type="date"
                  id="expdate"
                  onChange={(e) => setManufacture_doc_date(e.target.value)}
                />
              </Box>
              {pdfFile5 === "" ? (




<Box
sx={{
  width: "300px",
  height: "200px",
  borderRadius: "5px",
  boxShadow: "0px 0px 3px 2px rgba(0, 0, 0, 0.15)",
  marginTop: "20px",
  backgroundColor: { xs: "#F8F8F8", md: "#F8F8F8" },
}}
>
<Box
  sx={{
    justifyContent: { xs: "", md: "center" },
    textAlign: { xs: "center", md: "center" },
  }}
>
  <img
    disabled
    src="/previewpdf.png"
    style={{
      maxWidth: 0 + "50px",
      marginTop: "70px",
      justifyContent: "center",
      marginBottom: "5px",
    }}
  />
  <Typography disabled fontSize={12}>
    ไม่ได้เลือกไฟล์ใด
  </Typography>
</Box>
</Box>
) : change[0] === 0 ? (
<embed
src={`${pdfFile5}`}
width="300px"
height="450px"
/>
) : (
<embed src={pdfFile5} width="300px" height="450px" />
)}
{/* previewpdf */}


{/* label for info of file */}
<p>
{" "}
<FaFilePdf /> (PDF) : &nbsp; {data &&
data[0] &&
data[0].manufacture_doc}{" "}
({showDate[5]}){" "}
</p>
<p>
{" "}
<GrDocumentTime /> (เวลาที่อัพโหลดล่าสุด) : &nbsp;{" "}
{data && data[0] && data[0].rec_create_when}{" "}
</p>
{/* label for info of file */}





              <Box
                style={{
                  borderRadius: "5px",
                  boxShadow: "0px 0px 3px 2px rgba(0, 0, 0, 0.25)",
                  marginTop: "10px",
                }}
              >
                <Button variant="contained" component="label">
                  <input
                    id="filename"
                    type="file"
                    onChange={(event) => handleFileChange("file5", event)}
                    hidden
                  />
                  แก้ไขไฟล์
                </Button>
                <span id="file5" style={{ marginLeft: "10px" }}>
                  ไม่ได้เลือกไฟล์ใด
                </span>
                <CancelIcon
                  id="del5"
                  onClick={() => handleRemoveFile("file5")}
                  sx={{
                    fontSize: "20px",
                    float: "right",
                    marginTop: "7px",
                    marginRight: "15px",
                    color: "red",
                    display: "none",
                  }}
                />
              </Box>
              <hr></hr>


              <Typography
                variant="h6"
                sx={{
                  marginTop: { xs: "10px", md: "10px" },
                  maeginbottom: { xs: "10px", md: "10px" },
                }}
              >
                GMP / ISO
              </Typography>
              <Box
                sx={{
                  display: { xs: "", md: "table-caption" },
                }}
              >
                <Typography variant="h8">วันหมดอายุของเอกสาร</Typography>
                <TextField
                  type="date"
                  id="expdate"
                  onChange={(e) => setGmp_iso(e.target.value)}
                />
              </Box>



              {pdfFile6 === "" ? (
               <Box
               sx={{
                 width: "300px",
                 height: "200px",
                 borderRadius: "5px",
                 boxShadow: "0px 0px 3px 2px rgba(0, 0, 0, 0.15)",
                 marginTop: "20px",
                 backgroundColor: { xs: "#F8F8F8", md: "#F8F8F8" },
               }}
             >
               <Box
                 sx={{
                   justifyContent: { xs: "", md: "center" },
                   textAlign: { xs: "center", md: "center" },
                 }}
               >
                 <img
                   disabled
                   src="/previewpdf.png"
                   style={{
                     maxWidth: 0 + "50px",
                     marginTop: "70px",
                     justifyContent: "center",
                     marginBottom: "5px",
                   }}
                 />
                 <Typography disabled fontSize={12}>
                   ไม่ได้เลือกไฟล์ใด
                 </Typography>
               </Box>
             </Box>
           ) : change[0] === 0 ? (
             <embed
               src={`${pdfFile6}`}
               width="300px"
               height="450px"
             />
           ) : (
             <embed src={pdfFile6} width="300px" height="450px" />
           )}
           {/* previewpdf */}


           {/* label for info of file */}
           <p>
             {" "}
             <FaFilePdf /> (PDF) : &nbsp; {data &&
               data[0] &&
               data[0].gmp_iso}{" "}
             ({showDate[6]}){" "}
           </p>
           <p>
             {" "}
             <GrDocumentTime /> (เวลาที่อัพโหลดล่าสุด) : &nbsp;{" "}
             {data && data[0] && data[0].rec_create_when}{" "}
           </p>
           {/* label for info of file */}





              <Box
                style={{
                  borderRadius: "5px",
                  boxShadow: "0px 0px 3px 2px rgba(0, 0, 0, 0.25)",
                  marginTop: "10px",
                }}
              >
                <Button variant="contained" component="label">
                  <input
                    id="filename"
                    type="file"
                    onChange={(event) => handleFileChange("file6", event)}
                    hidden
                  />
                  แก้ไขไฟล์
                </Button>
                <span id="file6" style={{ marginLeft: "10px" }}>
                  ไม่ได้เลือกไฟล์ใด
                </span>
                <CancelIcon
                  id="del6"
                  onClick={() => handleRemoveFile("file6")}
                  sx={{
                    fontSize: "20px",
                    float: "right",
                    marginTop: "7px",
                    marginRight: "15px",
                    color: "red",
                    display: "none",
                  }}
                />
              </Box>
              <hr></hr>



              <Typography variant="h6">
                5.รายงานสรุปอาการอันไม่พึงประสงค์จากการใช้เครื่องสำอาง
              </Typography>
              <Box
                sx={{
                  display: { xs: "", md: "table-caption" },
                }}
              >
                <Typography variant="h8">วันหมดอายุของเอกสาร</Typography>
                <TextField
                  type="date"
                  id="expdate"
                  onChange={(e) => setEff_report_date(e.target.value)}
                />
              </Box>
              {pdfFile7 === "" ? (
              <Box
              sx={{
                width: "300px",
                height: "200px",
                borderRadius: "5px",
                boxShadow: "0px 0px 3px 2px rgba(0, 0, 0, 0.15)",
                marginTop: "20px",
                backgroundColor: { xs: "#F8F8F8", md: "#F8F8F8" },
              }}
            >
              <Box
                sx={{
                  justifyContent: { xs: "", md: "center" },
                  textAlign: { xs: "center", md: "center" },
                }}
              >
                <img
                  disabled
                  src="/previewpdf.png"
                  style={{
                    maxWidth: 0 + "50px",
                    marginTop: "70px",
                    justifyContent: "center",
                    marginBottom: "5px",
                  }}
                />
                <Typography disabled fontSize={12}>
                  ไม่ได้เลือกไฟล์ใด
                </Typography>
              </Box>
            </Box>
          ) : change[0] === 0 ? (
            <embed
              src={`${pdfFile7}`}
              width="300px"
              height="450px"
            />
          ) : (
            <embed src={pdfFile7} width="300px" height="450px" />
          )}
          {/* previewpdf */}


          {/* label for info of file */}
          <p>
            {" "}
            <FaFilePdf /> (PDF) : &nbsp; {data &&
              data[0] &&
              data[0].eff_report}{" "}
            ({showDate[7]}){" "}
          </p>
          <p>
            {" "}
            <GrDocumentTime /> (เวลาที่อัพโหลดล่าสุด) : &nbsp;{" "}
            {data && data[0] && data[0].rec_create_when}{" "}
          </p>
          {/* label for info of file */}



              <Box
                style={{
                  borderRadius: "5px",
                  boxShadow: "0px 0px 3px 2px rgba(0, 0, 0, 0.25)",
                  marginTop: "10px",
                }}
              >
                <Button variant="contained" component="label">
                  <input
                    id="filename"
                    type="file"
                    onChange={(event) => handleFileChange("file7", event)}
                    hidden
                  />
                  แก้ไขไฟล์
                </Button>
                <span id="file7" style={{ marginLeft: "10px" }}>
                  ไม่ได้เลือกไฟล์ใด
                </span>
                <CancelIcon
                  id="del7"
                  onClick={() => handleRemoveFile("file7")}
                  sx={{
                    fontSize: "20px",
                    float: "right",
                    marginTop: "7px",
                    marginRight: "15px",
                    color: "red",
                    display: "none",
                  }}
                />
              </Box>
              <hr></hr>
              <Typography variant="h6">
                6. การประเมินความสอดคล้องของการกล่าวอ้างสรรพคุณเครื่องสำอาง
              </Typography>
              <Box
                sx={{
                  display: { xs: "", md: "table-caption" },
                }}
              >
                <Typography variant="h8">วันหมดอายุของเอกสาร</Typography>
                <TextField
                  type="date"
                  id="expdate"
                  onChange={(e) => setEfficient_report_date(e.target.value)}
                />
              </Box>
              {pdfFile8 === "" ? (

<Box
sx={{
  width: "300px",
  height: "200px",
  borderRadius: "5px",
  boxShadow: "0px 0px 3px 2px rgba(0, 0, 0, 0.15)",
  marginTop: "20px",
  backgroundColor: { xs: "#F8F8F8", md: "#F8F8F8" },
}}
>
<Box
  sx={{
    justifyContent: { xs: "", md: "center" },
    textAlign: { xs: "center", md: "center" },
  }}
>
  <img
    disabled
    src="/previewpdf.png"
    style={{
      maxWidth: 0 + "50px",
      marginTop: "70px",
      justifyContent: "center",
      marginBottom: "5px",
    }}
  />
  <Typography disabled fontSize={12}>
    ไม่ได้เลือกไฟล์ใด
  </Typography>
</Box>
</Box>
) : change[0] === 0 ? (
<embed
src={`${pdfFile8}`}
width="300px"
height="450px"
/>
) : (
<embed src={pdfFile8} width="300px" height="450px" />
)}
{/* previewpdf */}


{/* label for info of file */}
<p>
{" "}
<FaFilePdf /> (PDF) : &nbsp; {data &&
data[0] &&
data[0].efficient_report}{" "}
({showDate[8]}){" "}
</p>
<p>
{" "}
<GrDocumentTime /> (เวลาที่อัพโหลดล่าสุด) : &nbsp;{" "}
{data && data[0] && data[0].rec_create_when}{" "}
</p>
{/* label for info of file */}




              <Box
                style={{
                  borderRadius: "5px",
                  boxShadow: "0px 0px 3px 2px rgba(0, 0, 0, 0.25)",
                  marginTop: "10px",
                }}
              >
                <Button variant="contained" component="label">
                  <input
                    id="filename"
                    type="file"
                    onChange={(event) => handleFileChange("file8", event)}
                    hidden
                  />
                  แก้ไขไฟล์
                </Button>
                <span id="file8" style={{ marginLeft: "10px" }}>
                  ไม่ได้เลือกไฟล์ใด
                </span>
                <CancelIcon
                  id="del8"
                  onClick={() => handleRemoveFile("file8")}
                  sx={{
                    fontSize: "20px",
                    float: "right",
                    marginTop: "7px",
                    marginRight: "15px",
                    color: "red",
                    display: "none",
                  }}
                />
              </Box>
            </AccordionDetails>
          </Accordion>

          <Accordion
            expanded={expanded === "panel2"}
            onChange={handleChange("panel2")}
          >
            <AccordionSummary
              aria-controls="panel2d-content"
              id="panel2d-header"
            >
              <Typography>อัพโหลดเอกสารหรือกรอกข้อมูล PIF ส่วนที่ 2</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="h6">1. ข้อกำหนดของวัตถุดิบ</Typography>
              <Box
                sx={{
                  display: { xs: "", md: "table-caption" },
                }}
              >
                <Typography variant="h8">วันหมดอายุของเอกสาร</Typography>
                <TextField
                  type="date"
                  id="expdate"
                  onChange={(e) => setSds_date(e.target.value)}
                />
              </Box>

              {pdfFile9 === "" ? (


<Box
sx={{
  width: "300px",
  height: "200px",
  borderRadius: "5px",
  boxShadow: "0px 0px 3px 2px rgba(0, 0, 0, 0.15)",
  marginTop: "20px",
  backgroundColor: { xs: "#F8F8F8", md: "#F8F8F8" },
}}
>
<Box
  sx={{
    justifyContent: { xs: "", md: "center" },
    textAlign: { xs: "center", md: "center" },
  }}
>
  <img
    disabled
    src="/previewpdf.png"
    style={{
      maxWidth: 0 + "50px",
      marginTop: "70px",
      justifyContent: "center",
      marginBottom: "5px",
    }}
  />
  <Typography disabled fontSize={12}>
    ไม่ได้เลือกไฟล์ใด
  </Typography>
</Box>
</Box>
) : change[0] === 0 ? (
<embed
src={`${pdfFile9}`}
width="300px"
height="450px"
/>
) : (
<embed src={pdfFile9} width="300px" height="450px" />
)}
{/* previewpdf */}


{/* label for info of file */}
<p>
{" "}
<FaFilePdf /> (PDF) : &nbsp; {data &&
data[0] &&
data[0].spec}{" "}
({showDate[9]}){" "}
</p>
<p>
{" "}
<GrDocumentTime /> (เวลาที่อัพโหลดล่าสุด) : &nbsp;{" "}
{data && data[0] && data[0].rec_create_when}{" "}
</p>
{/* label for info of file */}




              <Box
                style={{
                  borderRadius: "5px",
                  boxShadow: "0px 0px 3px 2px rgba(0, 0, 0, 0.25)",
                  marginTop: "10px",
                }}
              >
                <Button variant="contained" component="label">
                  <input
                    id="filename"
                    type="file"
                    onChange={(event) => handleFileChange("file9", event)}
                    hidden
                  />
                  แก้ไขไฟล์
                </Button>
                <span id="file9" style={{ marginLeft: "10px" }}>
                  ไม่ได้เลือกไฟล์ใด
                </span>
                <CancelIcon
                  id="del9"
                  onClick={() => handleRemoveFile("file9")}
                  sx={{
                    fontSize: "20px",
                    float: "right",
                    marginTop: "7px",
                    marginRight: "15px",
                    color: "red",
                    display: "none",
                  }}
                />
              </Box>

              <hr></hr>
              <Typography
                variant="h6"
                sx={{ marginTop: { xs: "10px", md: "10px" } }}
              >
                certificate of analysis (COA)
              </Typography>
              <Box
                sx={{
                  display: { xs: "", md: "table-caption" },
                }}
              >
                <Typography variant="h8">วันหมดอายุของเอกสาร</Typography>
                <TextField
                  type="date"
                  id="expdate"
                  onChange={(e) => setCoa(e.target.value)}
                />
              </Box>

              {pdfFile10 === "" ? (


<Box
sx={{
  width: "300px",
  height: "200px",
  borderRadius: "5px",
  boxShadow: "0px 0px 3px 2px rgba(0, 0, 0, 0.15)",
  marginTop: "20px",
  backgroundColor: { xs: "#F8F8F8", md: "#F8F8F8" },
}}
>
<Box
  sx={{
    justifyContent: { xs: "", md: "center" },
    textAlign: { xs: "center", md: "center" },
  }}
>
  <img
    disabled
    src="/previewpdf.png"
    style={{
      maxWidth: 0 + "50px",
      marginTop: "70px",
      justifyContent: "center",
      marginBottom: "5px",
    }}
  />
  <Typography disabled fontSize={12}>
    ไม่ได้เลือกไฟล์ใด
  </Typography>
</Box>
</Box>
) : change[0] === 0 ? (
<embed
src={`${pdfFile10}`}
width="300px"
height="450px"
/>
) : (
<embed src={pdfFile10} width="300px" height="450px" />
)}
{/* previewpdf */}


{/* label for info of file */}
<p>
{" "}
<FaFilePdf /> (PDF) : &nbsp; {data &&
data[0] &&
data[0].coa_doc}{" "}
({showDate[10]}){" "}
</p>
<p>
{" "}
<GrDocumentTime /> (เวลาที่อัพโหลดล่าสุด) : &nbsp;{" "}
{data && data[0] && data[0].rec_create_when}{" "}
</p>
{/* label for info of file */}




              <Box
                style={{
                  borderRadius: "5px",
                  boxShadow: "0px 0px 3px 2px rgba(0, 0, 0, 0.25)",
                  marginTop: "10px",
                }}
              >
                <Button variant="contained" component="label">
                  <input
                    id="filename"
                    type="file"
                    onChange={(event) => handleFileChange("file10", event)}
                    hidden
                  />
                  แก้ไขไฟล์
                </Button>
                <span id="file10" style={{ marginLeft: "10px" }}>
                  ไม่ได้เลือกไฟล์ใด
                </span>
                <CancelIcon
                  id="del10"
                  onClick={() => handleRemoveFile("file10")}
                  sx={{
                    fontSize: "20px",
                    float: "right",
                    marginTop: "7px",
                    marginRight: "15px",
                    color: "red",
                    display: "none",
                  }}
                />
              </Box>
              <hr></hr>

              <Typography variant="h6">
                2. ข้อมูลแสดงความปลอดภัยของวัตถุดิบทุกรายการ (Safety Data Sheet
                : SDS)
              </Typography>
              <Box
                sx={{
                  display: { xs: "", md: "table-caption" },
                }}
              >
                <Typography variant="h8">วันหมดอายุของเอกสาร</Typography>
                <TextField
                  type="date"
                  id="expdate"
                  onChange={(e) => setSds_date(e.target.value)}
                />
              </Box>


              {pdfFile11 === "" ? (
                <Box
                sx={{
                  width: "300px",
                  height: "200px",
                  borderRadius: "5px",
                  boxShadow: "0px 0px 3px 2px rgba(0, 0, 0, 0.15)",
                  marginTop: "20px",
                  backgroundColor: { xs: "#F8F8F8", md: "#F8F8F8" },
                }}
              >
                <Box
                  sx={{
                    justifyContent: { xs: "", md: "center" },
                    textAlign: { xs: "center", md: "center" },
                  }}
                >
                  <img
                    disabled
                    src="/previewpdf.png"
                    style={{
                      maxWidth: 0 + "50px",
                      marginTop: "70px",
                      justifyContent: "center",
                      marginBottom: "5px",
                    }}
                  />
                  <Typography disabled fontSize={12}>
                    ไม่ได้เลือกไฟล์ใด
                  </Typography>
                </Box>
              </Box>
            ) : change[0] === 0 ? (
              <embed
                src={`${pdfFile11}`}
                width="300px"
                height="450px"
              />
            ) : (
              <embed src={pdfFile11} width="300px" height="450px" />
            )}
            {/* previewpdf */}


            {/* label for info of file */}
            <p>
              {" "}
              <FaFilePdf /> (PDF) : &nbsp; {data &&
                data[0] &&
                data[0].sds}{" "}
              ({showDate[11]}){" "}
            </p>
            <p>
              {" "}
              <GrDocumentTime /> (เวลาที่อัพโหลดล่าสุด) : &nbsp;{" "}
              {data && data[0] && data[0].rec_create_when}{" "}
            </p>
            {/* label for info of file */}





              <Box
                style={{
                  borderRadius: "5px",
                  boxShadow: "0px 0px 3px 2px rgba(0, 0, 0, 0.25)",
                  marginTop: "10px",
                }}
              >
                <Button variant="contained" component="label">
                  <input
                    id="filename"
                    type="file"
                    onChange={(event) => handleFileChange("file11", event)}
                    hidden
                  />
                  แก้ไขไฟล์
                </Button>
                <span id="file11" style={{ marginLeft: "10px" }}>
                  ไม่ได้เลือกไฟล์ใด
                </span>
                <CancelIcon
                  id="del11"
                  onClick={() => handleRemoveFile("file11")}
                  sx={{
                    fontSize: "20px",
                    float: "right",
                    marginTop: "7px",
                    marginRight: "15px",
                    color: "red",
                    display: "none",
                  }}
                />
              </Box>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "panel3"}
            onChange={handleChange("panel3")}
          >
            <AccordionSummary
              aria-controls="panel3d-content"
              id="panel3d-header"
            >
              <Typography>อัพโหลดเอกสารหรือกรอกข้อมูล PIF ส่วนที่ 3</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="h6">
                1. สูตรแม่บท (Master formula)
              </Typography>
              <Box
                sx={{
                  display: { xs: "", md: "table-caption" },
                }}
              >
                <Typography variant="h8">วันหมดอายุของเอกสาร</Typography>
                <TextField
                  type="date"
                  id="expdate"
                  onChange={(e) => setMasterformula_date(e.target.value)}
                />
              </Box>
              {pdfFile12 === "" ? (




<Box
sx={{
  width: "300px",
  height: "200px",
  borderRadius: "5px",
  boxShadow: "0px 0px 3px 2px rgba(0, 0, 0, 0.15)",
  marginTop: "20px",
  backgroundColor: { xs: "#F8F8F8", md: "#F8F8F8" },
}}
>
<Box
  sx={{
    justifyContent: { xs: "", md: "center" },
    textAlign: { xs: "center", md: "center" },
  }}
>
  <img
    disabled
    src="/previewpdf.png"
    style={{
      maxWidth: 0 + "50px",
      marginTop: "70px",
      justifyContent: "center",
      marginBottom: "5px",
    }}
  />
  <Typography disabled fontSize={12}>
    ไม่ได้เลือกไฟล์ใด
  </Typography>
</Box>
</Box>
) : change[0] === 0 ? (
<embed
src={`${pdfFile12}`}
width="300px"
height="450px"
/>
) : (
<embed src={pdfFile12} width="300px" height="450px" />
)}
{/* previewpdf */}


{/* label for info of file */}
<p>
{" "}
<FaFilePdf /> (PDF) : &nbsp; {data &&
data[0] &&
data[0].masterformula}{" "}
({showDate[12]}){" "}
</p>
<p>
{" "}
<GrDocumentTime /> (เวลาที่อัพโหลดล่าสุด) : &nbsp;{" "}
{data && data[0] && data[0].rec_create_when}{" "}
</p>
{/* label for info of file */}





              <Box
                style={{
                  borderRadius: "5px",
                  boxShadow: "0px 0px 3px 2px rgba(0, 0, 0, 0.25)",
                  marginTop: "10px",
                }}
              >
                <Button variant="contained" component="label">
                  <input
                    id="filename"
                    type="file"
                    onChange={(event) => handleFileChange("file12", event)}
                    hidden
                  />
                  แก้ไขไฟล์
                </Button>
                <span id="file12" style={{ marginLeft: "10px" }}>
                  ไม่ได้เลือกไฟล์ใด
                </span>
                <CancelIcon
                  id="del12"
                  onClick={() => handleRemoveFile("file12")}
                  sx={{
                    fontSize: "20px",
                    float: "right",
                    marginTop: "7px",
                    marginRight: "15px",
                    color: "red",
                    display: "none",
                  }}
                />
              </Box>
              <hr></hr>

              <Typography variant="h6">
                2. ข้อกำหนดของเครื่องสำอางสำเร็จรูป (Specification of cosmetic
                finished product)
              </Typography>
              <Box
                sx={{
                  display: { xs: "", md: "table-caption" },
                }}
              >
                <Typography variant="h8">วันหมดอายุของเอกสาร</Typography>
                <TextField
                  type="date"
                  id="expdate"
                  onChange={(e) => setSpecification_date(e.target.value)}
                />
              </Box>
              {pdfFile13 === "" ? (


               <Box
sx={{
  width: "300px",
  height: "200px",
  borderRadius: "5px",
  boxShadow: "0px 0px 3px 2px rgba(0, 0, 0, 0.15)",
  marginTop: "20px",
  backgroundColor: { xs: "#F8F8F8", md: "#F8F8F8" },
}}
>
<Box
  sx={{
    justifyContent: { xs: "", md: "center" },
    textAlign: { xs: "center", md: "center" },
  }}
>
  <img
    disabled
    src="/previewpdf.png"
    style={{
      maxWidth: 0 + "50px",
      marginTop: "70px",
      justifyContent: "center",
      marginBottom: "5px",
    }}
  />
  <Typography disabled fontSize={12}>
    ไม่ได้เลือกไฟล์ใด
  </Typography>
</Box>
</Box>
) : change[0] === 0 ? (
<embed
src={`${pdfFile13}`}
width="300px"
height="450px"
/>
) : (
<embed src={pdfFile13} width="300px" height="450px" />
)}
{/* previewpdf */}


{/* label for info of file */}
<p>
{" "}
<FaFilePdf /> (PDF) : &nbsp; {data &&
data[0] &&
data[0].specification}{" "}
({showDate[13]}){" "}
</p>
<p>
{" "}
<GrDocumentTime /> (เวลาที่อัพโหลดล่าสุด) : &nbsp;{" "}
{data && data[0] && data[0].rec_create_when}{" "}
</p>
{/* label for info of file */}




              <Box
                style={{
                  borderRadius: "5px",
                  boxShadow: "0px 0px 3px 2px rgba(0, 0, 0, 0.25)",
                  marginTop: "10px",
                }}
              >
                <Button variant="contained" component="label">
                  <input
                    id="filename"
                    type="file"
                    onChange={(event) => handleFileChange("file13", event)}
                    hidden
                  />
                  แก้ไขไฟล์
                </Button>
                <span id="file13" style={{ marginLeft: "10px" }}>
                  ไม่ได้เลือกไฟล์ใด
                </span>
                <CancelIcon
                  id="del13"
                  onClick={() => handleRemoveFile("file13")}
                  sx={{
                    fontSize: "20px",
                    float: "right",
                    marginTop: "7px",
                    marginRight: "15px",
                    color: "red",
                    display: "none",
                  }}
                />
              </Box>
              <hr></hr>

              <Typography variant="h6">
                3. วิธีการทดสอบเครื่องสำอางสำเร็จรูป (Testing method for
                cosmetic finished product){" "}
              </Typography>
              <Box
                sx={{
                  display: { xs: "", md: "table-caption" },
                }}
              >
                <Typography variant="h8">วันหมดอายุของเอกสาร</Typography>
                <TextField
                  type="date"
                  id="expdate"
                  onChange={(e) => setTesting_doc_date(e.target.value)}
                />
              </Box>
              {pdfFile14 === "" ? (



<Box
sx={{
  width: "300px",
  height: "200px",
  borderRadius: "5px",
  boxShadow: "0px 0px 3px 2px rgba(0, 0, 0, 0.15)",
  marginTop: "20px",
  backgroundColor: { xs: "#F8F8F8", md: "#F8F8F8" },
}}
>
<Box
  sx={{
    justifyContent: { xs: "", md: "center" },
    textAlign: { xs: "center", md: "center" },
  }}
>
  <img
    disabled
    src="/previewpdf.png"
    style={{
      maxWidth: 0 + "50px",
      marginTop: "70px",
      justifyContent: "center",
      marginBottom: "5px",
    }}
  />
  <Typography disabled fontSize={12}>
    ไม่ได้เลือกไฟล์ใด
  </Typography>
</Box>
</Box>
) : change[0] === 0 ? (
<embed
src={`${pdfFile14}`}
width="300px"
height="450px"
/>
) : (
<embed src={pdfFile14} width="300px" height="450px" />
)}
{/* previewpdf */}


{/* label for info of file */}
<p>
{" "}
<FaFilePdf /> (PDF) : &nbsp; {data &&
data[0] &&
data[0].testing_doc}{" "}
({showDate[14]}){" "}
</p>
<p>
{" "}
<GrDocumentTime /> (เวลาที่อัพโหลดล่าสุด) : &nbsp;{" "}
{data && data[0] && data[0].rec_create_when}{" "}
</p>
{/* label for info of file */}



              <Box
                style={{
                  borderRadius: "5px",
                  boxShadow: "0px 0px 3px 2px rgba(0, 0, 0, 0.25)",
                  marginTop: "10px",
                }}
              >
                <Button variant="contained" component="label">
                  <input
                    id="filename"
                    type="file"
                    onChange={(event) => handleFileChange("file14", event)}
                    hidden
                  />
                  แก้ไขไฟล์
                </Button>

                <span id="file14" style={{ marginLeft: "10px" }}>
                  ไม่ได้เลือกไฟล์ใด
                </span>

                <CancelIcon
                  id="del14"
                  onClick={() => handleRemoveFile("file14")}
                  sx={{
                    fontSize: "20px",
                    float: "right",
                    marginTop: "7px",
                    marginRight: "15px",
                    color: "red",
                    display: "none",
                  }}
                />
              </Box>
            </AccordionDetails>
          </Accordion>
        </Box>
      </Box>
      <Box
        sx={{
          display: { xs: "", md: "flex" },
          textAlign: { xs: "center", md: "center" },
          gap: { xs: "20px", md: "20px" },
          justifyContent: { xs: "", md: "center" },
        }}
      >
        <Box
          sx={{
            textAlign: { xs: "center", md: "center" },
          }}
        >
          <Button
            type="submit"
            textAlign="center"
            variant="contained"
            color="success"
            sx={{ mt: 3, mb: 2 }}
            onClick={() => {
              generatePDF(1);
            }}
          >
            บันทึก
          </Button>
        </Box>

        <Box
          sx={{
            textAlign: { xs: "center", md: "center" },
          }}
        >
          <Button
            type="submit"
            textAlign="center"
            variant="contained"
            color="success"
            onClick={() => {
              generatePDF(2);
            }}
            sx={{ mt: 3, mb: 2 }}
          >
            รวบรวมข้อมูลและบันทึกเป็นไฟล์ PDF
          </Button>
        </Box>
      </Box>
      {/* <Button onClick={(e) => { generatePDF(e) }}>Generate PDF</Button> */}

      <Footer />
    </>
  );
}
