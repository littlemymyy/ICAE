import Footer from "@/components/Footer";
import Navbar from "@/components/layout/Navbar";
import Axios from "axios";
import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2'

const Changegroup = () => {
    const [st , setSt] = useState(0)
    const [data , setData] = useState([])
    const [num , setNum] = useState([])
    const router = useRouter();

    useEffect(() => {
        const queryString = window.location.search
        const searchParams = new URLSearchParams(queryString)
        const mydata = searchParams.get("numdata").split(",").map(String)
        const Swal = require('sweetalert2')

        setNum(mydata)


        Axios({
            url : process.env.NEXT_PUBLIC_API_BASE_URL + "/api/getdatachangegroup",
            method: "post",
            data : mydata ,
        }).then((response) => {
            console.log(response.data)
            setData(response.data)
        })

        console.log(mydata)
    } ,[] )

    const savedata = () => {
        console.log(num)
        if(st !== 0) {
            let load = {
                st : st ,
                num : num
            }
            const fetchData = async () =>{
              try{
                const res = await Axios.post(process.env.NEXT_PUBLIC_API_BASE_URL + "/api/saveStfromchangegroup",load)
                if(res.data.status === "ok"){
                  Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "สำเร็จเปลี่ยนสถานะสารเคมีเรียบร้อย",
                    showConfirmButton: false,
                    timer: 1500
                  });

                  router.push("/admin/Showch")
                }

              }catch(error){
                console.log(error)
              }

            }

           fetchData()

        }

    }
  return (
    <div>
      <Navbar/>
      <br/>
      <Box sx={{ width: '100%', maxWidth: 500, margin: 'auto', textAlign: 'center' }}>
      <Typography variant="h5" gutterBottom>
       กรุณาประเภทสารเคมีที่คุณต้องการเปลี่ยน
      </Typography>

      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {
            st === 2 ?
            <input type="radio"  checked/>
            :
            <input type="radio" onChange={() => setSt(2)} />
        }

        <label >2</label>

        {
            st === 3 ?
            <input type="radio"  checked/>
            :
            <input type="radio" onChange={() => setSt(3)} />
        }

        <label >3</label>
        {
            st === 4 ?
            <input type="radio"  checked/>
            :
            <input type="radio" onChange={() => setSt(4)} />
        }
        <label >4</label>

        {
            st === 5 ?
            <input type="radio"  checked/>
            :
            <input type="radio" onChange={() => setSt(5)} />
        }
        <label >5</label>

        {
            st === 6 ?
            <input type="radio"  checked/>
            :
            <input type="radio" onChange={() => setSt(6)} />
        }
        <label >6</label>
</Box>

        <table className="showch_styled-table">
              <thead >
                <tr >
                 <th className='showch_th1'> <div className='radioSelect'>



              </div>
              </th>
                  <th className='showch_th1'>CAS NO</th>
                  <th className='showch_th2'>ชื่อ</th>
                  <th className='showch_th3'>ประเภท</th>

                </tr>
              </thead>
              <tbody>
                {
                    data.map((value, idx) => (
                      <tr >
                        <td>{idx + 1}</td>
                        <td>{value.cas}</td>
                        {
                          value.cmname === '-' ?
                            <td>{value.cname}</td>
                            :
                            <td>{value.cmname}</td>
                        }
                        <td>
                          {value.st}
                        </td>


                      </tr>
                    ))

                }
              </tbody>
            </table>

            <Stack direction="row" spacing={1} justifyContent="center">
                <Button variant="contained" color="success" onClick={() => savedata()} >
                    บันทึก
                </Button>
           </Stack>



        <Footer/>
    </div>
  )
}

export default Changegroup
