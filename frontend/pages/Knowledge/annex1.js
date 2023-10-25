import Footer from "@/components/Footer"
import Navbar from "@/components/layout/Navbar"
import { Box, Card, CardContent } from "@mui/material"
import { CardActions } from "@mui/material"
import { Typography } from "@mui/material"
import { Button } from "@mui/material"

export default function Home(){
    return(
        <>
        <Navbar />
        <Box 
        sx={{
            backgroundColor: { xs: "#F8F8F8", md: "#F8F8F8" },
            justifyContent: { xs: "", md: "center" },
            display: { xs: "block", md: "flex" },
            textAlign: { xs: "center", md: "center" },
            paddingBottom: { xs: "50px", md: "50px" },
            paddingTop: { xs: "50px", md: "50px" },
          }}
        
        >
            <Box className="home_Knowledge1_left" 
            sx={{
                
                justifyContent: { xs: "", md: "center" },
                display: { xs: "block", md: "flex" },

            }}
            
            >
                <img src="/annex1.png" style={{ maxWidth: 0 + "200px" }}/>
                
            </Box>
            <Box className="home_Knowledge1_right">
                <h1>สารที่สามารถใช้งานได้</h1>
                
                <div className="litetext">
                    <p>รายละเอียดสารเคมีและคำอธิบายสารเคมีสำหรับเครื่องสำอาง</p>
                </div>
            </Box>
        </Box>

        

        <Footer />
        </>

        
    )
}