import React from 'react'
import Navbar from '@/components/layout/Navbar'
import { useRouter } from 'next/router';
import { AiOutlineDelete } from "react-icons/ai";
import { useState ,useEffect } from 'react';
import Axios from "axios";
import Footer from '@/components/Footer';
import Swal from 'sweetalert2'

const history = () => {
    const router = useRouter()
    const [groupName, setGroupName] = useState("")
    const [list , setList] = useState([])
    const [unlist , setUnlist] = useState([])
    const [list2 , setList2] = useState([])
    const [data , setData] = useState([])
    const [oldData , setOldData] = useState([]);
    const [sum , setSum] = useState(0)
    const [show, setShow] = useState([])
    const [dd , setDd] = useState([])
    const [chemical , setChemical] = useState([])


    useEffect(() => {
        const queryString = window.location.search
        const searchParams = new URLSearchParams(queryString)
        const gname = searchParams.get("gname")
        setGroupName(gname)

        Axios  ({
            url: "http://localhost:3001/api/getChemicalByGroup?groupname=" + gname,
            method: "get"
          }).then ((response) => {
            console.log(response.data)
            if (response.data.status === "ok") {
              let resData = JSON.parse(JSON.stringify(response.data.message))
              resData.forEach(element => {
                add(element)
                console.log('added : ' + element)
              });
            }else{
              console.log(response.data)
            }

          }).catch(error => {
            router.push("/")
          });

          Axios  ({
            url: "http://localhost:3001/api/getAllChemical",
            method: "get"
          }).then ((response) => {
            if (response.data.status === "ok") {
              setChemical(response.data.message)
            }else{
              console.log(response.data)
            }

          }).catch(error => {
            router.push("/")
          });
    },[])

    const resultsearch = (e) => {
        if (e === "") {
          setShow([])
        } else {
          let result = chemical.filter((w) => {
          return (
            e &&
            w &&
            w.cas &&
            w.cname &&
            w.cmname &&
            (w.cname.toLowerCase().includes(e) || w.cas.includes(e) || w.cmname.toLowerCase().includes(e)));
          })
          setShow(result)
        }

    }

    const addData = (e) => {
      // Axios  ({
      //   url: "http://localhost:3001/api/getChemicalByCas?cas=" + e,
      //   method: "get"
      // }).then ((response) => {
      //   if (response.data.status === "ok") {
      //     let resData = JSON.parse(JSON.stringify(response.data.message))
      //     add(resData[0])
      //   }else{
      //     console.log(response.data)
      //   }

      // }).catch(error => {
      //   router.push("/")
      // });
      const result = chemical.find(({ cas }) => cas === e)
      result['per1'] = "0"
      result['']
      add(result)
    }


    const add = (e) => {
      let result = e
      if (result.st === 2) {
        unlist.push(result)
        setUnlist([...unlist])
      }
      else if (e.per1 > e.per) {
        list2.push(result)
        setList([...list])
        setSum(sum + parseFloat(result.per1))
      }
      else {
        list.push(result)
        setList([...list])
        setSum(sum + parseFloat(result.per1))
      }
      console.log(result)
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


      const clickDelete = (e) => {
        list.splice(e, 1)
        setList([...list])
      }

      const clickDelete_unlist = (e) => {
        console.log("unlist e: ", e)
        unlist.splice(e, 1)
        setUnlist([...unlist])
      }
      const clickDelete_list2 = (e) => {
        list2.splice(e, 1)
        setList2([...list2])
      }

      const SaveFile = () => {
        let dataList = []

        if (list.length > 0){
          dataList.push(...list)
        }
        if (list2.length > 0){
          dataList.push(...list2)
        }
        if (unlist.length > 0){
          dataList.push(...unlist)
        }

        console.log(dataList)

        let load = {
          uname : localStorage.getItem("uname") ,
          gname : groupName,
          fillterg : '',
          dd : dataList,
          email : localStorage.getItem("uemail")
        }
        Axios({
          url : "http://localhost:3001/api/savefile",
          method : "post" ,
          data : load ,
        }).then((response) => {
          Swal.fire({
            title: 'สำเร็จ!',
            text: 'บันทึกข้อมูลเรียบร้อย',
            icon: 'success',
            confirmButtonText: 'ปิด'
          }).then(()=>{
            router.push("/examine/record")
          })
        }).catch(error => {
          console.error(error);
         // return res.status(500).json({ error: "Error sending email" });
      });
      }

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
          onChange={(e) => resultsearch(e.target.value)}
        />
        <br />
      </div>

      <div className='show'>
        {
          show.length ?
            show.map((value, idx) => (
              value.cmname === "-" ?
                <p onClick={() => addData(value.cas)} key={value.idx}>  {value.cname}</p>
                :
                <p onClick={() => addData(value.cas)} key={value.idx}> {value.cmname}</p>
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
                  <th className='C1_th5'>หมายเหตุ</th>
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
                          <input type="number" defaultValue={value.per1 ? value.per1 : 1} onChange={(e) => percentChange(idx, e.target.value)} />
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

        list2.length  ? (
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
                      <input type="number" value={value.per1 ? value.per1 : 0}  onChange={(e) => percentChange2(idx, e.target.value)} />
                    </td>
                    <td>ปริมาณสารที่ใช้ได้คือ {value.per }</td>
                    <th><AiOutlineDelete onClick={() => clickDelete_list2(idx)} /></th>
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
                  <th className='C2_th5'>หมายเหตุ</th>
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
                          <input type="number" disabled value={value.per1 ? value.per1 : 0} onChange={(e) => percentChange(idx, e.target.value)} />
                        </td>
                        <td>-</td>
                        <th><AiOutlineDelete onClick={() => clickDelete_unlist(idx)} /></th>
                      </tr>
                    ))
                    : null
                }
              </tbody>
            </table>
          </div>
        ) : null

      }
      <div className='App'>ยอดรวมสารที่ใช้ได้ทั้งหมด : {sum}
       <br />
       <button className='C1_sava1' onClick={SaveFile}> บันทึก </button>
       </div>
       <Footer/>
  </div>
  )
}

export default history
