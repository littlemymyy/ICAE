import * as React from 'react';
import Footer from "@/components/Footer"
import Navbar from "@/components/layout/Navbar"
import { Box,  Typography } from "@mui/material"


export default function productslist(){
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

        <Box 
        sx={{
                                   
            justifyContent: { xs: "", md: "center" },
            display: { xs: "block", md: "flex" },
            textAlign: { xs: "center", md: "center" },
            paddingTop: { xs: "30px", md: "30px" },
           
          
        }}>
            <Typography variant='h5'>รายการ PIF</Typography>
        </Box>
        <Box>
        <div className="input-icons">
        <i className="fa fa-search icon"></i>
        <input placeholder='ค้นหาโดยชื่อไฟล์ PIF'
          className="in"
          //value={search_input}
          onChange={(e) => resultsearch(e.target.value)}
        />
        <br />
        <div>
     
      </div>

      </div>
        </Box>

        <Footer />
        </>
    )
}