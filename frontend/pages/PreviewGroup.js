import React, { useEffect, useState } from "react";
import Axios from "axios";
import { AiFillEdit } from "react-icons/ai";
import { useRouter } from "next/router";
import Navbar from "@/components/layout/Navbar";

const PreviewGroup = () => {
  const [data, setData] = useState([]);
  const router = useRouter();
  const [input1, setInput1] = useState("");
  const [show , setShow] = useState([]);
  useEffect(() => {
    Axios.get("http://localhost:3001/api/getGroup").then((response) => {
      setData(response.data);
      setShow(response.data);
      console.log(data);
      console.log(response.data);
    });
  }, []);

  const action = (n) => {
    console.log(n);
    router.push({
      pathname: '/Edit',
      query: {keyword: n},
    })
    // router.push(`/Edit/${n}`);
  };

  const action1 = (e) => {
    setInput1(e);
    if(e){
      const results1 = data.filter((w) => {
        return (
          e &&
          w &&
          w.gname &&
         (w.gname.toLowerCase().includes(e))
        );
      });
      setShow(results1);
    }
    else {
      setShow(data)
    }
    
  };

  return (
    <div className="App">
      <Navbar/>
      <div className="logo1"><img src="/preview2.png" /></div>
      <h1>ประวัติการตรวจสอบสูตรสารเคมี</h1>
      <div class="input-icons">
        <i class="fa fa-search icon"></i>
        <input className="in" value={input1} onChange={(e) => action1(e.target.value)} />
      </div>
      <br/>
      <div className="logo1"></div>
      <table style={{border: '1px solid black'}}>
        <thead>
          <tr style={{border: '1px solid black'}}>
            <th style={{border: '1px solid black'}}>No</th>
            <th style={{border: '1px solid black'}}>FileName</th>
            <th style={{border: '1px solid black'}}>Option</th>
          </tr>
        </thead>
        <tbody>
          {show.length > 0
            ? show.map((val, idx) => (
                  <tr key={idx} style={{border: '1px solid black'}}>
                    <td style={{border: '1px solid black'}}>{idx + 1}</td>
                    <td style={{border: '1px solid black'}}>{val.gname}</td>
                    <td style={{border: '1px solid black'}}>
                      <AiFillEdit onClick={() => action(val.gname)} />
                    </td>
                  </tr>
              ))
            : null}
          </tbody>
      </table>
    </div>
  );
};

export default PreviewGroup;
