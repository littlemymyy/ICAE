import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import InstagramIcon from '@mui/icons-material/Instagram';
import { Typography, Link } from '@mui/material';

function Copyright(props) {
  
    return (
      
          
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {' © '}
        {new Date().getFullYear()}
        {' '}
          ICAE All Rights Reserved.
        {' '}
        
      </Typography>
  
  
    );
  }
  
export default function Footer() {
    return(
        <div>
        <div className="footer">
            <div className='footer_col1'>
                <img className="pic_footer" src="/icae_logo.png"/>
                <p>ฐานข้อมูลส่วนผสมเครื่องสำอาง</p>
                <p>ช่วยให้ผู้ใช้ค้นหาได้อย่างรวดเร็ว</p>
                <div className="social">
                    <FacebookIcon sx={{ color:'black' ,fontSize: 20 }} />
                    <GoogleIcon sx={{ color:'black' ,fontSize: 20 }} />
                    <InstagramIcon sx={{ color:'black' ,fontSize: 20 }} />
                </div>
                
            </div>

            <div className='footer_col2'>
                <p>ข้อมูลเว็บไซต์</p>
                <div className="litetext">
                    <p>ความสามารถ</p>
                    <p>การบูรณาการ</p>
                    <p>องค์กร</p>
                </div>

            </div>

            <div className='footer_col3'>
                <p>ทรัพยากร</p>
                <div className="litetext">
                    <p>EU COSING</p>
                    <p>ชุมชน</p>
                    <p>นักพัฒนา</p>
                    <p>บล็อก</p>
                </div>

            </div>

            <div className='footer_col4'>
                <p>องค์กร</p>
                <div className="litetext">
                    <p>About Us</p>
                    <p>News</p>
                    <p>Leadership</p>
                    <p>Media Kit</p>
                </div>
            
            </div>


            
           
        </div>
            <div className='copyright'>
                <Copyright sx={{ 
                    mt: 5 ,
                

                }} />

            </div>
       
        </div>
        
       
       
    )
}