import Footer from "@/components/Footer"
import React from "react"
import Navbar from "@/components/layout/Navbar"
import { Box, Card, CardContent } from "@mui/material"
import { CardActions } from "@mui/material"
import { Typography } from "@mui/material"
import { Button } from "@mui/material"
import { Table } from "@mui/material"
import { TableBody } from "@mui/material"
import { TableCell } from "@mui/material"
import { TableContainer } from "@mui/material"
import { TableHead } from "@mui/material"
import { TableRow } from "@mui/material"
import Paper from '@mui/material/Paper';
import { Margin } from "@mui/icons-material"

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


    <Box sx={{ marginLeft:"200px" , marginRight:"200px", paddingTop:"50px"}}>
        <TableContainer component={Paper} >
            <Table sx={{ minWidth: 100  }} aria-label="simple table">
                <TableHead>
                <TableRow>
        
                    <TableCell align="right">CAS NO</TableCell>
                    <TableCell align="right">ชื่อสารเคมี</TableCell>
                    <TableCell align="right">ประเภท</TableCell>
                    <TableCell align="right">ความสามารถ</TableCell>
                </TableRow>
                </TableHead>

       
            </Table>
        </TableContainer>
    </Box>
        

        <Footer />
        </>

        
    )
}