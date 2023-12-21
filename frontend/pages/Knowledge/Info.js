import Navbar from '@/components/layout/Navbar';
import React, { useEffect, useState } from 'react'
import Axios from "axios";
import Footer from '@/components/Footer';

const Info = () => {
  const [gname , setGname] = useState([]);

  useEffect(() => {
    const params = window.location.href.split("?")[1];
    const query = new URLSearchParams(params);
    let gn = [];
    for(let pair of query.entries()) {
      gn.push(pair[1]);
      break;
    }
    //console.log(gn);
    gn = gn[0];
    Axios.get(process.env.NEXT_PUBLIC_API_BASE_URL+`/getWithWord/${gn}`).then((response) => {
        setGname(response.data);
        console.log(response.data);
    })
  }, []);

  const status = (a) => {
    let st = a;
    if(a===2){
      return("สารต้องห้าม")
    }
    else if(a===3){
      return("สารกำหนดปริมาณ")
    }
    else if(a===4){
      return("สารกำหนดปริมาณ")
    }
  }

  return (
    <div >
      <Navbar/>
      <div className="logo1">
        <img src="/preview2.png" />
      </div>
      <br/>
      <div className='showinfo'>
      <div className='picbox'>
          <img src='/Grosser_Panda.JPG'/>
          <iframe src="https://embed.molview.org/v1/?mode=balls"></iframe>
      </div>
      <div className='infobox'>
      {
          gname.map((val) => (
            val.st === 2 ?
              <div>
                  <p className='infolabal'>สารต้องห้าม</p>
                  <p>หมวดหมู่</p>
                  <p>การใช้งาน</p>
                  <br/>
                  <p>Description / รายละเอียด</p>
                  <p>null</p>
              </div>
              
              : 
              <div>
                <p className='infolabal'>สารที่สามารถใช้ได้</p>
                <h3>{gname[0].cname}</h3>
                <p>{gname[0].cas}</p>
                <p className='infosub'>หมวดหมู่ <br/>{gname[0].info}</p>
                <p className='infosub1'>การใช้งาน <br/>{gname[0].info}</p>
                <br/><br/><br/>
                <p>Description / รายละเอียด</p>
                <p>{gname[0].info}</p>
              </div>
          ))
        }
      </div>
      </div>
     
      <br/>
      <Footer/>
    </div>
  )
}

export default Info
