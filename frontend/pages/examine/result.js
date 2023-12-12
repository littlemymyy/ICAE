import React from 'react'
import Navbar from '@/components/layout/Navbar'
import { useRouter } from 'next/router';
import { AiOutlineDelete } from "react-icons/ai";
import { useState ,useEffect } from 'react';
import Axios from "axios";
import Footer from '@/components/Footer';
import Swal from 'sweetalert2'

const c2A = () => {
    const router = useRouter();
    const { dataArray } = router.query;
    const { filltergA } = router.query;
    const {gname} = router.query;
    const [groupName , setGroupName] = useState("")
    const [list , setList] = useState([])
    const [unlist , setUnlist] = useState([])
    const [elist , setElist] = useState([])
    const [data , setData] = useState([])
    const [sum , setSum] = useState(0)
    const [fillterg , setFillterg] = useState("")
    const [search_input, setSearch_input] = useState("");
    const [show, setShow] = useState([])
    const [email , setEmail] = useState("")


   // const parsedArray = storedArrayString ? JSON.parse(dataArray) : [];

    // Retrieve other data from localStorage







    const filltergB = filltergA ? JSON.parse(filltergA) : [];
    const parsedArray = dataArray ? JSON.parse(dataArray) : [];
    //const parsedArray =
    useEffect(()=>{
      let mail = localStorage.getItem("uemail")
      setEmail(mail)
      let aa = 0
      console.log("is comming")
      console.log(parsedArray)
      setSum(0)
      for(let i = 0; i < parsedArray.length; i++) {
        if(parsedArray[i].st != 2 && parsedArray[i].per1 <= parsedArray[i].per) {
          console.log(parsedArray[i].per1)
          aa += (parsedArray[i].per1 * 1)
        }
      }
      setSum(aa);
      console.log('Sum = ' + aa)
      if (gname) {
        setGroupName(gname);
      }
        Axios({
          url: "http://localhost:3001/api/searchBybodypart",
          method: "post",
          data : filltergB
          })
            .then((response) => {
              let res = response.data;
              for (let i = 0; i < res.length; i++) {
                res[i]["per1"] = 0;
              }
              setData(res);

            }) .catch(error => {
              console.error(error);
          });

            parsedArray.find(e => {
              if (e.st === 2) {
                console.log(".......")
                console.log(e);  // Fix the typo here
                if(checklist(unlist , e) === 1){
                  unlist.push(e)
                  setUnlist([...unlist])
                }
              }
              else if(e.st !== 2 && e.per1 <= e.per){
                console.log(e)
                if(checklist(list , e) === 1 ){
                  setSum(sum + parseFloat(e.per1))
                  list.push(e)
                  setList([...list])
                }
              }
              else if(e.per1 > e.per){
                console.log(e)
                if(checklist(elist , e) === 1 ){
                  elist.push(e)
                  setElist([...elist])
                }
              }
            },);

    }, [])
    // check dupicate
    const checklist = (list1 , dd) => {
      for( let i = 0 ; i<list1.length ; i++ ){
        if(list1[i].cas === dd.cas){
          return 0
        }
      }
      return 1
    }


    const percentChange = (idx, e) => {
      let sumb = 0
      console.log(list[idx])
      console.log(e)
      let l2 = list[idx]
      if( e.length === 0 ) {
        l2["per1"] = '0'
      }
      else {
        l2["per1"] = e
      }
      console.log(l2)
      if (e > list[idx].per) {
        elist.push(l2)
        setElist([...elist])
        list.splice(idx, 1)
        setList([...list])
      }
      //let total = 0
      for(let i = 0; i < list.length; i++){
        sumb += parseFloat(list[i].per1)
      }
      setSum(sumb)

    }

    const percentChange2 = (idx , e) => {
      // console.log(list2[idx])
      // console.log(e)
      let l1 = elist[idx]
      l1["per1"] = e
      console.log(l1)
      if(l1.per1 <= l1.per) {
        list.push(l1)
        setList([...list])
        elist.splice(idx,1)
        setElist([...elist])
      }
    }

    const resultsearch = (e) => {
      if (e.length === 0) {
        setShow([])
        setSearch_input('')
      }
      else {
        setSearch_input(e)
        const results1 = data.filter((w) => {
          return (
            e &&
            w &&
            w.cas &&
            w.cname &&
            w.cmname &&
            (w.cname.toLowerCase().includes(e) || w.cas.includes(e) || w.cmname.toLowerCase().includes(e))
          );
        });
        setShow(results1)
        console.log(results1)
      }
    }

    const add = (e) => {
      const result = data.find(({ cas }) => cas === e)
      if (result.st === 2) {
        unlist.push(result)
        setUnlist([...unlist])
        setShow([])
        setSearch_input("")
      }

      else {
        list.push(result)
        setList([...list])
        setShow([])
        setSearch_input("")
      }
      setShow([])
      setSearch_input("")
      console.log(result)
    }


    const clickDelete = (e) => {
      list.splice(e, 1)
      setList([...list])
      console.log(list)
      let sumc = 0;
      for (let i = 0; i < list.length; i++) {
        sumc += parseInt(list[i].per1);
      }
      setSum(sumc);
    }

    const clickDelete2 = (e) => {
      elist.splice(e, 1)
      setElist([...elist])
      let sum2 = 0;
      for (let i = 0; i < list.length; i++) {
        sum2 += parseInt(list[i].per1);
      }
      setSum(sum2);
    }

    const clickDelete3 = (e) => {
      unlist.splice(e, 1)
      setUnlist([...unlist])
      let sum2 = 0;
      for (let i = 0; i < list.length; i++) {
        sum2 += parseInt(list[i].per1);
      }
      setSum(sum2);
    }

    const preSaveFile = () => {
      const axios = require('axios');
      let data = JSON.stringify({
        "firstName": "TestFirstname1",
        "lastName": "PetchLastname"
      });

      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `http://localhost:3001/api/get_history?groupname=${groupName}&email=${localStorage.getItem("uname")}`,
        headers: {
          'Content-Type': 'application/json'
        },
        data : data
      };

      axios.request(config)
      .then((response) => {
        let data = JSON.parse(JSON.stringify(response.data));
        console.log(data)
        if (data.message === 'haveData') {
          Swal.fire({
            icon: "info",
            title: "พบข้อมูลซ้ำ",
            text: "ถ้าคุณบันทึก ข้อมูลเก่าจะถูกลบออก ต้องการจะบันทึกหรือไม่ ?",
            showCancelButton: true,
            confirmButtonText: 'บันทึก',
            cancelButtonText: 'ยกเลิก',
          }).then((result) => {
            if (result.isConfirmed) {
              saveFile()
            }
          });
        }
        else {
          saveFile()
        }
      })
      .catch((error) => {
        console.log(error);
      });



    }

    const saveFile = () => {

      if(unlist.length > 0 ) {
        list.push(...unlist)
      }
      if(elist.length > 0){
        list.push(...elist)
      }


      console.log("is list")
      console.log(list)
      let load = {
        uname : localStorage.getItem("uname") ,
        gname : groupName ,
        fillterg : filltergB ,
        dd : list,
        email : email,

      }
      Axios({
        url : "http://localhost:3001/api/savefile",
        method : "post" ,
        data : load ,
      }).then((response) => {
        alert("เพิ่มรายเรียบร้อย")
        router.push("/examine/record")
      })
    }


  return (
    <div>
         <Navbar/>
         <div className="logo1">
        <img src="/preview2.png" />
      </div>
      <div className='c2Aname' style={{ textAlign: 'center' }}><p>ชื่อเครื่องสำอาง : {groupName}</p></div>
      <div className="input-icons">
        <i className="fa fa-search icon"></i>
        <input placeholder='ค้นหาโดยชื่อสารเคมี, CAS NO  etc'
          className="in"
          value={search_input}
          onChange={(e) => resultsearch(e.target.value)}
        />
        <br />
      </div>

      <div className='show'>
        {
          search_input.length ?
            show.map((value , idx) => (
              value.cmname === "-" ?
                <p onClick={() => add(value.cas)} key={value.idx}>  {value.cname}</p>
                :
                <p onClick={() => add(value.cas)} key={value.idx}> {value.cmname}</p>
            ))
            : null
        }

      </div>


      {
        list.length ? (
          <div>
            <h3 className="label_G">สารที่สามารถใช้ได้</h3>
            <table className="C1_styled-table">
              <thead >
                <tr >
                  <th className='C1A_th1'>ลำดับ</th>
                  <th className='C1A_th2'>CAS NO</th>
                  <th className='C1A_th3'>ชื่อ</th>
                  <th className='C1A_th4'>ปริมาณสาร %</th>
                  <th className='C1_th5'>หมายเหตุ</th>
                  <th style={{ textAlign: 'center' }}>ตัวเลือก</th>
                </tr>
              </thead>
              <tbody>
                {
                  list.length ?
                    list.map((value, idx) => (
                      <tr>
                        <td>{idx + 1}</td>
                        <td>{value.cas}</td>
                        {
                          value.cmname === '-' ?
                            <td>{value.cname}</td>
                            :
                            <td>{value.cmname}</td>
                        }
                        <td>
                          <input type="number" min="0" defaultValue={value.per1 ? value.per1 : 1} onChange={(e) => percentChange(idx, e.target.value)} />
                        </td>
                        <td>-</td>
                        <td><AiOutlineDelete onClick={() => clickDelete(idx)} /></td>
                      </tr>
                    ))
                    : null
                }
              </tbody>
            </table>
          </div>
        )
          : null
      }

      {
        elist.length ? (
          <div>
            <h3 className="label_Y">สารกำหนดปริมาณ</h3>
            <table className="history_styled-table">
              <thead >
                <tr >
                  <th className='history_th1'>ลำดับ</th>
                  <th className='history_th2'>CAS NO</th>
                  <th className='history_th3'>ชื่อ</th>
                  <th className='history_th4'>ปริมาณสาร %</th>
                  <th className='history_th5'>หมายเหตุ</th>
                  <th style={{ textAlign: 'center' }}>ตัวเลือก</th>
                </tr>
              </thead>
              <tbody>
                {
                  elist.length ?
                    elist.map((value, idx) => (
                      <tr>
                        <td>{idx + 1}</td>
                        <td>{value.cas}</td>
                        {
                          value.cmname === '-' ?
                            <td>{value.cname}</td>
                            :
                            <td>{value.cmname}</td>
                        }
                        <td>
                          <input type="number" min="0" defaultValue={value.per1 ? value.per1 : 1} onChange={(e) => percentChange2(idx, e.target.value)} />
                        </td>
                        <td>ปริมาณสารที่ใช้ได้คือ {value.per }</td>
                        <td><AiOutlineDelete onClick={() => clickDelete2(idx)} /></td>
                      </tr>
                    ))
                    : null
                }
              </tbody>
            </table>
          </div>
        )
          : null
      }
      {
        unlist.length ? (
          <div>
           <h3 className="label_Y">สารที่ไม่สามารถใช้ได้</h3>
            <table className="C2_styled-table">
              <thead >
                <tr >
                  <th className='C2_th1'>ลำดับ</th>
                  <th className='C2_th2'>CAS NO</th>
                  <th className='C2_th3'>ชื่อ</th>
                  <th className='C2_th4'>ปริมาณสาร %</th>
                  <th className='C2_th5'>เหตุผล</th>
                  <th style={{ textAlign: 'center' }}>ตัวเลือก</th>
                </tr>
              </thead>
              <tbody>
                {
                  unlist.length ?
                    unlist.map((value, idx) => (
                      <tr>
                        <td>{idx + 1}</td>
                        <td>{value.cas}</td>
                        {
                          value.cmname === '-' ?
                            <td>{value.cname}</td>
                            :
                            <td>{value.cmname}</td>
                        }
                        <td>
                          <input type="number" min="0" disabled defaultValue={value.per1 ? value.per1 : 1} onChange={(e) => percentChange(idx, e.target.value)} />
                        </td>
                        <td>-</td>
                        <td><AiOutlineDelete onClick={() => clickDelete3(idx)} /></td>
                      </tr>
                    ))
                    : null
                }
              </tbody>
            </table>
          </div>
        )
          : null
      }

       <div className='App'>ยอดรวมสารที่ใช้ได้ทั้งหมด : {sum}
       <br />
       <button className='C2_sava1' onClick={preSaveFile}> บันทึก </button>
       </div>
       <Footer/>

  </div>
  )
}

export default c2A
