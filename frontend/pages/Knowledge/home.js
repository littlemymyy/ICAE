import Footer from "@/components/Footer"
import Navbar from "@/components/layout/Navbar"
import { Box, Card, CardContent } from "@mui/material"

import { Typography } from "@mui/material"
import { Button } from "@mui/material"
import { useRouter } from "next/router";


export default function Home(){
    const router = useRouter();
    
    const handleClick = (e, path) => {
        e.preventDefault();
        router.push(path);
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
                <input id="searchname" style={{width:"400px", height:"42px", borderRadius:"5px", border:"1px solid #C4C4C4", padding:"10px"}}
                    type="text" placeholder="ค้นหาโดยชื่อสารเคมี, CAS NO  etc" name="search"
                />
                <button onClick={(e) => handleClick(e, `annex_search?search=${document.getElementById("searchname").value}`)} style={{width:"55px", height:"42px", borderRadius:"5px", border:"1px solid #C4C4C4", padding:"10px",backgroundColor:"#7e57c2",marginLeft:"5px"}}
                 type="button">
                    <text style={{color:"white"}}>ค้นหา</text>
                 </button>
            </form>

        </Box>

        <Box display={"flex"} justifyContent={"space-around"}>

            <Button onClick={(e) => handleClick(e, "/Knowledge/annex2")} style={{ Width:"250px", borderRadius:"5px", border:"1px solid #C4C4C4", backgroundColor:"#FFE4E1"}}>
                <CardContent sx={{
                    width: { xs: "350px", md: "350px" },
                }}>
                    <img src="/annex2.png" style={{ maxWidth: 0 + "50px"}}/>  
                    <Typography variant="h6" sx={{ marginTop:"10px"}} color="text.secondary" gutterBottom>
                        สารต้องห้ามในผลิตภัณฑ์เครื่องสำอาง
                    </Typography>

                </CardContent>
            </Button>
            <Button onClick={(e) => handleClick(e, "/Knowledge/annex3")} style={{ Width:"250px" , borderRadius:"5px", border:"1px solid #C4C4C4",backgroundColor:"#FDCF6F" }}>
                <CardContent sx={{
                    width: { xs: "350px", md: "350px" },
                }}>
                    <img src="/annex3.png" style={{ maxWidth: 0 + "50px" }}/>
                    <Typography variant="h6" sx={{ marginTop:"10px"}} color="text.secondary" gutterBottom>
                        สารที่กำหนดเงื่อนไขและปริมาณการใช้
                    </Typography>

                </CardContent>
            </Button>

        </Box>
        
        <Box display={"flex"} justifyContent={"space-around"} marginTop={"30px"}>
            <Button onClick={(e) => handleClick(e, "/Knowledge/annex4")} style={{ Width:"250px", borderRadius:"5px", border:"1px solid #C4C4C4", backgroundColor:"#F0F8FF" }}>
                <CardContent sx={{
                    width: { xs: "350px", md: "350px" },
                }}>

                    <img src="/annex4.png" style={{ maxWidth: 0 + "50px" }}/>
                    <Typography variant="h6" sx={{ marginTop:"10px"}} color="text.secondary" gutterBottom>
                        สารย้อมสี
                    </Typography>

                </CardContent>
            </Button>
            <Button onClick={(e) => handleClick(e, "/Knowledge/annex5")} style={{ Width:"100%" , borderRadius:"5px", border:"1px solid #C4C4C4",backgroundColor:"#F0FFF0"}}>
                <CardContent sx={{
                    width: { xs: "350px", md: "350px" },
                }}>
                    <img src="/annex5.png" style={{ maxWidth: 0 + "50px" }}/>
                    <Typography variant="h6" sx={{ marginTop:"10px"}} color="text.secondary" gutterBottom>
                        สารกันเสีย
                    </Typography>

                </CardContent>
            </Button>
            <Button onClick={(e) => handleClick(e, "/Knowledge/annex6")} style={{ Width:"100%" , borderRadius:"5px", border:"1px solid #C4C4C4", backgroundColor:"#FFF8DC" }}>
                <CardContent sx={{
                    width: { xs: "350px", md: "350px" },
                }} >
                    <img src="/annex6.png" style={{ maxWidth: 0 + "50px" }}/>
                    <Typography variant="h6" sx={{ marginTop:"10px"}} color="text.secondary" gutterBottom>
                        สารกรองแสง UV
                    </Typography>

                </CardContent>
            </Button>
            

        </Box>

        

        <Footer />
        </>


    )
}
