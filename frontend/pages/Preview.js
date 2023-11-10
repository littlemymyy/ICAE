import React, { useState, useEffect } from "react";
import Axios from "axios";
import { AiOutlineDelete } from "react-icons/ai";
import Navbar from "@/components/layout/Navbar";

const Preview = () => {
  const [original, setOriginal] = useState([]);
  const [input1, setInput1] = useState("");
  const [show, setShow] = useState([]);
  const [list1, setList1] = useState([]); // OK
  const [unlist1, setUnList1] = useState([]); // st = 0
  const [list2, setList2] = useState([]); // Per Over
  const [sum1, setSum1] = useState(0);
  const [groupName, setGroupName] = useState("");
  const [warning, setWarning] = useState([]);
  const [status, setStatus] = useState(false);
  const action1 = (e) => {
    setInput1(e);
    const results1 = original.filter((w) => {
      return (
        e &&
        w &&
        w.cas &&
        w.name &&
        w.cmname &&
        (w.name.toLowerCase().includes(e) || w.cas.includes(e) || w.cmname.toLowerCase().includes(e))
      );
    });
    setShow(results1);
  };

  useEffect(() => {
    Axios.get(`http://localhost:3001/api/getOriginal`).then((response) => {
      setOriginal(response.data);
      console.log(response.data);
    });
    // Axios.get(`http://localhost:3001/api/getWarningWord`).then((response) => {
    //   setWarning(response.data);
    //   console.log(response.data);
    // });
  }, []);

  const checkItem = (e, f) => {
    for (let i = 0; i < e.length; i++) {
      if (e[i].cas === f) {
        return true;
      }
    }
    return false;
  };

  const itemClick = (input) => {
    if (
      checkItem(list1, input) ||
      checkItem(list2, input) ||
      checkItem(unlist1, input)
    ) {
      alert("กรุณาเลือกสารอื่น");
    } else {
      for (let i = 0; i < original.length; i++) {
        if (original[i].cas === input) {
          let data = {
            cas: original[i].cas,
            cname: original[i].cname,
            per: 0,
            dis: "สารที่สามารถใช้ได้",
          };
          if (original[i].st > 2) {
            list1.push(data);
            setList1([...list1]);
            setInput1("");
            setShow([]);
            break;
          } else {
            data.dis = "สารต้องห้าม";
            unlist1.push(data);
            setUnList1([...unlist1]);
            setInput1("");
            setShow([]);
            break;
          }
        }
      }
    }
  };

  const clickDelete = (idx) => {
    list1.splice(idx, 1);
    setList1([...list1]);
    let sum2 = 0;
    for (let i = 0; i < list1.length; i++) {
      sum2 += parseInt(list1[i].per);
    }
    setSum1(sum2);
  };

  const clickDelete1 = (idx) => {
    unlist1.splice(idx, 1);
    setUnList1([...unlist1]);
  };

  const clickDelete2 = (idx) => {
    list2.splice(idx, 1);
    setList2([...list2]);
  };

  const changePer = (idx, per) => {
    const chem = list1[idx].cname;
    for (let i = 0; i < original.length; i++) {
      if (original[i].cname === chem) {
        if (original[i].per >= per) {
          list1[idx].per = parseInt(per);
          setList1([...list1]);
          let sum2 = 0;
          for (let i = 0; i < list1.length; i++) {
            sum2 += parseInt(list1[i].per);
          }
          setSum1(sum2);
          break;
        } else {
          let chem1 = list1[idx];
          chem1.per = per;
          chem1.dis = "ปริมาณที่ใช้ได้ คือ " + original[i].per + " %";
          list2.push(chem1);
          setList2([...list2]);
          list1.splice(idx, 1);
          setList1([...list1]);
          let sum2 = 0;
          for (let i = 0; i < list1.length; i++) {
            sum2 += parseInt(list1[i].per);
          }
          setSum1(sum2);
          break;
        }
      }
    }
  };

  const changePer1 = (idx, per) => {
    let chem = list2[idx].cname;
    for (let i = 0; i < original.length; i++) {
      if (original[i].cname === chem) {
        if (original[i].per >= per) {
          let chem1 = list2[idx];
          chem1.dis = "สารที่สามารถใช้ได้";
          chem1.per = per;
          list1.push(chem1);
          setList1([...list1]);
          list2.splice(idx, 1);
          setList2([...list2]);
          let sum2 = 0;
          for (let i = 0; i < list1.length; i++) {
            sum2 += parseInt(list1[i].per);
          }
          setSum1(sum2);
          break;
        } else {
          list2[idx].per = per;
          setList2([...list2]);
          break;
        }
      }
    }
  };

  const addClick = () => {
    if (groupName !== "") {
      console.log(groupName);
      console.log(list1);
      let load = {
        uname: sessionStorage.getItem("uname"),
        gName: groupName,
        dd: list1,
      };
      Axios({
        url: "http://localhost:3001/api/add",
        method: "post",
        data: load,
      })
        .then(function (response) {
          if (response.data) {
            console.log(response);
            alert("เสร็จสมบูรณ์");
            setInput1("");
            setShow([]);
            setList1([]); // OK
            setUnList1([]); // st = 0
            setList2([]); // Per Over
            setSum1(0);
            setGroupName("");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  const st = (e) => {
    setGroupName(e);
    if (e.length > 0) {
      setStatus(true);
      for (let i = 0; i < warning.length; i++) {
        if (e.includes(warning[i].warningname)) {
          alert(warning[i].warningname);
          setStatus(false);
          break;
        }
      }
    } else {
      setStatus(false);
    } 
  };

  return (
    <div className="App">
      <Navbar />
      <div className="logo1">
        <img src="/preview2.png" />
      </div>
      <br />
      <label>Group name: </label>
      <input type="text" onChange={(e) => st(e.target.value)} />
      <br />
      {groupName.length ? (
        <div className="input-icons">
          <i className="fa fa-search icon"></i>
          <input
            className="in"
            value={input1}
            onChange={(e) => action1(e.target.value)}
          />
        </div>
      ) : null}

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

      <div className="show1">
        {list1.length > 0 ? (
          <div>
            <h3 className="label_G">สารที่สามารถใช้ได้</h3>
            <table border="1" width="800">
              <tr style={{ backgroundColor: "#CEEDC7" }}>
                <th>CAS</th>
                <th>NAME</th>
                <th>Percent</th>
                <th>Description</th>
                <th>Option</th>
              </tr>
              {list1.map((val, idx) => (
                <tr>
                  <td width="20%">{val.cas}</td>
                  <td width="35%">{val.cname}</td>
                  <td width="15%">
                    <input
                      style={{ width: "80%", textAlign: "center" }}
                      type="number"
                      value={val.per}
                      onChange={(e) => changePer(idx, e.target.value)}
                    />
                  </td>
                  <td style={{ color: "green" }}>{val.dis}</td>
                  <td>
                    <AiOutlineDelete onClick={() => clickDelete(idx)} />
                  </td>
                </tr>
              ))}
            </table>
          </div>
        ) : null}
        <h3>Sum: {sum1}</h3>
        {sum1 === 100 ? (
          <div>
            {status ? (
              <button onClick={() => addClick()}>ADD new Group</button>
            ) : (
              <button disabled>ADD new Group</button>
            )}
          </div>
        ) : (
          <button disabled>ADD new Group</button>
        )}
        <br />
        {list2.length > 0 ? (
          <div>
            <h3 className="label_Y">สารกำหนดปริมาณ</h3>
            <table border="1" width="800">
              <tr style={{ backgroundColor: "#FDCF6F" }}>
                <th>CAS</th>
                <th>NAME</th>
                <th>Percent</th>
                <th>Description</th>
                <th>Option</th>
              </tr>
              {list2.map((val, idx) => (
                <tr>
                  <td width="20%">{val.cas}</td>
                  <td width="35%">{val.cname}</td>
                  <td width="15%">
                    <input
                      style={{ width: "80%", textAlign: "center" }}
                      type="number"
                      value={val.per}
                      onChange={(e) => changePer1(idx, e.target.value)}
                    />
                  </td>
                  <td style={{ color: "red" }}>{val.dis}</td>
                  <td>
                    <AiOutlineDelete onClick={() => clickDelete2(idx)} />
                  </td>
                </tr>
              ))}
            </table>
          </div>
        ) : null}
        <br />

        {unlist1.length > 0 ? (
          <div>
            <h3 className="label_Y">สารต้องห้าม</h3>
            <table border="1" width="800">
              <tr style={{ backgroundColor: "#F48484" }}>
                <th>CAS</th>
                <th>NAME</th>
                <th>Percent</th>
                <th>Description</th>
                <th>Option</th>
              </tr>
              {unlist1.map((val, idx) => (
                <tr>
                  <td width="20%">{val.cas}</td>
                  <td width="35%">{val.cname}</td>
                  <td width="15%">
                    <input
                      disabled
                      type="number"
                      value={val.per}
                      style={{ width: "80%", textAlign: "center" }}
                    />
                  </td>
                  <td style={{ color: "red" }}>{val.dis}</td>
                  <td>
                    <AiOutlineDelete onClick={() => clickDelete1(idx)} />
                  </td>
                </tr>
              ))}
            </table>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Preview;
