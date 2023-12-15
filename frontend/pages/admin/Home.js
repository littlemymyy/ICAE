import Navbar from '@/components/layout/Navbar'
import Axios from "axios";
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { AiFillPlusCircle } from "react-icons/ai";
import { Chart } from "chart.js"
import Footer from "@/components/Footer"
import { MdManageAccounts } from "react-icons/md";


const Home = () => {
    const router = useRouter();
    const [input1 , setInput1] = useState("");
    const [show, setShow] = useState([]);
    const [uv , setUv] = useState([])
    const [an2 , setAn2] = useState([])
    const [st0 , setSt0] = useState([])
    const [color , setColor] = useState([])
    const [an5 , setAn5] = useState([])
    const [allow , setAllow] = useState([])
    const [perfume , setPerfume] = useState([])
    let sum = 0
    let CanAll = 0
    let a = 0
    let b = 0
    let c = 0



    useEffect(() => {
      const feechData = async () => {
        try {
          const res1 = await 
            Axios.get('http://localhost:3001/api/showdataUV');
          setUv(res1.data[0].num);
          console.log(res1.data[0].num)

          const res2 = await Axios.get('http://localhost:3001/api/showdataAn2')
          setAn2(res2.data[0].num);
          console.log(res2.data[0].num)

          const res3 = await Axios.get('http://localhost:3001/api/showdataST0')
          setSt0(res3.data[0].num);
          console.log(res3.data[0].num)

          const res4 = await Axios.get('http://localhost:3001/api/showdataAn4')
          setColor(res4.data[0].num);
          console.log(res4.data[0].num)

          const res5 = await Axios.get('http://localhost:3001/api/showdataAn5')
          setAn5(res5.data[0].num);
          console.log(res5.data[0].num)

          const res6 = await Axios.get('http://localhost:3001/api/showdataAn0')
          setAllow(res6.data[0].num);
          console.log(res6.data[0].num)

          // const res7 = await Axios.get('http://localhost:3001/api/showdataAn0_perfume')
          // setPerfume(res7.data[0].num);
          // console.log(res7.data[0].num)

          sum += parseInt(uv+st0+color+an5+allow+an2)
          

          
          a+= 81-((parseInt(an2)/sum)*100)
          b+= (parseInt(CanAll)/sum)*100
          c+= (parseInt(allow)/sum)*100

          const total = a + b + c;

// Adjust the values proportionally if the sum is not equal to 100
        if (total !== 100) {
           const factor = 100 / total;
              a *= factor;
                b *= factor;
                  c *= factor;
          }

        

          console.log(" "+a+" " + b +" "+ c)

          console.log(CanAll)
          console.log(sum)

        } catch(error) {
          console.log('Error fetching data : ', error)
        }
      }
      feechData()

      vit()
    } , [])
    CanAll += parseInt(uv+st0+color+an5+allow)
    const vit = () => {
      // console.log("is"+" a  " +a)
      const ctx = document.getElementById('myChart').getContext('2d');
      const myChart = new Chart(ctx, {
          type: 'doughnut',
          data: {
              labels: ["สารห้ามใช้", "สารที่ใช้ได้", "ยังไม่ได้ลงสถาะ"],
              datasets: [{
                  data: [34,44, 22],
                  borderColor: [
                      "#FD2254",
                      "#00B7FE",
                      "#D0D2DA",
                  ],
                  backgroundColor: [
                      "#FD2254",
                      "#00B7FE",
                      "#D0D2DA",
                  ],
                  borderWidth: 2,
              }]
          },
          options: {
              scales: {
                  xAxes: [{
                      display: false,
                  }],
                  yAxes: [{
                      display: false,
                  }],
              }
          },

      });
    }
    const action = (n) => {
      if(n === 1) {
        router.push("/Add/Home")
      }
      else if (n === 2) {
        router.push("/admin/Showch")
      }
      else {

      }
    }
  return (
    <div>
      <Navbar/>
      <div className='Dashboard'>
        <div className='info_homeAdd'>
          <h1 className='h1Ininfo_homeAdd'>รายการสารในระบบ</h1>
            <div className="w-[1100px] h-screen flex mx-auto my-auto">
                <div className='border border-gray-400 pt-0 rounded-xl w-full h-fit my-auto  shadow-xl pb-2'>
                    <canvas id='myChart'></canvas>
                </div>
            </div>
              </div>

              <div className='btn_showAdd'> 
            <button className='showBtn_add' disabled><label>รายการสารกันแดด</label>
              <br/>
              {uv}
            </button>
        </div>

        <div className='btn_showAdd'> 
            <button className='showBtn_add' disabled><label>รายการสารกันเสีย</label>
              <br/>
              {an5}
            </button>
        </div>

        <div className='btn_showAdd'> 
            <button className='showBtn_add' disabled><label>รายการสารต้องห้าม</label>
              <br/>
              {an2}
            </button>
        </div>
        
        <div className='btn_showAdd'> 
            <button className='showBtn_add' disabled ><label>รายการสารสี</label>
              <br/>
              {color}
            </button>

            
        </div>

        <div className='btn_showAdd'> 
            <button className='showBtn_add' disabled ><label>รายการสารที่ใช้ได้</label>
              <br/>
              {CanAll} 
            </button>

            
        </div>

        <div className='btn_showAdd'> 
            <button className='showBtn_add' disabled ><label>รายการน้ำหอม</label>
              <br/>
              {perfume}
            </button>

            
        </div>

        
            </div>

       
      {/* <div className="input-icons">
        <i className="fa fa-search icon"></i>
        <input className="in" value={input1} onChange={(e) => action1(e.target.value)} />
      </div> */}

      {/* <div className="show">
        {show.length > 0
          ? show.map((w) => (
              <div
                className="list"
                key={w.cas}
                onClick={() => itemClick(w.cas)}
              >
                {w.cname}{" "}
              </div>
            ))
          : null}
      </div> */}

      <div className='Menu'>
      <div className='AddCal'>
        <button onClick={() => action(1)}><i class="fa fa-plus-circle" aria-hidden="true"></i> เพิ่มสารเคมี</button>
      </div>
      <div className='EditCal'>
        <button onClick={() => action(2)}><i class="fa fa-wrench" aria-hidden="true"></i> แก้ไขรายการสารเคมี</button>
      </div>
      </div>

     <div className='Menu_x1'>
     <div className='DelCal'>
     <button onClick={() => router.push("/admin/UserManage")}>
          <MdManageAccounts className='DeleteHomeAdmin' />
          จัดการผู้ใช้งาน
        </button>
      </div>
     </div>
      

     <Footer />  
    </div>
    
  )
}

export default Home
