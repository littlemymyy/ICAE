import Navbar from "@/components/layout/Navbar";
import React, { useEffect, useState, useRef } from "react";
import Axios from "axios";
import { useRouter } from "next/router";
import { AiOutlineDelete } from "react-icons/ai";
import { set } from "react-hook-form";
import { FaCheckCircle } from "react-icons/fa";
import Footer from "@/components/Footer";
import { json } from "react-router-dom";
import { BrowserRouter as Router, useHistory } from "react-router-dom";
import { Box } from "@mui/material";

const check = () => {
  const [op1, setOp1] = useState([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);
  const router = useRouter();
  const [groupName, setGroupName] = useState("");
  const [data, setData] = useState([]);
  const [search_input, setSearch_input] = useState("");
  const [show, setShow] = useState([]);
  const [list, setList] = useState([]);
  const [per, setPer] = useState([]);
  const [sum, setSum] = useState(0);
  const [fillterg, setFillterg] = useState([]);
  const ChemName = [
    ["hair"],
    ["nail"],
    ["skin", "body", "powder", "hand"],
    ["toothpaste"],
    ["face"],
    ["eye"],
    ["shampoo"],
    ["color"],
    ["deodorants", "anti-perspirants"],
    ["depilator"],
    ["soap"],
    ["cool"],
    ["hidden"],
    ["rinse"],
    ["leave"],
    ["fragrance"],
    ["oral", "mount", "lip"],
  ];

  const getType = (index, value) => {
    op1[index] = value;
    setOp1([...op1]);
    // console.log(type)
    let d1 = [];
    for (let i = 0; i < op1.length; i++) {
      if (op1[i] === 1) {
        // fillterg.push(ChemName[i])
        // setFillterg([...fillterg])
        // console.log(ChemName[i])
        for (let j = 0; j < ChemName[i].length; j++) {
          fillterg.push(ChemName[i][j]);
        }
      }
    }
    console.log("is fillterg :");
    console.log(fillterg);
    Axios({
      url: process.env.NEXT_PUBLIC_API_BASE_URL + "/api/searchBybodypart",
      method: "post",
      data: fillterg,
    })
      .then((response) => {
        let res = response.data;
        for (let i = 0; i < res.length; i++) {
          res[i]["per1"] = 0;
        }

        // for(let i = 0 ; i<res.length ; i++){
        //   if(res[i].cmname.includes("/")){
        //     res[i].cmname = "-";
        //   }
        // }
        setData(res);
        console.log(res);
      })
      .catch((error) => {
        console.error(error);
        // return res.status(500).json({ error: "Error sending email" });
      });
  };

  useEffect(() => {
    console.log(data);
  }, []);

  const resultsearch = (e) => {
    if (e.length === 0) {
      setShow([]);
      setSearch_input("");
    } else {
      setSearch_input(e);
      const results1 = data.filter((w) => {
        return (
          e &&
          w &&
          w.cas &&
          w.cname &&
          w.cmname &&
          (w.cname.toLowerCase().includes(e) ||
            w.cas.includes(e) ||
            w.cmname.toLowerCase().includes(e))
        );
      });
      setShow(results1);
      console.log(results1);
    }
  };

  const checkItem = (e, f) => {
    for (let i = 0; i < e.length; i++) {
      if (e[i].no === f) {
        return true;
      }
    }
    return false;
  };

  const add = (e) => {
    if (checkItem(list, e)) {
      alert("กรุณาเลือกสารอื่น");
    } else {
      const result = data.find(({ no }) => no === e);
      console.log("...........");
      console.log(result);
      setList([...list, result]);
      setShow([]);
      setSearch_input("");

      console.log(list);
    }
  };

  const clickDelete = (e) => {
    list.splice(e, 1);
    setList([...list]);
    let sum2 = 0;
    for (let i = 0; i < list.length; i++) {
      sum2 += parseInt(list[i].per);
    }
    setSum(sum2);
  };

  const percentChange = (idx, e) => {
    console.log(list[idx]);
    console.log(e);
    let l2 = list[idx];
    if (e.length === 0) {
      l2["per1"] = "0";
    } else {
      l2["per1"] = e;
    }
    console.log(l2);

    let total = 0;
    for (let i = 0; i < list.length; i++) {
      total += parseFloat(list[i].per1);
    }
    setSum(total);
  };

  // const saveFile = () => {
  //   let load = {
  //     uname : localStorage.getItem("uname") ,
  //     gname : groupName ,
  //     fillterg : fillterg ,
  //     dd : list
  //   }
  //   Axios({
  //     url : process.env.NEXT_PUBLIC_API_BASE_URL + "/api/savefile",
  //     method : "post" ,
  //     data : load ,
  //   }).then((response) => {
  //     alert("เพิ่มรายเรียบร้อย")
  //     router.push("/Groupname")
  //   })
  // }
  const sendData = () => {
    console.log(JSON.stringify(list));
    router.push({
      pathname: "/examine/result",

      query: {
        gname: groupName,
        dataArray: JSON.stringify(list),
        filltergA: JSON.stringify(fillterg),
      },
    });
    // localStorage.setItem('myArray', JSON.stringify(list));
    // localStorage.setItem('gname' , groupName)
    // localStorage.setItem('fillterg' , JSON.stringify(fillterg) )
    //router.push('/c2A', undefined , { shallow: true, state: { list , fillterg} })
  };

  const submitdataToblackEnd = () => {};
  return (
    <div>
      <Navbar />
      <Box className="preview"
        sx={{
            backgroundColor: { xs: "#F8F8F8", md: "#F8F8F8" },
            justifyContent: { xs: "", md: "center" },
            display: { xs: "block", md: "flex" },
            textAlign: { xs: "center", md: "center" },
          }}

        >
            <Box
            sx={{

                justifyContent: { xs: "", md: "center" },
                display: { xs: "block", md: "flex" },

            }}

            >
                <img src="/preview.png" style={{ maxWidth: 0 + "400px" }}/>

            </Box>
            <Box sx={{
              marginTop: "20px",
              marginBottom: "20px",
            }}>
                <h1>ตรวจสอบความถูกต้องก่อนจดแจ้ง</h1>

                <div className="litetext">
                    <p>ลดระยะเวลาในการแก้ไขและลดค่าใช้จ่ายของคุณในการจดแจ้งอย.  </p>
                    <p>เช็คสูตรหรือหาข้อมูลเพิ่มเติมกับเราได้เลย</p>
                </div>
            </Box>
        </Box>

      <link
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
        rel="stylesheet"
      />
      <div className="panel">
        <details>
          <summary>
            <ul>
              {" "}
              <li className="titleName">ชื่อเครื่องสำอาง : {groupName}</li>
            </ul>
          </summary>
          <div className="content">
            <input
              className="C1AnameC"
              type="text"
              id="name"
              onChange={(e) => setGroupName(e.target.value)}
              placeholder="กรุณาใส่ชื่อ"
            />
          </div>
      <Box sx={{
        display: "flex",
        justifyContent: "space-around",

      }}>
          <Box sx={{
            display: "grid"
          }} >

          <div className="radioSelect">

            <Box sx={{
              display: "flex"
            }}>
            {op1[0] === 0 ? (
              <input
                type="checkbox"
                className="form-check-input"
                value="option1"
                onChange={() => getType(0, 1)}
              />
            ) : (
              <input
                type="checkbox"
                className="form-check-input"
                value="option1"
                onChange={() => getType(0, 0)}
                checked
              />
            )}


            <label>ผลิตภัณฑ์เกี่ยวกับผม</label>
            </Box>

            <Box>
            {op1[1] === 0 ? (
              <input
                type="checkbox"
                className="form-check-input"
                value="option1"
                onChange={() => getType(1, 1)}
              />
            ) : (
              <input
                type="checkbox"
                className="form-check-input"
                value="option1"
                onChange={() => getType(1, 0)}
                checked
              />
            )}

            <label>ผลิตภัณฑ์เกี่ยวกับเล็บ</label>
            </Box>

            <Box>
            {op1[2] === 0 ? (
              <input
                type="checkbox"
                className="form-check-input"
                value="option1"
                onChange={() => getType(2, 1)}
              />
            ) : (
              <input
                type="checkbox"
                className="form-check-input"
                value="option1"
                onChange={() => getType(2, 0)}
                checked
              />
            )}
            <label>ผลิตภัณฑ์เกี่ยวกับผิว</label>
            </Box>

            <Box>

            {op1[3] === 0 ? (
              <input
                type="checkbox"
                className="form-check-input"
                value="option1"
                onChange={() => getType(3, 1)}
              />
            ) : (
              <input
                type="checkbox"
                className="form-check-input"
                value="option1"
                onChange={() => getType(3, 0)}
                checked
              />
            )}
            <label>ผลิตภัณฑ์เกี่ยวกับยาสีฟัน</label>
            </Box>

            <Box>
            {op1[4] === 0 ? (
              <input
                type="checkbox"
                className="form-check-input"
                value="option1"
                onChange={() => getType(4, 1)}
              />
            ) : (
              <input
                type="checkbox"
                className="form-check-input"
                value="option1"
                onChange={() => getType(4, 0)}
                checked
              />
            )}
            <label>ผลิตภัณฑ์เกี่ยวกับหน้า</label>
            </Box>

            <Box>
            {op1[5] === 0 ? (
              <input
                type="checkbox"
                className="form-check-input"
                value="option1"
                onChange={() => getType(5, 1)}
              />
            ) : (
              <input
                type="checkbox"
                className="form-check-input"
                value="option1"
                onChange={() => getType(5, 0)}
                checked
              />
            )}
            <label>ผลิตภัณฑ์เกี่ยวกับตา</label>
            </Box>

            <Box>

            {op1[6] === 0 ? (
              <input
                type="checkbox"
                className="form-check-input"
                value="option1"
                onChange={() => getType(6, 1)}
              />
            ) : (
              <input
                type="checkbox"
                className="form-check-input"
                value="option1"
                onChange={() => getType(6, 0)}
                checked
              />
            )}
            <label> ผลิตภัณฑ์เกี่ยวกับยาสระผม</label>
            </Box>

            <Box>
            {op1[7] === 0 ? (
              <input
                type="checkbox"
                className="form-check-input"
                value="option1"
                onChange={() => getType(7, 1)}
              />
            ) : (
              <input
                type="checkbox"
                className="form-check-input"
                value="option1"
                onChange={() => getType(7, 0)}
                checked
              />
            )}
            <label>ผลิตภัณฑ์เกี่ยวกับสี</label>
            </Box>
          </div>
          </Box>


          <Box>
          <div className="radioSelect">
            <Box>
            {op1[8] === 0 ? (
              <input
                type="checkbox"
                className="form-check-input"
                value="option1"
                onChange={() => getType(8, 1)}
              />
            ) : (
              <input
                type="checkbox"
                className="form-check-input"
                value="option1"
                onChange={() => getType(8, 0)}
                checked
              />
            )}
            <label>ผลิตภัณฑ์เกี่ยวกับระงับกลิ่น</label>
            </Box>

            <Box>
            {op1[9] === 0 ? (
              <input
                type="checkbox"
                className="form-check-input"
                value="option1"
                onChange={() => getType(9, 1)}
              />
            ) : (
              <input
                type="checkbox"
                className="form-check-input"
                value="option1"
                onChange={() => getType(9, 0)}
                checked
              />
            )}
            <label>ผลิตภัณฑ์เกี่ยวกับขน</label>
            </Box>

            <Box>

            {op1[10] === 0 ? (
              <input
                type="checkbox"
                className="form-check-input"
                value="option1"
                onChange={() => getType(10, 1)}
              />
            ) : (
              <input
                type="checkbox"
                className="form-check-input"
                value="option1"
                onChange={() => getType(10, 0)}
                checked
              />
            )}
            <label>ผลิตภัณฑ์เกี่ยวกับสบู่</label>
            </Box>

            <Box>

            {op1[11] === 0 ? (
              <input
                type="checkbox"
                className="form-check-input"
                value="option1"
                onChange={() => getType(11, 1)}
              />
            ) : (
              <input
                type="checkbox"
                className="form-check-input"
                value="option1"
                onChange={() => getType(11, 0)}
                checked
              />
            )}
            <label>ผลิตภัณฑ์เกี่ยวกับผ้าเย็น</label>
            </Box>


            <Box>
            {op1[12] === 0 ? (
              <input
                type="checkbox"
                className="form-check-input"
                value="option1"
                onChange={() => getType(12, 1)}
              />
            ) : (
              <input
                type="checkbox"
                className="form-check-input"
                value="option1"
                onChange={() => getType(12, 0)}
                checked
              />
            )}
            <label>ผลิตภัณฑ์เกี่ยวกับจุดซ่อนเร้น</label>
            </Box>

            <Box>
            {op1[13] === 0 ? (
              <input
                type="checkbox"
                className="form-check-input"
                value="option1"
                onChange={() => getType(13, 1)}
              />
            ) : (
              <input
                type="checkbox"
                className="form-check-input"
                value="option1"
                onChange={() => getType(13, 0)}
                checked
              />
            )}
            <label>ผลิตภัณฑ์เกี่ยวกับล้างออก</label>
            </Box>

            <Box>

            {op1[14] === 0 ? (
              <input
                type="checkbox"
                className="form-check-input"
                id="radio1"
                name="optradio1"
                value="option1"
                onChange={() => getType(14, 1)}
              />
            ) : (
              <input
                type="checkbox"
                className="form-check-input"
                id="radio1"
                name="optradio1"
                value="option1"
                onChange={() => getType(14, 0)}
                checked
              />
            )}
            <label>ผลิตภัณฑ์เกี่ยวกับไม่ล้างออก</label>
            </Box>

            <Box>

            {op1[15] === 0 ? (
              <input
                type="checkbox"
                className="form-check-input"
                id="radio1"
                name="optradio1"
                value="option1"
                onChange={() => getType(15, 1)}
              />
            ) : (
              <input
                type="checkbox"
                className="form-check-input"
                id="radio1"
                name="optradio1"
                value="option1"
                onChange={() => getType(15, 0)}
                checked
              />
            )}
            <label>ผลิตภัณฑ์เกี่ยวกับน้ำหอม</label>
            </Box>

            <Box sx={{
              marginBottom: "20px"
            }}>
            {op1[16] === 0 ? (
              <input
                type="checkbox"
                className="form-check-input"
                value="option1"
                onChange={() => getType(16, 1)}
              />
            ) : (
              <input
                type="checkbox"
                className="form-check-input"
                value="option1"
                onChange={() => getType(16, 0)}
                checked
              />
            )}
            <label>ผลิตภัณฑ์เกี่ยวกับช่องปาก</label>
            </Box>
          </div>
          </Box>
          </Box>

        </details>
      </div>
      <div className="input-icons">
        <i className="fa fa-search icon"></i>
        <input
          placeholder="ค้นหาโดยชื่อสารเคมี, CAS NO  etc"
          className="in"
          value={search_input}
          onChange={(e) => resultsearch(e.target.value)}
        />
        <br />
      </div>
      <div className="show">
        {search_input.length
          ? show.map((value, idx) =>
              value.cmname === "-" ? (
                <p onClick={() => add(value.no)} key={value.idx}>
                  {" "}
                  {value.cname}
                </p>
              ) : (
                <p onClick={() => add(value.no)} key={value.idx}>
                  {" "}
                  {value.cmname}
                </p>
              )
            )
          : null}
      </div>

      {list.length ? (
        <div>
          <table className="C1A_styled-table">
            <thead>
              <tr>
                <th className="C1A_th1">ลำดับ</th>
                <th className="C1A_th2">CAS NO</th>
                <th className="C1A_th3">ชื่อ</th>
                <th className="C1A_th4">ปริมาณสาร %</th>
                <th>ตัวเลือก</th>
              </tr>
            </thead>
            <tbody>
              {list.length
                ? list.map((value, idx) => (
                    <tr>
                      <td>{idx + 1}</td>
                      <td>{value.cas}</td>
                      {value.cmname === "-" ? (
                        <td>{value.cname}</td>
                      ) : (
                        <td>{value.cmname}</td>
                      )}
                      <td>
                        <input
                          type="number"
                          defaultValue={value.per1}
                          onChange={(e) => percentChange(idx, e.target.value)}
                        />
                      </td>
                      <td>
                        <AiOutlineDelete onClick={() => clickDelete(idx)} />
                      </td>
                    </tr>
                  ))
                : null}
            </tbody>
          </table>
        </div>
      ) : null}

      <div className="App">
        ยอดรวมทั้งหมด {sum} <br />
        <br />
        {groupName.length ? (
          <button className="btnC1ACheck" onClick={() => sendData()}>
            <FaCheckCircle style={{ fontSize: "24px" }} /> ตรวจสอบ
          </button>
        ) : (
          <button className="btnC1ACheck" disabled>
            <FaCheckCircle style={{ fontSize: "24px" }} /> ตรวจสอบ
          </button>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default check;
