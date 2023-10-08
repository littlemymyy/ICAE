import Footer from "@/components/Footer";
import Navbar from "@/components/layout/Navbar";
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import { Box, Typography } from "@mui/material";
import { Fragment } from "react";
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { AddCircle } from "@mui/icons-material";


export default function _Admin() {
    return(
       <>
         <Navbar />
         <Fragment>
            <Box sx={{textAlign:"-webkit-center"}}>
                <Box borderRadius={'5px'}
                    display={'flex'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    textAlign={'center'}
                    height={'50px'}
                    backgroundColor={'green'}
                    width={'150px'}
                    padding={'5px'}
                    margin={'10px'}
                    
                
                >

                
                

                    <AddCircle sx={{ color: "white"}}></AddCircle>
                    <Typography variant="h7" sx={{ color: "white"}}>เพิ่มสารเคมี</Typography>


                </Box>
            </Box>
            <Box sx={{
                display: {xs:'block' , md:'flex'},
                backgroundColor: {xs:'' , md:'#F8F8F8 '},
                borderRadius: {xs:'' , md:'25px'},
                margin: {xs:'' , md:'10px 40px 10px 40px'},
                padding: {xs:'10px 60px 10px 60px' , md:'10px 40px 10px 40px'},
                justifyContent: {xs:'' , md:'space-between'},
                gap: {xs:'' , md:'50px'}
                
    

            }}
            
            >
                <Box display={'grid'} gap={'10px'}>
                    <Typography variant="h7">เพิ่มสารเคมี</Typography>
                    <FormControl>
                        
                        <RadioGroup
                        
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                        >
                            <FormControlLabel value="Annex II" control={<Radio />} label="Annex II" />
                            <FormControlLabel value="Annex III" control={<Radio />} label="Annex III" />
                            <FormControlLabel value="Annex IV" control={<Radio />} label="Annex IV" />
                            <FormControlLabel value="Annex V" control={<Radio />} label="Annex V" />
                           
                            
                        </RadioGroup>
                    </FormControl>
                    <Typography variant="h7">ชื่อสารเคมี</Typography>
                    <TextField label="ชื่อสารเคมี" variant="outlined" />
                    <Typography variant="h7">รหัส CAS NO</Typography>
                    <TextField label="รหัส CAS NO" variant="outlined" />
                    <Typography variant="h7">คำอธิบาย</Typography>
                    <TextField
                        id="outlined-multiline-static"
                        label="คำอธิบาย"
                        multiline
                        rows={4}
                    />

                    <Box display={'flex'}  gap={"20px"} marginBottom={'20px'}>
                        <TextField label="ผลข้างเคียง" variant="outlined" />
                        <TextField label="กำหนดปริมาณ" variant="outlined" />

                    </Box>

                </Box>
            
               
                <Box 
                    gap={'10px'}
                    height={'500px'}
                    width={'700px'}
                    display={'block'}
                    borderRadius={'5px'}
                    alignItems={'center'}
                    justifyContent={'center'}
                    



                
                >
                    <Box 
                        border={'2px dashed grey'}
                        textAlign={'center'}
                        min-height={'100vh'}
                        gap={'30px'}
                        justifyContent={'center'}
                        height={'450px'}
                        width={'700px'}

                    >
                        <CloudDownloadIcon></CloudDownloadIcon>
                        <header>ลากและวางไฟล์ที่นี่</header>
                        <span>หรือ</span>
                        <button>เลือกไฟล์</button>
                        
                    </Box>  
                    

                    <Box sx={{textAlign:'center', marginTop:'20px'}}>
                        <button sx={{ backgroundColor:"#90ee90"}}>บันทึก</button>
                    </Box>
                        
                    

                    
                   
                    
                                    
                    
                    

                </Box>
            
            </Box>







         </Fragment>
         <Footer />
       
       </>
    )

}