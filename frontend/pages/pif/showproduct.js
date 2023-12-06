import React from "react";
import { Box } from "@mui/system";
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/Footer";
import { Typography } from "@mui/material";


export default function showproduct(){
    return(
        <>
        <Navbar />
        <Box className="pif"
        sx={{
            backgroundColor: { xs: "#F8F8F8", md: "#F8F8F8" },
            justifyContent: { xs: "", md: "center" },
            display: { xs: "block", md: "flex" },
            textAlign: { xs: "center", md: "center" },
            paddingTop: { xs: "50px", md: "50px" },
            paddingBottom: { xs: "50px", md: "50px" },
          }}
        
        >
            <Box className="pif_left" 
            sx={{
                
                justifyContent: { xs: "", md: "center" },
                display: { xs: "block", md: "flex" },
                

            }}
            
            >
                <img src="/secret-file.png" style={{ maxWidth: 0 + "150px" }}/>
                
            </Box>
            <Box className="pif_right">
                 
                <h1>ระบบจัดการ PIF</h1>
                <h1>(Product Information File)</h1>
                
            
            </Box>
        </Box>
        <Box>
           <Typography sx={{
                textAlign: { xs: "center", md: "center" },
                paddingTop: { xs: "30px", md: "30px" },
                paddingBottom: { xs: "30px", md: "30px" },
              
           }} variant='h5'>รายการผลิตภัณฑ์</Typography>

        </Box>









        <Footer />
        </>
       
    )

}