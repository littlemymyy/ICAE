import { AppBar, Box, Container, Grid, Typography } from "@mui/material";
import { Fragment } from "react";
// import Navbar from "../components/layout/navbar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/Footer";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper/modules";

export default function Home() {
  const [icon, setIcon] = useState('/news1.jpeg')
  return (
    <>
      <Navbar />
      <Fragment>
        <Box
          justifyContent={"space-around"}
          position={"relative"}
          z-index={"-1"}
        >
          {/* <Typography variant="h6" m="10px 0px 0px 20px">
            news and updates
          </Typography> */}

          <Box>
            <Swiper
              spaceBetween={30}
              pagination={{
                clickable: true,
              }}
              Autoplay={true}
              modules={[Pagination]}
              className="mySwiper"
            >
              <SwiperSlide>
                <img className="slide_pic" src={icon} />
              </SwiperSlide>
              <SwiperSlide>
                <img className="slide_pic" src="/news2.jpeg" />
              </SwiperSlide>
            </Swiper>
          </Box>
        </Box>

        <Box
          m="10px 0px 10px 0px"
          sx={{
            justifyContent: { xs: "block", md: "space-around" },
            display: { xs: "block", md: "flex" },
            margin: { xs: "", md: "10px 0px 10px 0px" },
            textAlign: { xs: "center", md: "" },
          }}
        >
          <Box
            sx={{
              justifyContent: { xs: "center", md: "" },
              textAlign: { xs: "center", md: "left" },
              dispaly: { xs: "", md: "block" },
							margin:{xs:'20px 0px 20px 0px' , md:'20px 0px 20px 0px'},
							fontSize:{xs:'', md:'20px'},
            }}
          >
            <p>ผู้ช่วยสูตร</p>
					
            <Box
              sx={{
                justifyContent: { xs: "center", md: "left" },
                textAlign: { xs: "center", md: "left" },
                alignItems: "center",
                display: "flex",
                margin: { xs: "0px 0px 5px 0px", md: "0px 0px 5px 0px" },
              }}
            >
              <CheckCircleIcon
                sx={{ color: "green", fontSize: 20, marginRight: "5px" }}
              />
              <span>ตรวจสอบสูตรด้วยข้อมูลเดียวกับ อย. ไทย</span>
            </Box>
            <Box
              sx={{
                justifyContent: { xs: "center", md: "left" },
                textAlign: { xs: "center", md: "left" },
                dispaly: { xs: "flex", md: "" },
                margin: { xs: "0px 0px 5px 0px", md: "0px 0px 5px 0px" },
              }}
            >
              <CheckCircleIcon
                sx={{ color: "green", fontSize: 20, marginRight: "5px" }}
              />
              <span>รู้ข้อผิดพลาด</span>
            </Box>
            <Box
              sx={{
                justifyContent: { xs: "center", md: "left" },
                textAlign: { xs: "center", md: "left" },
                dispaly: { xs: "flex", md: "" },
                margin: { xs: "0px 0px 5px 0px", md: "0px 0px 5px 0px" },
              }}
            >
              <CheckCircleIcon
                sx={{ color: "green", fontSize: 20, marginRight: "5px" }}
              />
              <span>การแก้ไขออนไลน์</span>
            </Box>
          </Box>

          <Box
            sx={{
              justifyContent: { xs: "center", md: "" },
              textAlign: { xs: "center", md: "" },
              margin: { xs: "10px 0px 0px 0px", md: "" },
            }}
          >
            <img src="/ability.png" style={{ maxWidth: 200 + "px" }} />
          </Box>
        </Box>

        <Box
          sx={{
            display: { xs: "", md: "block" },
            textAlign: { xs: "center", md: "center" },
            padding: { xs: "30px 0px 30px 0px", md: "30px 0px 30px 0px" },
            backgroundColor: { xs: "rgb(219,233,245)", md: "rgb(219,233,245)" },
						
						
          }}
        >
          <Typography sx={{
							fontSize:{md:'30px',xs:'20px'},
					}} 
					
					>ข้อได้เปรียบหลัก</Typography>
          <Grid
            container
            sx={{
              textAlign: { xs: "", md: "center" },
							margin:{xs:'20px 0px 0px 0px' , md:'20px 0px 0px 0px'},
							fontSize:{xs:'', md:'20px'}
            }}
          >
            <Grid item xs={4} sx={{
							fontSize:{xs:'', md:'20px'}
						}} >
              <img src="/adven.png" style={{ maxWidth: 100 + "px" }} />
              <p>ข้อมูลที่ครอบคลุมและถูกต้อง</p>
            </Grid>
            <Grid item xs={4} >
              <img src="/adven2.png" style={{ maxWidth: 100 + "px" }} />
              <p>ตรวจสอบก่อนยื่นจริง</p>
            </Grid>
            <Grid item xs={4}>
              <img src="/adven3.png" style={{ maxWidth: 100 + "px" }} />
              <p>สมาร์ทครบวงจรในที่เดียวและสะดวกสบาย</p>
            </Grid>
          </Grid>
        </Box>
      </Fragment>
      <Footer></Footer>
      
    </>
  );
}
