const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const fs = require('fs')
const csv = require('csv-parser')
const mysql = require('mysql2')
const {convertArrayToCSV} = require('convert-array-to-csv')
const xml2js = require('xml2js')
const parser = new xml2js.Parser({attrkey : "ATTR"})
const DOMParser = require('dom-parser')
const DomParser = require('dom-parser')
const jsonParser = bodyParser.json()



const app = express();
app.use(bodyParser.json({limit: '35mb'}));
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true , limit : "35mb" , parameterLimit : 50000 }));


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'cosmetic'
})

app.get('/api/getWithWord/:fileName', (req, res) => {
    const fileName = req.params.fileName
    const sql = 'SELECT * FROM chemical WHERE cas = "' + fileName + '"';
    db.query(sql,(err, result) => {
        // console.log(result);
        res.send(result);
    })
})

app.post('/api/add/', (req, res) => {
    const uname = req.body.uname
    const gName = req.body.gName
    const data = req.body.dd
    console.log(uname)
    console.log(gName)
    console.log(data);
    const date = new Date();
    let day= String(date.getDate()).padStart(2,"0");
    let month = String(date.getMonth()+1).padStart(2,"0");
    let year = date.getFullYear()
    let fdate = day+ "-" + month + "-" + year;
    console.log(fdate);

    for(let i = 0 ; i < data.length; i++){
        if(data[i].per > 0){
            const sql = 'INSERT INTO groupchemical(gname, cas, cname, per, usercreate, datecreate, userupdate, dateupdate) VALUES (?,?,?,?,?,?,?,?);'
            db.query(sql,[gName, data[i].cas , data[i].cname , data[i].per , uname , fdate , uname , fdate] , (err, result)=>{
                console.log(result.affectedRows);
            })
        }

    }
    res.send('1');
})


app.post('/api/update/', (req, res) => {
    const gName = req.body.gName
    const data = req.body.dd
    console.log(gName)
    console.log(data);
    const sql = 'DELETE FROM groupchemical WHERE gname = ?'
    db.query(sql, gName, (err, result)=>{
        if(err)
            console.log(result)
    })

    for(let i = 0 ; i < data.length; i++){
        if(data[i].per > 0) {
            const sql = 'INSERT INTO groupchemical(gname, cas, cname, per, usercreate, datecreate, userupdate, dateupdate) VALUES (?,?,?,?,?,?,?,?);'
            db.query(sql,[data[i].gname, data[i].cas , data[i].cname , data[i].per , data[i].usercreate , data[i].datecreate , data[i].userupdate , data[i].dateupdate ] , (err, result)=>{
                console.log(result)
            })
        }

    }
    res.send('OK');
})

app.post('/api/uploadCsv/', (req, res) => {
    const data = req.body.dd
    // console.log(data);
    const sql = 'DELETE FROM chemical '
    db.query(sql,(err, result)=>{
        if(err)
            console.log(result)
    })

    for(let i = 0 ; i < data.length; i++){
        console.log(i + " " + data[i].cas);
        const sql = 'INSERT INTO chemical(cas, cname, per, st, info, eff, img) VALUES(?,?,?,?,?,?,?);'
        db.query(sql,[data[i].cas, data[i].cname, data[i].per, data[i].st, data[i].info, data[i].eff , data[i].img] , (err, result)=>{
            console.log(result)
        })
    }
    res.send('OK');
})

app.get('/api/getOriginal',(req,res)=>{
    const sql = 'SELECT * FROM chemical1'
    db.query(sql,(err, result) =>{
        console.log(result);
        res.send(result)
    })
})

app.get('/api/getWarningWord',(req,res)=>{
    const sql = 'SELECT * FROM warningword'
    db.query(sql,(err, result) =>{
        console.log(result);
        res.send(result)
    })
})

app.get('/api/getGroupWithName/:gname', (req, res) => {
    const gname = req.params.gname;
    const sql = `SELECT * FROM groupchemical WHERE gname = '${gname}' `
    db.query(sql,(err, result) =>{
        res.send(result)
    })


})

app.get('/api/getGroup',(req,res)=>{
    const sql = 'SELECT DISTINCT gname FROM groupchemical'
    console.log(55)
    db.query(sql,(err, result) =>{
        console.log(result)
        res.send(result)
    })
})


/////////////////////////////////////////////////////////////////

app.post('/api/getUser/', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    console.log(email + " " + password)
    const sql = `SELECT * FROM employee WHERE em_email = '${email}' AND em_pass = '${password}' `
    db.query(sql,(err, result) =>{
        console.log(result)
        res.send(result)
    })
})

app.post('/api/AddminAdd' , (req, res) => {
    const data = req.body
    console.log(data)

        const sql = 'INSERT INTO chemical(cas, cname, per, st , info, eff, img) VALUES (?,?,?,?,?,?,?);'
            db.query(sql,[data.cas, data.cname , data.per , data.st , data.info , data.eff , data.img ] , (err, result)=>{
                console.log(result.affectedRows);
            })

    res.send('OK');

})

app.get('/api/getXML/:fileName',(req,res) => {
    const fileName = req.params.fileName
    let xml_string = fs.readFileSync('../frontend/public/xml/'+fileName , 'utf8')
    parser.parseString(xml_string , function(error,result){
        if(error === null){
            // console.log(result)
            let parser = new DomParser();
            let xmlDoc = parser.parseFromString(result , "text/xml");
            let data = Object.values(Object.values(xmlDoc)[0])[0].results[0].result;
            // console.log(data)
            console.log(data[0].casnumber[0])
            console.log(data[0].name[0])
            console.log(data.length)
            res.send(data)
        }
        else {
            console.log(error)
        }
    })
})

app.post('/api/setdata' , (req , res) => {
    const data = req.body.data
    const st = req.body.st
    console.log(data)
    console.log(st)
    console.log(data.length)
    let count = 0

    for(let i =0; i< data.length; i++){
        const sql = 'DELETE FROM chemical WHERE cas =  "' + data[i].cas + '"'
        db.query(sql,(err, result)=>{
            if(err)
                console.log(result)
        })
        const sql1 = 'INSERT INTO chemical(cas, cname , cmname , per , st , img , des ,bodypart , color) VALUES(?,?,?,?,?,?,?,?,?);'
        db.query(sql1,[data[i].cas , data[i].name , data[i].cmname , data[i].per , st , "-" , "-" , data[i].parts , data[i].color ] , (err, result)=>{
            // console.log(result)
            count++
        })
        count++
        // console.log(count)

    }
    console.log(count)



    res.send('OK');


})

app.post('/api/setsignUp' , jsonParser, (req , res ) => {
    console.log(req.body)
    const firstName = req.body.firstname
    const lastName = req.body.lastname
    const email = req.body.email
    const password = req.body.password
    const repassword = req.body.repassword
    const fullname = firstName +" "+lastName

    console.log(fullname + " " + email + " " + password +" " + repassword)

    const sql = `SELECT * FROM employee WHERE em_email = '${email}'  `
    db.query(sql,(err, result) => {
        if(result.length === 0) {
            res.json({status:'error',message:err});
            console.log('Insert data')
        }
        else {
            console.log('Don\'t do it');
        }
    })

})

app.get('/api/annex', jsonParser, (req, res) => {
    db.execute(
        'SELECT * FROM chemical1 WHERE st = ?',
        [req.query.st],
        (err, result) => {
            if(err) {
                res.json({status:'error',message:err});
            }
            if(result.length > 0) {
                res.json({status:'ok',message:result})
            }
            else {
                res.json({status:'error',message:'No data found'});
            }
        })
})

app.post('/api/searchBybodypart', (req,res) => {
    //SELECT * FROM chemical WHERE
    //bodypart LIKE '%skin%'
    //OR bodypart LIKE '%face%' OR bodypart LIKE '%body%' OR bodypart LIKE '%powder%' OR bodypart LIKE '%hand%';
    const dd = req.body
    console.log("........")
    console.log(dd)
    let bodypart = ""
    let queryWord = "SELECT * FROM chemical WHERE "
    for(let i = 0 ; i< dd.length; i++) {
        bodypart = "bodypart LIKE '%" + dd[i] + "%'"
        queryWord += bodypart
        if(i < dd.length - 1) {
            queryWord += " OR "
        }
        else {
            queryWord += " OR bodypart LIKE 'all%'"
            queryWord += ";";
        }
    }
    console.log(queryWord)
    //
    const sql = queryWord
    db.query(sql, (err , result) => {
        console.log(result);
        res.send(result)
    })
    console.log(queryWord)
})

app.post('/api/searchBybodypartEdit', (req,res) => {
    //SELECT * FROM chemical WHERE
    //bodypart LIKE '%skin%'
    //OR bodypart LIKE '%face%' OR bodypart LIKE '%body%' OR bodypart LIKE '%powder%' OR bodypart LIKE '%hand%';
    const dd = req.body.fillterg
    console.log("........")
    console.log(dd)
    let bodypart = ""
    let queryWord = "SELECT * FROM chemical WHERE "
    for(let i = 0 ; i< dd.length; i++) {
        bodypart = "bodypart LIKE '%" + dd[i] + "%'"
        queryWord += bodypart
        if(i < dd.length - 1) {
            queryWord += " OR "
        }
        else {
            queryWord += " OR bodypart LIKE 'all%'"
            queryWord += ";";
        }
    }
    console.log(queryWord)
    //
    const sql = queryWord
    db.query(sql, (err , result) => {
        console.log(result);
        res.send(result)
    })
    console.log(queryWord)
})

app.post('/api/savefile' , (req , res) => {
    // console.log(req.body)
    const uname = req.body.uname
    const gname = req.body.gname
    const dd  =req.body.dd
    const fillterg = req.body.fillterg
    const date = new Date();
    let day= String(date.getDate()).padStart(2,"0");
    let month = String(date.getMonth()+1).padStart(2,"0");
    let year = date.getFullYear()
    let udate = day+ "-" + month + "-" + year;

    const sql =  'DELETE FROM chemicalgroup WHERE groupname =  "' + gname + '"'
    db.query(sql,(err, result)=>{
        if(err)
            console.log(result)
    })
    // let i = 0
    // console.log("uname = " + uname)
    // console.log(dd[i])
    // console.log([dd[i].cas , dd[i].cname , dd[i].cmname , dd[i].per , dd[i].st , "-" , "-" , dd[i].bodypart , dd[i].color , gname , dd[i].per1 , uname , udate ])
    for( let i = 0 ; i < dd.length ; i++ ){
        const sql1 = 'INSERT INTO chemicalgroup (cas , cname , cmname , per , st , img , des, bodypart , color , groupname , per1 , uname , udate , fillterg) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?); '
        db.query(sql1,[dd[i].cas , dd[i].cname , dd[i].cmname , dd[i].per , dd[i].st , "-" , "-" , dd[i].bodypart , dd[i].color , gname , dd[i].per1 , uname , udate , fillterg  ] , (err, result)=>{
           console.log(result)
        })

    }
    res.send("Ok")

})

app.get('/api/getGroupName',(req,res)=>{
    const sql = 'SELECT DISTINCT groupname , udate FROM chemicalgroup ORDER BY udate ASC;'
    db.query(sql,(err, result) =>{
        console.log(result);
        res.send(result)
    })
})

app.post('/api/getGroupNamebyname' , (req,res) => {
    // console.log(req.body)
    const gname = req.body.gname
    const sql = 'SELECT * FROM chemicalgroup WHERE groupname = "' + gname + '"';
    db.query(sql,(err, result) =>{
        console.log(result);
        res.send(result)
    })

})

app.post('/api/annex', (req, res) => {
    const st = req.body.st
    console.log(st)
    db.query(
        'SELECT * FROM chemical WHERE st = ' + st,
        (err, result) => {
            res.send(result)
        })
})

app.get('/api/getalldata' , (req , res ) => {
    const sql =  'SELECT * FROM chemical'
    db.query(sql , (err , result) => {
        console.log(result);
        res.send(result)
    })

})

app.post('/api/getalldataAddminEdit' , (req , res ) => {
    const no = req.body.no
    const sql =  'SELECT * FROM chemical WHERE no ='+ no
    db.query(sql , (err , result) => {
        console.log(result);
        res.send(result)
    })

})

app.post('/api/getalldataAddminUpdateByType' , (req , res ) => {
    console.log(req.body)

    //UPDATE `chemical` SET `no`='[value-1]',`cas`='[value-2]',`cname`='[value-3]',`cmname`='[value-4]',`per`='[value-5]',`st`='[value-6]',`img`='[value-7]',`des`='[value-8]',`bodypart`='[value-9]',`color`='[value-10]' WHERE 1
    const no = req.body.no
    const cas = req.body.cas
    const cmname = req.body.cmname
    const per = req.body.per
    const st = req.body.st
    const des = req.body.des
    console.log( [cas , cmname , per , st , des , no ] );
    //            UPDATE chemical SET cas=?,cmname=?,per=?,st=?,des=? WHERE no = ?
    const sql =  'UPDATE chemical set cas = ? , cmname = ? , per = ? , st = ? , des = ? WHERE no = ? '

    db.query(sql , [cas , cmname , per , st , des , no ] , (err , result) => {
        console.log(result);
        res.send(result)
     })

})

app.listen(3001, () => {
    console.log('Running node at port 3001');
})
