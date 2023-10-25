import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router'
import Axios from "axios";
import { AiOutlineDelete } from "react-icons/ai";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/layout/Navbar";

const Edit = () => {
  const router = useRouter();
  const [gname , setGname] = useState("");
  const [original, setOriginal] = useState([]);
  const [input1, setInput1] = useState("");
  const [show, setShow] = useState([]);
  const [list1, setList1] = useState([]); // OK
  const [unlist1, setUnList1] = useState([]); // st = 0
  const [list2, setList2] = useState([]); // Per Over
  const [sum1, setSum1] = useState(0);
  const [oldData , setOldData] = useState([]);

  const action1 = (e) => {
    setInput1(e);
    const results1 = original.filter((w) => {
      return (
        e &&
        w &&
        w.cas &&
        w.cname &&
        (w.cname.toLowerCase().includes(e) || w.cas.includes(e))
      );
    });
    setShow(results1);
  };

  const checkItem = (e,f) => {
    for(let i = 0; i<e.length; i++){
      if(e[i].cas === f){
        return(true);
      }
    }
    return false;
  }

  const itemClick = (input) => {
    if(checkItem( list1,input) || checkItem( list2,input) || checkItem(unlist1 , input)){
      alert("กรุณาเลือกสารอื่น");
    }
    else {
    for (let i = 0; i < original.length; i++) {
      if (original[i].cas === input) {
        let data = { no: 555, gname: gname, cas: original[i].cas, cname: original[i].cname, per: 0 , dis : "สารที่สามารถใช้ได้", usercreate: oldData[0] , datecreate: oldData[1] , userupdate: oldData[2],  dateupdate: oldData[3]};
        if(original[i].st > 2) {
          list1.push(data);
          setList1([...list1]);
          setInput1("");
          setShow([]);
          break;
        }
        else {
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

  const changePer = (idx, per) => {
    const chem = list1[idx].cname;
    for(let i = 0; i < original.length; i++) {
      if(original[i].cname === chem) {
        if(original[i].per >= per) {
          list1[idx].per = parseInt(per);
          setList1([...list1]);
          let sum2 = 0;
          for (let i = 0; i < list1.length; i++) {
            sum2 += parseInt(list1[i].per);
          }
          setSum1(sum2);
          break;
        }
        else {
          let chem1 = list1[idx];
          chem1.per = per;
          chem1.dis = "ปริมาณที่ใช้ได้ คือ "+ original[i].per + " %" ;
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
  for(let i = 0; i < original.length; i++) {
    if(original[i].cname === chem) {
      if(original[i].per >= per) {
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
      }
      else {
        list2[idx].per = per;
        setList2([...list2]);
        break;
      }
    }
  }
};
  const addClick = () => {
    for(let i = 0 ; i < list1.length; i++){
        list1[i].userupdate = oldData[2];
        list1[i].dateupdate = oldData[3];
        setList1([...list1]) 
    }
    // console.log(gname);
    // console.log(list1);
    let load = {
      gName: gname,
      dd: list1
    };
    Axios({
      url: "http://localhost:3001/api/update", // Change
      method: "post",
      data: load,
    })
      .then(function (response) {
        if(response.data ) {
          console.log(response);
          alert('เสร็จสมบูรณ์')
          setInput1("");
          setShow([]);
          let data = []
          for(let i = 0; i < list1.length; i++) {
            if(list1[i].per > 0) {
              data.push(list1[i]);
            }
          }
          setList1(data); // OK
          setUnList1([]); // st = 0
          setList2([]); // Per Over
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    const params = window.location.href.split("?")[1];
    const query = new URLSearchParams(params);
    let gn = "";
    for(let pair of query.entries()) {
      setGname(pair[1]);
      gn = pair[1];
      break;
    }
    
    Axios.get(`http://localhost:3001/api/getOriginal`).then((response) => {
      setOriginal(response.data);
      console.log(original)
      console.log(response.data)
    });
    Axios.get(`http://localhost:3001/api/getGroupWithName/${gn}`).then(
      (response) => {
        setList1([]);
        const data = response.data;
        console.log(data);
        for(let i = 0; i < data.length; i++) {
          let data1 = data[i];
          data1.dis = 'สารที่สามารถใช้ได้';
        }
        setList1(data);
        const date = new Date(); 
        let day= String(date.getDate()).padStart(2,"0"); 
        let month = String(date.getMonth()+1).padStart(2,"0");
        let year = date.getFullYear()
        let fdate = day+ "-" + month + "-" + year;
        setOldData([response.data[0].usercreate, response.data[0].datecreate, 'au', fdate])
        let sum2 = 0;
        for (let i = 0; i < response.data.length; i++) {
            sum2 += parseInt(response.data[i].per);
        }
        setSum1(sum2);
      }
    );
  }, []);

  return (
    <div className="App">
      <Navbar/>
      <div className="logo1"><img src="/preview2.png" /></div>
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

      <div>
        {list1.length > 0 ? (
          <div>
            <h3>สารที่สามารถใช้ได้</h3>
            <table>
              <thead>
                <tr style={{backgroundColor : "green"}}>
                  <th>CAS</th>
                  <th>NAME</th>
                  <th>Percent</th>
                  <th>Description</th>
                  <th>Option</th>
                </tr>
              </thead>
              <tbody>
                {list1.map((val, idx) => (
                  <tr key={idx}>
                    <td>{val.cas}</td>
                    <td>{val.cname}</td>
                    <td>
                      <input
                        type="number"
                        value={val.per}
                        onChange={(e) => changePer(idx, e.target.value)}
                      />
                    </td>
                    <td style={{color: 'green'}}>{val.dis}</td>
                    <td>
                      <AiOutlineDelete onClick={() => clickDelete(idx)} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}
        <div>
            <label>Group name: </label>
            <input type="text" value={gname} disabled />
        </div>
        <h3>Sum: {sum1}</h3>
        {sum1 === 100 ? (
          <div>
            <button onClick={() => addClick()}>Update Group</button>
          </div>
        ) : (
          <button disabled>Update Group</button>
        )}
        <br />
        {list2.length > 0 ? (
          <div>
            <h3>สารกำหนดปริมาณ</h3>
            <table>
              <tr style={{backgroundColor : "yellow"}}>
                <th>CAS</th>
                <th>NAME</th>
                <th>Percent</th>
                <th>Description</th>
                <th>Option</th>
              </tr>
              {list2.map((val, idx) => (
                <tr>
                  <td>{val.cas}</td>
                  <td>{val.cname}</td>
                  <td>
                    <input
                      type="number"
                      value={val.per}
                      onChange={(e) => changePer1(idx, e.target.value)}
                    />
                  </td>
                  <td style={{color: 'yellow'}}>{val.dis}</td>
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
             <h3>สารต้องห้าม</h3>
            <table>
              <tr style={{backgroundColor : "red"}}>
                <th>CAS</th>
                <th>NAME</th>
                <th>Percent</th>
                <th>Description</th>
                <th>Option</th>
              </tr>
              {unlist1.map((val, idx) => (
                <tr>
                  <td>{val.cas}</td>
                  <td>{val.cname}</td>
                  <td>
                    <input disabled
                      type="number"
                      value={val.per}
                    />
                  </td>
                  <td style={{color: 'red'}}>{val.dis}</td>
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

export default Edit;
