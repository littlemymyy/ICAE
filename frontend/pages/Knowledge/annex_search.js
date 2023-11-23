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

        //get from url after ?name=
        let url = window.location.href;
        let name = url.split('?search=');

        Axios.request(
            {
                method: 'get',
                url: `http://localhost:3001/api/annex/search?name=${name[1]}`,
                headers: { },
                data : ''
            }
        ).then((response) => {
            let data = JSON.stringify(response.data.message)
            if (response.data.status === "ok"){
                setData(response.data.message);
            }
            else {
                setData([{cas: "", name: "", maxt: "ไม่พบข้อมูล"}]);
            }

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
        <Box className="home_Knowledge"
        sx={{
            backgroundColor: { xs: "#F8F8F8", md: "#F8F8F8" },
            justifyContent: { xs: "", md: "center" },
            display: { xs: "block", md: "flex" },
            textAlign: { xs: "center", md: "center" },
          }}

        >
            <Box className="home_Knowledge1_left"
            sx={{

                justifyContent: { xs: "", md: "center" },
                display: { xs: "block", md: "flex" },

            }}

            >
                <img src="/know_home.png" style={{ maxWidth: 0 + "300px" }}/>

            </Box>
            <Box className="home_Knowledge1_right">
                <h1>คลังความรู้</h1>
                <h1>ข้อมูลรายละเอียดสารเคมี</h1>
                <div className="litetext">
                    <p>รายละเอียดสารเคมีและคำอธิบายสารเคมีสำหรับเครื่องสำอาง</p>
                </div>
            </Box>
        </Box>

        <Box marginTop={"20px"} marginBottom={"30px"}>
            <form style={{textAlign:"center"}}>
                <input style={{width:"400px", height:"42px", borderRadius:"5px", border:"1px solid #C4C4C4", padding:"10px"}}
                    type="text" placeholder="ค้นหาโดยชื่อสารเคมี, CAS NO  etc" name="search"
                />
                <button style={{width:"55px", height:"42px", borderRadius:"5px", border:"1px solid #C4C4C4", padding:"10px",backgroundColor:"#7e57c2",marginLeft:"5px"}}
                 type="submit">
                    <text style={{color:"white"}}>ค้นหา</text>
                 </button>
            </form>

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
                        <TableCell align="left">{item.cas}</TableCell>
                        <TableCell align="left">{item.name}</TableCell>
                        <TableCell align="left">{item.maxt}</TableCell>

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