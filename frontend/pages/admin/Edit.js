import Footer from "@/components/Footer";
import Navbar from "@/components/layout/Navbar";
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import { Box, Typography } from "@mui/material";
import { Fragment, useEffect, useRef, useState } from "react";
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import BuildIcon from '@mui/icons-material/Build';
import Axios from "axios";

export default function Edit_Admin() {
    const [data , setData] = useState([])
    const [num1 , setNum1] = useState([])
    const cmname = useRef('')
    const [st , setSt] = useState("")
    const [per , setPer] = useState("")
    const [cmname1 , setCmname1] = useState("")
    const [des , setDes] = useState("")
    const [showdata,setShowdata] = useState(["","","","","","","","","",""])
    

    useEffect(() => {
        const queryString = window.location.search
        const searchParams = new URLSearchParams(queryString)
        const no= searchParams.get("no")
        console.log(no)
        setNum1(no)

        let load = {
            no : no
        }
        Axios({
            url :process.env.NEXT_PUBLIC_API_BASE_URL+"/getalldataAddminEdit" ,
            method : 'post',
            data : load,
        }).then((response)=>{
            console.log("repones.data",response.data)
            console.log("[0]",response.data[0])
            setData(response.data[0])
            showdata[0] = response.data[0].cmname
            showdata[1] = response.data[0].per
            showdata[2] = response.data[0].des

            setShowdata([...showdata])
            cmname.current = response.data[0].cmname
        })
        
    },[])

    const setNewData = (idx, e) => {
        showdata[idx] = e;
        setShowdata([... showdata]);
      };
    

    const save = () => {
       let load = {
        no : num1,
        cas : data.cas ,
        cmname : showdata[0] ,
        per : showdata[1] ,
        st : st ,
        des :showdata[2]
       }

       Axios({
         url : process.env.NEXT_PUBLIC_API_BASE_URL+"/getalldataAddminUpdateByType",
         method : 'post' , 
         data : load ,
         
       }).then((response) => {

            alert("สำเร็จ")
            window.location.reload(false)
       })

    }



   
    return(
       <>
         <Navbar />
         <Fragment>
            <Box sx={{ textAlign: "-webkit-center" }}>
                <Box borderRadius={'5px'}
                    display={'flex'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    textAlign={'center'}
                    height={'50px'}
                    backgroundColor={'yellow'}
                    width={'150px'}
                    padding={'5px'}
                    margin={'10px'}
                    
                
                >

             

                    <BuildIcon sx={{ color: "black"}}></BuildIcon>
                    <Typography variant="h7" sx={{ color: "black"}}>แก้ไขสารเคมี</Typography>


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
                            {
                                data.st === 2 ?
                                <FormControlLabel checked value="Annex II" control={<Radio />} label="Annex II" />
                                : 
                                <FormControlLabel value="Annex II" control={<Radio />} label="Annex II" onClick={()=>setSt(2)}/>
                            }

                            {
                                data.st === 3 ?
                                <FormControlLabel checked value="Annex III" control={<Radio />} label="Annex III" />
                                :
                                <FormControlLabel value="Annex III" control={<Radio />} label="Annex III" onClick={()=>setSt(3)}/>
                            }

                            {
                                data.st === 4 ?
                                <FormControlLabel checked value="Annex IV" control={<Radio />} label="Annex IV" />
                                :
                                <FormControlLabel value="Annex IV" control={<Radio />} label="Annex IV" onClick={()=>setSt(4)}/>
                            }

                            {
                                data.st === 5 ? 
                                <FormControlLabel checked value="Annex V" control={<Radio />} label="Annex V" />
                                :
                                <FormControlLabel value="Annex V" control={<Radio />} label="Annex V" onClick={()=>setSt(5)} />
                            }

                            {
                                data.st === 6 ? 
                                <FormControlLabel checked value="Annex VI" control={<Radio />} label="Annex VI" />
                                :
                                <FormControlLabel value="Annex VI" control={<Radio />} label="Annex VI" onClick={()=>setSt(6)} />
                            }
                            
                            
                           
                            
                        </RadioGroup>
                    </FormControl>
                    <Typography variant="h7">ชื่อสารเคมี</Typography>
                    <TextField  variant="outlined" value={showdata[0]}  onChange={(e) => setNewData(0, e.target.value)}/>
                    <Typography variant="h7">รหัส CAS NO</Typography>
                    <TextField  variant="outlined" value = {data.cas} />
                    
                    <Typography variant="h7">คำอธิบาย</Typography>
                    <TextField
                        id="outlined-multiline-static"
                        value={showdata[2]}
                        onChange={(e) => setNewData(2, e.target.value)}
                        multiline
                        rows={4}
                    />

                        <Typography variant="h7">ปริมาณสาร</Typography>
                        <TextField  value={showdata[1]} variant="outlined" onChange={(e) => setNewData(1, e.target.value)} />

                    
                </Box>
            
               
                <Box 
                    gap={'10px'}
                    height={'500px'}
                    width={'700px'}
                    display={'block'}
                    borderRadius={'5px'}
                    alignItems={'center'}
                    justifyContent={'center'}
                    



                
                >  <Box 
                border={'2px dashed grey'}
                textAlign={'center'}
                min-height={'100vh'}
                gap={'30px'}
                justifyContent={'center'}
                height={'450px'}
                width={'700px'}

            >
              
                <img src="/edit.png"></img>
                
            </Box>  
         


                </Box>
               
            
            </Box>

            <Box sx={{textAlign:'center', marginTop:'20px'}}>
                        <button onClick={() => save()} color="yellow">บันทึก</button>
                    </Box>





         </Fragment>
         <Footer />
       
       </>
    )

}