import * as React from 'react';
import { useEffect , useState } from 'react'
import Axios from "axios";
import { AiOutlineDelete  } from "react-icons/ai";
import { IoMdPersonAdd } from "react-icons/io";
import { useRouter } from 'next/router';

const userinfo = () => {
    const [user , setUser] = useState([])
    const [edit , setEdit] = useState([])
    const router = useRouter();  
   
    useEffect(()=> {
        Axios({
            url : process.env.NEXT_PUBLIC_API_BASE_URL+"/getuserAs/" ,
            method: "get",
        }).then((response)=>{
            console.log(response.data)
            setUser(response.data)
        })
    },[])

    const editU = (e) => {
        alert(e)
        const result = user.find(({ no }) => no === e)
        edit.push(result)
        setEdit([...edit])
        
    }

    const clickDelete = (value ) => {
        let index 
        for(let i = 0 ; i < user.length ; i++ ){
            if(value === user[i].no){
                index = i;
            }
        }
        //console.log("index is " +index)
        user.splice(index , 1)

        // console.log("user : " + user)
        
       // console.log(user)
        let load = {
            data : value
        }
        Axios({
            url : process.env.NEXT_PUBLIC_API_BASE_URL+"/deluserAS" ,
            method : "post" , 
            data : load
        }).then((response) => {
            location.reload()
        })
    }
  return (
    <div className='App'>
         <table className="C1_styled-table">
              <thead >
                <tr >
                  <th className='C1_th1'>ลำดับ</th>
                  <th className='C1_th2'>ชื่อ</th>
                  <th className='C1_th3'>อีเมล์</th>
                  <th className='C1_th5'>ตัวเลือก</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {
                  user.length ?
                    user.map((value, idx) => (
                      <tr>
                        <td onClick={()=>editU(value.no)}>{idx + 1}</td>
                        <td onClick={()=>editU(value.no)}>{value.em_fullname}</td>
                        <td onClick={()=>editU(value.no)}>{value.em_email}</td>
                        <th><AiOutlineDelete onClick={() => clickDelete(value.no )} /> 
                        </th>
                      </tr>
                    ))
                    : null
                }
              </tbody>
            </table>
            
             {/* {
             edit.map((value,idx) => (
                <p key={idx}>{value.em_fullname}</p>
             ))
             
             } */}
             <div> <button onClick={()=> router.push("/SignUpA")}>ADD USER <IoMdPersonAdd /></button></div>
    </div>
  )
}

export default userinfo