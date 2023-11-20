
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/Footer";
import { Box, Card, CardContent, TextField, Typography } from "@mui/material";
import * as React from 'react';
import Button from '@mui/material/Button';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import { useRouter } from "next/router";
import TabPanel from '@mui/lab/TabPanel';


export default function manage() {
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
    setValue(newValue);
    };

    const router = useRouter();
    const handleClick = (e, path) => {
    e.preventDefault();
    router.push(path);
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
            <Box className="manage_left"
            sx={{
                
                justifyContent: { xs: "", md: "center" },
                display: { xs: "block", md: "flex" },
                paddingTop: {xs:"50px", md:"50px"}

            }}

            >
                <img src="/secret-file.png" style={{ maxWidth: 0 + "150px" }}/>

            </Box>
            <Box className="manage_right"
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
            เอกสารที่ต้องเตรียมสำหรับการจัดทำ PIF
        </Typography>

        

        

    </Box>


    <Box sx={{ width: '100%', typography: 'body1',marginLeft:{xs:"80px",md:"80px"} ,marginRight:{xs:"80px",md:"80px"} ,marginTop:{xs:"30px",md:"30px"}}}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} >
            <Tab label="PIF ส่วนที่ 1 " value="1" />
            <Tab label="PIF ส่วนที่ 2" value="2" />
            <Tab label="PIF ส่วนที่ 3" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1">
            <h6>ส่วนที่ 1 ภาพรวมของเครื่องสำอาง</h6>
            <h7>1. ข้อมูลทั่วไป</h7>
            <li>สำเนาใบรับจดแจ้งเครื่องสำอาง</li>
            <li>หนังสือยืนยันการเป็นเจ้าของเครื่องสำอาง กรณีที่เป็นเครื่องสำอางที่ผลิตในประเทศไทย</li>
            <li>หนังสือยืนยันการเป็นเจ้าของเครื่องสำอาง กรณีที่เป็นเครื่องสำอางนำเข้ามาจากต่างประเทศ</li>
            <h7>2. สูตรส่วนประกอบของเครื่องสำอาง</h7>
            <p></p>
            <img src="/fomula-ex.png" style={{ maxWidth: 0 + "550px" }}/>
            <p></p>
            <h7>3. ฉลากเครื่องสำอาง</h7><p></p>
            <h7>4. ข้อมูลเกี่ยวกับการผลิต</h7><p></p>
            <h7>5. รายงานสรุปอาการอันไม่พึงประสงค์จากการใช้เครื่องสำอาง (Adverse event report) กรณีมีการเกิดอาการอันไม่พึงประสงค์จากการใช้เครื่องสำอาง</h7><p></p>
            <h7>6. การประเมินความสอดคล้องของการกล่าวอ้างสรรพคุณเครื่องสำอาง ต้องมีข้อมูลสนับสนุนการอ้างประสิทธิภาพหรือสรรพคุณของเครื่องสำอางตามที่กล่าวอ้างบนฉลาก
หรือโฆษณา </h7>
        
        
        </TabPanel>
        <TabPanel value="2">
            <h6>ส่วนที่ 2 ข้อมูลของวัตถุดิบ</h6>
            <h7>1. ข้อกำหนดของวัตถุดิบ</h7><p></p>
            <h7>ต้องมีรายละเอียดคุณลักษณะเฉพาะของวัตถุดิบ และส่วนประกอบทุกรายการที่นำมาผสมในตำรับเครื่องสำอาง</h7><p></p>
            <h7>2. ข้อมูลแสดงความปลอดภัยของวัตถุดิบทุกรายการ</h7>
        </TabPanel>
        <TabPanel value="3">
            <h6>ส่วนที่ 3 ข้อมูลเครื่องสำอางสำเร็จรูป</h6>
            <h7>1. สูตรแม่บท (Master formula)</h7><p></p>
            <h7>2. ข้อกำหนดของเครื่องสำอางสำเร็จรูป </h7><p></p>
            <h7>3. วิธีการทดสอบเครื่องสำอางสำเร็จรูป </h7><p></p>
            <h7>เอกสารที่แสดงวิธีการทดสอบยืนยันว่าเครื่องสำอางสำเร็จรูปนั้นมีคุณลักษณะเฉพาะเป็นไปตามข้อกำหนดและไม่มีสารห้ามใช้ตามประกาศกระทรวงสาธารณสุข</h7>
        </TabPanel>
      </TabContext>
    </Box>

    <Box
    sx={{
        justifyContent: { xs: "center", md: "center" },
        display: { xs: "block", md: "flex" },
        marginBottom:{xs:"30px",md:"30px"},
        marginTop:{xs:"30px",md:"30px"}
    
    }}
    
    >
        <Button onClick={(e) => handleClick(e, "/pif/upload")} style={{ Width:"100%" , borderRadius:"5px", backgroundColor:"#299D95" }}>
                
                    <Typography sx={{ fontSize: 14 }} color="white" >
                        คลิกเพื่อเข้าสู่หน้าการจัดการ PIF
                    </Typography>

                
        </Button>
    </Box>


    <Footer/>
    </>
    )

}