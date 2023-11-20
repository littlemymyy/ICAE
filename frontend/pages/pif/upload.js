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

import { Box, TextField, Typography, Button } from "@mui/material";

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

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    return(
    <>
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

    <Box classname="pif1">
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
          <Typography variant="h6" >วันที่จดแจ้งเครื่องสำอาง</Typography>
            <LocalizationProvider  dateAdapter={AdapterDayjs}>
            <DatePicker label="วันที่จดแจ้งเครื่องสำอาง"/>
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
          
          >หนังสือยืนยันการเป็นเจ้าของเครื่องสำอาง</Typography>
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
                    document.getElementById("upload2").innerHTML = e.target.files[0].name;
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
            <Typography sx={{
                marginTop:{xs:"10px",md:"10px"},
            }}>คลิกเพื่อดึงข้อมูลจากสูตรส่วนประกอบเครื่องสำอางที่เคยบันทึกลงระบบ</Typography>
            <Button variant="contained" sx={{
                marginTop:{xs:"10px",md:"10px"},
            
            }}>
                ดึงข้อมูล
            </Button>
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
                onChange={(e) => {
                    document.getElementById("upload7").innerHTML = e.target.files[0].name;
                }}
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
              sx={{ mt: 3, mb: 2}}
            >
              ยืนยัน 
        </Button>
    </Box>
    
   


    <Footer/>
    </>
    )

}