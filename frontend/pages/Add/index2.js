import React, { useRef, useState } from 'react'
import Papa from 'papaparse'
import Axios from 'axios'
import Navbar from '@/components/layout/Navbar';


const index2 = () => {
    const [data, setData] = useState([]);
    const inputRef = useRef(null);

    const handleClick = () => {
        inputRef.current.click();
    };

    const handleFileChange = (event) => {
        const fileObj = event.target.files && event.target.files[0];
        if (!fileObj) {
            return;
        }
        console.log(fileObj);
        console.log(fileObj.name);
        const file = fileObj;
        Papa.parse(file, {
            header: true,
            complete: (results) => {
                setData(results.data);
                console.log(results.data);
            },
        });
    };

    const UploadClick = () => {
        let load = {
            dd : data
        }
        Axios({
            url : 'http://localhost:3001/api/uploadCsv',
            method : 'post' ,
            data : load
        }) 
        .then(function (response) {
            if(response.data === "OK"){
                alert("uploaded")
            }
        })
        .catch(function (error) {
            console.log(err)
        })
    }

    return (
        <div className='App'>
            <Navbar/>
            <br/> <br/>
            <h1>เพิ่มสารเคมี</h1>
            <br/>
            <div className='Addcsv'>
                <input
                    style={{ display: "none" }}
                    ref={inputRef}
                    type="file"
                    onChange={handleFileChange}
                />

                <div className='uploadbtn' onClick={handleClick}>
                    <img  src = "/upload.jpg" alt="" />
                </div>
                <br/><br/>
                {
                data.length ? 
                <button onClick={UploadClick}>upload</button>
                : 
                <button disabled>upload</button>

                }

            </div>
          
           
            <br />
            <br />
            {data.length ? (
                <table>
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>CAS</th>
                            <th>Name</th>
                            <th>Per</th>
                            <th>St</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{row.cas}</td>
                                <td>{row.cname}</td>
                                <td>{row.per}</td>
                                <td>{row.st}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : null}

            
        </div>
    );
}

export default index2
