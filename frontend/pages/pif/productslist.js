
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
import ReportIcon from '@mui/icons-material/Report';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';




export default function productslist() {
  const router = useRouter()
  const [search_input, setSearch_input] = useState("");
  const [product_data, setProductData] = useState([])
  const [show , setShow] = useState([])
  const [id, setId] = useState("")
  const [uName, setUname] = useState("")
  const Swal = require('sweetalert2')
  const [age, setAge] = useState('');
  const [noti , setNoti] = useState([])
  let see = 0 ;

  useEffect(() => {
    let name = localStorage.getItem("uname")
    setUname(name)
    let ida = localStorage.getItem("orid");


    const fetchData = async () => {
      if (ida === 'null'|| ida === "-") {
        router.push("/team/team")
      }
      else  {
        setId(ida)
        try {
          const res = await Axios({
            url: process.env.NEXT_PUBLIC_API_BASE_URL+'/getPifProductByOrganiztion?organization_id=' + ida,
            method: "get",
          })
            if (res.data.status === "error") {
              router.push("/pif/createByfda")
            }
            else{
              setProductData(res.data.message)
              setShow(res.data.message)
              console.log("show =>" , res.data.message)
            }
          
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }


    };

    fetchData(); // Call function here

    //call Notification

    const NotificationFile = async () => {
      let load = {
        organization_id : localStorage.getItem("orid")
      }
      try{
        const res = await Axios.post(process.env.NEXT_PUBLIC_API_BASE_URL+"/getNoficationFile",load)
        console.log("notificationFile : ",res.data)

        for (let i = 0; i < res.data.length; i++) {
          // Iterate through the inner array
          for (let j = 0; j < res.data[i].length; j++) {
            // Push each product_id into the noti array
            noti.push(res.data[i][j].product_id);
          }
        }
        const uniqueNoti = Array.from(new Set(noti));

        // Set the state with the unique product_id values
        setNoti(uniqueNoti);
       

      // const notiArray = res.data.map(item => item.product_id);
      // setNoti(notiArray);
      //  const notiArray = res.data.map(item => item.product_id);
      //  setNoti(notiArray);
        

      } catch(error){
        console.log(error)
      }
      

    }
    NotificationFile()
  
    
  }, []);

  const checkFilePIF = (product_id) => {
    console.log("product_id =>", product_id)
    console.log("notiArray naja =>",noti)
    // for(let i = 0 ; i < noti.length ; i++ ){
    //   if(product_id === noti[i]){
    //     return 3
    //   }
    //   else if(product_id !== noti[i]) {
    //     return 4
    //   }
    // }
    return noti.includes(product_id) ? 3 : 4;
  }

  const resultsearch = (e) => {
    if (e.length === 0) {
      setShow(product_data)
      // setShow([])
      setSearch_input('')
    }

    else {
      let a = e.toString()

      setSearch_input(a)
      const results1 = product_data.filter((w) => {
        return (
          a &&
          w &&
          w.cosmetic_name
          &&
          w.product_name
          &&
          (w.cosmetic_name.toLowerCase().includes(a) || w.cosmetic_name.toUpperCase().includes(a) || w.product_name.toUpperCase().includes(a)||w.cosmetic_name.toLowerCase().includes(a)||w.product_name.toLowerCase().includes(a)))

      });

      setShow(results1)
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
    try {
      Axios.post(process.env.NEXT_PUBLIC_API_BASE_URL+'/pifProductRemoveById?id= ' + e)
      .then((res) => {

          if (res.data.status === 'ok') {
            Swal.fire({
              title: "สำเร็จ!",
              text: "นำสินค้าออกจากระบบเรียบร้อย!",
              icon: "success"
            }).then(()=>{
              window.location.reload()
            })
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
            text: "นำสินค้าออกจากระบบไม่สำเร็จ!",
            icon: "error"
          });
    }
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
             show.map((value , idx)=>(
              

                <tr className="trplc" key={idx}>
                  <td className="plac" >{idx+1}</td>
                  <td className="plac">{value.fda_license}</td>
                  <td className="plac">{value.product_name}</td>
                  <td className="plac">{value.cosmetic_name}</td>
                  <td className="plac">{new Date(value.expire_date).toISOString().split('T')[0]}</td>
                  {
  value.pif_status === 0 ? (
    
    
    <td className="plac">
      <Button variant="contained" endIcon={<ReportIcon />}>
        ยังไม่ได้มีดำเนินการสร้างไฟล์ PIF
      </Button>
    </td>
  ) : (
    value.pif_status === 1 && checkFilePIF(value.id) === 3 ? (
      <td className="plac">
        <Button variant="contained" color="error" endIcon={<ReportIcon />}>
          มีไฟล์ใกล้หมดอายุหรือมีไฟล์ที่หมดอายุแล้ว
        </Button>
      </td>
    ) : (
      value.pif_status === 1 && checkFilePIF(value.id) === 4 ? (
        <td className="plac">
          <Button variant="contained" color="success" endIcon={<CheckCircleIcon />}>
            ปกติ
          </Button>
        </td>
      ) : <td className="plac">
      <Button variant="contained" endIcon={<ReportIcon />}>
        ยังไม่ได้มีดำเนินการสร้างไฟล์ PIF
      </Button>
    </td>
    )
  )
}
                  <td className="plac plaC">
                  {
                    value.pif_status === 0 ? (
                      <>
                        <button className="pl" onClick={() => handleButtonClickEdit(value.pif_status, value.id)}>
                        สร้าง PIF &nbsp;<FaEdit />
                        </button>
                        <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        <button className="pl" onClick={() => handledelete(value.id)}>
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

      <Footer />
        </>
    )
}
