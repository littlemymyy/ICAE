const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const fs = require('fs').promises;
const csv = require('csv-parser')
const {convertArrayToCSV} = require('convert-array-to-csv')
const xml2js = require('xml2js')
const parser = new xml2js.Parser({attrkey : "ATTR"})
const DomParser = require('dom-parser')
const jsonParser = bodyParser.json()
const mysql = require('mysql2')
const crypto = require('crypto')
const fetch = require('node-fetch');
const cheerio = require('cheerio');
const multer = require('multer');
const pdfMake = require('pdfmake/build/pdfmake');
const vfsFonts = require('pdfmake/build/vfs_fonts');
const path = require('path');
const PDFMerger = require('pdf-merger-js');


const app = express();
app.use(bodyParser.json({limit: '35mb'}));
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true , limit : "35mb" , parameterLimit : 50000 }));
//app.use(fileupload());
//app.use(express.static("files"));


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'cosmetic'
});

const pdfStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: function ( req, file, cb ) {
        //req.body is empty...
        //How could I get the new_file_name property sent from client here?
        cb( null, Date.now() + '-' + file.originalname);
    }
});

const pdfUpload = multer({ storage: pdfStorage });

//not use
app.post('/generate-pdf', pdfUpload.single('file'), (req, res) => {
    const content = req.body.text;
    console.log(content)

    try {
        pdfMake.fonts = {
            THSarabunNew: {
                normal: 'THSarabun.ttf',
                bold: 'THSarabun-Bold.ttf',
                italics: 'THSarabun-Italic.ttf',
                bolditalics: 'THSarabun-BoldItalic.ttf'
            }
        }


      pdfMake.vfs = vfsFonts.pdfMake.vfs;

        const docDefinition = {
                content: [
                    { text:'ข้อมูลเกี่ยวกับเครื่องสำอาง (PRODUCTS INFORMATION FILE : PIF)', style: 'header' },
                    {text:`เลขที่จดแจ้ง: ${req.body.inputregisNumber}` },
                    {text:`ชื่อทางการค้าเครื่องสำอาง: ${req.body.inputcomName}` },
                    {text:`ชื่อเครื่องสำอาง: ${req.body.inputcosName}`},
                    {text:`ประเภทของเครื่องสำอาง: ${req.body.inputtypeGoods}`},
                    {text:`วันที่จดแจ้ง: ${req.body.inputdateS}`},
                    {text:`วันที่ใบอนุญาตหมดอายุ:${req.body.inputexpDate}`},
                    {text:`จุดประสงค์การใช้: ${req.body.inputobjGoods}`},
                    {text:`ลักษณะทางกายภาพ: ${req.body.Inputpy}`},
                    {text:`ชื่อผู้ผลิต: ${req.body.inputentrepreneur}`},
                    {text:`ชื่อผู้ผลิตต่างประเทศ: ${req.body.inputFentrepreneur}`},
                    {text:`รายละเอียดเพิ่มเติม: ${req.body.setDes}`}


                ],
                styles: {
                    header: {
                        fontSize: 18,
                        bold: true,
                        alignment: 'center',
                        margin: [10, 10, 10, 10]
                    }
                },
                defaultStyle: {
                    font: 'THSarabunNew'
                }
            };

        const pdfDoc = pdfMake.createPdf(docDefinition);

        const fileName =  Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + '-' + Date.now();

        const pdfPath = path.join(__dirname, 'uploads', `${fileName}.pdf`);

        pdfDoc.getBuffer((buffer) => {
            fs.writeFile(pdfPath, buffer, () => {
                res.send('OK');
            });
        });
        res.send('OK');
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
});

//not use
app.post('/mergePdf', pdfUpload.any(), (req, res) => {
    const merger = new PDFMerger();
    const files = req.files;
    console.log(files);

    try {
        (async () => {
            for(let i = 0 ; i < files.length ; i++){
                await merger.add(files[i].path);
            }
            await merger.save('uploads/mergedpdf.pdf').then((pdfBuffer) => {
                res.send(pdfBuffer);
                });
        })()
    } catch (error) {
        console.error('Error merging PDFs:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/api/submitPif', pdfUpload.any(), (req, res) => {
    try {
        let img_path = '';
        let pdf_path = '';

        (async () => {
            console.log(JSON.parse(req.body.data))
            const data = JSON.parse(req.body.data);
            // console.log(req.files.data)
            pdfMake.fonts = {
                THSarabunNew: {
                    normal: 'THSarabun.ttf',
                    bold: 'THSarabun-Bold.ttf',
                    italics: 'THSarabun-Italic.ttf',
                    bolditalics: 'THSarabun-BoldItalic.ttf'
                }
            }

            pdfMake.vfs = vfsFonts.pdfMake.vfs;

            const docDefinition = {
                    content: [
                        { text:'ข้อมูลเกี่ยวกับเครื่องสำอาง (PRODUCTS INFORMATION FILE : PIF)', style: 'header' },
                        {text:`เลขที่จดแจ้ง: ${data.inputregisNumber}` },
                        {text:`ชื่อทางการค้าเครื่องสำอาง: ${data.inputcomName}` },
                        {text:`ชื่อเครื่องสำอาง: ${data.inputcosName}`},
                        {text:`ประเภทของเครื่องสำอาง: ${data.inputtypeGoods}`},
                        {text:`วันที่จดแจ้ง: ${data.inputdateS}`},
                        {text:`วันที่ใบอนุญาตหมดอายุ:${data.inputexpDate}`},
                        {text:`จุดประสงค์การใช้: ${data.inputobjGoods}`},
                        {text:`ลักษณะทางกายภาพ: ${data.Inputpy}`},
                        {text:`ชื่อผู้ผลิต: ${data.inputentrepreneur}`},
                        {text:`ชื่อผู้ผลิตต่างประเทศ: ${data.inputFentrepreneur}`},
                        {text:`รายละเอียดเพิ่มเติม: ${data.setDes}`}


                    ],
                    styles: {
                        header: {
                            fontSize: 18,
                            bold: true,
                            alignment: 'center',
                            margin: [10, 10, 10, 10]
                        }
                    },
                    defaultStyle: {
                        font: 'THSarabunNew'
                    }
                };

            const pdfDoc = pdfMake.createPdf(docDefinition);
            const fileName = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + '-' + Date.now();
            const pdfPath = path.join(__dirname, 'uploads', `${fileName}.pdf`);

            const buffer = await new Promise((resolve, reject) => {
                pdfDoc.getBuffer((buffer) => {
                    resolve(buffer);
                });
            });

            await fs.writeFile(pdfPath, buffer);

            const firstPath = path.join('./uploads', `${fileName}.pdf`);
            console.log(firstPath)

            //merge pdf
            const merger = new PDFMerger();
            const files = req.files;
            console.log(files);

            await merger.add(firstPath);
            try{
                for(let i = 0 ; i < files.length ; i++){
                    if (files[i].mimetype === 'application/pdf')
                        await merger.add(files[i].path);
                    if (files[i].mimetype === 'image/jpeg' || files[i].mimetype === 'image/png')
                        img_path = files[i].path;
                }
            }catch(err){
                console.log("no any file upload")
                console.log(err)
            }

            let pdfFileName = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + '-' + Date.now();
            await merger.save(`uploads/${pdfFileName}.pdf`).then((pdfBuffer) => {
                console.log(pdfBuffer);
            });

            console.log(pdfFileName)
            pdf_path = path.join('./uploads', `${pdfFileName}.pdf`);
            res.json({status: "ok", pdf_path: pdf_path, img_path: img_path});
        })()
    } catch (error) {
        console.error('Error merging PDFs:', error);
        res.status(500).send('Internal Server Error');
    }
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
    const password = crypto.createHash("sha1").update(req.body.password).digest("hex")
    console.log(email + " " + password)
    const sql = `SELECT em_fullname,em_icon , status , organization_id FROM employee WHERE em_email = '${email}' AND em_pass = '${password}' `
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
    const password = crypto.createHash("sha1").update(req.body.password).digest("hex")


    const repassword = req.body.repassword
    const fullname = firstName +" "+lastName

    console.log(fullname + " " + email + " " + password +" " + repassword)

    const sql = `INSERT INTO  employee(em_email , em_fullname , em_icon , em_pass , status) VALUES(?,?,?,?,?);  `
    db.query(sql,[email , fullname ,"test01.png" , password , "U" ] , (err, result) => {
        res.send('OK')
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
    const dd  = req.body.dd
    const fillterg = req.body.fillterg
    const date = new Date();
    let day= String(date.getDate()).padStart(2,"0");
    let month = String(date.getMonth()+1).padStart(2,"0");
    let year = date.getFullYear()
    let udate = day+ "-" + month + "-" + year;





    console.log(dd)

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



app.get('/api/annex', jsonParser, (req, res) => {
    db.execute(
        'SELECT * FROM chemical WHERE st = ?',
        [req.query.st],
        (err, result) => {
            if(err) {
                res.json({status:'error',message:err});
                return;
            }
            if(result.length > 0) {
                res.json({status:'ok',message:result})
            }
            else {
                res.json({status:'error',message:'No data found'});
            }
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

app.post('/api/getdatachangegroup' , (req , res) => {
    const no = req.body

    let num = ""
    let queryWord = "SELECT * FROM chemical WHERE "


    for(let i = 0 ; i<no.length ; i++){
       num = " no = " + no[i] + " "
        queryWord += num
        if(i < no.length - 1) {
            queryWord += " OR "
        }
        else {
            queryWord += ";";
        }
    }
    console.log(queryWord)
    const sql = queryWord
    db.query(sql , (err , result) => {
        console.log(result);
        res.send(result)
    })

})

app.post('/api/saveStfromchangegroup' , (req , res) => {
    const st = req.body.st
    const num = req.body.num

    console.log( num)
    for(let i = 0 ; i < num.length ; i++ ){
        const sql = "UPDATE chemical SET st = ? WHERE no = ?";
        db.query(sql , [st , num[i]], function (err, result) {
          if (err) throw err;
          console.log(result.affectedRows + " record(s) updated");
        });

    }

})

app.get('/api/showdataUV' , (req , res) => {
    const sql = "SELECT COUNT(*) as num FROM `chemical` WHERE st = 6"
    db.query(sql , (err , result) => {
        console.log(result);
        res.send(result)
    })

})

app.get('/api/showdataAn2' , (req , res) => {
    const sql = "SELECT COUNT(*) as num FROM `chemical` WHERE st = 2"
    db.query(sql , (err , result) => {
        console.log(result);
        res.send(result)
    })
})

app.get('/api/showdataST0' , (req , res) => {
    const sql = "SELECT COUNT(*) as num FROM `chemical` WHERE st = 0"
    db.query(sql , (err , result) => {
        console.log(result);
        res.send(result)
    })
})

app.get('/api/showdataAn4' , (req , res) => {
    const sql = "SELECT COUNT(*) as num FROM `chemical` WHERE st = 4"
    db.query(sql , (err , result) => {
        console.log(result);
        res.send(result)
    })
})

app.get('/api/showdataAn5' , (req , res) => {
    const sql = "SELECT COUNT(*) as num FROM `chemical` WHERE st = 5"
    db.query(sql , (err , result) => {
        console.log(result);
        res.send(result)
    })
})

app.get('/api/showdataAn0' , (req , res) => {
    const sql = "SELECT COUNT(*) as num FROM `chemical` WHERE st != 2"
    db.query(sql , (err , result) => {
        console.log(result);
        res.send(result)
    })
})

app.get('/api/annex/search', jsonParser, (req, res) => {
    const name = "%"+req.query.name+"%"
    console.log(name)
    db.execute(
        'SELECT * FROM chemical WHERE cmname LIKE ? OR cas LIKE ?',
        [name,name],
        (err, result) => {
            console.log(result)
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

app.get('/api/fetchData', async (req, res) => {

    const fda = req.query.data;
    console.log("is Fda")
    console.log(fda)



      let status = ""
      let locationStatus = ""
      let registrationNumber = ""
      let typeRegis = ""
      let formatRegis = ""
      let comName = ""
      let cosName = ""
      let deteS = ""
      let expDate = ""
      let typeGoods =""
      let bodypart = ""
      let objGoods = ""
      let conGoods = ""
      let entrepreneur = ""
      let Fentrepreneur = ""


    try {
      const response = await fetch('http://pertento.fda.moph.go.th/FDA_SEARCH_CENTER/PRODUCT/export_cmt_detail.aspx?regnos='+fda);
      const data = await response.text();
   const $ = cheerio.load(data);


    //          // const tempElement = document.createElement('div');
    //         //   tempElement.innerHTML = data;

                status = $('#ContentPlaceHolder1_lb_status').text() || 'N/A';
               locationStatus = $('#ContentPlaceHolder1_lb_status_lct').text() || 'N/A';
               registrationNumber = $('#ContentPlaceHolder1_lb_no_regnos').text() || 'N/A';
               typeRegis = $('#ContentPlaceHolder1_lb_type').text() || 'N/A';
               formatRegis = $('#ContentPlaceHolder1_lb_format_regnos').text() || 'N/A';
               comName = $('#ContentPlaceHolder1_lb_trade_Tpop').text() || 'N/A';
               cosName = $('#ContentPlaceHolder1_lb_cosnm_Tpop').text() || 'N/A';
               dateS = $('#ContentPlaceHolder1_lb_appdate').text() || 'N/A';
               expDate = $('#ContentPlaceHolder1_lb_expdate').text() || 'N/A';
               typeGoods = $('#ContentPlaceHolder1_lb_mode').text() || 'N/A';
               bodypart = $('#ContentPlaceHolder1_lb_applicability_name').text() || 'N/A';
               objGoods = $('#ContentPlaceHolder1_lb_application_name').text() || 'N/A';
               conGoods = $('#ContentPlaceHolder1_lb_condition').text() || 'N/A';
               entrepreneur = $('#ContentPlaceHolder1_lb_usernm_pop').text() || 'N/A';
               Fentrepreneur = $('#ContentPlaceHolder1_lb_fac_pop').text() || 'N/A';

               let arr = [status,locationStatus, registrationNumber,typeRegis,formatRegis,comName, cosName,dateS,expDate,typeGoods, bodypart,objGoods,conGoods, entrepreneur,Fentrepreneur]


    //   console.log(locationStatus)
    //   console.log(expDate)
    //   console.log(Fentrepreneur)
    console.log(arr)
      res.send(arr);
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

app.post('/api/setsignUpA' , jsonParser, (req , res ) => {
    console.log(req.body)
    const fullname = req.body.em_fullname
    const email = req.body.em_email
    const st = req.body.status
    const oid = req.body.ongranization_id
    const password = crypto.createHash("sha1").update(req.body.em_pass).digest("hex")



    console.log(fullname + " " + email + " " + password +" " +" "+st +" "+ oid)

    const sql = `INSERT INTO  employee(em_email , em_fullname , em_icon , em_pass , status , organization_id) VALUES(?,?,?,?,?,?);  `
    db.query(sql,[email , fullname ,"/test01.png" , password , st , oid ] , (err, result) => {
        res.send('OK')
    })
    //res.send("ok")

})

app.post('/api/getorId/', (req, res) => {
    const orid = req.body.data
    console.log(orid)
    const sql = `SELECT * FROM employee WHERE organization_id	= ${orid}  `
    db.query(sql,(err, result) =>{
        console.log(result)
        res.send(result)
    })
})

app.get('/api/getuserAs/', (req, res) => {

    const sql = `SELECT * FROM employee WHERE status = "A" OR status = "S"  `
    db.query(sql,(err, result) =>{
        console.log(result)
        res.send(result)
    })
})

app.post('/api/deluserAS' , (req , res) => {
    const no = req.body.data
    console.log(no)

    const sql = 'DELETE FROM `employee` WHERE no = ' + no
    db.query(sql,(err, result) =>{
        console.log(result)
        res.send(result)
    })
})

app.post('/api/searchAll', (req,res) => {
    //SELECT * FROM chemical WHERE
    //bodypart LIKE '%skin%'
    //OR bodypart LIKE '%face%' OR bodypart LIKE '%body%' OR bodypart LIKE '%powder%' OR bodypart LIKE '%hand%';
    console.log("........")
    let bodypart = ""
    let sql = "SELECT * FROM chemical  "
    db.query(sql, (err , result) => {
        console.log(result);
        res.send(result)
    })

})

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    }, filename: function (req, file, cb) {
        cb(null, file.originalname);
      },
    });
    const upload = multer({ storage: storage });

app.post('/api/upload-pdf' , (req , res) => {
    const file = req.body
    console.log(file)
})

app.listen(3001, () => {
    console.log('Running node at port 3001');
})
