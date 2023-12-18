import Footer from "@/components/Footer";
import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Navbar from "@/components/layout/Navbar";
import Axios from "axios";
import { useRouter } from 'next/router';


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
  const Swal = require('sweetalert2')
  const [approve, setApprove] = React.useState('')

  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  // const checkmail = async (email) => {


  // }

  const handleChange = async (event) => {
    if (!isValidEmail(event.target.value)) {
      setError('Email is invalid');
      console.log("email")
    } else {
      setError(null);
      // console.log("ok")

      // Call the checkmail function and await the result
      try{
        let load = {
          email : event.target.value,
        }
        const res = await Axios.post("http://localhost:3001/api/checkMail",load)
        console.log(res.data)

        if(res.data === "Dupicate"){
          Swal.fire({
            icon: "error",
            title: "พบข้อผิดพลาด",
            text: "มีการใช้อีเมล์นี้แล้ว กรุณาเปลี่ยนอีเมล์!",
          }).then(function (result) {
              window.location.reload();
          });
        }
        else {
          setEmail(event.target.value);
        }

      } catch (error){
        console.log(error)
      }
    }
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const data1 = {
      firstname : data.get('firstName'),
      lastname : data.get('lastName'),
      email: data.get('email'),
      password: data.get('password'),
      repassword : data.get('confirmpassword'),
      approve : approve
    }
    if (data1.firstname === "" || data1.lastname === "" || data1.email === "" || data1.password === "" || data1.repassword === "" || data1.apprive === false) {
      Swal.fire({
        icon: "error",
        title: "พบข้อผิดพลาด",
        text: "กรุณากรอกข้อมูลให้ครบถ้วน",
      });
    }
    else if (!isValidEmail(data1.email)) {
      Swal.fire({
        icon: "error",
        title: "พบข้อผิดพลาด",
        text: "กรุณาใส่อีเมลให้ถูกต้อง?",
      });

    }
    else if(data1.password !== data1.repassword){
      Swal.fire({
        icon: "error",
        title: "พบข้อผิดพลาด",
        text: "กรุณาใส่รหัสผ่านให้เหมือนกัน",
      });
    }
    else if(approve !== 'ok'){
      Swal.fire({
        icon: "error",
        title: "พบข้อผิดพลาด",
        text: "กรุณายอมรับกฎข้อบังคับของเว็บไซต์",
      });
    }
    else {
      console.log(data1)
      Axios({
        url: "http://localhost:3001/api/setsignUp",
        method: "post",
        headers: {
          'Content-Type': 'application/json'
        },
        data: data1
        })
        .then(function (response) {
          //console.log(response.data)

          const Toast = Swal.mixin({
            toast: true,
            position: "center",
            marginTop : "100px" ,
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            }
          });
          Toast.fire({
            icon: "success",
            title: "สมัครสมาชิคสำเร็จ"
          });

          router.push("/login/SignIn")

        }).catch( (error) => {
          console.log(error);
        });

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
            ICAE สมัครสมาชิก
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
                  name="confirmpassword"
                  label="ยืนยันรหัสผ่าน"
                  type="password"
                  id="confirmpassword"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>

                <FormControlLabel
                  control={<Checkbox color="primary" />}
                  label="ฉันเห็นด้วยกับกฎข้อบังคับของเว็บไซต์ ICAE"
                  id="approve"
                  name="approve"
                  onChange={(e) => setApprove('ok')}
                />
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
                <Link href="/login/SignIn" variant="body2">
                  คุณเป็นสมาชิกใช่ไหม? เข้าสู่ระบบ
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 5 }} /> */}
      </Container>
      <Footer />
    </ThemeProvider>



  );


}
