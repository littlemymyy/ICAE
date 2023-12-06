import React, { useRef, useState } from 'react'
import Papa from 'papaparse'
import Axios from 'axios'
import Navbar from '@/components/layout/Navbar';
import { Box, Typography ,Button} from '@mui/material';
import { AddCircle } from '@mui/icons-material';
import { Fragment } from 'react';
import { FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';




const index2 = () => {
    const [data, setData] = useState([]);
    const inputRef = useRef(null);

    const handleClick = () => {
        inputRef.current.click();
    };

    const handleFileChange = (event) => {
        const fileObj = event.target.files && event.target.files[0];
        if (!fileObj) {
            return;
        }
        console.log(fileObj);
        console.log(fileObj.name);
        const file = fileObj;
        Papa.parse(file, {
            header: true,
            complete: (results) => {
                setData(results.data);
                console.log(results.data);
            },
        });
    };

    const UploadClick = () => {
        let load = {
            dd : data
        }
        Axios({
            url : 'http://localhost:3001/api/uploadCsv',
            method : 'post' ,
            data : load
        }) 
        .then(function (response) {
            if(response.data === "OK"){
                alert("uploaded")
            }
        })
        .catch(function (error) {
            console.log(err)
        })
    }

    return (
        <div className='App'>
            <Navbar/>
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
                    marginTop={'30px'}
                    
                
                >

                
                

                    <AddCircle sx={{ color: "white"}}></AddCircle>
                    <Typography variant="h7" sx={{ color: "white"}}>เพิ่มสารเคมี</Typography>


                </Box>
            </Box>
            
            <Box sx={{
               
                backgroundColor: {xs:'' , md:'#F8F8F8 '},
                borderRadius: {xs:'' , md:'25px'},
                margin: {xs:'' , md:'40px 60px 40px 60px'},
                padding: {xs:'60px 60px 60px 60px' , md:'40px 40px 40px 40px'},
                
                
    

            }}
            
            >
                <Typography
                    sx={{
                        textAlign: {xs:'left' , md:'left'},
                        justifyContent: {xs:'left' , md:'left'},
                    }}
                     variant="h7">เพิ่มสารเคมี</Typography>
                <Box>
                    
                    <FormControl>
                        
                        <RadioGroup sx={{

                        }}
                        
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
                    <Box sx={{
                        display: {xs:'block' , md:'block'},
                    }}>
                        <input
                            ref={inputRef}
                            type='file'
                            style={{ display: 'none' }}
                            onChange={handleFileChange}
                        />
                        <img src="/csvfile.png" style={{ maxWidth: 0 + "300px", textAlign:"center", margin:"20px" }}/>
                        
                    </Box>
                    <Typography sx={{
                        margin: {xs:'20px 0px 20px 0px' , md:'20px 0px 20px 0px'},
                    }}>
                        อัพโหลดไฟล์ csv สำหรับการเพิ่มสารเคมี
                    </Typography>
                    
                    <button onClick={handleClick}>Upload</button>

                </Box>

            

            </Box>
            </Fragment>
            <Box sx={{
        textAlign: { xs: "center", md: "center" },
      }}>
        <Button
          type="submit"
          textAlign="center"
          variant="contained"
          color="success"
         
          sx={{ mt: 0, mb: 3 }}
        >
          ยืนยัน
        </Button>
      </Box>
               
          
          
            {data.length ? (
                <table>
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>CAS</th>
                            <th>Name</th>
                            <th>Per</th>
                            <th>St</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{row.cas}</td>
                                <td>{row.cname}</td>
                                <td>{row.per}</td>
                                <td>{row.st}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : null}

            
        </div>
    );
}

export default index2