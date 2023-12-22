import Axios from "axios";
import * as XLSX from 'xlsx'
import Footer from "@/components/Footer"
import Navbar from "@/components/layout/Navbar"
import { Fragment } from "react";
import { Box, Typography, colors } from "@mui/material"
import FormControl from '@mui/material/FormControl';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import React, { useRef, useState } from 'react'
import Papa from 'papaparse'
import { AddCircle } from '@mui/icons-material';
import Button from '@mui/material/Button';
import { useRouter } from 'next/router';
import Stack from '@mui/material/Stack';


const AdddataAn2 = () => {

  useEffect(()=>{
    let st = localStorage.getItem('status');
    if(st !== "A"){
        router.push("/")        }

     },[])
        const [excel1 , setExcel1]  = useState(null);
        const [data1,setData1] = useState([])
        const [st1,setSt1] = useState(0)
        const router = useRouter()

        const handleFile = (e) => {
            let fileTypes = ['application/vnd.ms-excel','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet','text/csv'];
            let selectFile = e.target.files[0];
            if(selectFile) {
                if(selectFile && fileTypes.includes(selectFile.type)){
                    let reader = new FileReader();
                    reader.readAsArrayBuffer(selectFile);
                    reader.onload = (e) => {
                        setExcel1(e.target.result);
                        readData(e.target.result);
                    }
                }
            }
            else {

            }
        }

        const readData = (e) => {
            if(e !== null) {
              const workbook = XLSX.read(e , {type : "buffer"});
              const worksheetname = workbook.SheetNames[0];
              const worksheet = workbook.Sheets[worksheetname];
              const data = XLSX.utils.sheet_to_json(worksheet);
              console.log(data);
              // console.log(data[0])
              let st1 = Object.keys(data[0])[0]
              // console.log(st1)
              if(st1.includes("Annex II ")){
                setSt1(2)
              }
              else if(st1.includes("Annex III ")){
                setSt1(3)
              }
              else if(st1.includes("Annex IV ")){
                setSt1(4)
              }
              else if(st1.includes("Annex V ")){
                setSt1(5)
              }
              else if(st1.includes("Annex VI ")){
                setSt1(6)
              }
              // console.log(data.length);
              const head = Object.values(data[3]);
              console.log(head);
              for(let i = 4 ; i<data.length; i++) {
                let com = Object.values(data[i])
                console.log(com.length)
                if(com.length !== 16 ){
                    // console.log(com)
                }

                  const data3 = Object.values(data[i]);


                  const data4 = {name : data3[4] , cas : data3[2] , cmname : data3[4]  , parts : data3[9] , per : 0 , color : "-"}
                  data1.push(data4);
                  setData1([...data1]);
              }
            }
          }

          const handleFileSubmit = () => {
            console.log(data1)
            console.log(st1);
            // for(let i = 0; i < data1.length; i++) {
              let load = {
                data: data1,
                st: st1,
              };
              Axios({
                url: process.env.NEXT_PUBLIC_API_BASE_URL + "/api/setdata",
                method: "post",
                data: load,
              })
                .then(function (response) {
                  if (response.data) {
                    console.log(response);
                  }
                })
                .catch(function (error) {
                  console.log(error);
                });
           // }

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
                      
                        <img src="/csvfile.png" style={{ maxWidth: 0 + "300px", textAlign:"center", margin:"20px" }}/>
                        <h3>Upload & view excel sheet An2</h3>
                       {/* <form onSubmit={() => handleFileSubmit()}> */}
                       <input type='file' required onChange={handleFile}/>
                     <button type='submit' onClick={() => handleFileSubmit()}>Upload</button>
                        {/* </form> */}
                    </Box>
                    <Typography sx={{
                        margin: {xs:'20px 0px 20px 0px' , md:'20px 0px 20px 0px'},
                    }}>
                        อัพโหลดไฟล์ csv สำหรับการเพิ่มสารเคมี
                    </Typography>

                    {/* <button onClick={handleClick}>Upload</button> */}

                </Box>



            </Box>
            </Fragment>
            <Box sx={{
        textAlign: { xs: "center", md: "center" },
      }}>
        {/* <Button
          type="submit"
          textAlign="center"
          variant="contained"
          color="success"

          sx={{ mt: 0, mb: 3 }}
        >
          ยืนยัน
        </Button> */}
      </Box>



            





        
            {/* <h1>Upload Data 4 </h1> */}
            {/* <div className='Add_data1'> */}
                {/* <h3>Upload & view excel sheet</h3> */}
                {/* <form onSubmit={() => handleFileSubmit()}> */}
                {/* <input type='file' required onChange={handleFile}/> */}
                {/* <button type='submit' onClick={() => handleFileSubmit()}>Upload</button> */}
                {/* </form> */}
                {/* {
                st1
                } */}
                {/* <br/><br/> */}
                {/* {
                    data1.length ?
                        data1.map((values, idx) => (
                            <p key={idx}>{idx} {values.maxT} {values.minT}</p>
                        ))
                    : null
                } */}
                {/* <br/> */}
            {/* </div> */}


        </div>
      )
}

export default AdddataAn2
