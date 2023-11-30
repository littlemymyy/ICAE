import * as React from 'react';
import Footer from "@/components/Footer"
import Navbar from "@/components/layout/Navbar"
import { Box,  Typography } from "@mui/material"
import Button from '@mui/material/Button';
import Axios from "axios";
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';




export default function productslist(){
    const [show , setShow] = React.useState([])
    const router = useRouter()
    const [search_input, setSearch_input] = React.useState("");
    const [data , setData] = React.useState([])
    const [id , setId] = React.useState("")

    useEffect(() => {
        const fetchData = async () => {
            console.log(sessionStorage.getItem("orid"))
            let id = sessionStorage.getItem("orid")
            setId(id)
            let load = {
                data : id
            }
          const res =  await Axios({
                url : "http://localhost:3001/api/pifData",
                method : "post" ,
                data : load ,
            })
            console.log(res.data)
            setData(res.data)
        };
    
        fetchData(); // Call function here 
    
       
       
      }, []); 


      const resultsearch = (e) => {
        console.log("Type of e:", typeof e);
        if (e.length === 0) {
            setShow([])
            setSearch_input('')
          }

          else {
            let a = e.toString()
            
            console.log("a is "+a)
            setSearch_input(a)
            const results1 = data.filter((w) => {
                //console.log(w.fda_license)
              return (
                a &&
                w &&
                w.fda_license &&
                w.reportdate &&
                w.reportname &&
                (w.reportname.toLowerCase().includes(a) || w.reportname.toUpperCase().includes(a))
              );
            });
            setShow(results1)
            console.log(results1)
          }
      }

      const buttonStyle = {
        backgroundColor: '#897BF1', 
        float: 'left', 
        marginTop: '10px',
    };

    const handleButtonClick = (e) => {
      
      if(e === 1) {
        router.push('/pif/manage'); 
      }
      else if( e === 2){
        router.push('/pif/record'); 
      }

      else if(e ===3) {
        router.push('/team/team'); 
      }
  };

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
            <Typography variant='h5'>รายการ PIF ของ {id}</Typography>
        </Box>
        <Box display="flex" alignItems="center">
        <div className="input-icons">
        <i className="fa fa-search icon"></i>
        <input placeholder='ค้นหาโดยชื่อไฟล์ PIF'
          className="in"
          value={search_input}
          onChange={(e) => resultsearch(e.target.value)}
        />
         <Button variant="contained" size="medium"  style={buttonStyle} onClick={() => handleButtonClick(1)}
         >
            สร้าง PIF
        </Button>

        <Button variant="contained" size="medium"  sx={{ ml: 2 }} style={buttonStyle} onClick={() => handleButtonClick(2)}>
            จัดการ PIF
        </Button>

        <Button variant="contained" size="medium"  sx={{ ml: 2 }} style={buttonStyle} onClick={()=> handleButtonClick(3)}>
            สร้างทีม 
        </Button>

        <Box>
      <AvatarGroup
      renderSurplus={(surplus) => <span>+{surplus.toString()[0]}k</span>}
      total={5000}
      >
      <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
      <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
      <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
      <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
    </AvatarGroup>
        </Box>
       


        <br />
       
        <div>
     
      </div>

      </div>
        </Box>

        <Footer />
        </>
    )
}