import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useEffect } from 'react';
import Axios from "axios";

export default function Grouped() {
    const [show , setShow] = React.useState([])
    useEffect(()=>{
        Axios.get(`http://localhost:3001/api/getGroupName`).then((response) => {
            
            setShow(response.data)
            console.log(response.data);
          });
    },[])

  const options = show.map((option) => {
    const firstLetter = option.groupname[0].toUpperCase();
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
      ...option,
    };
  });

  return (
    <Autocomplete
      id="grouped-demo"
      options={options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
      groupBy={(option) => option.firstLetter}
      getOptionLabel={(option) => option.groupname}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="With categories" />}
    />
  );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
