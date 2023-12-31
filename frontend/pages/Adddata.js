
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

const Adddata = () => {
    const [excel1 , setExcel1]  = useState(null);
    const router = useRouter()
    const [excel2 , setExcel2]  = useState(null);
    const [data1,setData1] = useState([])
    const [data2,setData2] = useState([])
    const [st1,setSt1] = useState(0)
    const [st2,setSt2] = useState(0)

    useEffect(()=>{
      let st = localStorage.getItem('status');
      if(st !== "A"){
          router.push("/")        }

       },[])

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
          //console.log(head);
          for(let i = 4 ; i<data.length; i++) {
            let com = Object.values(data[i])
            if(com[2] !== com[5] ){
                // console.log(com[2]+" "+com[5])
            }

              const data3 = Object.values(data[i]);
              let max = 0 , min = 0 ;
              if(data3[9].length > 0 ){
                let maxs = data3[9].substring(0,data3[9].length-2);
                max = parseFloat(maxs)
              }

              if(data3[9].length === 0 ) {
                max = 100;
              }

            //   if(data3[10].length > 0 ){
            //     let mins = data3[10].substring(0,data3[10].length-2);
            //     min = parseFloat(mins);
            //   }
              if(data3[2] !== '-' && countCas(data3) === 0) {
                const data4 = {name : data3[4] , cas : data3[2]  , parts : data3[7] , per : max , color : "-"}
                data1.push(data4);
                setData1([...data1]);
              }
          }
        }
      }
      const countCas = (dd) => {
        let count = 0;
        if(data1.length === 0)
          return 0;
        for(let i = 0; i < data1.length; i++) {
          if(data1[i].cas === dd[2]) {
            count++;
          }
        }
        return count;
      }
      const handleFileSubmit = () => {
        // console.log(data1)
        // console.log(st1);
        // for(let i = 0; i < data1.length; i++) {
        //   let load = {
        //     data: data1[i],
        //     st: st1,
        //   };
        //   Axios({
        //     url: process.env.NEXT_PUBLIC_API_BASE_URL + "/api/setdata",
        //     method: "post",
        //     data: load,
        //   })
        //     .then(function (response) {
        //       if (response.data) {
        //         console.log(response);
        //       }
        //     })
        //     .catch(function (error) {
        //       console.log(error);
        //     });
        // }

      }


      const handleFileSubmit2 = () => {
        // console.log(data2)
        //console.log(st2);
        // for(let i = 0; i < data1.length; i++) {
        //   let load = {
        //     data: data1[i],
        //     st: st1,
        //   };
        //   Axios({
        //     url: process.env.NEXT_PUBLIC_API_BASE_URL + "/api/setdata",
        //     method: "post",
        //     data: load,
        //   })
        //     .then(function (response) {
        //       if (response.data) {
        //         console.log(response);
        //       }
        //     })
        //     .catch(function (error) {
        //       console.log(error);
        //     });
        // }

      }

      const readData2 = (e) => {
        if(e !== null) {
          const workbook = XLSX.read(e , {type : "buffer"});
          const worksheetname = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[worksheetname];
          const data = XLSX.utils.sheet_to_json(worksheet);
          const cData = [];
          console.log(data)
          //console.log(data[10]);
          //console.log(data[10].__EMPTY_1)
          //console.log(data[10].__EMPTY_4)
          // console.log(data[0])
          let st2 = Object.keys(data[0])[0]
          // console.log(st1)
          if(st2.includes("Annex II ")){
            setSt2(2)
          }
          else if(st2.includes("Annex III ")){
            setSt2(3)
          }
          else if(st2.includes("Annex IV ")){
            setSt2(4)
          }
          else if(st2.includes("Annex V ")){
            setSt2(5)
          }
          else if(st2.includes("Annex VI ")){
            setSt2(6)
          }

          // console.log(data.length);
          const head = Object.values(data[3]);
          //console.log(head);
          for(let i = 4 ; i<data.length; i++) {
            if(data[i].__EMPTY_1 == null){
                data[i].__EMPTY_1 = "-"
            }
            if(data[i].__EMPTY_2 == null){
                data[i].__EMPTY_2 = "-"
            }
            if(data[i].__EMPTY_3 == null){
                data[i].__EMPTY_3 = "-"
            }
            if(data[i].__EMPTY_4 == null){
                data[i].__EMPTY_4 = "-"
            }
            if(data[i].__EMPTY_5 == null){
                data[i].__EMPTY_5= "-"
            }
            if(data[i].__EMPTY_6 == null){
                data[i].__EMPTY_6 = "-"
            }
            if(data[i].__EMPTY_7 == null){
                data[i].__EMPTY_7 = "-"
            }
            if(data[i].__EMPTY_8 == null){
                data[i].__EMPTY_8 = "-"
            }
            if(data[i].__EMPTY_9 == null){
                data[i].__EMPTY_9 = "-"
            }
            if(data[i].__EMPTY_10 == null){
                data[i].__EMPTY_10 = "-"
            }
            if(data[i].__EMPTY_11 == null){
                data[i].__EMPTY_11 = "-"
            }
            if(data[i].__EMPTY_12 == null){
                data[i].__EMPTY_12 = "-"
            }
            if(data[i].__EMPTY_13 == null){
                data[i].__EMPTY_13 = "-"
            }
            if(data[i].__EMPTY_14 == null){
                data[i].__EMPTY_14 = "-"
            }
            const dataP = {cmname : data[i].__EMPTY_1 , cas : data[i].__EMPTY_2}
            data2.push(dataP);
            setData2([...data2])
            // console.log(data[i])
            //   const data3 = Object.values(data[i]);
            //     if(data3.length == 15) {
            //         const data4 = {cas : data3[3]  , emname : data3[2]  }
            //         data2.push(data4);
            //     }
            //     else {
            //         const data4 = {cas : data3[1]  , emname : data2[0]  }
            //         data2.push(data4);
            //     }
            //   setData2([...data2]);


          }
          //console.log(data2)
        }
      }

      const handleFile2 = (e) => {
        let fileTypes = ['application/vnd.ms-excel','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet','text/csv'];
        let selectFile = e.target.files[0];
        if(selectFile) {
            if(selectFile && fileTypes.includes(selectFile.type)){
                let reader = new FileReader();
                reader.readAsArrayBuffer(selectFile);
                reader.onload = (e) => {
                    setExcel2(e.target.result);
                    readData2(e.target.result);
                }
            }
        }
        else {

        }
    }

    const handleFile3 = () => {
        // console.log(data1)
        // console.log(data2)
        let d3 = [];
        for(let i = 0; i < data1.length; i++) {
            if(data1[i].cas !== '-') {

                    const searchDD = serachCas(data1[i].cas)
                    // console.log(searchDD)
                    let dd3 = data1[i]
                    // console.log(data1[i])
                    if(searchDD) {
                        // console.log(searchDD)
                        if(searchDD.cmname === '-') {
                            dd3.cmname = dd3.name
                        }
                        else {
                            dd3.cmname = searchDD.cmname
                        }
                        if(dd3.cmname === '-') {
                            console.log(searchDD)
                        }
                        d3.push(dd3)
                    }


            }
        }
         console.log(d3.length)
        // for(let i = 0; i < d3.length; i++) {
          let load = {
            data: d3,
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

    const serachCas = (cas) => {
        let results1 = []
        for(let i = 0; i < data2.length; i++) {
            if(data2[i].cas.includes(cas) || data2[i].cas == cas) {
                // console.log(data2[i])
                results1.push(data2[i])
            }
        }
        return results1[0];
        //   console.log(results1)
    }

  return (
    <>
    <div className='App'>


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
                        {/* <input */}
                            {/* //ref={inputRef}
                           // type='file'
                           // style={{ display: 'none' }}
                            //onChange={()=>handleFileChange()} */}
                        {/* /> */}
                        <img src="/csvfile.png" style={{ maxWidth: 0 + "300px", textAlign:"center", margin:"20px" }}/>

                    </Box>
                    <Typography sx={{
                        margin: {xs:'20px 0px 20px 0px' , md:'20px 0px 20px 0px'},
                    }}>
                        อัพโหลดไฟล์ csv สำหรับการเพิ่มสารเคมี
                    </Typography>

                    <h3>Upload & view excel sheet cosing</h3>
                    {/* <form onSubmit={() => handleFileSubmit()}> */}
                    <input type='file' required onChange={handleFile}/>
                    <button type='submit' onClick={() => handleFileSubmit()}>Upload</button>
                    {/* </form> */}

                    <h3>Upload & view excel sheet EC</h3>
                    {/* <form onSubmit={() => handleFileSubmit()}> */}
                    <input type='file' required onChange={handleFile2}/>
                      <button type='submit' onClick={() => handleFileSubmit2()}>Upload</button>
                    {/* </form> */}

                </Box>



            </Box>
            </Fragment>
            <Box sx={{
        textAlign: { xs: "center", md: "center" },
      }}>
           <div className='App'>
        {
            data1.length && data2.length && st1 !== 4 && st2 !== 4?
            <button className='Add_insert' onClick={handleFile3}>Insert</button>
            :
            <button className='Add_insert' disabled>Insert</button>
        }

    </div>
      </Box>



            {/* {data.length ? (
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
            ) : null} */}


        </div>




        {/* <h1>Upload Data  3 5 6</h1>

        <div className='Add_data1'>
            <h3>Upload & view excel sheet</h3>
            {/* <form onSubmit={() => handleFileSubmit()}> */}
            {/* <input type='file' required onChange={handleFile}/>
            <button type='submit' onClick={() => handleFileSubmit()}>Upload</button> */}
            {/* </form> */}
            {/* {
            st1
            }
            <br/><br/>
            {
                data1.length ?
                    data1.map((values, idx) => (
                        <p key={idx}>{idx} {values.maxT} {values.minT}</p>
                    ))
                : null
            } */}
            {/* <br/>  */}
        {/* </div> */}

        {/* <div className='Add_data2'> */}
        {/* <h3>Upload & view excel sheet</h3> */}
            {/* <form onSubmit={() => handleFileSubmit()}> */}
            {/* <input type='file' required onChange={handleFile2}/> */}
            {/* <button type='submit' onClick={() => handleFileSubmit2()}>Upload</button> */}
            {/* </form> */}
            {/* {
            st1
            } */}
            {/* <br/><br/> */}
            {/* {
                data1.length ?
                    data1.map((values, idx) => (
                        <p key={idx}>{idx} {values.maxT} {values.minT} </p>
                    ))
                : null
            } */}
            {/* <br/> */}
        {/* </div> */}
    </div>
 
    </>
  )
}

export default Adddata
