import Navbar from '@/components/layout/Navbar'
import { useRouter } from 'next/router';
import React, { useState } from 'react'

const Groupname = () => {
  const router = useRouter();
  const [groupname , setGroupname] = useState("")
  const [op1 , setOp1] = useState([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0])
  const ChemName = ["hair" , "nail" , "skin","toothpaste","face","eye","shampoo","color","deodorants","depilator","soap","cool","hidden","rinse","leave","fragrance","oral"]

  const getType = (index , value) => {
    op1[index] = value
    setOp1([...op1])
    // console.log(type)

  }
  
  const buttonClick = () => {
    let data = []
    for(let i =0; i < op1.length; i++){
      if(op1[i] === 1) {
        data.push(ChemName[i])
      }
    }
    if(op1[2] === 1) {
      data.push("body")
      data.push("powder")
      data.push("hand")
    }
    if(op1[8] === 1){
      data.push("anti-perspirants")
    }
    if(op1[16] === 1){
      data.push("mount")
      data.push("lip")
    }
    console.log(data)
    router.push({
      pathname : '/c1' , 
      query : {
        gname: groupname,
        mydata : data.join(","),
      }
    })
  }


  return ( 
    <div className='App'>
      <Navbar/>
      <div className='GroupName_Box'>
        <br />
        <div className='GroupName_h4'><h4>ตั้งชื่อเครื่องสำอาง</h4></div>
          <input className='GroupName_input' onChange={(e) => setGroupname(e.target.value)} placeholder='ชื่อเครื่องสำอาง'/>
          <br />
          <div className='radioSelect'> 
              {
                op1[0] === 0 ?
                <input type="checkbox" className="form-check-input"  value="option1"   onChange={() => getType(0,1)}/>
                :
                <input type="checkbox" className="form-check-input"  value="option1"   onChange={() => getType(0,0)} checked/>

              }
              <label >ผลิตภัณฑ์เกี่ยวกับผม</label>
              {
                op1[1] === 0 ?
                <input type="checkbox" className="form-check-input"  value="option1"   onChange={() => getType(1,1)}/>
                :
                <input type="checkbox" className="form-check-input"  value="option1"   onChange={() => getType(1,0)} checked/>
              }
              
              <label>ผลิตภัณฑ์เกี่ยวกับเล็บ</label>

              {
                op1[2] === 0 ?
                <input type="checkbox" className="form-check-input"  value="option1"   onChange={() => getType(2,1)}/>
                :
                <input type="checkbox" className="form-check-input"  value="option1"   onChange={() => getType(2,0)} checked/>
              }
              <label >ผลิตภัณฑ์เกี่ยวกับผิว</label>

              {
                op1[3] === 0 ?
                <input type="checkbox" className="form-check-input"  value="option1"   onChange={() => getType(3,1)}/>
                :
                <input type="checkbox" className="form-check-input"  value="option1"   onChange={() => getType(3,0)} checked/>
              }
              <label >ผลิตภัณฑ์เกี่ยวกับยาสีฟัน</label>

              {
                op1[4] === 0 ?
                <input type="checkbox" className="form-check-input"  value="option1"   onChange={() => getType(4,1)}/>
                :
                <input type="checkbox" className="form-check-input"  value="option1"   onChange={() => getType(4,0)} checked/>
              }
              <label >ผลิตภัณฑ์เกี่ยวกับหน้า</label>

              {
                op1[5] === 0 ?
                <input type="checkbox" className="form-check-input"  value="option1"   onChange={() => getType(5,1)}/>
                :
                <input type="checkbox" className="form-check-input"  value="option1"   onChange={() => getType(5,0)} checked/>
              }
              <label >ผลิตภัณฑ์เกี่ยวกับตา</label>
          </div>
          
          <div className='radioSelect'>
          
              {
                op1[6] === 0 ?
                <input type="checkbox" className="form-check-input"  value="option1"   onChange={() => getType(6,1)}/>
                :
                <input type="checkbox" className="form-check-input"  value="option1"   onChange={() => getType(6,0)} checked/>
              }
             <label > ผลิตภัณฑ์เกี่ยวกับยาสระผม</label>

              {
                op1[7] === 0 ?
                <input type="checkbox" className="form-check-input" value="option1"   onChange={() => getType(7,1)}/>
                :
                <input type="checkbox" className="form-check-input"  value="option1"   onChange={() => getType(7,0)} checked/>
              }
              <label >ผลิตภัณฑ์เกี่ยวกับสี</label>

              {
                op1[8] === 0 ?
                <input type="checkbox" className="form-check-input"  value="option1"   onChange={() => getType(8,1)}/>
                :
                <input type="checkbox" className="form-check-input"  value="option1"   onChange={() => getType(8,0)} checked/>
              }
              <label >ผลิตภัณฑ์เกี่ยวกับระงับกลิ่น</label>

            

              {
                op1[9] === 0 ?
                <input type="checkbox" className="form-check-input"  value="option1"   onChange={() => getType(9,1)}/>
                :
                <input type="checkbox" className="form-check-input"  value="option1"   onChange={() => getType(9,0)} checked/>
              }
              <label >ผลิตภัณฑ์เกี่ยวกับขน</label>

              {
                op1[10] === 0 ?
                <input type="checkbox" className="form-check-input"  value="option1"   onChange={() => getType(10,1)}/>
                :
                <input type="checkbox" className="form-check-input"  value="option1"   onChange={() => getType(10,0)} checked/>
              }
              <label >ผลิตภัณฑ์เกี่ยวกับสบู่</label>

              {
                op1[11] === 0 ?
                <input type="checkbox" className="form-check-input"  value="option1"   onChange={() => getType(11,1)}/>
                :
                <input type="checkbox" className="form-check-input" value="option1"   onChange={() => getType(11,0)} checked/>
              }
             <label >ผลิตภัณฑ์เกี่ยวกับผ้าเย็น</label>
          </div>

          <div className='radioSelect'> 
              {
                op1[12] === 0 ?
                <input type="checkbox" className="form-check-input"  value="option1"   onChange={() => getType(12,1)}/>
                :
                <input type="checkbox" className="form-check-input"  value="option1"   onChange={() => getType(12,0)} checked/>
              }
              <label >ผลิตภัณฑ์เกี่ยวกับจุดซ่อนเร้น</label>

              {
                op1[13] === 0 ?
                <input type="checkbox" className="form-check-input"  value="option1"   onChange={() => getType(13,1)}/>
                :
                <input type="checkbox" className="form-check-input"  value="option1"   onChange={() => getType(13,0)} checked/>
              }
              <label >ผลิตภัณฑ์เกี่ยวกับล้างออก</label>

              {
                op1[14] === 0 ?
                <input type="checkbox" className="form-check-input" id="radio1" name="optradio1" value="option1"   onChange={() => getType(14,1)}/>
                :
                <input type="checkbox" className="form-check-input" id="radio1" name="optradio1" value="option1"   onChange={() => getType(14,0)} checked/>
              }
              <label >ผลิตภัณฑ์เกี่ยวกับไม่ล้างออก</label>

              {
                op1[15] === 0 ?
                <input type="checkbox" className="form-check-input" id="radio1" name="optradio1" value="option1"   onChange={() => getType(15,1)}/>
                :
                <input type="checkbox" className="form-check-input" id="radio1"name ="optradio1" value="option1"   onChange={() => getType(15,0)} checked/>
              }
              <label >ผลิตภัณฑ์เกี่ยวกับน้ำหอม</label>

              {
                op1[16] === 0 ?
                <input type="checkbox" className="form-check-input"  value="option1"   onChange={() => getType(16,1)}/>
                :
                <input type="checkbox" className="form-check-input" value="option1"   onChange={() => getType(16,0)} checked/>
              }
             <label >ผลิตภัณฑ์เกี่ยวกับช่องปาก</label>
          </div>

          <br /><br />
          {
            Math.max(...op1) > 0 ? 
            <button onClick={buttonClick} >บันทึก</button>
            : <button disabled>บันทึก</button>
          }
          
      </div>
      <p>{op1[0]}</p>
      <p>{op1[17]}</p>
    </div>
  )
}

export default Groupname