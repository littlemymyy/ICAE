
import Footer from "@/components/Footer"
import Navbar from "@/components/layout/Navbar"
import { Box, Typography } from "@mui/material"
import Button from '@mui/material/Button';
import Axios from "axios";
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import { useState } from 'react';
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';




export default function productslist() {
  const router = useRouter()
  const [search_input, setSearch_input] = useState("");
  const [product_data, setProductData] = useState([])
  const [id, setId] = useState("")
  const [uName, setUname] = useState("")
  const Swal = require('sweetalert2')
  const [age, setAge] = useState('');
  let see = 0 ;



  useEffect(() => {
    let name = localStorage.getItem("uname")
    setUname(name)
    console.log(localStorage.getItem("orid"));
    let ida = localStorage.getItem("orid");


    const fetchData = async () => {
    //  console.log("kkk")
     console.log(ida)
      if (ida === 'null') {
        router.push("/team/team")
      }
      else  {
        try {
          const res = await Axios({
            url: "http://localhost:3001/api/getPifProductByOrganiztion?organization_id=" + ida,
            method: "get",
          }).then((res) => {
            if (res.data.status === "error") {
              router.push("/pif/createByfda")
            }
            else{
              setProductData(res.data.message)
            }
          })
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }


    };

    fetchData(); // Call function here

  }, []);

  const resultsearch = (e) => {
    console.log("Type of e:", typeof e);
    if (e.length === 0) {
      setShow(data)
      // setShow([])
      setSearch_input('')
    }

    else {
      let a = e.toString()

      console.log("a is " + a)
      setSearch_input(a)
      const results1 = data.filter((w) => {
        //console.log(w.fda_license)
        return (
          a &&
          w &&
          w.cosname
          &&
          w.cosnameC
          &&
          (w.cosname.toLowerCase().includes(a) || w.cosname.toUpperCase().includes(a) || w.cosnameC.toUpperCase().includes(a)||w.cosname.toLowerCase().includes(a)||w.cosnameC.toLowerCase().includes(a)))

      });

      setShow(results1)
      console.log(results1)
    }
  }

  const buttonStyle = {
    backgroundColor: '#897BF1',
    float: 'left',
    marginTop: '10px',
  };

  const handleButtonClick = (e) => {

    if (e === 1) {
      router.push('/pif/manage');
    }
    else if (e === 2) {
      router.push('/pif/showpif');
    }

    else if (e === 3) {
      router.push('/team/manage');
    }
    else if (e === 4) {
      router.push("/pif/createByfda")
    }
  };

  const handledelete = (e) => {
    console.log(e)
    try {
      Axios.post("http://localhost:3001/api/pifProductRemoveById?id=" + e)
      .then((res) => {
          console.log(res.data)
          console.log(res.data.status)

          if (res.data.status === 'ok') {
            removeList(e)
            Swal.fire({
              title: "สำเร็จ!",
              text: "นำสินค้าออกจากระบบเรียบร้อย!",
              icon: "success"
            });
            router.push("/pif/productslist")
          }
          else {
          Swal.fire({
              title: "ผิดพลาด!",
              text: "นำสินค้าออกจากระบบไม่สำเร็จ!",
              icon: "error"
            });
          }
      })
    }catch {
        Swal.fire({
            title: "ผิดพลาด!",
            text: "นำสินค้าออกจากระบบไม่สำเร็จ!asdasd",
            icon: "error"
          });
    }
  }

  const test = () => {
    console.log(product_data);
  }

  const handleButtonClickEdit = (pif_status,id) => {
    if( pif_status === 0 ){
      router.push({
        pathname : "/pif/manage",
        query : {
          product_id : id
        }

      }
        )

    }
    else if ( pif_status === 1 ) {
      router.push({
        pathname: "/pif/upload",

        query: {
          product_id : id ,
        },
      });
    }

  }

  const handleChange = (e) => {
    if(e === 1){
      see += e;
      const feactData = async () => {
        let load = {
          id : id ,
          con : "1"
        }
        try{
          const res = await Axios.post("http://localhost:3001/api/sort" ,load)

          console.log(res.data)

          await setShow(res.data)

        } catch(error){
          console.log(error)
        }
      }
      feactData()
    }

    if(e === 2){
      see += e;
      const feactData = async () => {
        let load = {
          id : id ,
          con : "2"
        }
        try{
          const res = await Axios.post("http://localhost:3001/api/sort" ,load)

          console.log(res.data)

          await setShow(res.data)

        } catch(error){
          console.log(error)
        }
      }
      feactData()
    }

    if(e === 3){
      see += e;
      const feactData = async () => {
        let load = {
          id : id ,
          con : "3"
        }
        try{
          const res = await Axios.post("http://localhost:3001/api/sort" ,load)

          console.log(res.data)

          await setShow(res.data)

        } catch(error){
          console.log(error)
        }
      }
      feactData()
    }

    if(e === 4){
      see += e;
      const feactData = async () => {
        let load = {
          id : id ,
          con : "4"
        }
        try{
          const res = await Axios.post("http://localhost:3001/api/sort" ,load)

          console.log(res.data)

          await setShow(res.data)

        } catch(error){
          console.log(error)
        }
      }
      feactData()
    }

  }



  return (
    <>
      <Navbar />
      <Box className="pif"
        sx={{
          backgroundColor: { xs: "#F8F8F8", md: "#F8F8F8" },
          justifyContent: { xs: "", md: "center" },
          display: { xs: "block", md: "flex" },
          textAlign: { xs: "center", md: "center" },
          paddingTop: { xs: "50px", md: "50px" },
          paddingBottom: { xs: "50px", md: "50px" },
        }}

      >
        <Box className="pif_left"
          sx={{

            justifyContent: { xs: "", md: "center" },
            display: { xs: "block", md: "flex" },


          }}

        >
          <img src="/secret-file.png" style={{ maxWidth: 0 + "150px" }} />

        </Box>
        <Box className="pif_right">

          <h1>ระบบจัดการ PIF</h1>
          <h1>(Product Information File)</h1>


        </Box>
      </Box>

      <Box
        sx={{

          justifyContent: { xs: "", md: "center" },
          display: { xs: "block", md: "flex" },
          textAlign: { xs: "center", md: "center" },
          paddingTop: { xs: "30px", md: "30px" },


        }}>



            <Typography variant='h5'>รายการผลิตภัณฑ์ ของ {id}</Typography>

      </Box>
      <Box display="flex" alignItems="center">



        <div className="input-icons">
          <i className="fa fa-search icon"></i>
          <input placeholder='ค้นหาผลิตภัณฑ์ของคุณ '
            className="in"
            value={search_input}
            onChange={(e) => resultsearch(e.target.value)}
          />
          <Button variant="contained" size="medium" sx={{ ml: 2 }} style={buttonStyle} onClick={() => handleButtonClick(4)}
          >
            สร้างผลิตภัณฑ์
          </Button>

          <Button variant="contained" size="medium" sx={{ ml: 2 }} style={buttonStyle} onClick={() => handleButtonClick(2)}>
            จัดการ PIF
          </Button>

          <Button variant="contained" size="medium" sx={{ ml: 2 }} style={buttonStyle} onClick={() => handleButtonClick(3)}>
            ทีมของคุณ
          </Button>


                            <FormControl size="medium" sx={{ m: 1, minWidth: 150 }}  >
                              <InputLabel id="demo-simple-select-label">
                                การกรอกข้อมูล
                              </InputLabel>
                              <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="การกรอกข้อมูล"
                                onChange={(e) => handleChange(e.target.value)}
                              >
                                <MenuItem value={ 1 }>
                                  วันที่มากไปน้อย
                                </MenuItem>
                                <MenuItem value={  2 }>
                                  วันที่น้อยไปมาก
                                </MenuItem>
                                <MenuItem value={ 3 }>
                                ตามตัวอักษร ก-ฮ
                                </MenuItem>
                                <MenuItem value={ 4 }>
                                ตามตัวอักษร ฮ-ก
                                </MenuItem>
                              </Select>
                            </FormControl>

          </div >
      </Box>


      <br />
      <div className="bodyTproductlist">
        <div className="table_section"></div>
        <table className="table_tp">
          <thead className="tpl">
            <tr className="trplc">
            <th className="plac">ลำดับ</th>
            <th className="plac">เลขจดแจ้ง</th>
            <th className="plac">ชื่อการค้า</th>
            <th className="plac">ชื่อผลิตภัณฑ์</th>
            <th className="plac">วันที่เลขจดแจ้งหมดอายุ</th>
            <th className="plac">รายงาน PIF </th>
            <th className="plac">การจัดการ</th>
            </tr>
          </thead>
          <tbody>
          {
             product_data.map((value , idx)=>(
                <tr className="trplc" key={idx}>
                  <td className="plac" >{idx+1}</td>
                  <td className="plac">{value.fda_license}</td>
                  <td className="plac">{value.product_name}</td>
                  <td className="plac">{value.cosmetic_name}</td>
                  <td className="plac">{new Date(value.expire_date).toISOString().split('T')[0]}</td>
                  { value.pif_status === 0 ? <td className="plac">ไม่มี</td> : <td className="plac">มี</td> }
                  <td className="plac plaC">
                  {
                    value.pif_status === 0 ? (
                      <>
                        <button className="pl" onClick={() => handleButtonClickEdit(value.pif_status, value.id)}>
                        สร้าง PIF &nbsp;<FaEdit />
                        </button>
                        <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        <button className="pl" onClick={() => handledelete(value.no, idx, value.status, value.fda_license)}>
                          ลบ &nbsp;
                        <MdDeleteForever />
                        </button>
                      </>
                          ) : (
                      <>
                        <button className="pl" onClick={() => handleButtonClickEdit(value.pif_status, value.id)}>
                        แก้ไข PIF &nbsp;<FaEdit />
                        </button>
                        <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        <button className="pl" onClick={() => handledelete(value.id)}>
                          ลบ &nbsp;
                        <MdDeleteForever />
                        </button>
                      </>
                          )
                        }
              </td>

                </tr>
              ))
            }
          </tbody>
        </table>
      </div>

            <button onClick={test}>test</button>

      <Footer />
        </>
    )
}
