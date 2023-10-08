import Navbar from '@/components/layout/Navbar'
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { AiFillPlusCircle } from "react-icons/ai";

const Home = () => {
    const router = useRouter();
    const [input1 , setInput1] = useState("");
    const [show, setShow] = useState([]);
    const action = (n) => {
      if(n === 1) {
        router.push("/Add/Home")
      }
      else if (n===2) {

      }
      else {

      }
    }
  return (
    <div>
      <Navbar/>
      <div className='Dashboard'>Dashboard</div>
      <div className="input-icons">
        <i className="fa fa-search icon"></i>
        <input className="in" value={input1} onChange={(e) => action1(e.target.value)} />
      </div>
      <div className="show">
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
      </div>

      <div className='Menu'>
      <div className='AddCal'>
        <button onClick={() => action(1)}><i class="fa fa-plus-circle" aria-hidden="true"></i> เพิ่มสารเคมี</button>
      </div>
      <div className='EditCal'>
        <button><i class="fa fa-wrench" aria-hidden="true"></i> แก้ไขรายการสารเคมี</button>
      </div>
      </div>

     <div className='Menu_x1'>
     <div className='DelCal'>
        <button><i class="fa fa-trash" aria-hidden="true"></i> ลบรายการสารเคมี</button>
      </div>
     </div>
      


    </div>
    
  )
}

export default Home
