import * as React from 'react';
import Footer from "@/components/Footer"
import Navbar from "@/components/layout/Navbar"
import { Box, TextField } from "@mui/material"
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Button from '@mui/material/Button';

export default function Home(){
    return(
        <>
        <Navbar />
        <Box className="home_Knowledge"
        sx={{
            backgroundColor: { xs: "#F8F8F8", md: "#F8F8F8" },
            justifyContent: { xs: "", md: "center" },
            display: { xs: "block", md: "flex" },
            textAlign: { xs: "center", md: "center" },
            paddingTop: { xs: "50px", md: "50px" },
            paddingBottom: { xs: "50px", md: "50px" },
          }}
        
        >
            <Box className="pif_noti_left" 
            sx={{
                
                justifyContent: { xs: "", md: "center" },
                display: { xs: "block", md: "flex" },
                

            }}
            
            >
                <img src="/secret-file.png" style={{ maxWidth: 0 + "150px" }}/>
                
            </Box>
            <Box className="pif_noti_right">
                 
                <h1>ระบบจัดการ PIF</h1>
                <h1>(Product Information File)</h1>
                
            
            </Box>
        </Box>

        <Box
        sx={{
           
            justifyContent: { xs: "", md: "center" },
            display: { xs: "block", md: "flex" },
            textAlign: { xs: "center", md: "center" },
            paddingTop: { xs: "30px", md: "30px" },
           
          }}>
            <h4>การแจ้งเตือนวันหมดอายุของใบจดแจ้ง อย.</h4>
        </Box>

        <Box 
        sx={{
            
            
            justifyContent: { xs: "", md: "center" },
            textAlign: { xs: "center", md: "center" },
            paddingTop: { xs: "30px", md: "30px" },
            paddingBottom: { xs: "10px", md: "10px" },
            display: { xs: "block", md: "flex" },
            flexWrap: { xs: "wrap", md: "wrap" },
            gap: { xs: "50px", md: "50px" },
          }}
          >
            <TextField label="ชื่อไฟล์ PIF" />

  
            <LocalizationProvider  dateAdapter={AdapterDayjs}>
            <DatePicker label="วันที่จดแจ้งอย."/>
            </LocalizationProvider>

            

            

        </Box>

        <Box  sx={{
            
            
            justifyContent: { xs: "", md: "center" },
            textAlign: { xs: "center", md: "center" }, 
            display: { xs: "block", md: "flex" },
            
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
        
        

        
            

        

        

        <Footer />
        </>

        
    )
}