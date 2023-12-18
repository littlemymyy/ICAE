import React, { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/Footer";
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Autocomplete from '@mui/material/Autocomplete';
import { rgb } from 'pdf-lib'
import { fetch } from 'pdf-lib';
import { Box, TextField, Typography, Button } from "@mui/material";
import Axios from "axios";
import { data } from "jquery";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import Swal from 'sweetalert2'
import { useRouter } from "next/router";


const team = () => {
    const [team , setTeam] = useState("")
    const router = useRouter()
    const [data , setData] = useState([])
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    const [list , setList] = useState([])
    const [	status , setStatus] = useState([])
    const Swal = require('sweetalert2')
    const [search_input, setSearch_input] = useState("");
    const [show, setShow] = useState([]);
    const [no , setNo] = useState([])
    const [st , setSt] = useState(0)
    const [teamdata , setTeamdata] = useState([])
    const [alreadyHaveTeam , setAlreadyHaveTeam] = useState([])


    useEffect(() => {
        const feactData = async () => {
            try {
                const res = await Axios.get("http://localhost:3001/api/getuserTeam/");
                //const alreadyTeam = await Axios.get("http://localhost:3001/api/getTeam/")
                console.log(res.data)
               // console.log(alreadyTeam.data)
                setData(res.data)
                //setAlreadyHaveTeam(alreadyTeam.data)

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };


        feactData();
    }, []);


    const resultsearch = (e) => {
        if (e.length === 0) {
            setShow([]);
            setSearch_input("");
          } else {
            setSearch_input(e);
            const results1 = data.filter((w) => {
                return (
                  e &&
                  w &&
                  (w.em_fullname.toLowerCase().includes(e) ||
                    w.em_fullname.toUpperCase().includes(e))
                );
              });
              setShow(results1);
          }
    }

  //   const checkG = (team) => {
  //     let found = 0;

  //     alreadyHaveTeam.forEach(element => {
  //         if (element.organization_id === team) {
  //             console.log('found');
  //             found = 1;
  //         }
  //         console.log(element);
  //     });

  //     return found;
  // };

    const handleChick = async() => {
    //  console.log(checkG(team))
        // if(checkG(team) === 1){
        //     Swal.fire({
        //         icon: "error",
        //         title: "พบข้อผิดพลาด",
        //         text: "มีคนใช้ชื่อนี้แล้ว! กรุณาเลือกชื่อทีมใหม่",
        //       });
        // }
      console.log(team)
        const feactData = async () => {
          try{
            let load = {
              team : team 
            }
            const res = await Axios.post("http://localhost:3001/api/getTeam/",load)
            if(res.data === "HaveTeam"){
               Swal.fire({
                        icon: "error",
                        title: "พบข้อผิดพลาด",
                        text: "มีคนใช้ชื่อนี้แล้ว! กรุณาเลือกชื่อทีมใหม่",
                      });
              window.location.reload()
            }
            else {
                  // setSt(1)
            console.log( localStorage.getItem("uemail"))
            let email =  localStorage.getItem("uemail")
            let load = {
                email : email ,
                data : team ,
            }
            try {
            const res =  await Axios.post("http://localhost:3001/api/updateteam", load);
                Swal.fire({
                    title: "สำเร็จ",
                    text: "เพื่มชื่อทีมหรือชื่อบริษัทสำเร็จ",
                    icon: "success"
                  });
                  console.log(res.data)
                  localStorage.setItem("orid" , team)
                  localStorage.setItem("status" , "S")
                  router.push("/pif/productslist")


            } catch (error) {
                console.error(error);

            }

            }
          } catch(error){
            console.log("handleTeam =>" , error)
          }
          
        }

        feactData()




      
            // setSt(1)
            // console.log( localStorage.getItem("uemail"))
            // let email =  localStorage.getItem("uemail")
            // let load = {
            //     email : email ,
            //     data : team ,
            // }
            // try {
            // const res =  await Axios.post("http://localhost:3001/api/updateteam", load);
            //     Swal.fire({
            //         title: "สำเร็จ",
            //         text: "เพื่มชื่อทีมหรือชื่อบริษัทสำเร็จ",
            //         icon: "success"
            //       });
            //       console.log(res.data)
            //       localStorage.setItem("orid" , team)
            //       router.push("/pif/productslist")


            // } catch (error) {
            //     console.error(error);

            // }
       

    }



    // const add = (e) => {
    //     no.push(e)
    //     setNo([...no])

    //       const result = data.find(({ no }) => no === e);
    //       console.log("...........");
    //       console.log(result);
    //       setList([...list, result]);
    //       setShow([]);
    //       setSearch_input("");

    //       console.log(list);

    //   };



    // const  handleChange = (e) => {
    //     console.log("handeChang")
    //     console.log(e)
    //     if(e.type === 1){
    //         status.push("S")
    //         setStatus([...status])
    //     }
    //     else if(e.type === 2) {
    //         status.push("U1")
    //         setStatus([...status])
    //     }
    //     else if(e.type === 3) {
    //         status.push("U2")
    //         setStatus([...status])
    //     }
    //     else if(e.type === 4){
    //       removelist(e.idx)
    //       removeNo(e.no)

    //     }
    // }

    // const removelist = (e) => {
    //   list.splice(e,1)
    //   setList([...list])
    //   console.log(list)
    // }

    // const removeNo = (e) => {
    //   let remove = e

    //   let index = no.indexOf(remove)

    //   if(index !== -1){
    //     no.splice(index ,1)
    //     status.splice(index , 1)
    //   }
    //   console.log(no)
    //   console.log(status)
    // }

  //  const sendData = () => {
  //   console.log("SendData")
  //   console.log(status)
  //   console.log(no)
  //   console.log(team)

  //   if(checkG(team) === 1 ){
  //     alert("มีคนใช้ชื่อทีมนี้ช่ำแล้วกรุณาเปลี่ยนชื่อ")
  //     window.location.reload()
  //   }

  //   let load = {
  //       st : status,
  //       no : no ,
  //       team : team
  //   }
  //       const send = async () => {
  //           try{
  //               const res = await Axios({
  //                   url : "http://localhost:3001/api/updateStutus",
  //                   method : "post",
  //                   data : load
  //               })

  //               Swal.fire({
  //                   position: "center",
  //                   icon: "success",
  //                   title: "เพิ่มสถานะสำเร็จ",
  //                   showConfirmButton: false,
  //                   timer: 1500
  //                 });
  //                 router.push("/team/manage");
  //                  // pathname: '/team/manage',
  //                   // query: { team: team },


  //           }  catch (error) {
  //               console.error(error);

  //           }
  //       }
  //       send()
  //  }


  return (
    <div>
        <Navbar/>

        <h1 style={{ textAlign: 'center' }}>สร้างทีมของคุณเพื่อรังสรรค์การทำงาน</h1>
        <Box
    display="flex"
    flexDirection="row"
    justifyContent="center"
    alignItems="center"
    marginTop="20px"
    marginBottom="30px"
    marginLeft="auto"
    marginRight="auto"
>
    <input
        style={{
            width: "400px",
            height: "42px",
            borderRadius: "5px",
            border: "1px solid #C4C4C4",
            padding: "10px",
        }}
        type="text"
        placeholder="ใส่ชื่อบริษัท หรือ ชือทีมของคุณ"
        onChange={(e) => setTeam(e.target.value)}
        defaultValue={team}
    />
    <button
        style={{
            width: "80px",
            height: "42px",
            borderRadius: "5px",
            border: "1px solid #C4C4C4",
            padding: "10px",
            backgroundColor: "#7e57c2",
            marginLeft: "5px",
        }}
        onClick={() => handleChick()}
    >
        <span style={{ color: "white" }}>สร้าง</span>
    </button>
</Box>



    {/* { st === 1 ?

         <div className="input-icons">
         <i className="fa fa-search icon"></i>
         <input
           placeholder="ค้าหาโดยชื่อผู้ใช้"
           className="in"
           value={search_input}
           onChange={(e) => resultsearch(e.target.value)}
         />
         <br />
       </div>
       : null


    } */}

      {/* <div className="show">
        {search_input.length
          ? show.map((value, idx) =>

                <p onClick={() => add(value.no)} key={value.idx}>

                  {value.em_fullname}
                </p>

            )
          : null}
      </div> */}

      {
        list.length ?
        <table className="C1A_styled-table">
        <thead>
          <tr>
            <th className="C1A_th1">ลำดับ</th>
            <th className="C1A_th2">ชื่อ</th>
            <th className="C1A_th3">เพิ่ม</th>
          </tr>
        </thead>
        <tbody>
            {
                list && list.length > 0 ?
                    list.map((value , idx) => (
                        <tr key={idx}>
                            <td>{idx + 1}</td>
                            <td>{value.em_fullname}</td>
                            <td>
                            <Box sx={{ minWidth: 120 }}>
  <FormControl fullWidth>
    <InputLabel id="demo-simple-select-label">สถานะ</InputLabel>
    <Select
      labelId="demo-simple-select-label"
      id="demo-simple-select"
      label="เพิ่มสถานะ"
      onChange={(e) => handleChange(e.target.value)}

    >
      <MenuItem value={{ type: 1, no: value.no, idx }}>หัวหน้า</MenuItem>
      <MenuItem value={{ type: 2, no: value.no, idx }}>ผู้แก้</MenuItem>
      <MenuItem value={{ type: 3, no: value.no, idx }}>ผู้ดู</MenuItem>
      <MenuItem value={{ type: 4, no: value.no, idx }}>นำออก</MenuItem>
    </Select>
  </FormControl>
</Box>
                            </td>

                            </tr>
                    ))



                : null
            }
        </tbody>
      </table>
      : null

      }


         {
            team.length > 0 && list.length > 0  && status.length > 0?
            <Button variant="contained" color="success" onClick={() => sendData()}   sx={{
                marginLeft: 'auto',
                marginRight: 'auto',
                display: 'block',
            }}>
                บันทึก
            </Button>
            : null
         }


        <Footer/>
    </div>
  )
}

export default team
