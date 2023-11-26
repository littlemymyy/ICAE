import React, { useEffect } from 'react'

const testHtml = () => {
  useEffect(() =>{
    let d = new Date()
    let year = d.getFullYear()
    let month = d.getMonth()
    let date = d.getDate()
    
    console.log(date)
    console.log(month)
    console.log(year)
    let arr = []
    const str = "21/12/2566"
    arr.push(str.split("/"))
    console.log(arr)
    let year1 = parseInt(arr[0][2])-543
    let month1 = parseInt(arr[0][1])-2 
    let date1 = parseInt(arr[0][0])

    console.log(year1 +" " + month1+" "+date1)

    let exp = new Date(year1,month1,date1)
    let today = new Date(year,month,date)
    if(today > exp){
      console.log("under one month")
    }
    

    
    
  },[])
  return (
    <div>testHtml</div>
  )
}

export default testHtml