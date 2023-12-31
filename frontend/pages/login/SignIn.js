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
import { Swiper, SwiperSlide } from "swiper/react";
import Swal from 'sweetalert2'

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper/modules";
import e from 'cors';

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
  React.useEffect(() => {
    if(localStorage.getItem("uemail") === null){

    }
    else if (localStorage.getItem("uemail") !== null) {
      router.push("/");
    }
  }, []);

  const router = useRouter();
  const Swal = require('sweetalert2')
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
      url: process.env.NEXT_PUBLIC_API_BASE_URL + "/api/getUser",
      method: "post",
      data: load,
    })
      .then(function (response) {
        if(response.data.status === "ok" ) {

          localStorage.setItem("token" , response.data.token);
          localStorage.setItem("uname" , response.data.result[0].em_fullname);
          localStorage.setItem("uemail" , response.data.result[0].em_email)
          localStorage.setItem("uicon" , response.data.result[0].em_icon);
          localStorage.setItem("status" , response.data.result[0].status);
          localStorage.setItem('orid', response.data.result[0].organization_id)


          if(response.data.result[0].status === "A"){
            router.push("/admin/Home");
          }
          else if(response.data.result[0].status === "S") {
            router.push("/")
          }
          else {
            router.push("/");
          }
        }
        else{
          Swal.fire({
            icon: 'error',
            title: 'เข้าสู่ระบบไม่สำเร็จ',
            text: 'กรุณาตรวจสอบอีเมล์หรือรหัสผ่านอีกครั้ง',
          })
        }
      })
      .catch(function (error) {
        console.log(error);
      });

    // console.log({
    //   email: data.get('email'),
    //   password: data.get('password'),
    // });
    // localStorage.setItem('uname', data.get('email'));
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
              </Grid>
              <Grid item>
              <Link href="/SignUp/SignUp" variant="body2">
                {"คุณยังไม่เป็นสมาชิกใช่ไหม? สมัครสมาชิก"}
               </Link> :
                {/* {

                localStorage.getItem("status") === null ?
                <Link href="/SignUp" variant="body2">
                {"คุณยังไม่เป็นสมาชิกใช่ไหม? สมัครสมาชิก"}
               </Link> :

                  localStorage.getItem("status") === "A" ?
                  <Link href="/SignUpA" variant="body2">
                  {"คุณยังไม่เป็นสมาชิกใช่ไหม? สมัครสมาชิก"}
                </Link>
                :  localStorage.getItem("status") === "S" ?
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
