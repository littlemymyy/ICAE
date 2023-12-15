import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Axios from "axios";
import Swal from 'sweetalert2';


const pages = ['หน้าหลัก', 'ตรวจสอบสูตรสารเคมี', 'การจัดการPIF' , 'ประวัติการตรวจสอบสูตรสารเคมี','คลังความรู้'];
const settings = ['หน้าโปรไฟล์',  'การแจ้งเตือน', 'ออกจากระบบ'];

function Navbar() {
    const router = useRouter();
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [uname, setUname] = React.useState('');
    const [status, setStatus] = React.useState('');
    const [icon, setIcon] = React.useState('');


    useEffect(() => {
        console.log(router.pathname)
        //check is not login page
        if(router.pathname !== '/login/SignIn' && router.pathname !== '/Knowledge/home' && router.pathname !== '/' && router.pathname !== '/SignUp/SignUp'){
            Axios.request(
                {
                    method: 'post',
                    url: 'http://localhost:3001/api/authen',
                    headers: { 'Authorization': 'Bearer '+ localStorage.getItem('token') },
                }
                ).then((response) => {
                if(response.data.status === 'ok'){
                    console.log('ok')
                }else{
                    router.push('/login/SignIn').then(() => {
                        localStorage.clear();
                        Swal.fire({
                            icon: 'error',
                            title: 'กรุณาเข้าสู่ระบบก่อน'
                        })
                    })
                    console.log(response.data)
                }
            }).catch((error) => {
                console.log(error)
            });
        }
    }, [])

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = (ev) => {
        setAnchorElNav(null);
        const selectName = ev.nativeEvent.target.outerText.toLowerCase();
        console.log(selectName)

        if(uname === ""){
            if(selectName === pages[0]){
                router.push("/")
            }
            else if(selectName === pages[4]){
                router.push("/Knowledge/home")
            }
            else if(selectName === pages[1]){
                router.push("/login/SignIn");
            }
            else if(selectName === "การจัดการpif"){

                if(localStorage.getItem("uemail") === ""){
                    router.push("/login/SignIn");
                }

            }
            else if(selectName === pages[3]){
                router.push("/login/SignIn");
            }
        }

        if(uname !== '') {
            if(selectName === pages[0]){
                router.push("/")
            }
            if(selectName === pages[1]){
                router.push("/examine/check");
            }
            else if(selectName === "การจัดการpif"){
                if(localStorage.getItem("uemail")){
                    if(localStorage.getItem("orid") === 'null'){
                        router.push("/team/team")
                    }else{
                        router.push("/pif/productslist")
                    }
                }else{
                    router.push("/login/SignIn");
                }
            }
            else if(selectName === pages[3]){
                router.push("/examine/record")
            }
            else if(selectName === pages[4]){
                router.push("/Knowledge/home")
            }
            else {
                router.push("/login/SignIn");
            }
        }
    };
    const handleOpenSignIn = () => {
        //localStorage.clear();
        router.push('/login/SignIn');
    }

    const handleCloseUserMenu = (ev) => {
        setAnchorElUser(null);
        const selectName = ev.nativeEvent.target.outerText;
        console.log(selectName);
        // 0 : Profile, 1 : Account, 2 : Dashboard, 3 : Logout
        if(selectName === settings[0]){

        }
        else if(selectName === settings[1]){

        }
        else if(selectName === settings[2]) {
            localStorage.removeItem("uemail")
            localStorage.removeItem("uicon")
            localStorage.removeItem("status")
            console.log('OK');
            localStorage.clear();
            setUname("");
            setIcon("");
            router.push("/");
        }
    };

    React.useEffect(() => {
        if(!localStorage.getItem('token')) {
            setUname('');
            setIcon('');
        }
        else {
            setUname(localStorage.getItem('uname'));
            setIcon(localStorage.getItem("uicon"));
            setStatus(localStorage.getItem('status'))
        }
    }, [])

    const handleAdmin = () => {
        router.push('/admin/Home')
    }

    return(
        <AppBar className='nav'>
           <Box z-index='1' position='relative'>

            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <img className='logo' width={'80px'} src="/icae_logo.png"
                    sx={{
                        display: { xs: 'none', md: 'flex' },
                        mr: 1 ,

                    }}/>

                <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none'} }}>

                    <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleOpenNavMenu}
                    color="inherit"
                    >
                    <MenuIcon />
                    </IconButton>
                    <Menu
                    id="menu-appbar"
                    anchorEl={anchorElNav}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    open={Boolean(anchorElNav)}
                    onClose={handleCloseNavMenu}
                    sx={{
                        display: { xs: 'block', md: 'none' },
                    }}
                    >
                        {
                            status === 'A' ?
                            <MenuItem key='555' onClick={handleAdmin}>
                        <Typography textAlign="center">Admin Home</Typography>
                        </MenuItem>
                        : null
                        }
                    {pages.map((page) => (
                        <MenuItem key={page} value = {page} onClick={handleCloseNavMenu}>
                        <Typography textAlign="center">{page}</Typography>
                        </MenuItem>
                    ))}
                    </Menu>
                </Box>

                <Typography
                    variant="h5"
                    noWrap
                    component="a"
                    href=""
                    sx={{
                    mr: 2,
                    display: { xs: 'flex', md: 'none' },
                    flexGrow: 1,
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    letterSpacing: '.3rem',
                    color: 'inherit',
                    textDecoration: 'none',
                    }}
                >
                    <img className='logo_center' width={'80px'} src="/icae_logo.png" sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}/>

                </Typography>
                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                {
                            status === 'A' ?
                            <MenuItem key='555' onClick={handleAdmin}>
                        <Typography textAlign="center">Admin Home</Typography>
                        </MenuItem>
                        : null
                        }
                    {pages.map((page) => (
                    <Button
                        key={page}
                        onClick={handleCloseNavMenu}
                        sx={{ my: 2, color: 'black', display: 'block' }}
                    >
                        {page}
                    </Button>
                    ))}
                </Box>


                {/* <Box sx={{ flexGrow: 0 }}>
                    <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 1 }}>
                        <Avatar alt="Remy Sharp" src= {icon} />
                    </IconButton>
                    </Tooltip>



                 </Box> */}

                {/* Start User Icon */}
                {
                    uname !== '' ?
                <Box sx={{ flexGrow: 0 }}>
                    <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar alt="Remy Sharp" src= {icon} />
                    </IconButton>
                    </Tooltip>
                    <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                    >
                        <MenuItem key={'555'} >
                    <Typography textAlign="center">{uname}</Typography>
                    </MenuItem>
                    {settings.map((setting) => (
                        <MenuItem key={setting} onClick={handleCloseUserMenu}>
                        <Typography textAlign="center">{setting}</Typography>
                        </MenuItem>
                    ))}
                    </Menu>
                </Box>
                :
                <Box sx={{ flexGrow: 0 }}>
                    <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenSignIn} sx={{ p: 0 }}>
                        SignIn
                    </IconButton>
                    </Tooltip>
                    <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                    >
                    </Menu>
                </Box>
                }
                </Toolbar>
            </Container>
            </Box>
            </AppBar>


    )
}

export default Navbar;
