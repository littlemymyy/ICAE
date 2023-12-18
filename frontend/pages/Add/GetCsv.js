import React, { useRef, useState } from 'react'
import Papa from 'papaparse'
import Axios from 'axios'


const GetCsv = () => {
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
            },
        });
    };

    const UploadClick = () => {
        let load = {
            dd : data
        }
        Axios({
            url : process.env.API_BASE_URL+'/uploadCsv',
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
        <div>
            <div>
                <input
                    style={{ display: "none" }}
                    ref={inputRef}
                    type="file"
                    onChange={handleFileChange}
                />

                <button onClick={handleClick}>
                    <img src = "/upload.jpg" alt="" />
                </button>
            </div>
            {
                data.length ? 
                <button onClick={UploadClick}>upload</button>
                : 
                <button disabled>upload</button>

            }
           
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

export default GetCsv
