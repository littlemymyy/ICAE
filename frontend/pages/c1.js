import React, { useEffect, useState, useRef } from 'react'
import Axios from "axios";
import { useRouter } from 'next/router';
import Navbar from '@/components/layout/Navbar';
import { AiOutlineDelete } from "react-icons/ai";
import { set } from 'react-hook-form';

const c1 = () => {
  const router = useRouter()
  const [groupName, setGroupName] = useState("")
  const [data, setData] = useState([])
  const [search_input, setSearch_input] = useState("");
  const [show, setShow] = useState([])
  const [list, setList] = useState([])
  const [list2, setList2] = useState([])
  const [unlist, setUnlist] = useState([])
  const [per, setPer] = useState([])
  const [sum , setSum] = useState(0)
  const [fillterg , setFillterg] = useState("")

  useEffect(() => {
    const queryString = window.location.search
    const searchParams = new URLSearchParams(queryString)
    const gname = searchParams.get("gname")
    const mydata = searchParams.get("mydata").split(",").map(String)
    setFillterg(searchParams.get("mydata"))
    console.log(gname)
    console.log(mydata)
    console.log(searchParams.get("mydata"))

    //   console.log(router.query.gname)  
    //   const my = router.query.mydata
    //   const mydata = my ? my.split(",").map(String) : [] 
    // console.log(mydata)
    setGroupName(gname)
    const dd = mydata
    Axios({
      url: "http://localhost:3001/api/searchBybodypart",
      method: "post",
      data: dd
    })
      .then((response) => {
        let res = response.data
        for(let i = 0 ; i < res.length ; i++ ){
          res[i]["per1"] = 0
        }
        setData(res)
        console.log(res)
      })
  }, [])

  const resultsearch = (e) => {
    setSearch_input(e)
    if (e.length == 0) {
      setShow([])
    }
    else {
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
    console.log(result)
  }



  const clickDelete = (e) => {
    list.splice(e, 1)
    setList([...list])
  }

  const clickDelete_unlist = (e) => {
    unlist.splice(e, 1)
    setUnlist([...list])
  }
  const clickDelete_list2 = (e) => {
    list2.splice(e, 1)
    setList2([...list])
  }

  const percentChange = (idx, e) => {
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
      list2.push(l2)
      setList2([...list2])
      list.splice(idx, 1)
      setList([...list])
    }
    let total = 0
    for(let i = 0; i < list.length; i++){
      total += parseFloat(list[i].per1)
    }
    setSum(total)

  }

  const percentChange2 = (idx , e) => {
    // console.log(list2[idx])
    // console.log(e)
    let l1 = list2[idx]
    l1["per1"] = e
    console.log(l1)
    if(l1.per1 <= l1.per) {
      list.push(l1)
      setList([...list])
      list2.splice(idx,1)
      setList2([...list2])
    }
  }

  const saveFile = () => {
    let load = {
      uname : sessionStorage.getItem("uname") ,
      gname : groupName ,
      fillterg : fillterg ,
      dd : list
    }
    Axios({
      url : "http://localhost:3001/api/savefile",
      method : "post" ,
      data : load ,
    }).then((response) => {
      alert("เพิ่มรายเรียบร้อย")
      router.push("/Groupname")
    })
  }

  // useEffect(() => {
  //   const params = window.location.href.split("?")[1];
  //   const query = new URLSearchParams(params);
  //   let gn = "";
  //   for(let pair of query.entries()) {
  //     setGroupName(pair[1]);
  //     gn = pair[1];
  //     break;
  //   }
  // }, []);
  return (
    <div>
      <Navbar></Navbar>
      <div className="logo1">
        <img src="/preview2.png" />
      </div>
      <br />
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
          show.length ?
            show.map((value) => (
              value.cmname === "-" ?
                <p onClick={() => add(value.cas)} key={value.cas}>  {value.cname}</p>
                :
                <p onClick={() => add(value.cas)} key={value.cas}> {value.cmname}</p>
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
                  <th className='C1_th1'>ลำดับ</th>
                  <th className='C1_th2'>CAS NO</th>
                  <th className='C1_th3'>ชื่อ</th>
                  <th className='C1_th4'>ปริมาณสาร %</th>
                  <th className='C1_th5'>เหตุผล</th>
                  <th>ตัวเลือก</th>
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
                          <input defaultValue={value.per1} onChange={(e) => percentChange(idx, e.target.value)} />
                        </td>
                        <td>{value.des}</td>
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
        
        list2.length  ? (
        <div>
        <h3 className="label_Y">สารกำหนดปริมาณ</h3>
        <table className="C3_styled-table">
          <thead >
            <tr >
              <th className='C3_th1'>ลำดับ</th>
              <th className='C3_th2'>CAS NO</th>
              <th className='C3_th3'>ชื่อ</th>
              <th className='C3_th4'>ปริมาณสาร %</th>
              <th className='C3_th5'>เหตุผล</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
              list2.length ?
                list2.map((value, idx) => (
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
                      <input value={value.per1} onChange={(e) => percentChange2(idx, e.target.value)} />
                    </td>
                    <td>{value.des}</td>
                    <td></td>
                  </tr>
                ))
                : null
            }
          </tbody>
        </table>
      </div>
   
     ) : null

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
                  <th></th>
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
                          <input disabled onChange={(e) => percentChange(idx, e.target.value)} />
                        </td>
                        <td>{value.des}</td>
                        <th><AiOutlineDelete onClick={() => clickDelete(idx)} /></th>
                      </tr>
                    ))
                    : null
                }
              </tbody>
            </table>
          </div>
        ) : null

      }

      <div className='App'>ยอดรวมทั้งหมด {sum} </div>
    <div className='C1_sava1'>
      {
        sum === 100 ? 
        <button className='C1_save' onClick={saveFile}> บันทึก </button>
        : <button disabled> บันทึก </button>
      }
      </div>
    </div>

  
  )
}


export default c1