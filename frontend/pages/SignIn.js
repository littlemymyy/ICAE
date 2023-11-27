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
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/Footer';
import { useRouter } from 'next/router';
import Axios from 'axios'
import { GoogleLogin } from '@react-oauth/google';

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

export default function SignIn() {
  const router = useRouter();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    const password = data.get('password');
    
    let load = {
      email: email,
      password: password,
    };
    Axios({
      url: "http://localhost:3001/api/getUser",
      method: "post",
      data: load,
    })
      .then(function (response) {
        if(response.data && response.data.length) {
          console.log(response.data);
          
          // em_email : "test01@gmail.com"
          // em_fullname : "test01"
          // em_icon : "/test01.png"
          // em_pass : "12345"
         
          sessionStorage.setItem("uname" , response.data[0].em_fullname);
          sessionStorage.setItem("uemail" , response.data[0].em_email)
          sessionStorage.setItem("uicon" , response.data[0].em_icon);
          sessionStorage.setItem("status" , response.data[0].status);
          sessionStorage.setItem('orid', response.data[0].organization_id)
          

          if(response.data[0].status === "A"){
            router.push("/admin/Home");
          }
          else if(response.data[0].status === "S") {
            router.push("/")
          }
          else {
            router.push("/");
          }
          
        }
        else {
          alert("Try Again");
        }
      })
      .catch(function (error) {
        console.log(error);
      });

    // console.log({
    //   email: data.get('email'),
    //   password: data.get('password'),
    // });
    // sessionStorage.setItem('uname', data.get('email'));
    // router.push('/');
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
            ICAE ลงชื่อเข้าสู่ระบบ
          </Typography>
          <img src="/icae_logo.png" alt="logo" width="140px" />
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="อีเมล์"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="รหัสผ่าน"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="จำฉัน"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              เข้าสู่ระบบ
            </Button>
            {/* <GoogleLogin
  onSuccess={credentialResponse => {
    console.log(credentialResponse);
  }}
  onError={() => {
    console.log('Login Failed');
  }}
/>; */}
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  ลืมรหัสผ่าน?
                </Link>
              </Grid>
              <Grid item>
                {/* { 
                
                sessionStorage.getItem("status") === null ?
                <Link href="/SignUp" variant="body2">
                {"คุณยังไม่เป็นสมาชิกใช่ไหม? สมัครสมาชิก"}
               </Link> :
                  
                  sessionStorage.getItem("status") === "A" ?
                  <Link href="/SignUpA" variant="body2">
                  {"คุณยังไม่เป็นสมาชิกใช่ไหม? สมัครสมาชิก"}
                </Link>
                :  sessionStorage.getItem("status") === "S" ?
                <Link href="/SignUpA" variant="body2">
                {"คุณยังไม่เป็นสมาชิกใช่ไหม? สมัครสมาชิก"}
                </Link>
                : null
                } */}
                
              </Grid>
            </Grid>
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
      </Container>
      <Footer />
    </ThemeProvider>
  );
}