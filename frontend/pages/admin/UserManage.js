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


const UserManage = () => {
    const router = useRouter()
    const [tap , setTap] = useState(0)
    const [data , setData] = useState([])
    const [search_input, setSearch_input] = useState("");
    const [show , setShow] = useState([])

    useEffect(() => {

        // Check Status
    //    let a =  localStorage.getItem("status") === "A"
    //    if( a !== "A"){
    //     router.push("/")
    //    }

        //FetchData From Employee
        const fetchData0 = async () => {
         try {
        const res0 = await Axios.get("http://localhost:3001/api/AddminManageUser");
        // Handle the response data as needed
        console.log("Response:", res0.data);
        setShow(res0.data)
        setData(res0.data)
    } catch (error) {
        // Handle errors
        console.error("Error fetching data:", error);
    }
};

fetchData0();




    }, []);


    const resultsearch = (e) => {
        if (e.length === 0) {
            setShow(data)
            setSearch_input("");
          } else {
            setSearch_input(e);
            const results1 = show.filter((w) => {
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
        console.log(e)

        // if (checkG(data, e)) {
        //   alert("กรุณาเลือกคนอื่น");
        // } else {
        //     no.push(e)
        //     setNo([...no])
        //   const result = data1.find(({ no }) => no === e);
        //   console.log("...........");
        //   console.log(result);
        //   setData([...data, result]);
        //   setShow([]);
        //   setSearch_input("");

        //   console.log(data);
        // }
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

        else if(e1 === 4) {
            let load = {
                st : "A" ,
                no : e.no,
                team : id
            }
            console.log( "is load from handlechange")
            console.log(load)
            Axios.post("http://localhost:3001/api/updateManageUserAdmin", load)
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






  return (
    <div>
        <Navbar />



            <div className="container-xl">
            <div className="table-responsive">
              <div className="table-wrapper">
                <div className="table-title">
                  <div className="row">
                    <div className="col-sm-100">



                    </div>
                    <div className="col-sm-10">
                      <h2>
                        การจัดการ <b>สมาชิคของผู้ดูแลระบบ
                         </b>
                      </h2>
                    </div>
                  </div>
                </div>
                <br />


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


            {/* <div className="show">
                 {search_input.length
                     ? show.map((value, idx) =>

                <p onClick={() => add(value.no)} key={value.idx}>

                  {value.em_fullname}
                </p>

                          )
                     : null}
                     </div> */}



                <br />
                <table className="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th className="C2EM_th1">#</th>
                      <th className="C2EM_th2">Name</th>
                      <th className="C2EM_th3">Role</th>
                      <th className="C2EM_th4">Status</th>
                      <th className="C2EM_th4">TEAM</th>
                      <th className="C2EM_th5">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {show.map((value, idx) => (
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
                                <MenuItem value={{ type: 4, no: value.no, idx }}>
                                  ผู้ดูแลระบบ
                                </MenuItem>
                              </Select>
                            </FormControl>
                          </Box>
                        </td>
                        <td className="C2EM_th3">{value.organization_id}</td>
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



    </div>

  )
}

export default UserManage
