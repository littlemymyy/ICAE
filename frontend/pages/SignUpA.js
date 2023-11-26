// import Navbar from "@/components/layout/Navbar";
// import Footer from "@/components/Footer";
// import { Box, Button, Checkbox, Typography } from "@mui/material";
// import { Fragment } from "react";
// import TextField from '@mui/material/TextField';
// import Link from '@mui/material/Link';
// import Grid from '@mui/material/Grid';
// import FormControlLabel from '@mui/material/FormControlLabel';
// export default function Login() {
//   return (
//     <>
//       <Navbar />

//       <Box display="block" justifyContent='center' textAlign={'center'}>
//         <Box>
//         <Typography variant="h4">ยินดีต้อนรับ</Typography>
//         <Typography variant="h4">ICAE เข้าสู่ระบบ</Typography>
//         </Box>
//         <img src="/icae_logo.png" style={{ maxWidth: 140 + "px" }} />
//         <Box display="block">
//           <Box margin={'0px 0px 20px 0px'} >
//             <TextField label="อีเมล์" variant="outlined" />
//           </Box>
//           <Box margin={'0px 0px 20px 0px'} >
//             <TextField label="รหัสผ่าน" variant="outlined" />
//           </Box>
//         </Box>
//           <Grid container>
//             <FormControlLabel control={<Checkbox defaultChecked />} label="จำฉัน" />
//             <Grid item>
//               <Link href="#" variant="body2">
//                 {"ลืมรหัสผ่าน?"}
//               </Link>
//             </Grid>
//           </Grid>
        
//         <Box display="block" justifyContent='center' textAlign={'center'} >
//           <Box margin={'0px 0px 30px 0px'}  justifyContent={'center'} >
//             <Button variant="contained">เข้าสู่ระบบ</Button>
//           </Box>
//           <Box margin={'0px 0px 30px 0px'}  justifyContent={'center'} >
//             <Button variant="contained">สมัครสมาชิก</Button>
//           </Box>
//         </Box>


//       </Box>
      


//       <Footer />
//     </>
//   );

// }

import Footer from "@/components/Footer";
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Navbar from "@/components/layout/Navbar";
import Axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form"
import { useRouter } from 'next/router';
import { useState } from "react";

   

function Copyright(props) {
  
  return (
    
        
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        ICAE
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>


  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();


export default function SignUp() {
  const router = useRouter();  
  const [email , setEmail] = React.useState('')
  const [error , setError] = React.useState(null)
  const [status , setStatus] = React.useState('')
  const [ornum , setOrnum ] = React.useState("")


  
    const fetchData = async(data1,e) => {
      let load = {
        data : e
      }
      try {
        const res = await 
        Axios({
          url: "http://localhost:3001/api/getorId/",
          method: "post",
          data : load

        })
        const orid = res.data
        if(orid.length > 0) {
          alert("เลขนิติบุคลซ่ำ")
        }
        else {
          alert("OK")
          if (!isValidEmail(data1.em_email)) {
            alert("กรุณาใส่อีเมลให้ถูกต้อง")
          }
      
          else {
            console.log(data1)
            Axios({
              url: "http://localhost:3001/api/setsignUpA",
              method: "post",
              headers: { 
                'Content-Type': 'application/json'
              },
              data: data1
              })
              .then(function (response) {
                console.log(response.data)
                alert("สมัครสมาชิกเรียบร้อย")
                router.push("/SignIn")
                
              })
      
     
        } }
       
      }
     catch(error) {
      console.error("Error ferching data :" , error)
     }
    
  }

  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

 
  const handleChange = (event) =>{
    if (!isValidEmail(event.target.value)) {
      setError('Email is invalid');
      console.log("email")
    } else {
      setError(null);
      console.log("ok")
    }

    setEmail(event.target.value);
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log(data.get('email'))
    let data1 = {}
    alert(status)
    let ongranization_id = data.get("dobid")
    if(status === "A") {
      data1 = {
        em_email: data.get('email'),
        em_fullname : data.get('firstName') + " " + data.get('lastName'),
        em_icon : data.get('/test01.png'),
        em_pass: data.get('password'),
        status: status,
        ongranization_id : "-"
  
      }
    }

    if(status === "S") {
      if(ongranization_id === "-"){
        alert("ให้เลขที่นิติบุคคล")
      }
      else if(ongranization_id.length === 0 ){
        alert("ให้เลขที่นิติบุคคล")
      }
      else {
       
       
        data1 = {
          em_email: data.get('email'),
          em_fullname : data.get('firstName') + " " + data.get('lastName'),
          em_icon : data.get('/test01.png'),
          em_pass: data.get('password'),
          status: status,
          ongranization_id : ongranization_id
    
        }
       fetchData(data1,ongranization_id)
      }
    }
    

    
    if (!isValidEmail(data1.em_email)) {
      alert("กรุณาใส่อีเมลให้ถูกต้อง")
    }

    else {
      console.log(data1)
      // Axios({
      //   url: "http://localhost:3001/api/setsignUpA",
      //   method: "post",
      //   headers: { 
      //     'Content-Type': 'application/json'
      //   },
      //   data: data1
      //   })
      //   .then(function (response) {
      //     console.log(response.data)
      //     alert("สมัครสมาชิกเรียบร้อย")
      //     router.push("/SignIn")
          
      //   })

    // else if(email.include("@gmail.com")){
    //   alert("ok")
    // }
    // else {
    //   alert("try Again")
    }
  };



  return (

    <ThemeProvider theme={defaultTheme}>
      <Navbar />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
            
         
          <Typography component="h1" variant="h5">
            ยินดีต้อนรับ
          </Typography>
          <Typography component="h1" variant="h5">
            ICAE สมัครสมาชิกแอดมิน
          </Typography>
          <img src="/icae_logo.png" style={{ maxWidth: 140 + "px" }} />
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="ชื่อ"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="สกุล"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="อีเมล์"
                  name="email"
                  autoComplete="email"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="รหัสผ่าน"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="dobid"
                  label="เลขนิติบุคคล"
                  type="text"
                  id="dobid"
                  autoComplete="dobid"
                />
              </Grid>
              <Grid item xs={12}>
                
              <div class="dropdown">
                  <button class="dropbtn">สถานะ</button>
                    <div class="dropdown-content">
                    <p onClick={()=>setStatus("A")}>แอดมิน</p>
                    <p onClick={()=>setStatus("S")}>หัวหน้า</p>
                    </div>
              </div>
            
              
              
              
              </Grid>
              
            </Grid>
            
              <Button 
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              สมัครสมาชิก
            </Button>

            
            
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  คุณเป็นสมาชิกใช่ไหม? เข้าสู่ระบบ
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 5 }} /> */}
      </Container>
      {
        email === "A" ?
        <div></div>
        : email === "B" ?
        <div></div>
        : null
      }
      <Footer />
    </ThemeProvider>
    
    
    
  );
  
        
}