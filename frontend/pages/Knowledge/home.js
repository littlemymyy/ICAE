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

        <Box display={"flex"} justifyContent={"space-around"}>

            <button style={{ Width:"250px", borderRadius:"5px", border:"1px solid #C4C4C4", backgroundColor:"#FDCF6F"}}>
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        สารต้องห้ามในผลิตภัณฑ์เครื่องสำอาง
                    </Typography>

                </CardContent>
            </button>
            <button style={{ Width:"100%" , borderRadius:"5px", border:"1px solid #C4C4C4",backgroundColor:"grey" }}>
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        สารที่กำหนดเงื่อนไขและปริมาณการใช้
                    </Typography>

                </CardContent>
            </button>

        </Box>

        <Box display={"flex"} justifyContent={"space-around"} marginTop={"30px"}>
            <button style={{ Width:"400px", borderRadius:"5px", border:"1px solid #C4C4C4", backgroundColor:"#BA6D9B" }}>
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        สารย้อมสี
                    </Typography>

                </CardContent>
            </button>
            <button style={{ Width:"100%" , borderRadius:"5px", border:"1px solid #C4C4C4",backgroundColor:"#517EF0"}}>
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        สารกันเสีย
                    </Typography>

                </CardContent>
            </button>
            <button style={{ Width:"100%" , borderRadius:"5px", border:"1px solid #C4C4C4", backgroundColor:"#F64444" }}>
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        สารกรองแสง UV
                    </Typography>

                </CardContent>
            </button>

        </Box>


        <Footer />
        </>


    )
}
