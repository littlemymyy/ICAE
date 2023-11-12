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

const pages = ['หน้าหลัก', 'ตรวจสอบสูตรสารเคมี', 'PIF' , 'ประวัติการตรวจสอบสูตรสารเคมี','คลังความรู้'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function Navbar() {
    const router = useRouter();
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [uname, setUname] = React.useState('');
    const [icon, setIcon] = React.useState('');


    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = (ev) => {
        setAnchorElNav(null);
        const selectName = ev.nativeEvent.target.outerText.toLowerCase();
        // console.log(selectName)
        if(uname !== '') {
            if(selectName === pages[0]){
                router.push("/")
            }
            else if(selectName === pages[1]){
                router.push("/Preview");
            }
            else if(selectName === pages[2]){
                router.push("/Checkword")
            }
            else if(selectName === pages[3]){
                router.push("/PreviewGroup")
            }
            else if(selectName === pages[4]){
                router.push("/ChemicalList")
            }
            // else if(selectName === pages[4]){
            //     router.push("/Test01")
            //     console.log('Test01');
            // }
        }
    };
    const handleOpenSignIn = () => {
        router.push('/SignIn');
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
        else if(selectName === settings[2]){
                
        }
        else if(selectName === settings[3]) {
            console.log('OK');
            sessionStorage.removeItem("uemail");
            sessionStorage.removeItem("uname");
            sessionStorage.removeItem("uicon");
            sessionStorage.removeItem("upass");
            setUname("");
            setIcon("");
            router.push("/");
        }
      
    };

    React.useEffect(() => {
        if(!sessionStorage.getItem('uname')) {
            setUname('');
            setIcon('');
        }
        else {
            setUname(sessionStorage.getItem('uname'));
            setIcon(sessionStorage.getItem("uicon"));
            // alert(sessionStorage.getItem('uname'));
        }
    }, [])

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
