import React, { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/Footer";
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Autocomplete from '@mui/material/Autocomplete';
import { rgb } from 'pdf-lib'
import { fetch } from 'pdf-lib';
import { Box, TextField, Typography, Button } from "@mui/material";
import Axios from "axios";
import { data } from "jquery";

const team = () => {
    const [team , setTeam] = useState("")
    const [setdata , setData] = useState([])
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

    useEffect(() => {
        const feactData = async () => {
            try {
                const res = await Axios.get("http://localhost:3001/api/getuserTeam/");

               // console.log(res.data)
                setData(res.data)
                
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        
        feactData();
    }, []); 
    
    console.log(data)
  return (
    <div>
        <Navbar/>

       
        <TextField
          required
          id="outlined-required"
          label="Required"
          defaultValue=""
          onChange={() => setTeam(e.target.value)}
        />


          <table className="C1A_styled-table">
            <thead>
              <tr>
                <th className="C1A_th1">ลำดับ</th>
                <th className="C1A_th2">ชื่อ</th>
                <th className="C1A_th3">เพิ่ม</th>
              </tr>
            </thead>
            <tbody>
             
            </tbody>
          </table>


        <Footer />
    </div>
  )
}

export default team