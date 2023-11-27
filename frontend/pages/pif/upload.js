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
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'
import fontkit from '@pdf-lib/fontkit'
import { fetch } from 'pdf-lib';

import { Box, TextField, Typography, Button } from "@mui/material";
import Axios from "axios";
import { Upload } from "@mui/icons-material";




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
    const [fda , setFda] = useState("")
    const [status , setStatus] = useState("")
    const [locationStatus , setLocationStatus] = useState("")
    const [registrationNumber , setRegistrationNumber] = useState("")
    const [ typeRegis , setTypeRegis] = useState("")
    const [formatRegis , setFormatRegis] = useState("")
    const [comName , setComName] = useState("")
    const [cosName  , setCosName ] = useState("")
    const [ dateS  , setDateS ] = useState("")
    const [ expDate , setExpDate] = useState("")
    const [typeGoods , setTypeGoods] = useState("")
    const [bodypart, setBodypart] = useState("")
    const [objGoods, setObjGoods] = useState("")
    const [conGoods, setConGoods] = useState("")
    const [entrepreneur, setEntrepreneur] = useState("")
    const [show , setShow] = useState([])
    const [fentrepreneur, setFentrepreneur] = useState("")
    const [des , setDes] = useState("")

    const [pdfUrl, setPdfUrl] = useState('');

    const [inputcomName,setInputcomName] = useState("")
    const [inputregistrationNumber , setInputregistrationNumber] = useState("")
    const [inputformatRegis , setInputformatRegis] = useState("")
    const [inputcosName  , setInputcosName ] = useState("")
    const [ inputdateS  , setInputdateS ] = useState("")
    const [ inputexpDate , setInputexpDate] = useState("")
    const [inputtypeGoods , setInputtypeGoods] = useState("")
    const [inputbodypart, setInputbodypart] = useState("")
    const [inputobjGoods, setInputobjGoods] = useState("")
    const [inputconGoods, setInputconGoods] = useState("")
    const [inputentrepreneur, setinputentrepreneur] = useState("")
    const [inputfentrepreneur, setinputfentrepreneur] = useState("")
    const [inputpy,setInputpy] = useState("")

    const [dateA, setdateA] = useState(new Date());





    const [file1 , setFile1] = useState("")
    const [file2 , setFile2] = useState("")
    const [file3 , setFile3] = useState("")
    const [file4 , setFile4] = useState("")
    const [file5 , setFile5] = useState("")
    const [file6 , setFile6] = useState("")
    const [file7 , setFile7] = useState("")
    const [file8 , setFile8] = useState("")
    const [file9 , setFile9] = useState("")



     //for get file on iCEA
    useEffect(() => {
      Axios.get(`http://localhost:3001/api/getGroupName`).then((response) => {

          setShow(response.data)
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });

  },[])

  try {
    var options = show.map((option) => {
      const firstLetter = option.groupname[0].toUpperCase();
      return {
        firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
        ...option,
      };
    });
  } catch {
    var options = []
  }



// data from Thai FDA By Fda number
      const fetchData = async () => {
          try {
          const res = await  Axios({
              url: "http://localhost:3001/api/fetchData",
              method: "get",
              params: {
                data : fda ,
              }
              })
          console.log(res.data)
          console.log(res.data[0])
              setStatus( res.data[0])
              setLocationStatus( res.data[1])
              setTypeRegis( res.data[3])
              setFormatRegis( res.data[4])
              setComName( res.data[5])
              setCosName( res.data[6])
              setDateS( res.data[7])
              setExpDate( res.data[8])
              setTypeGoods( res.data[9])
              setBodypart( res.data[10])
              setObjGoods(res.data[11])
              setEntrepreneur(res.data[13])
              setConGoods(res.data[12])
              setFentrepreneur(res.data[14])

          } catch(error) {
              console.log(error)
          }
      }



    const UploadA = () => {
      alert(file1)
    }
    const handleFileChange = async (e) => {
      const file = e.target.files[0];

      console.log("A FIle")
      console.log(file)

      try {
        const formData = new FormData();
        formData.append('pdfFile', file);


        // Send the file to the server
        const response = await fetch('http://localhost:3001/api/upload-pdf', {
          method: 'POST',
          data : formData,
        });

        // Assuming the server returns some data
        const data = await response.json();

        // Do something with the response from the server (e.g., update state or show a success message)

        console.log('Server Response:', data);
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    };




    //create PDF
    const generatePdf = async () => {
      try {
        // Fetch the font file from Google Fonts
        const googleFontsUrl = 'https://fonts.googleapis.com/css2?family=Kanit:wght@100&display=swap';

        const cssResponse = await fetch(googleFontsUrl);
        const cssText = await cssResponse.text();

        // Extract the font URL from the CSS text
        const fontUrlMatch = cssText.match(/url\('(.+\.woff2)'\)/);
        if (!fontUrlMatch) {
          throw new Error('Font URL not found in CSS');
        }

        const fontUrl = fontUrlMatch[1];

        // Fetch the font file
        const fontResponse = await fetch(fontUrl);
        const fontArrayBuffer = await fontResponse.arrayBuffer();

        // Continue with embedding the font and generating the PDF
        // ...
      } catch (error) {
        console.error('Error fetching font:', error);
        return; // Handle the error as needed
      }

      const page = pdfDoc.addPage();

      const customFont = await pdfDoc.embedFont(fontBytes);

      const { width, height } = page.getSize();

      const frameWidth = 500;
      const frameHeight = 150;
      const frameX = 50;
      const frameY = height - 200;

      page.drawRectangle({
        x: frameX,
        y: frameY,
        width: frameWidth,
        height: frameHeight,
        borderColor: rgb(0, 0, 0),
        fillColor: rgb(1, 1, 1, 0),
      });

      // Define labels and values
      const data = [
        { label: 'ชื่อการค้าเครื่องสำอาง : ', value: inputcomName },
        { label: 'ชื่อเครื่องสำอาง :', value: inputcosName },
        { label: 'ประเภทของเครื่องสำอาง :', value: inputtypeGoods },
        { label: 'จุดประสงค์การใช้', value: inputconGoods },
        { label: 'ลักษณะทางกายภาพ', value: inputpy },
        { label: 'ชื่อผู้ผลิตต่างประทศ', value: inputfentrepreneur },
        { label: 'ชื่อผู้นำเข้า / ผู้ผลิต ', value: inputentrepreneur },
        { label: 'เลขที่ใบรับจดแจ้ง ', value: fda },
        { label: 'รายละเอียดเพิ่มเติม ', value: des },
      ];

      // Draw each label and value inside the frame
      data.forEach((item, index) => {
        const labelY = frameY + frameHeight - 30 - index * 60; // Adjust the spacing as needed
        const valueY = frameY + frameHeight - 30 - index * 60;
        page.drawText(`${item.label}:`, {
          x: frameX + 50,
          y: labelY + 20,
          font: customFont,
          color: rgb(0, 0, 0),
        });
        page.drawText(item.value, {
          x: frameX + 200,
          y: valueY + 20,
          font: customFont,
          color: rgb(0, 0, 0),
        });
      });

      const pdfBytes = await pdfDoc.save();

      const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });
      const pdfUrl = URL.createObjectURL(pdfBlob);
      setPdfUrl(pdfUrl);



      console.log(pdfBytes);
    };

    const PdfViewer = ({ pdfBytes }) => {
      return (
        <div>
          <Worker workerUrl={`https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`}>
            <Viewer fileUrl={`data:application/pdf;base64,${pdfBytes.toString('base64')}`} />
          </Worker>
        </div>
      );
    };



    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    return(
    <>
    <p>{inputcomName}</p>
    <Navbar/>
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
                paddingTop: {xs:"50px", md:"50px"}

            }}

            >
                <img src="/secret-file.png" style={{ maxWidth: 0 + "150px" }}/>

            </Box>
            <Box className="upload_right"
            sx={{

                textAlign:{xs:'center',md:"center"},
                justifyContent:{xs:"center",md:"center"}
            }}

            >
                <Typography variant="h3"
                sx={{
                    marginTop:{xs:"100px",md:"100px"},
                    marginLeft:{xs:"50px",md:"50px"}
                }}
                >ระบบจัดการ PIF</Typography>

            </Box>
    </Box>

    <Box className="pif1">
        <Typography variant="h6"
        sx={{
            marginTop:{xs:"20px",md:"20px"},
            marginLeft:{xs:"80px",md:"80px"}
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
                <Typography variant="h6">ชื่อไฟล์ PIF</Typography>
                <TextField label="ชื่อไฟล์ PIF" />
            </Box>

          <Box>
          <Typography variant="h6">วันหมดอายุ</Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker />
          </LocalizationProvider>
                


          </Box>



        </Box>

        <Box  sx={{


            justifyContent: { xs: "", md: "center" },
            textAlign: { xs: "center", md: "center" },
            display: { xs: "block", md: "flex" },

          }}>

        </Box>

        <Box sx={{ width: '100%',marginLeft:{xs:"80px",md:"80px"} ,marginRight:{xs:"80px",md:"80px"} ,marginTop:{xs:"30px",md:"30px"}}}>
        <h6>อัพโหลดเอกสารหรือกรอกข้อมูลเกี่ยวกับเครื่องสำอางในแต่ละส่วน</h6>
        </Box>

        <Box sx={{ width: '90%',marginLeft:{xs:"80px",md:"80px"} ,marginRight:{xs:"80px",md:"80px"} ,marginTop:{xs:"30px",md:"30px"}}}>
        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary>
          <Typography>อัพโหลดเอกสารหรือกรอกข้อมูล PIF ส่วนที่ 1</Typography>
        </AccordionSummary>
        <AccordionDetails


        >
          <Typography>
            1.ข้อมูลทั่วไป
          </Typography>
        

   
    <Box 
    sx={{
      display: 'flex',  // Set display to flex
      flexDirection: 'column',  // Align items in a row,
      
       // Center items in Y axis,
    }}>
    <TextField  variant="outlined" label="เลขที่จดแจ้ง" style={{width:"50%",marginTop:"10px"}} onChange={(e) => {setFda(e.target.value)}}/>
    
    <Box>
        <Button 
              onClick={() => {fetchData()}}
              textAlign="center"
              variant="contained"
              sx={{ 
                marginTop: "10px",
              }}
              
            >
              ดึงข้อมูล
        </Button>
    </Box>

    </Box>
    

    <Box>
      <TextField id="outlined-basic" label="ชื่อทางการค้า" style={{width:"50%",marginTop:"10px"}}  value={comName} onChange={(e) => (setInputcomName(e.target.value))} />

    </Box>

    <Box
    >
      <TextField id="outlined-basic" label="ชื่อเครื่องสำอาง" style={{width:"50%",marginTop:"10px"}} value = {cosName} onChange = {(e) => (setInputcosName(e.target.value))} />

    </Box>


    <Box >
      <TextField id="outlined-basic" label="ประเภทของเครื่องสำอาง" style={{width:"50%",marginTop:"10px"}} value={typeGoods} onChange={(e) => (setInputtypeGoods(e.target.value))}/>

    </Box>
    <Box >
      <TextField id="outlined-basic" label="วันที่แจ้งจดแจ้ง" style={{width:"50%",marginTop:"10px"}} value={dateS} onChange={(e) => (setInputdateS(e.target.value))}/>

    </Box>

    <Box>
      <TextField id="outlined-basic" label="วันที่ใบอนุญาตหมดอายุ" style={{width:"50%",marginTop:"10px"}} value={expDate} onChange={(e) => (setInputexpDate(e.target.value))}/>

    </Box>
    <Box >
      <TextField id="outlined-basic" label="จุดประสงค์การใช้" style={{width:"50%",marginTop:"10px"}} value={objGoods} onChange={(e) => (setInputobjGoods(e.target.value))}/>

    </Box>


    <Box>
      <TextField id="outlined-basic" label="ลักษณะทางกายภาพ" style={{width:"50%",marginTop:"10px"}} onChange={(e) => (setInputpy(e.target.value))} />

    </Box>


      <Box sx={{
        gap: { xs: "20px", md: "20px" },
        display: { xs: "block", md: "flex" },
        marginTop:{xs:"10px",md:"10px"},
        
      }}>
                    <TextField 

                        marginTop="10px"
                        id="outlined-multiline-static"
                        label = "ชื่อผู้ผลิต"
                        variant="outlined"
                        multiline
                        onChange={(e) => (setinputentrepreneur(e.target.value))}
                        rows={4}
                        width = {'40ch'}
                        m = "1"
                        value={entrepreneur}
                    />
                    <TextField
                        id="outlined-multiline-static"
                        label = "ชื่อผู้ผลิตต่างประเทศ"
                        variant="outlined"
                        onChange={(e) => (setinputfentrepreneur(e.target.value))}
                        multiline
                        rows={4}
                        width = {'40ch'}
                        m = "1"
                        value={fentrepreneur}
                    />
                    <TextField
                        id="outlined-multiline-static"
                        label = "รายละเอียดเพิ่มเติม"
                        variant="outlined"
                        onChange={(e) => setDes(e.target.value) }
                        multiline
                        rows={4}
                        width = {'40ch'}
                        m = "1"
                    />
                </Box>

                <Box 
                sx={{
                  marginTop:{xs:"10px",md:"10px"},
                  textAlign: { xs: "center", md: "center" },
                  
                }}>

                <button onClick={generatePdf}>Generate PDF</button>

                </Box>
                   

          {pdfUrl && (
          <div>
            <h2>Generated PDF</h2>
          <iframe title="Generated PDF" src={pdfUrl} width="100%" height="600px" />
        </div>
            )}

      



      <Box sx={{
        textAlign: { xs: "center", md: "center" },
    }}>
        <Button
              type="submit"
              textAlign="center"
              variant="contained"
              sx={{ mt: 3, mb: 2}}
              
            >
              อัพโหลด
        </Button>
    </Box>

          <Typography
          sx={{
            marginTop:{xs:"10px",md:"10px"},
            maeginbottom:{xs:"10px",md:"10px"}
          }}

          >สำเนาใบรับจดแจ้งเครื่องสำอาง</Typography>
         <Box
          style={{
            borderRadius: '5px',
            boxShadow: '0px 0px 3px 2px rgba(0, 0, 0, 0.25)',
            marginTop:"10px"
          }}>
          <Button
            variant="contained"
            component="label"
            >
            <input
                id="filename"
                type="file"
                onChange={(e) => {
                    document.getElementById("upload1").innerHTML = e.target.files[0].name;
                }}
                hidden
            />เลือกไฟล์
            </Button>
            <span id="upload1" style={{ marginLeft: "10px" }}>ไม่ได้เลือกไฟล์ใด</span>
            
            </Box>

            <Typography
          sx={{
            marginTop:{xs:"10px",md:"10px"},
            marginbottom:{xs:"10px",md:"10px"}
          }}

          >หนังสือยืนยันการเป็นเจ้าของเครื่องสำอาง /  Letter of Authorization </Typography>
          <Box
          style={{
            borderRadius: '5px',
            boxShadow: '0px 0px 3px 2px rgba(0, 0, 0, 0.25)',
            marginTop:"10px"
          }}>
          <Button
            variant="contained"
            component="label"
            >
            <input
                id="filename"
                type="file"
                onChange={(e) => {
                    setFile1(e.target.files[0].name)
                    //document.getElementById("upload2").innerHTML = e.target.files[0].name;
                }}
                hidden
            />เลือกไฟล์
            </Button>
            <span id="upload2" style={{ marginLeft: "10px" }}>ไม่ได้เลือกไฟล์ใด</span>
            </Box>
                <hr></hr>

            <Typography>
            2. สูตรส่วนประกอบของเครื่องสำอาง
            </Typography>
                <br/>
            <Autocomplete
      id="grouped-demo"
      options={
        options ? options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter)) : []
      }
      groupBy={(option) => option.firstLetter}
      getOptionLabel={(option) => option.groupname}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="เลือกข้อมูลจากฐานข้อมูล ICAE" />}
    />



            <Typography sx={{
                marginTop:{xs:"10px",md:"10px"},
            }}>หรือ อัพโหลดไฟล์สูตรส่วนประกอบเครื่องสำอาง</Typography>
            <Box
          style={{
            borderRadius: '5px',
            boxShadow: '0px 0px 3px 2px rgba(0, 0, 0, 0.25)',
            marginTop:"10px"
          }}>
          <Button
            variant="contained"
            component="label"

            >
            <input
                id="filename"
                type="file"
                onChange={(e) => {
                    document.getElementById("upload3").innerHTML = e.target.files[0].name;
                }}
                hidden
            />เลือกไฟล์
            </Button>
            <span id="upload3" style={{ marginLeft: "10px" }}>ไม่ได้เลือกไฟล์ใด</span>
            </Box>

            <hr></hr>
            <Typography>3. ฉลากเครื่องสำอาง</Typography>
            <Box
          style={{
            borderRadius: '5px',
            boxShadow: '0px 0px 3px 2px rgba(0, 0, 0, 0.25)',
            marginTop:"10px"
          }}>
          <Button
            variant="contained"
            component="label"
            >
            <input
                id="filename"
                type="file"
                onChange={(e) => {
                    document.getElementById("upload4").innerHTML = e.target.files[0].name;
                }}
                hidden
            />เลือกไฟล์
            </Button>
            <span id="upload4" style={{ marginLeft: "10px" }}>ไม่ได้เลือกไฟล์ใด</span>
            </Box>
            <hr></hr>

            <Typography>
            4. ข้อมูลเกี่ยวกับการผลิต
            </Typography>

            <Typography
            sx={{
                marginTop:{xs:"10px",md:"10px"},

            }}>ครั้งที่ผลิต / LOT</Typography>
            <TextField  variant="outlined" label="ครั้งที่ผลิต / LOT" style={{width:"30%",marginTop:"10px"}}/>
            <Typography
          sx={{
            marginTop:{xs:"10px",md:"10px"},
            maeginbottom:{xs:"10px",md:"10px"}
          }}

          >ข้อมูลการผลิต</Typography>
         <Box
          style={{
            borderRadius: '5px',
            boxShadow: '0px 0px 3px 2px rgba(0, 0, 0, 0.25)',
            marginTop:"10px"
          }}>
          <Button
            variant="contained"
            component="label"
            >
            <input
                id="filename"
                type="file"
                onChange={(e) => {
                    document.getElementById("upload5").innerHTML = e.target.files[0].name;
                }}
                hidden
            />เลือกไฟล์
            </Button>
            <span id="upload5" style={{ marginLeft: "10px" }}>ไม่ได้เลือกไฟล์ใด</span>
            </Box>

            <Typography
          sx={{
            marginTop:{xs:"10px",md:"10px"},
            maeginbottom:{xs:"10px",md:"10px"}
          }}

          >GMP / ISO</Typography>
         <Box
          style={{
            borderRadius: '5px',
            boxShadow: '0px 0px 3px 2px rgba(0, 0, 0, 0.25)',
            marginTop:"10px"
          }}>
          <Button
            variant="contained"
            component="label"
            >
            <input
                id="filename"
                type="file"
                onChange={(e) => {
                    document.getElementById("upload6").innerHTML = e.target.files[0].name;
                }}
                hidden
            />เลือกไฟล์
            </Button>
            <span id="upload6" style={{ marginLeft: "10px" }}>ไม่ได้เลือกไฟล์ใด</span>
            </Box>
            <hr></hr>

            <Typography>
            5.รายงานสรุปอาการอันไม่พึงประสงค์จากการใช้เครื่องสำอาง
          </Typography>

         <Box
          style={{
            borderRadius: '5px',
            boxShadow: '0px 0px 3px 2px rgba(0, 0, 0, 0.25)',
            marginTop:"10px"
          }}>
          <Button
            variant="contained"
            component="label"
            >
            <input
                id="filename"
                type="file"
                onChange={handleFileChange}
                hidden
            />เลือกไฟล์
            </Button>
            <span id="upload7" style={{ marginLeft: "10px" }}>ไม่ได้เลือกไฟล์ใด</span>
            </Box>
            <hr></hr>

            <Typography>
            6. การประเมินความสอดคล้องของการกล่าวอ้างสรรพคุณเครื่องสำอาง
          </Typography>

         <Box
          style={{
            borderRadius: '5px',
            boxShadow: '0px 0px 3px 2px rgba(0, 0, 0, 0.25)',
            marginTop:"10px"
          }}>
          <Button
            variant="contained"
            component="label"
            >
            <input
                id="filename"
                type="file"
                onChange={(e) => {
                    document.getElementById("upload8").innerHTML = e.target.files[0].name;
                }}
                hidden
            />เลือกไฟล์
            </Button>
            <span id="upload8" style={{ marginLeft: "10px" }}>ไม่ได้เลือกไฟล์ใด</span>
            </Box>





        </AccordionDetails>
      </Accordion>

      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          <Typography>อัพโหลดเอกสารหรือกรอกข้อมูล PIF ส่วนที่ 2</Typography>
        </AccordionSummary>
        <AccordionDetails>




            <Typography>
            1. ข้อกำหนดของวัตถุดิบ
          </Typography>

         <Box
          style={{
            borderRadius: '5px',
            boxShadow: '0px 0px 3px 2px rgba(0, 0, 0, 0.25)',
            marginTop:"10px"
          }}>
          <Button
            variant="contained"
            component="label"
            >
            <input
                id="filename"
                type="file"
                onChange={(e) => {
                    document.getElementById("upload9").innerHTML = e.target.files[0].name;
                }}
                hidden
            />เลือกไฟล์
            </Button>
            <span id="upload9" style={{ marginLeft: "10px" }}>ไม่ได้เลือกไฟล์ใด</span>
            </Box>


            <Typography sx={{
                marginTop:{xs:"10px",md:"10px"},
            }}
            >
            certificate of analysis (COA)
          </Typography>

         <Box
          style={{
            borderRadius: '5px',
            boxShadow: '0px 0px 3px 2px rgba(0, 0, 0, 0.25)',
            marginTop:"10px"
          }}>
          <Button
            variant="contained"
            component="label"
            >
            <input
                id="filename"
                type="file"
                onChange={(e) => {
                    document.getElementById("upload11").innerHTML = e.target.files[0].name;
                }}
                hidden
            />เลือกไฟล์
            </Button>
            <span id="upload11" style={{ marginLeft: "10px" }}>ไม่ได้เลือกไฟล์ใด</span>
            </Box>
            <hr></hr>

            <Typography>
            2. ข้อมูลแสดงความปลอดภัยของวัตถุดิบทุกรายการ (Safety Data Sheet : SDS)
          </Typography>

         <Box
          style={{
            borderRadius: '5px',
            boxShadow: '0px 0px 3px 2px rgba(0, 0, 0, 0.25)',
            marginTop:"10px"
          }}>
          <Button
            variant="contained"
            component="label"
            >
            <input
                id="filename"
                type="file"
                onChange={(e) => {
                    document.getElementById("upload10").innerHTML = e.target.files[0].name;
                }}
                hidden
            />เลือกไฟล์
            </Button>
            <span id="upload11" style={{ marginLeft: "10px" }}>ไม่ได้เลือกไฟล์ใด</span>
            </Box>


        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
          <Typography>อัพโหลดเอกสารหรือกรอกข้อมูล PIF ส่วนที่ 3</Typography>
        </AccordionSummary>
        <AccordionDetails>

        <Typography>1. สูตรแม่บท (Master formula)</Typography>
            <Box
          style={{
            borderRadius: '5px',
            boxShadow: '0px 0px 3px 2px rgba(0, 0, 0, 0.25)',
            marginTop:"10px"
          }}>
          <Button
            variant="contained"
            component="label"
            >
            <input
                id="filename"
                type="file"
                onChange={(e) => {
                    document.getElementById("upload12").innerHTML = e.target.files[0].name;
                }}
                hidden
            />เลือกไฟล์
            </Button>
            <span id="upload12" style={{ marginLeft: "10px" }}>ไม่ได้เลือกไฟล์ใด</span>
            </Box>
            <hr></hr>

            <Typography>2. ข้อกำหนดของเครื่องสำอางสำเร็จรูป (Specification of cosmetic finished product)</Typography>
            <Box
          style={{
            borderRadius: '5px',
            boxShadow: '0px 0px 3px 2px rgba(0, 0, 0, 0.25)',
            marginTop:"10px"
          }}>
          <Button
            variant="contained"
            component="label"
            >
            <input
                id="filename"
                type="file"
                onChange={(e) => {
                    document.getElementById("upload13").innerHTML = e.target.files[0].name;
                }}
                hidden
            />เลือกไฟล์
            </Button>
            <span id="upload13" style={{ marginLeft: "10px" }}>ไม่ได้เลือกไฟล์ใด</span>
            </Box>
            <hr></hr>

            <Typography>3. วิธีการทดสอบเครื่องสำอางสำเร็จรูป (Testing method for cosmetic finished product) </Typography>
            <Box
          style={{
            borderRadius: '5px',
            boxShadow: '0px 0px 3px 2px rgba(0, 0, 0, 0.25)',
            marginTop:"10px"
          }}>
          <Button
            variant="contained"
            component="label"
            >
            <input
                id="filename"
                type="file"
                onChange={(e) => {
                    document.getElementById("upload14").innerHTML = e.target.files[0].name;
                }}
                hidden
            />เลือกไฟล์
            </Button>
            <span id="upload14" style={{ marginLeft: "10px" }}>ไม่ได้เลือกไฟล์ใด</span>
            </Box>

        </AccordionDetails>
      </Accordion>

        </Box>



    </Box>

    <Box sx={{
        textAlign: { xs: "center", md: "center" },
    }}>
        <Button
              type="submit"
              textAlign="center"
              variant="contained"
              color="success"
              sx={{ mt: 3, mb: 2}}
            >
              ยืนยัน
        </Button>
    </Box>


    <Footer/>
    </>
    )

}
