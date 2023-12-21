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
import { IoIosExit } from "react-icons/io";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';


const manage = () => {
  const [data, setData] = useState([]);
  const router = useRouter();
  const [id, setId] = useState("");
  const [teamName, setTeamName] = useState("")
  const [statusU , setStatusU] = useState("")
  const [no , setNo] = useState([])
  const [tap , setTap] = useState(0)
  const [search_input, setSearch_input] = useState("");
  const [show, setShow] = useState([]);
  const [dataUser, setDataUser] = useState([]);
  const [userID, setUserID] = useState([]);




  useEffect(() => {
    console.log(localStorage.getItem("uemail"))
    console.log(localStorage.getItem("orid"))
    if(localStorage.getItem("uemail") === null ){
        router.push("/")
    }
    if(localStorage.getItem("orid") === "null" || localStorage.getItem("orid") === null){
        router.push("/team/team")
    }
    let id = localStorage.getItem("orid");
    let email = localStorage.getItem("uemail")
    Axios.get(process.env.NEXT_PUBLIC_API_BASE_URL+"/api/getStatusByEmail?email="+email)
    .then((res) => {
       // console.log(res.data.message[0].status)
        setStatusU(res.data.message[0].status)
        localStorage.setItem("status", res.data.message[0].status)
        setUserID(res.data.message[0].no)
    })
    .catch((err) => {
        console.log(err)
    });

    if (!id == null) {
      router.push("team/team");
    }

    Axios.get(process.env.NEXT_PUBLIC_API_BASE_URL+"/api/getUserNoTeam")
      .then((res) => {
        //console.log("Data")
       // console.log(res.data.message)
        setDataUser(res.data.message);

      })
      .catch((err) => {
        console.log(err)
        Swal.fire({
          title: "พบข้อผิดพลาด!",
          text: "กรุณาลองใหม่อีกครั้ง!",
          icon: "error",
        }).then((result) => {
            router.push("/pif/productslist");
        })
      });


    const feactData1 = async () => {
          let ida = ""
          Axios.get(process.env.NEXT_PUBLIC_API_BASE_URL+"/api/getuserTeamMangeByemail?email="+email)
          .then((res) => {
              //console.log("Data")
              //console.log(res.data.message[0].organization_id)
              ida = res.data.message[0].organization_id;
              setId(ida)
              if (ida === null) {
                  localStorage.setItem("orid", "null")
                  router.push("/team/team")
              }else{
                  localStorage.setItem("orid", ida)
                  //console.log("ida = ", ida)

                  Axios.get(process.env.NEXT_PUBLIC_API_BASE_URL+"/api/getuserTeamManage?id="+ida)
                  .then((res) => {
                     // console.log("Data")
                     // console.log(res.data.message)
                      setData(res.data.message);
                  })
                  .catch((err) => {
                      console.log(err)
                      Swal.fire({
                          title: "พบข้อผิดพลาด!",
                          text: "กรุณาลองใหม่อีกครั้ง!",
                          icon: "error",
                      }).then((result) => {
                          router.push("/pif/productslist");
                      })
                  })
              }
          })
          .catch((err) => {
              console.log(err)
              Swal.fire({
                title: "พบข้อผิดพลาด!",
                text: "กรุณาลองใหม่อีกครั้ง!",
                icon: "error",
              }).then((result) => {
                  router.push("/pif/productslist");
              })
          })
    }

    feactData1();
  }, []);


  const resultsearch = (e) => {
    //console.log("Result e=>",e)
    if (e.length === 0) {
        setShow([]);
        setSearch_input("");
      } else {
        setSearch_input(e);
        const results1 = dataUser.filter((w) => {
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

  const add = (e) => {
      no.push(e)
      setNo([...no])
      //console.log("ADDED")

      Axios.post(process.env.NEXT_PUBLIC_API_BASE_URL+"/api/addUserToTeam",
      {
        team: id,
        no: e,
      })
      .then((res) => {
        if (res.data.status === "ok") {
          Swal.fire({
            title: "สำเร็จ!",
            text: "เพิ่มเข้าทีมสำเร็จ!",
            icon: "success",
          }).then((result) => {
              window.location.reload();
          });
        }
        else {
          Swal.fire({
            title: "ไม่สำเร็จ!",
            text: "เพิ่มเข้าทีมไม่สำเร็จ!",
            icon: "error",
          }).then((result) => {
            window.location.reload();
        });
        }
      })
      .catch((err) => {
        console.log(err)
        Swal.fire({
          title: "ไม่สำเร็จ!",
          text: "เพิ่มเข้าทีมไม่สำเร็จ!",
          icon: "error",
        }).then((result) => {
            window.location.reload();
        });
      });
     // console.log(data);
  };

  const handleChange = (e) => {
    let e1 = parseInt(e.type)

    Axios.get(process.env.NEXT_PUBLIC_API_BASE_URL+"/api/getCountOwner?id="+id)
    .then((res) => {
        //console.log(res.data.message[0].num)
        let s_count = res.data.message[0].num
        if (s_count <= 1) {
          Axios.get(process.env.NEXT_PUBLIC_API_BASE_URL+"/api/getStatusByNo?no="+e.no)
          .then((res) => {
              //console.log(res.data.message[0].status)
              let s_status = res.data.message[0].status
              if (s_status === "S" && e1 !== 1) {
                Swal.fire({
                  title: "ไม่สามารถเปลี่ยนสถานะได้!",
                  text: "ต้องมีหัวหน้าอย่างน้อย 1 คน",
                  icon: "error",
                });
              }
              else{
                updateStatus(e);
              }
            });
        }
        else{
          updateStatus(e);
        }
    })
    .catch((err) => {
        console.log(err)
        Swal.fire({
            title: "พบข้อผิดพลาด!",
            text: "กรุณาลองใหม่อีกครั้ง!",
            icon: "error",
        })
    })
  };

  const updateStatus = (e) => {
    let e1 = parseInt(e.type)
    if(e1 === 1){
        var dataChangeStatus = {
            st : "S" ,
            no : e.no,
            team : id
        }
    }
    else if(e1 === 2) {
        var dataChangeStatus = {
            st : "U1" ,
            no : e.no,
            team : id
        }
    }
    else if(e1 === 3) {
        var dataChangeStatus = {
            st : "U2" ,
            no : e.no,
            team : id
        }
    }
    console.log( "is load from handlechange")
        //console.log(dataChangeStatus)
        Axios.post(process.env.NEXT_PUBLIC_API_BASE_URL+"/api/updateManageUser", dataChangeStatus)
        .then(response => {
    // Handle the response data here
        if(response.data){
            Swal.fire({
                position: "center",
                icon: "success",
                title: "เปลี่ยนสถานะสำเร็จ",
              }).then((result) => {
                  window.location.reload();
              })
        }
       // console.log(response.data);
        })
    .catch(error => {
      // Handle errors here
      console.error("Error:", error);
    });
  }

  const handleDelete = async (e) => {
    Axios.get(process.env.NEXT_PUBLIC_API_BASE_URL+"/api/getCountOwner?id="+id)
    .then((res) => {
        //console.log(res.data.message[0].num)
        let s_count = res.data.message[0].num
        if (s_count <= 1) {
          Axios.get(process.env.NEXT_PUBLIC_API_BASE_URL+"/api/getStatusByNo?no="+e.no)
          .then((res) => {
              //console.log(res.data.message[0].status)
              let s_status = res.data.message[0].status
              if (s_status === "S") {
                Swal.fire({
                  title: "ไม่สามารถลบออกจากทีมได้!",
                  text: "ต้องมีหัวหน้าอย่างน้อย 1 คน",
                  icon: "error",
                });
              }
              else{
                deleteMember(e);
              }
            });
        }
        else{
          deleteMember(e);
        }
    })
    .catch((err) => {
        console.log(err)
        Swal.fire({
            title: "พบข้อผิดพลาด!",
            text: "กรุณาลองใหม่อีกครั้ง!",
            icon: "error",
        })
    })
  }

  const handleDeleteTeam = () => {
    Swal.fire({
      title: "คุณต้องการลบทีมนี้หรือไม่?",
      text: "ข้อมูลทั้งหมดของทีมนี้จะถูกลบอย่างถาวร!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "ใช่",
      cancelButtonText: "ไม่",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteTeamCheck();
      }
    });
  }

  const deleteTeamCheck = (e) => {
    let load = {
      data : id
    }
    //console.log("load from delete")
    //console.log(load)
    Axios.post(process.env.NEXT_PUBLIC_API_BASE_URL+"/api/deleteTeam", load)
    .then(response => {
      if (response.data.status === "ok") {
        Swal.fire({
            title: "สำเร็จ!",
            text: "ลบทีมเรียบร้อย!",
            icon: "success"
          }).then((result) => {
              localStorage.setItem("orid","null")
              router.push("/team/team")
          });
      }
      else {
        Swal.fire({
            title: "ไม่สำเร็จ!",
            text: "ลบทีมไม่สำเร็จ กรุณาลองใหม่อีกครั้ง!",
            icon: "error"
          });
      }
    })
    .catch(error => {
      console.error("Error:", error);
      Swal.fire({
        title: "ไม่สำเร็จ!",
        text: "ลบทีมไม่สำเร็จ กรุณาลองใหม่อีกครั้ง!",
        icon: "error"
      });
    });
  }
  const deleteMember = (e) => {
    //console.log("deleted no = "+ e.no);
    let load = {
      data : e.no
    }
    //console.log("load from delete")
    //console.log(load)
    Axios.post(process.env.NEXT_PUBLIC_API_BASE_URL+"/api/getuserDeleteAdmin", load)
    .then(response => {
      if (response.data.status === "ok") {
        Swal.fire({
            title: "สำเร็จ!",
            text: "นำสมาชิกออกจากระบบเรียบร้อย!",
            icon: "success"
          }).then((result) => {
              window.location.reload();
          });
      }
      else {
        Swal.fire({
            title: "ไม่สำเร็จ!",
            text: "นำสมาชิกออกจากระบบไม่สำเร็จ!",
            icon: "error"
          });
      }
    })
    .catch(error => {
      console.error("Error:", error);
      Swal.fire({
        title: "ไม่สำเร็จ!",
        text: "นำสมาชิกออกจากระบบไม่สำเร็จ!",
        icon: "error"
      });
    });
  }

  const changeName = async () => {
    //console.log("That chamgename big")
   // console.log(id)
   // console.log(teamName);
    if (teamName === "" || teamName === null || teamName === undefined || teamName === "null" || teamName === "undefined") {
        Swal.fire({
            title: "ชื่อทีมไม่ถูกต้อง!",
            text: "กรุณากรอกชื่อทีมใหม่!",
            icon: "error",
        });
        return;
    }
    else {

    
    let load = {
        teamName: teamName,
        id: id,
    };

    try {
        const res = await Axios.post(process.env.NEXT_PUBLIC_API_BASE_URL+"/api/changeNameTeam", load);
       // console.log("changeName")
       // console.log(res.data)
        if (res.data.status === "ok") {
            Swal.fire({
                title: "สำเร็จ!",
                text: "เปลี่ยนชื่อทีมสำเร็จ!",
                icon: "success",
            }).then((result) => {
              localStorage.setItem("orid",teamName)
              window.location.reload();
            });
        }
        else if (res.data.message === "Duplicate Team Name"){
            Swal.fire({
                title: "ชื่อทีมถูกใช้ไปแล้ว!",
                text: "ชื่อทีมนี้ถูกใช้ไปแล้ว กรุณาลองเลือกชื่อทีมอื่น!",
                icon: "error",
            });
        }
        else {
            Swal.fire({
                title: "เกิดข้อผิดพลาด",
                text: "กรุณาลองใหม่อีกครั้ง!",
                icon: "error",
            });
        }
    } catch (error) {
        console.error("Error changing name:", error);
        Swal.fire({
          title: "เกิดข้อผิดพลาด",
          text: "กรุณาลองใหม่อีกครั้ง!",
          icon: "error",
      });
    }
  }
  };

const handleChickAdd = () => {
   // console.log("That is handleChickAdd")
    setTap(1)
}


   const handleExit = () => {
    let load = {
      email : localStorage.getItem("uemail")
    }
      const send = async () => {
        try{

          const res = await Axios.post(process.env.NEXT_PUBLIC_API_BASE_URL+"/api/updateDelete",load)

          if(res.data === "Remove_organization_id"){
            localStorage.setItem("status" , "U");
            localStorage.setItem('orid', "-")
            Swal.fire({
              position: "center",
              icon: "success",
              title: "ออกจากทีมสำเร็จ",
              showConfirmButton: false,
              timer: 1500
            });
            router.push("/")
          }


        } catch(error){
          console.log(error)
        }
        
      }
      send()
   }

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

                        <div className="btn">
                          <Button variant="contained" color="error" onClick={() => handleDelete({no: userID})}>ออกจากทีม</Button>
                        </div>
                        <div className="btn">
                          <p></p>
                        </div>
                        <div className="btn">
                          <Button variant="contained" color="error" onClick={() => handleDeleteTeam({no: userID})}>ลบทีม</Button>
                        </div>
                        <div className="btn" onClick={()=>handleChickAdd()}>
                          <Button variant="contained" onClick={() => handleChickAdd()}>เพิ่มสมาชิก</Button>
                        </div>

                      </div>
                      <div className="col-sm-10">
                        <h2>
                          การจัดการ <b>สมาชิกของทีม&nbsp;&nbsp;&nbsp;<input defaultValue={id} onChange={(e)=>setTeamName(e.target.value)}/>
                          <Button variant="contained" color="success" onClick={()=>changeName()}><FcOk />เปลี่ยนชื่อทีม </Button> </b>
                        </h2>
                      </div>
                    </div>
                  </div>
                  <br/>
                  {
                      tap === 1 ?
                      <div className="input-icons">
                      <i className="fa fa-search icon"></i>
                      <input
                        placeholder="ค้นหาโดยชื่อผู้ใช้"
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
                        <th className="C2EM_th2">ผู้ใช้</th>
                        <th className="C2EM_th3">ตำแหน่ง</th>
                        <th className="C2EM_th4">สถานะ</th>
                        <th className="C2EM_th5">การกระทำ</th>
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
                        value.status === "U2" ?
                        <p>ผู้ดู</p> :
                        <p>ยังไม่ตั้งสถานะ</p> 
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
           :
           <div className="container-xl">
            <div className="table-responsive">
                <div className="table-wrapper">
                  <div className="table-title">
                    <div className="row">
                      <div className="col-sm-100">
                        <div className="btn">
                          <Button variant="contained" color="error" onClick={() => handleDelete({no: userID})}>ออกจากทีม</Button>
                        </div>
                      </div>
                      <div className="col-sm-10">
                        <h2>
                          การจัดการ <b>สมาชิกของทีม&nbsp;&nbsp;&nbsp;<input disabled defaultValue={id}/></b>
                        </h2>
                    </div>
                  </div>
                </div>
                <br></br>

                <table className="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th className="C2EM_th1">#</th>
                      <th className="C2EM_th2">ผู้ใช้</th>
                      <th className="C2EM_th3">ตำแหน่ง</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((value, idx) => (
                      <tr key={idx}>
                        <td className="C2EM_th1">{idx + 1}</td>
                        <td className="C2EM_th2">{value.em_email}</td>
                        <td className="C2EM_th3">
                        {
                        value.status === "S" ?
                        <p>หัวหน้า</p> :
                        value.status === "U1" ?
                        <p>ผู้แก้ไข</p> :
                        value.status === "U2" ?
                        <p>ผู้ดู</p> :
                        <p>ยังไม่ตั้งสถานะ</p> 
                            }
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
        }





      <Footer></Footer>
    </div>
  );
};
export default manage;
