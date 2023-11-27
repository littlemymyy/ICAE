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

const annex0 = () => {
    const [data, setData] = useState([]);


    useEffect(() => {
        let load = {
            st : 0
        }
        Axios(
            {
                method: 'post' ,
                url: 'http://localhost:3001/api/annex',
                data : load
            }
        ).then((response) => {
            setData(response.data);

            console.log(data)
        }).catch((error) => {
            console.log(error);
        }
        )
    }, []);

    const evenRowStyle = {
        backgroundColor: '#e1f5fe',
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
                    <TableCell align="left">ปริมาณที่สามารถใช้ได้ (%)</TableCell>
                    
                </TableRow>
                </TableBody>

                <TableBody>
                {data.map((item, index) => (
                    <TableRow key={index} style={index % 2 === 0 ? evenRowStyle : null} >
                        <TableCell align="left">{item.no}</TableCell>
                        {
                            data.cmname !== null ? 
                            <TableCell align="left">{item.cmname}</TableCell>
                            :
                            <TableCell align="left">{item.cname}</TableCell>
                        }
                        
                        <TableCell align="left">{item.per}</TableCell>
                        
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

export default annex0