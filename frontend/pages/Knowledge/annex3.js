import Footer from "@/components/Footer"

import Navbar from "@/components/layout/Navbar"
import { Box, Card, CardContent, TableBody } from "@mui/material"
import { Table } from "@mui/material"
import { TableCell } from "@mui/material"
import { TableContainer } from "@mui/material"
import { TableHead } from "@mui/material"
import { TableRow } from "@mui/material"
import Paper from '@mui/material/Paper';
import Axios from "axios"
import React, { useEffect , useState } from 'react';



export default function Home(){
    const [data, setData] = useState([]);


    useEffect(() => {
        Axios.request(
            {
                method: 'get',
                url: 'http://localhost:3001/api/annex?st=3',
                headers: { },
                data : ''
            }
        ).then((response) => {
            let data = JSON.stringify(response.data.message)
            setData(response.data.message);

            console.log(data)
        }).catch((error) => {
            console.log(error);
        }
        )
    }, []);

    const evenRowStyle = {
        backgroundColor: '#F2F2F2',
    }; 

   

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
                <img src="/annex3.png" style={{ maxWidth: 0 + "200px" }}/>
                
            </Box>
            <Box className="home_Knowledge1_right">
                <h1>สารที่กำหนดเงื่อนไขและปริมาณการใช้</h1>
                
                <div className="litetext">
                    <p>รายละเอียดสารเคมีและคำอธิบายสารเคมีสำหรับเครื่องสำอาง</p>
                </div>
            </Box>
        </Box>

    <Box sx={{ marginLeft:"200px" , marginRight:"200px", paddingTop:"50px"}}>
        <TableContainer component={Paper} >
            <Table sx={{ minWidth: 100  }} aria-label="simple table">
                <TableBody>
                <TableRow>
                    <TableCell sx={{width:100}}align="left">CAS NO</TableCell>
                    <TableCell align="left">ชื่อสารเคมี</TableCell>
                    <TableCell align="left">ประเภท</TableCell>
                    <TableCell align="left">ความสามารถ</TableCell>
                </TableRow>
                </TableBody>

                <TableBody>
                {data.map((item, index) => (
                    <TableRow key={index} style={index % 2 === 0 ? evenRowStyle : null} >
                        <TableCell align="left">{item.cas}</TableCell>
                        <TableCell align="left">{item.name}</TableCell>
                        <TableCell align="left">{item.parts}</TableCell>
                        <TableCell align="left">{item.st}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
       
            </Table>
        </TableContainer>
    </Box>
        

        <Footer />
        </>

        
    )
}