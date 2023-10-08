import React from 'react'
import { useRouter } from "next/router";
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/Footer';

const Home = () => {
    const router = useRouter();
    const action = (n) => {
        if(n === 1) {
            router.push("/Add/index1")
        }
        else {
            router.push("/Add/index2")
        }
    }
  return (
    <div className='App'>
        <Navbar/>
      <button className='btnAAdd' onClick={()=> action(1)}><i class="fa fa-plus-circle" aria-hidden="true"></i> เพิ่มสารเคมี</button>
      <br/><br/>
      <button className='btnAAdc' onClick={()=> action(2)}><i class="fa fa-plus-circle" aria-hidden="true"></i> เพิ่ม CSV </button>
      <Footer/>
    </div>
  )
}

export default Home
