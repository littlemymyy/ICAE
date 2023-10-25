import React, { useEffect, useState } from 'react'
import Navbar from '../components/layout/Navbar';
import { useRouter } from "next/router";
import Axios from "axios";

const ChemicalList = () => {

    const [chemical , setChemical] = useState([]);
    const router = useRouter();
    const [input1 , setInput1] = useState("");
    const [show , setShow] = useState([]);


    useEffect(() => {
      Axios.get(`http://localhost:3001/api/getOriginal`).then((response) => {
        setChemical(response.data);
        setShow(response.data)
        console.log(chemical)
      });
      const params = window.location.href.split("?")[1];
      const query = new URLSearchParams(params);
      let gn = "";
      for(let pair of query.entries()) {
        setGname(pair[1]);
        gn = pair[1];
        break;
      }
    },[])

    const action1 = (n) => {
      setInput1(n);
      if(n){
        const results1 = chemical.filter((w) => {
          return (
            n &&
            w &&
            w.cas &&
            w.cname &&
            (w.cname.toLowerCase().includes(n) || w.cas.includes(n))
          );
        });
        setShow(results1);
      }
      else {
        setShow(chemical)
      }

    }

    const actiongo = (e) => {
      router.push({
        pathname: '/Info',
        query: {cas: e},
      })
    }
    
  return (
    <div>
      <Navbar/>
      <div className="logo1"><img src="/preview2.png" /></div>
      <br/>
      <div class="input-icons">
        <i class="fa fa-search icon"></i>
        <input className="in" value={input1} onChange={(n) => action1(n.target.value)} />
      </div>
    
      <table className='tablelist'>
        <thead>
          <tr>
            <th>cas no</th>
            <th>Name </th>
            <th>Percent </th>
            <th>function</th>
          </tr>
        </thead>
        <tbody className='tabletb'>
        {show.length 
            ? show.map((val, idx) => (
              <tr key={idx} onClick={() =>actiongo(val.cas)}>
                    <td style={{border: '1px solid black'}}>{val.cas}</td>
                    <td style={{border: '1px solid black'}}>{val.cname}</td>
                    <td style={{border: '1px solid black'}}>{val.per}</td>
                    <td style={{border: '1px solid black'}}>{val.info}</td>
                  
                  </tr>
              ))
            : null}
            {/* {
              chemical.map((val , idx) => (
                <tr onClick={() =>actiongo(val.cas)}>
                <td>{val.cas}</td>
                <td>{val.cname}</td>
                <td>{val.per}</td>
                <td>{val.info}</td>
              </tr>
                
              ))
            } */}
        </tbody>
      </table>
      
    </div>
  )
}

export default ChemicalList
