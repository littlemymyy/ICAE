import * as React from 'react';
import Footer from "@/components/Footer"
import Navbar from "@/components/layout/Navbar"
import { Box,  CardContent,  Typography } from "@mui/material"
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import {  CardActionArea } from '@mui/material';
import Axios from "axios"
import Grid from '@mui/material/Grid';
import { useEffect , useState } from 'react';



export default function showpif(){
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');


    useEffect(() => {
      var userData = sessionStorage.getItem("uemail");
      console.log(userData);
        Axios.request(
            {
                method: 'get',
                url: `http://localhost:3001/api/pif?email=${userData}`,
                headers: { },
                data : ''
            }
        ).then((response) => {
            let data = JSON.stringify(response.data.message)
            if (response.data.status === "ok"){
                setData(response.data.message);
            } else {
                setData('')
            }

            console.log(data)
        }).catch((error) => {
            console.log(error);
        }
        )
    }, []);
 
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
            <Typography variant='h5'>รายการผลิตภัณฑ์ที่จัดทำ PIF </Typography>
        </Box>

        <Box display="flex" alignItems="center">
       
        </Box>
        <Box display="flex" alignItems="center">
        <div className="input-icons">
        <i className="fa fa-search icon"></i>
        <input placeholder='ค้นหาโดยชื่อไฟล์ PIF'
          className="in"
          type="text"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
       
       
        </div>
     
        </Box>

        <Grid container spacing={0}>
        {data ? 
        data.filter((item) => {
          if (search == "") {
            return item
          } else if (item.file_name.toLowerCase().includes(search.toLowerCase())) {
            return item
          }
        }).map((item) => (
          <Grid item sx={{margin:'auto', textAlign:'center', marginTop:'20px', marginButtom:'20px'}}>
          <Card sx={{ width: '250px '}}>
            <CardActionArea
              href={`http://localhost:3001/${item.pdf_path}`}
            >
                <CardMedia sx={{textAlign:"center", marginTop:"20px"}}>
                <img src={`http://localhost:3001/${item.img_path}`} style={{ width: "150px" , height:"150px",  objectFit: "cover" ,textAlign:"center"}}/>
                </CardMedia>
              <CardContent sx={{ marginLeft:"50px", marginRight:"50px" }}>
                <Typography gutterBottom variant="h6" textAlign="center" component="div">
                  {item.file_name}
                </Typography>
                <Typography gutterBottom variant="h7" textAlign="center" component="div">
                  วันหมดอายุ
                </Typography>
                <Typography gutterBottom variant="body2" textAlign="center" component="div">
                {
                  //change date format
                  new Date(item.expdate).toLocaleDateString('th-TH', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })
                }
                </Typography>
              </CardContent>
            </CardActionArea>
            </Card>
          </Grid>
        )):
          <Box sx={{textAlign:'center', margin:'auto'}}>
            <Typography sx={{ textAlign:'center'}} >ไม่มีข้อมูล</Typography>
          </Box>
        }
        </Grid>
        <Footer />
        </>
    )
}