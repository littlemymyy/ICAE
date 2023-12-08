import React, { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/Footer";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Autocomplete from "@mui/material/Autocomplete";
import { rgb } from "pdf-lib";
import { fetch } from "pdf-lib";
import { Box, TextField, Typography, Button } from "@mui/material";
import Axios from "axios";
import { data } from "jquery";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import SendIcon from "@mui/icons-material/Send";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import DeleteIcon from "@mui/icons-material/Delete";
import { TiUserDelete } from "react-icons/ti";
import { FaUserPlus } from "react-icons/fa";
import { FcOk } from "react-icons/fc";


const manage = () => {
  const [data, setData] = useState([]);
  const [data1 , setData1] = useState([]);
  const [dataChange, setDataChange] = useState([]);
  const router = useRouter();
  const [id, setId] = useState("");
  const [status , setStatus] = useState([])
  const [teamName, setTeamName] = useState("")
  const [statusU , setStatusU] = useState("")
  const [no , setNo] = useState([])
  const [tap , setTap] = useState(0)
  const [search_input, setSearch_input] = useState("");
  const [show, setShow] = useState([]);
  const [teamdata , setTeamdata] = useState([])




  useEffect(() => {
    if(sessionStorage.getItem("uemail") === null ){
        router.push("/")
    }
    if(sessionStorage.getItem("orid") === ""){
        router.push("/team/team")
    }
    let id = sessionStorage.getItem("orid");
    let email = sessionStorage.getItem("uemail")
    let st = sessionStorage.getItem("status")
    console.log("session : ")
    console.log(id);
    setStatusU(st)
    if (!id == null) {
      router.push("team/team");
    }


    const feactData0 = async () => {
        try {
            const res = await Axios.get("http://localhost:3001/api/getuserTeam/");
            const res1 = await Axios.get("http://localhost:3001/api/getuserTeamName/")
            console.log("AAA")
            console.log(res.data)
          //  console.log(res1.data)
            setData1(res.data)
            setTeamdata(res1.data)
            
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    // const queryString = window.location.search
    // const searchParams = new URLSearchParams(queryString)
    // const team = searchParams.get("team")
    feactData0()
    let ida = ""
    const feactData1 = async () => {
        let load = {
            data : email
        }
        try {
            const res = await Axios.post(
                "http://localhost:3001/api/getuserTeamMangeByemail" , load
            )
            console.log("name : ")
            console.log(res.data[0].organization_id)
            for(let i = 0 ; i < res.data.length ; i++){
                ida += res.data[i].organization_id
                console.log(ida)
                setId(ida)
            }
           
            console.log(ida)
            const feactData = async () => {
        
                let load = {
               
                    data: res.data,
                  };
              try {
                const res1 = await Axios.post(
                  "http://localhost:3001/api/getuserTeamManage",
                  load
                );
                console.log('Data')
                console.log(res1.data);
                setData(res1.data);
              } catch (error) {
                console.error("Error fetching data:", error);
              }
            };

            feactData();
        } catch (error) {
            console.log(error)
        }
        
    }



   
    // const feactData = async () => {
        
    //     let load = {
       
    //         data: ida,
    //       };
    //   try {
    //     const res = await Axios.post(
    //       "http://localhost:3001/api/getuserTeamManage",
    //       load
    //     );

    //     console.log(res.data);
    //     setData(res.data);
    //   } catch (error) {
    //     console.error("Error fetching data:", error);
    //   }
    // };
    feactData1();
    // feactData();
    
  }, []);

  const checkdb = async (e) => {
    const res = await Axios.post('')
  }

  const resultsearch = (e) => {
    if (e.length === 0) {
        setShow([]);
        setSearch_input("");
      } else {
        setSearch_input(e);
        const results1 = data1.filter((w) => {
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


const checkG = (e) => {
    for (let i = 0; i < data.length; i++) {
      console.log("CheckG")
      console.log(e)
      console.log(data[i].em_fullname)
      if (e === data[i].em_fullname) {
        console.log("1 that is if")
        return true;
      }
    }
    return false;
  };

  const add = (e) => {
  
    if (checkG( e) ) {
      alert("กรุณาเลือกคนอื่น");
    } else {
        no.push(e)
        setNo([...no])
      const result = data1.find(({ no }) => no === e);
      console.log("...........");
      console.log(result);
      setData([...data, result]);
      setShow([]);
      setSearch_input("");

      console.log(data);
    }
  };






  const handleChange = (e) => {
    let e1 = parseInt(e.type)
    if(e1 === 1){
        let load = {
            st : "S" ,
            no : e.no,
            team : id
        }
        console.log( "is load from handlechange")
        console.log(load)
        Axios.post("http://localhost:3001/api/updateManageUser", load)
        .then(response => {
    // Handle the response data here
        if(response.data){
            Swal.fire({
                position: "center",
                icon: "success",
                title: "เปลี่ยนสถานะสำเร็จ",
                showConfirmButton: false,
                timer: 1500
              });
        }
        console.log(response.data);
        })
  .catch(error => {
    // Handle errors here
    console.error("Error:", error);
  });
    }
    else if(e1 === 2) {
        let load = {
            st : "U1" ,
            no : e.no,
            team : id
        }
        console.log( "is load from handlechange")
        console.log(load)
        Axios.post("http://localhost:3001/api/updateManageUser", load)
        .then(response => {
    // Handle the response data here
        if(response.data){
            Swal.fire({
                position: "center",
                icon: "success",
                title: "เปลี่ยนสถานะสำเร็จ",
                showConfirmButton: false,
                timer: 1500
              });
        }
        console.log(response.data);
        })
  .catch(error => {
    // Handle errors here
    console.error("Error:", error);
  });
    }
    else if(e1 === 3) {
        let load = {
            st : "U2" ,
            no : e.no,
            team : id
        }
        console.log( "is load from handlechange")
        console.log(load)
        Axios.post("http://localhost:3001/api/updateManageUser", load)
        .then(response => {
    // Handle the response data here
        if(response.data){
            Swal.fire({
                position: "center",
                icon: "success",
                title: "เปลี่ยนสถานะสำเร็จ",
                showConfirmButton: false,
                timer: 1500
              });
        }
        console.log(response.data);
        })
  .catch(error => {
    // Handle errors here
    console.error("Error:", error);
  });
    }
  }

  const handleDelete = (e) => {
    removelist(e.idx)
    removeNo(e.no)
   
  }

  const removelist = (e) => {
    data.splice(e,1)
    setData([...data])
    console.log(data)
  }

  const removeNo = async (e) => {
    let load = {
        data : e ,
        id : id
    }
    console.log("load from delete")
    console.log(load)
   const res = await Axios.post("http://localhost:3001/api/getuserDeleteAdmin",load)
   if(res.data) {
    Swal.fire({
        title: "สำเร็จ!",
        text: "นำสมาชิคออกจากระบบเรียบร้อย!",
        icon: "success"
      });
   }
  }

  const changeName = async () => {
    console.log("That chamgename big")
    console.log(id)
    console.log(teamName);
    let load = {
        data: teamName,
        id: id,
    };

    try {
        const res = await Axios.post("http://localhost:3001/api/changeNameTeam", load);
        console.log("changeName")
        console.log(res.data)
        if (res.data) {
            Swal.fire({
                title: "สำเร็จ!",
                text: "เปลี่ยนชื่อ เรียบร้อย!",
                icon: "success",
            });
            sessionStorage.setItem("orid",teamName)
            window.location.reload();
        }
    } catch (error) {
        console.error("Error changing name:", error);
        // Handle the error, show an error message, etc.
    }
};

const handleChickAdd = () => {
    setTap(1)
}

// const sendData = () => {
//     console.log("SendData")
//     console.log(status)
//     console.log(no)
    
//     let load = {
//         st : status,
//         no : no ,
//         team : teamName
//     }
//         const send = async () => {
//             try{
//                 const res = await Axios({
//                     url : "http://localhost:3001/api/updateStutus",
//                     method : "post",
//                     data : load
//                 })

//                 Swal.fire({
//                     position: "center",
//                     icon: "success",
//                     title: "เพิ่มสถานะสำเร็จ",
//                     showConfirmButton: false,
//                     timer: 1500
//                   });
//                   router.push("/team/manage");
//                    // pathname: '/team/manage',
//                     // query: { team: team },
                  

//             }  catch (error) {
//                 console.error(error);
                
//             }
//         }
//         send()
//    }
  

  return (
    <div>
      <Navbar />
        {
            statusU === "S" || statusU === "A" ?
            <div className="container-xl">
            <div className="table-responsive">
              <div className="table-wrapper">
                <div className="table-title">
                  <div className="row">
                    <div className="col-sm-100">
                      
                      <button  className="btn btn-secondary"  onClick={() => handleChickAdd()}>
                        <div className="material-icons">
                          <FaUserPlus /> เพิ่มสมาชิค
                        </div>
                        
                      </button>
    
                    </div>
                    <div className="col-sm-10">
                      <h2>
                        การจัดการ <b>สมาชิค ของ <input defaultValue={id} onChange={(e)=>setTeamName(e.target.value)}/>  <Button variant="contained" color="success" onClick={()=>changeName()}>
                        <FcOk />เปลี่ยนชื่อทีม </Button> </b>
                      </h2>
                    </div>
                  </div>
                </div>
                <br />
                {
                    tap === 1 ? 
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
                }

            <div className="show">
                 {search_input.length
                     ? show.map((value, idx) =>
             
                <p onClick={() => add(value.no)} key={value.idx}>
                  
                  {value.em_fullname}
                </p>
              
                          )
                     : null}
                     </div>



                <br />
                <table className="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th className="C2EM_th1">#</th>
                      <th className="C2EM_th2">Name</th>
                      <th className="C2EM_th3">Role</th>
                      <th className="C2EM_th4">Status</th>
                      <th className="C2EM_th5">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((value, idx) => (
                      <tr key={idx}>
                        <td className="C2EM_th1">{idx + 1}</td>
                        <td className="C2EM_th2">{value.em_fullname}</td>
                        <td className="C2EM_th3">
                        {
                        value.status === "S" ?
                        <p>หัวหน้า</p> :
                        value.status === "U1" ?
                        <p>ผู้แก้ไข</p> :
                        <p>ผู้ดู</p>
                            }
                          </td>
                        <td className="C2EM_th4">
                          {" "}
                          <Box sx={{ minWidth: 120 }}>
                            <FormControl fullWidth>
                              <InputLabel id="demo-simple-select-label">
                                สถานะ
                              </InputLabel>
                              <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="เพิ่มสถานะ"
                                onChange={(e) => handleChange(e.target.value)}
                              >
                                <MenuItem value={{ type: 1, no: value.no, idx }}>
                                  หัวหน้า
                                </MenuItem>
                                <MenuItem value={{ type: 2, no: value.no, idx }}>
                                  ผู้แก้
                                </MenuItem>
                                <MenuItem value={{ type: 3, no: value.no, idx }}>
                                  ผู้ดู
                                </MenuItem>
                              </Select>
                            </FormControl>
                          </Box>
                        </td>
                        <td className="C2EM_th6">
                          <a
                            href="#"
                            className="deleteM"
                            title="Delete"
                            data-toggle="tooltip"
                            
                          >
                            <i >
                              <TiUserDelete onClick={() => handleDelete({ no: value.no, idx })} />
                            </i>
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="clearfix">
                  <div className="hint-text">
                    Showing <b>{data.length}</b> out of <b>{data.length}</b> entries
                  </div>
                </div>
              </div>
            </div>
          </div>
           :   <div className="container-xl">
           <div className="table-responsive">
             <div className="table-wrapper">
               <div className="table-title">
                 <div className="row">
                   <div className="col-sm-100">
                     
                     <button   className="btn btn-secondary" disabled  >
                       <div className="material-icons">
                         <FaUserPlus /> เพิ่มสมาชิค
                       </div>
                       
                     </button>
   
                   </div>
                   <div className="col-sm-10">
                     <h2>
                       การจัดการ <b>สมาชิค ของ <input disabled  defaultValue={id} onChange={(e)=>setTeamName(e.target.value)}/>  <Button disable variant="contained" color="success" onClick={()=>changeName()}>
                       <FcOk />เปลี่ยนชื่อทีม </Button> </b>
                     </h2>
                   </div>
                 </div>
               </div>
               <table className="table table-striped table-hover">
                 <thead>
                   <tr>
                     <th className="C2EM_th1">#</th>
                     <th className="C2EM_th2">Name</th>
                     <th className="C2EM_th3">Role</th>
                     <th className="C2EM_th4">Status</th>
                     <th className="C2EM_th5">Action</th>
                   </tr>
                 </thead>
                 <tbody>
                   {data.map((value, idx) => (
                     <tr key={idx}>
                       <td className="C2EM_th1">{idx + 1}</td>
                       <td className="C2EM_th2">{value.em_fullname}</td>
                       <td className="C2EM_th3">
                       {
                       value.status === "S" ?
                       <p>หัวหน้า</p> :
                       value.status === "U1" ?
                       <p>ผู้แก้ไข</p> :
                       <p>ผู้ดู</p>
                           }
                         </td>
                       <td className="C2EM_th4">
                         {" "}
                         <Box sx={{ minWidth: 120 }}>
                           <FormControl fullWidth>
                             <InputLabel id="demo-simple-select-label">
                               สถานะ
                             </InputLabel>
                             <Select
                               disabled
                               labelId="demo-simple-select-label"
                               id="demo-simple-select"
                               label="เพิ่มสถานะ"
                               onChange={(e) => handleChange(e.target.value)}
                             >
                               <MenuItem value={{ type: 1, no: value.no, idx }}>
                                 หัวหน้า
                               </MenuItem>
                               <MenuItem value={{ type: 2, no: value.no, idx }}>
                                 ผู้แก้
                               </MenuItem>
                               <MenuItem value={{ type: 3, no: value.no, idx }}>
                                 ผู้ดู
                               </MenuItem>
                             </Select>
                           </FormControl>
                         </Box>
                       </td>
                       <td className="C2EM_th6">
                         <a
                           href="#"
                           className="deleteM"
                           title="Delete"
                           data-toggle="tooltip"
                           
                         >
                           <i >
                             <TiUserDelete disabled onClick={() => handleDelete({ no: value.no, idx })} />
                           </i>
                         </a>
                       </td>
                     </tr>
                   ))}
                 </tbody>
               </table>
               <div className="clearfix">
                 <div className="hint-text">
                   Showing <b>{data.length}</b> out of <b>{data.length}</b> entries
                 </div>
               </div>
             </div>
           </div>
         </div> }      



        {/* {statusU === "S" || statusU === "A" ? (
        <Button onClick={() => sendData()}  variant="contained" color="success" style={{ marginLeft: 'auto', marginRight: 'auto', display: 'block' }}>
        บันทึก
         </Button>
         ) : null}
             */}
       

    
       


      <Footer></Footer>
    </div>
  );
};
export default manage;
