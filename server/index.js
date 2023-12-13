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
const nodemailer = require("nodemailer");
const axios = require('axios');
const { error } = require('console')
const cron = require('node-cron');
const http = require('http');
const socketIo = require('socket.io');
const {EMAIL , PASSWORD} = require('./env.js')
const PDFMerger = require('pdf-merger-js');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
app.use(bodyParser.json({limit: '35mb'}));
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true , limit : "35mb" , parameterLimit : 50000 }));
//app.use(fileupload());
//app.use(express.static("files"));
const secretKey = crypto.randomBytes(32).toString('hex');


app.use('/uploads', express.static('uploads'));

// create PDF FOR PIF
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'cosmetic1'
});

const pdfStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename:  ( req, file, cb ) => {
        //req.body is empty...
        //How could I get the new_file_name property sent from client here?
        console.log(file)
        cb( null, Date.now() + '-' + file.originalname);
    }
});

const pdfUpload = multer({ storage: pdfStorage });

//not use
app.post('/generate-pdf', pdfUpload.single('file'), (req, res) => {
    console.log("Name.....")
    let originalFileName = req.files.originalname
    console.log(originalFileName)
    res.json({ filename: req.file.filename })
    const content = req.body.text;
   // console.log(content)
   console.log("req file name")
    console.log(req.file.filename)
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
   // console.log(files);

    try {
        (async () => {
            for(let i = 0 ; i < files.length ; i++){
                //console.log("file [i]")
               // console.log(files[i])
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
  //     console.log("submit")
   //console.log(req.files)
   const file = req.files
 //  console.log("...................")
   const files = req.body.data;
   const filePaths = req.files.map(file => file.path.toString());
  // console.log(files)

 //  console.log(filePaths);

   const filea = filePaths[0] || "-";//fda
   const fileb = filePaths[1] || "-";//Autorization
   const filec = filePaths[2] || "-";//formu
   const filed = filePaths[3] || "-";//label
   const filee = filePaths[4] || "-";//manufu
   const filef = filePaths[5] || "-";//Gmp
   const fileg = filePaths[6] || "-";//eff
   const fileh = filePaths[7] || "-";//efficent
   const filei = filePaths[8] || "-";//spec
   const filej = filePaths[9] || "-";//Coa
   const filek = filePaths[10] || "-";//sds
   const filel = filePaths[11] || "-";//master formula
   const filem = filePaths[12] || "-";//Specification of cosmetic finished product)
   const filen = filePaths[13] || "-";//Testing 
  

            // if(filea.length === 0) {
            //     filea += "-"
            // }
            // else if(fileb.length === 0) {
            //     fileb += "-"
            // }
            // else if(filec.length === 0) {
            //     filec += "-"
            // }
            // else if(filed.length === 0) {
            //     filed += "-"
            // }
            // else if(filee.length === 0) {
            //     filee += "-"
            // }
            // else if(filea.length === 0) {
            //     filea += "-"
            // }
            // else if(filef.length === 0) {
            //     filef += "-"
            // }
            // else if(fileg.length === 0) {
            //     fileg += "-"
            // }
            // else if(fileh.length === 0) {
            //     fileh += "-"
            // }
            // else if(filei.length === 0) {
            //     filei += "-"
            // }
            // else if(filej.length === 0) {
            //     filej += "-"
            // }
            // else if(filek.length === 0) {
            //     filek += "-"
            // }
            // else if(filel.length === 0) {
            //     filel += "-"
            // }
   
            // console.log(filea.length);
            // console.log(fileb);
            // console.log(filec);

//    const filea = file[0].path.toString()
//    const fileb = file[1].path.toString()
//    const filec = req.files[2].path.toString()
//    const filed = req.files[3].path.toString()
//    const filee = req.files[4].path.toString()
//    const filef = req.files[5].path.toString()
//    const fileg = req.files[6].path.toString()
//    const fileh = req.files[7].path.toString()
//    const filei = req.files[8].path.toString()
//    const filej = req.files[9].path.toString()
//    const filek = req.files[10].path.toString()
//    const filel = req.files[11].path.toString()
   

//  console.log(filea)
//  console.log(fileb)
//  console.log(filec)
//  console.log(filed)
//  console.log(filee)
//  console.log(filef)
//  console.log(fileg)
//  console.log(fileh)
//  console.log(filei)
//  console.log(filej)
//  console.log(filek)
//  console.log(filel)


   //console.log(files)
    
    
  




    try {
        let img_path = '';
        let pdf_path = '';

        (async () => {
           // console.log("file sumitPDF")
           console.log(JSON.parse(req.body.data))
            const data = JSON.parse(req.body.data);
            console.log(data)

            // for(let i = 0 ; i<data.length ; i++){
            //     if(data[i]  === null || data[i] === " "){
            //         data[i] = "-"
            //     }
                
            // }
           // console.log(data)
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
            console.log("file AA")
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

            // console.log(filea.length)
            // console.log(fileb.length)
            //  console.log(filec.length)
            // console.log(filed.length)
            // console.log(filee.length)
            // console.log(filef.length)
            // console.log(fileg.length)
            // console.log(fileh.length)
            // console.log(filei.length)
            // console.log(filej.length)
            // console.log(filek.length)
            // console.log(filel.length)

           
          //  console.log(data.fdadoc_date)

         

          db.query( 'INSERT INTO pif( email, file_name, img_path, pdf_path, expdate, rec_create_when, organization_id, fda_license, fdadoc, letter_authorization, formula_doc , label_doc , manufacture_doc , gmp_iso, eff_report, efficient_report,spec ,coa_doc,sds, masterformula, specification, testing_doc, status, fdadoc_date, letter_authorization_date, formula_doc_date , label_doc_date , manufacture_doc_date , gmp_iso_date, eff_report_date, efficient_report_date, sds_date, masterformula_date, specification_date, testing_doc_date ,coa_date) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
          [data.email, data.filename, img_path, pdf_path, data.expdate, new Date(),data.id ,data.fda_num , filea , fileb , filec ,filed, filee,filef,fileg,fileh,filei ,filej ,filek ,filel,filem,filen,"1",data.fdadoc_date,data.letter_authorization_date,data.formula_doc_date , data.label_doc_date , data.manufacture_doc_date ,data.gmp_iso_date ,data.eff_report_date , data.efficient_report_date , data.sds_date , data.masterformula_date, data.specification_date , data.testing_doc_date ,data.coa ],
          (err, result) => {
          if(err) {
              console.log(err)
              res.json({status: "error", message: err});
              return;
          }
          else {
            console.log(result)
              res.json({status: "ok", pdf_path: pdf_path, img_path: img_path});
          }
     }) 

     //update product data
     const sql = 'UPDATE product SET status = ? WHERE organization_id = ? AND fda_license = ?';
     db.query(sql, ["1" ,data.id , data.fda_num ], (err, result) => {
         if (err) {
             console.error('Error updating product status:', err);
             
         } else {
             // Handle the result or send a success response
             console.log(result)
             //res.send('Update successful');
         }
     });

  })()
} catch (error) {
  console.error('Error merging PDFs:', error);
  res.status(500).send('Internal Server Error');
}

 
})





//// for now i not have Edit that this /api/submitPifEdit
app.post('/api/submitPifEdit', pdfUpload.any(), (req, res) => {
    
    const file = req.files

    const files = req.body.data;
    const filePaths = req.files.map(file => file.path.toString());
    console.log('files', files);

 
    const filea = filePaths[0] || "-";//fda => fdadoc
    const fileb = filePaths[1] || "-";//Autorization  => letter_authorization
    const filec = filePaths[2] || "-";//formu  => formula_doc
    const filed = filePaths[3] || "-";//label =>label_doc
    const filee = filePaths[4] || "-";//manufu => 	manufacture_doc
    const filef = filePaths[5] || "-";//Gmp => gmp_iso
    const fileg = filePaths[6] || "-";//eff => eff_report
    const fileh = filePaths[7] || "-";//efficent => efficient_report
    const filei = filePaths[8] || "-";//spec => spec
    const filej = filePaths[9] || "-";//Coa => coa_doc
    const filek = filePaths[10] || "-";//sds => 	sds
    const filel = filePaths[11] || "-";//master formula => masterformula
    const filem = filePaths[12] || "-";//Specification of cosmetic finished product)=>specification
    const filen = filePaths[13] || "-";//Testing =>testing_doc 


    // get file 
    let update = [filePaths[0] , filePaths[1] , filePaths[2] , filePaths[3] , filePaths[4] , filePaths[5] ,filePaths[6] ,filePaths[7] ,filePaths[8] ,filePaths[9] ,filePaths[10] ,filePaths[11] ,filePaths[12] ,filePaths[13]]
    let update1 = [filea, fileb , filec , filed , filee , filef ,fileg ,fileh ,filei ,filej ,filek ,filel , filem , filen]
    let fname = [",fdadoc = ?" , ",letter_authorization = ? " ,",formula_doc = ? " , ",label_doc = ? " , ",manufacture_doc = ?", ",gmp_iso = ?" , ",eff_report = ? " ,",efficient_report = ?" ,", spec = ?" ,",coa_doc = ?" , " ,sds = ?"," ,masterformula = ?" ," ,specification = ?" ,",testing_doc = ? "]
    let sqlobj = []
    let update2 = []

    
    for(let i = 0 ; i < update.length ;i++){
        if(update[i] !== undefined ){
            update2.push(update1[i])
            sqlobj.push(fname[i])

        }
    }

    let columname = ""
    for(let i = 0 ; i < sqlobj.length ;i++){
        columname += sqlobj[i] +" ,"
    }
    let sqlcut = ""
    sqlcut += columname.substring(0,columname.length-1)
   
    try {
        let img_path = '';
        let pdf_path = '';
  
        (async () => {
              const data = JSON.parse(req.body.data);
              console.log('data=>',data)
  
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
  
              //merge pdf
              const merger = new PDFMerger();
                const files = req.files;
  
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
                  console.log("pdfBuffer => ",pdfBuffer);
              });
  
              pdf_path = path.join('./uploads', `${pdfFileName}.pdf`);
  

  
             for(let i = 0 ; i< sqlobj.length; i++){
                const sql = "UPDATE pif  SET email = ? , img_path = ? , expdate = ? , rec_create_when = ? ,status = ? , fdadoc_date = ? , letter_authorization_date = ? , formula_doc_date = ? , label_doc_date = ? , manufacture_doc_date = ? , gmp_iso_date =? , eff_report_date = ? , efficient_report_date = ? ,sds_date = ? , masterformula_date = ? , specification_date =?, testing_doc_date =? , coa_date = ?" + sqlobj[i] + "WHERE organization_id = ? AND fda_license = ?"
                db.query(sql ,[data.email , img_path ,data.expdate , new Date() ,"3" ,  data.fdadoc_date , data.letter_authorization_date , data.formula_doc_date , data.label_doc_date , data.manufacture_doc_date , data.gmp_iso_date , data.eff_report_date , data.efficient_report_date, data.sds_date , data.masterformula_date , data.specification_date , data.testing_doc_date , data.coa , update2[i] ,data.id , data.inputregisNumber] , (error , result) => {
                    if(error){
                        res.status(500).send(error)
                    }
                    
                })
             }
             res.send("Comple")

    })()
  } catch (error) {
    console.error('Error merging PDFs:', error);
    res.status(500).send('Internal Server Error');
  }
  })



  app.post('/api/submitPifEditToGetPifReport', pdfUpload.any(), (req, res) => {
    //     console.log("submit")
     //console.log(req.files)
     const file = req.files
   //  console.log("...................")
     const files = req.body.data;
     const filePaths = req.files.map(file => file.path.toString());
    // console.log(files)
  
   //  console.log(filePaths);
 
     const filea = filePaths[0] || "-";//fda => fdadoc
     const fileb = filePaths[1] || "-";//Autorization  => letter_authorization
     const filec = filePaths[2] || "-";//formu  => formula_doc
     const filed = filePaths[3] || "-";//label =>label_doc
     const filee = filePaths[4] || "-";//manufu => 	manufacture_doc
     const filef = filePaths[5] || "-";//Gmp => gmp_iso
     const fileg = filePaths[6] || "-";//eff => eff_report
     const fileh = filePaths[7] || "-";//efficent => efficient_report
     const filei = filePaths[8] || "-";//spec => spec
     const filej = filePaths[9] || "-";//Coa => coa_doc
     const filek = filePaths[10] || "-";//sds => 	sds
     const filel = filePaths[11] || "-";//master formula => masterformula
     const filem = filePaths[12] || "-";//Specification of cosmetic finished product)=>specification
     const filen = filePaths[13] || "-";//Testing =>testing_doc 


    // get file 
     let update = [filePaths[0] , filePaths[1] , filePaths[2] , filePaths[3] , filePaths[4] , filePaths[5] ,filePaths[6] ,filePaths[7] ,filePaths[8] ,filePaths[9] ,filePaths[10] ,filePaths[11] ,filePaths[12] ,filePaths[13]]
     let update1 = ["filea", "fileb" , "filec" , "filed" , "filee" , "filef" ,"fileg" ,"fileh" ,"filei" ,"filej" ,"filek" ,"filel" , "filem" , "filen"]
     let fname = [",fdadoc = ?" , ",letter_authorization = ? " ,",formula_doc = ? " , ",label_doc = ? " , ",manufacture_doc = ?", ",gmp_iso = ?" , ",eff_report = ? " ,",efficient_report = ?" ,", spec = ?" ,",coa_doc = ?" , " ,sds = ?"," ,masterformula = ?" ," ,specification = ?" ,",testing_doc = ? "]
     let sqlobj = []
     let update2 = []
     console.log("update")
     console.log(update)
     
     for(let i = 0 ; i < update.length ;i++){
        console.log("for loop")
        console.log(update[i])
        if(update[i] !== undefined ){
            console.log(i+"foorloop")
          update2.push(update1[i])
          sqlobj.push(fname[i])

        }
     }

     let columname = ""
     for(let i = 0 ; i < sqlobj.length ;i++){
        columname += sqlobj[i] +" ,"
     }
     let sqlcut = ""
     sqlcut += columname.substring(0,columname.length-1)
    
     console.log(sqlcut)
     console.log("update2")
     console.log(update2)
    
     console.log(columname)
   
      try {
          let img_path = '';
          let pdf_path = '';
  
          (async () => {
             console.log(JSON.parse(req.body.data))
              const data = JSON.parse(req.body.data);
              console.log(data)
  
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
  

  
             for(let i = 0 ; i< sqlobj.length; i++){
                console.log(sqlobj[i])
                console.log(update2[i])
                const sql = "UPDATE pif  SET email = ? , img_path = ? , expdate = ? , rec_create_when = ? ,status = ? , fdadoc_date = ? , letter_authorization_date = ? , formula_doc_date = ? , label_doc_date = ? , manufacture_doc_date = ? , gmp_iso_date =? , eff_report_date = ? , efficient_report_date = ? ,sds_date = ? , masterformula_date = ? , specification_date =?, testing_doc_date =? , coa_date = ?" + sqlobj[i] + "WHERE organization_id = ? AND fda_license = ?"
                db.query(sql ,[data.email , img_path ,data.expdate , new Date() ,"3" ,  data.fdadoc_date , data.letter_authorization_date , data.formula_doc_date , data.label_doc_date , data.manufacture_doc_date , data.gmp_iso_date , data.eff_report_date , data.efficient_report_date, data.sds_date , data.masterformula_date , data.specification_date , data.testing_doc_date , data.coa , update2[i] ,data.id , data.inputregisNumber] , (error , result) => {
                    if(error){
                        console.log(error)
                    }
                    else {
                        res.send("Comple")
                    }
                })
             }

    })()
  } catch (error) {
    console.error('Error merging PDFs:', error);
    res.status(500).send('Internal Server Error');
  }
  
   
  })













app.post('/api/pifData', (req, res) => {

    const id = req.body.id
    const fda = req.body.fda
    const sql = 'SELECT * FROM pif WHERE organization_id = ? AND fda_license = ?';
    const values = [id, fda];

    db.query(sql, values, (err, result) => {
        if (err) {
           // console.error(err);
            res.status(500).send('Internal Server Error');
        } else {
            res.send(result);
        }
    });
});

app.get('/api/pif', jsonParser, (req, res) => {
    db.execute(
        'SELECT * FROM pif WHERE email = ?',
        [req.query.email],
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


// Admin upload data to database
app.post('/api/uploadCsv/', (req, res) => {
    const data = req.body.dd
    // console.log(data);
    const sql = 'DELETE FROM chemical '
    db.query(sql,(err, result)=>{
        if(err)
            console.log(result)
    })

    for(let i = 0 ; i < data.length; i++){
        //console.log(i + " " + data[i].cas);
        const sql = 'INSERT INTO chemical(cas, cname, per, st, info, eff, img) VALUES(?,?,?,?,?,?,?);'
        db.query(sql,[data[i].cas, data[i].cname, data[i].per, data[i].st, data[i].info, data[i].eff , data[i].img] , (err, result)=>{
            //console.log(result)
        })
    }
    res.send('OK');
})








/////////////////////////////////////////////////////////////////
// ADMIN / USER LOGING
app.post('/api/getUser/', (req, res) => {
    const email = req.body.email;
    const password = crypto.createHash("sha1").update(req.body.password).digest("hex")
    //console.log(email + " " + password)
    const sql = `SELECT em_fullname,em_icon , status , organization_id , em_email FROM employee WHERE em_email = '${email}' AND em_pass = '${password}' `
    db.query(sql,(err, result) =>{
        if(err) {
          //console.log(err)
        }
        else {
           //console.log(result)
            res.send(result)
        }


        if(result.length>0){


            let config = {
                host: 'smtp.gmail.com',
                port: 587 ,
                secure: false ,
                auth: {
                    user: EMAIL,
                    pass: PASSWORD
                }
            };

            let transporter = nodemailer.createTransport(config);

            let message = {
                from: EMAIL,
                to: email,
                subject: "ICAE LOGIN ",
                text: "Have some one login if not you ple edit password that link",
                html: "Have some one login if not you ple edit password that link",
            };

            transporter.sendMail(message)
                .then(() => {
                    // Sending response after email is sent
                   // return res.status(201).json({ msg: "Email has been sent, and signup was successful" });
                })
                .catch(error => {
                    console.error(error);
                   /// return res.status(500).json({ error: "Error sending email" });
                });

        }

    })
})
//////////////////////////////////////////////////////////////////////////////////////////////////////



app.post('/api/AddminAdd' , (req, res) => {
    const data = req.body
    console.log(data)

        const sql = 'INSERT INTO chemical(cas, cname, per, st , info, eff, img) VALUES (?,?,?,?,?,?,?);'
            db.query(sql,[data.cas, data.cname , data.per , data.st , data.info , data.eff , data.img ] , (err, result)=>{
               // console.log(result.affectedRows);
            })

    res.send('OK');

})



// Addmin upload data to database by hand
app.post('/api/setdata' , (req , res) => {
    const data = req.body.data
    const st = req.body.st
   // console.log(data)
   // console.log(st)
   // console.log(data.length)
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
   // console.log(count)
    res.send('OK');
})


// user singUp
app.post('/api/setsignUp' , jsonParser, async (req , res ) => {
    const firstName = req.body.firstname
    const lastName = req.body.lastname
    const email = req.body.email
   // console.log(req.body)
    const password = crypto.createHash("sha1").update(req.body.password).digest("hex")
    const repassword = req.body.repassword
    const fullname = firstName +" "+lastName

   // console.log(fullname + " " + email + " " + password +" " + repassword)

    const sql = `INSERT INTO  employee(em_email , em_fullname , em_icon , em_pass , status , organization_id ) VALUES(?,?,?,?,?,?);  `
    db.query(sql,[email , fullname ,"/pandaU.png" , password , "U" , "-" ] , (err, result) => {
       // res.status(201).json("Signup Successfully")
      // console.log("singup :")
      // console.log(result)
       if(err) {
        console.error(err)
        return res.status(500).json({error: "have someing worng"})
       }
    })
    let config = {
        host: 'smtp.gmail.com',
        port: 587 ,
        secure: false ,
        auth: {
            user: EMAIL,
            pass: PASSWORD
        }
    };

    let transporter = nodemailer.createTransport(config);

    let message = {
        from: EMAIL,
        to: email,
        subject: "WellCome To ICae",
        text: "Successfully Register with us",
        html: "Successfully Register with us",
    };

    transporter.sendMail(message)
        .then(() => {
            // Sending response after email is sent
            return res.status(201).json({ msg: "Email has been sent, and signup was successful" });
        })
        .catch(error => {
            console.error(error);
            return res.status(500).json({ error: "Error sending email" });
        });
})


//Check sign up Email dupicate
app.post('/api/checkMail',(req,res)=>{
    const email = req.body.email

    const sql = "SELECT em_email FROM employee WHERE em_email = ?"
    db.query(sql , [email] , (err , result)=>{
        if(err) {
          //  console.log(err)
        }
        else {
            if(result.length > 0 ){
                res.send("Dupicate")
            }
            else if(result.length <=0) {
                res.send("not-Dupicate")
            }
           // console.log(result)
           
        }
    })


})

//Show data by fillter data
app.post('/api/searchBybodypart', (req,res) => {
    //SELECT * FROM chemical WHERE
    //bodypart LIKE '%skin%'
    //OR bodypart LIKE '%face%' OR bodypart LIKE '%body%' OR bodypart LIKE '%powder%' OR bodypart LIKE '%hand%';
    const dd = req.body
   // console.log("........")
   // console.log(dd)
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
   // console.log(queryWord)
    //
    const sql = queryWord
    db.query(sql, (err , result) => {
      //  console.log(result);
        res.send(result)
    })
   // console.log(queryWord)
})

//Show data by fillter data
app.post('/api/searchBybodypartEdit', (req,res) => {
    //SELECT * FROM chemical WHERE
    //bodypart LIKE '%skin%'
    //OR bodypart LIKE '%face%' OR bodypart LIKE '%body%' OR bodypart LIKE '%powder%' OR bodypart LIKE '%hand%';
    const dd = req.body.fillterg
   // console.log("........")
   // console.log(dd)
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
   // console.log(queryWord)
    //
    const sql = queryWord
    db.query(sql, (err , result) => {
       // console.log(result);
        res.send(result)
    })
    //console.log(queryWord)
})


// save file from user check
app.post('/api/savefile' , (req , res) => {
    //console.log("saveFile from data ")
     //console.log(req.body)
    const uname = req.body.uname
    const gname = req.body.gname
    const dd  = req.body.dd
    const fillterg = req.body.fillterg
    const email = req.body.email
    const date = new Date();
    let day= String(date.getDate()).padStart(2,"0");
    let month = String(date.getMonth()+1).padStart(2,"0");
    let year = date.getFullYear()
    let udate = day+ "-" + month + "-" + year;
    //console.log(req.body.email)
    let str = ""
    for(let i = 0 ; i< fillterg.length ; i++){
        str+=fillterg[i]+","

    }

    let newstr = str.substring(0,str.length-1)

    //console.log(newstr)


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
        const sql1 = 'INSERT INTO chemicalgroup (cas , cname , cmname , per , st , img , des, bodypart , color , groupname , per1 , uname , udate , fillterg , email) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?); '
        db.query(sql1,[dd[i].cas , dd[i].cname , dd[i].cmname , dd[i].per , dd[i].st , "-" , "-" , dd[i].bodypart , dd[i].color , gname , dd[i].per1 , uname , date , newstr , email ] , (err, result)=>{
          // console.log(result)
        })

    }
    res.send("Ok")

})


// get user file name
app.post('/api/getGroupName',(req,res)=>{
   // console.log(req.body)
    const email = req.body.email
    const sql = 'SELECT DISTINCT groupname, udate FROM chemicalgroup WHERE email = ? ORDER BY udate ASC';
    // Assuming you're using a database library with support for parameterized queries
    db.query(sql, [email], (err, result) => {
      if (err) throw err;
      // Process the query result
      else {
        res.send(result)
      }
      //console.log(result);
    });
})

// get user file name Where File name
app.post('/api/getGroupNamebyname' , (req,res) => {
    // console.log(req.body)
    const gname = req.body.gname
    const sql = 'SELECT * FROM chemicalgroup WHERE groupname = "' + gname + '"';
    db.query(sql,(err, result) =>{
       // console.log(result);
        res.send(result)
    })

})


// get data annex
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


// get all data (chemical)
app.get('/api/getalldata' , (req , res ) => {
    const sql =  'SELECT * FROM chemical'
    db.query(sql , (err , result) => {
      //console.log(result);
        res.send(result)
    })

})

//get data for admin edit
app.post('/api/getalldataAddminEdit' , (req , res ) => {
    const no = req.body.no
    const sql =  'SELECT * FROM chemical WHERE no ='+ no
    db.query(sql , (err , result) => {
        //console.log(result);
        res.send(result)
    })

})


//all data for admin update by type of data
app.post('/api/getalldataAddminUpdateByType' , (req , res ) => {
    console.log(req.body)

    //UPDATE `chemical` SET `no`='[value-1]',`cas`='[value-2]',`cname`='[value-3]',`cmname`='[value-4]',`per`='[value-5]',`st`='[value-6]',`img`='[value-7]',`des`='[value-8]',`bodypart`='[value-9]',`color`='[value-10]' WHERE 1
    const no = req.body.no
    const cas = req.body.cas
    const cmname = req.body.cmname
    const per = req.body.per
    const st = req.body.st
    const des = req.body.des
   // console.log( [cas , cmname , per , st , des , no ] );
    //            UPDATE chemical SET cas=?,cmname=?,per=?,st=?,des=? WHERE no = ?
    const sql =  'UPDATE chemical set cas = ? , cmname = ? , per = ? , st = ? , des = ? WHERE no = ? '

    db.query(sql , [cas , cmname , per , st , des , no ] , (err , result) => {
       // console.log(result);
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

//Admin chang annex
app.post('/api/saveStfromchangegroup' , (req , res) => {
    const st = req.body.st
    const num = req.body.num

    console.log( num)
    for(let i = 0 ; i < num.length ; i++ ){
        const sql = "UPDATE chemical SET st = ? WHERE no = ?";
        db.query(sql , [st , num[i]], function (err, result) {
          if (err) throw err;
         // console.log(result.affectedRows + " record(s) updated");
        });

    }

})


// show annex
app.get('/api/showdataUV' , (req , res) => {
    const sql = "SELECT COUNT(*) as num FROM `chemical` WHERE st = 6"
    db.query(sql , (err , result) => {
       // console.log(result);
        res.send(result)
    })

})

app.get('/api/showdataAn2' , (req , res) => {
    const sql = "SELECT COUNT(*) as num FROM `chemical` WHERE st = 2"
    db.query(sql , (err , result) => {
       // console.log(result);
        res.send(result)
    })
})

app.get('/api/showdataST0' , (req , res) => {
    const sql = "SELECT COUNT(*) as num FROM `chemical` WHERE st = 0"
    db.query(sql , (err , result) => {
     //   console.log(result);
        res.send(result)
    })
})

app.get('/api/showdataAn4' , (req , res) => {
    const sql = "SELECT COUNT(*) as num FROM `chemical` WHERE st = 4"
    db.query(sql , (err , result) => {
      //  console.log(result);
        res.send(result)
    })
})

app.get('/api/showdataAn5' , (req , res) => {
    const sql = "SELECT COUNT(*) as num FROM `chemical` WHERE st = 5"
    db.query(sql , (err , result) => {
     //   console.log(result);
        res.send(result)
    })
})

app.get('/api/showdataAn0' , (req , res) => {
    const sql = "SELECT COUNT(*) as num FROM `chemical` WHERE st != 2"
    db.query(sql , (err , result) => {
     //   console.log(result);
        res.send(result)
    })
})

app.get('/api/annex/search', jsonParser, (req, res) => {
    const name = "%"+req.query.name+"%"
  //  console.log(name)
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


// Get data from FDA
app.get('/api/fetchData', async (req, res) => {

    const fda = req.query.data;
    //console.log("is Fda")
 //   console.log(fda)

    try {
      const response = await fetch('http://pertento.fda.moph.go.th/FDA_SEARCH_CENTER/PRODUCT/export_cmt_detail.aspx?regnos='+fda);
      const data = await response.text();
      //  console.log(data)
      //console.log(data)
      const $ = cheerio.load(data);
   
        const  dataAll =[]


    //dd is list of strings from data response
    const dd = ["ContentPlaceHolder1_lb_status",'ContentPlaceHolder1_lb_status_lct',"ContentPlaceHolder1_lb_no_regnos","ContentPlaceHolder1_lb_type" , "ContentPlaceHolder1_lb_format_regnos" ,"ContentPlaceHolder1_lb_trade_Tpop",
        "ContentPlaceHolder1_lb_cosnm_Tpop","ContentPlaceHolder1_lb_appdate" ,"ContentPlaceHolder1_lb_expdate" , "ContentPlaceHolder1_lb_mode","ContentPlaceHolder1_lb_applicability_name" , "ContentPlaceHolder1_lb_application_name",
    "ContentPlaceHolder1_lb_condition" ,"ContentPlaceHolder1_lb_usernm_pop" , "ContentPlaceHolder1_lb_fac_pop"]
    for(let i =0 ; i<dd.length ;i++){
       let  txt = dd[i]
       let st = data.indexOf(txt)
       if(st > -1){
        let a = data.substring(st+1)
        let st2 = a.indexOf('</span>')
       let c = data.substring(st+txt.length+2 , st2+st+1).replace("<br />", ' ')
       let b = c.replace("<br/>"," ")
       dataAll.push(b)
       }
       else {
        dataAll.push("N/A")
       }
    }
    console.log(dataAll)
res.send(dataAll);
} catch (error) {
 // console.error('Error fetching data:', error);
  res.status(500).json({ error: 'Internal Server Error' });
}
});



app.post('/api/setsignUpA' , jsonParser, (req , res ) => {
   // console.log(req.body)
    const fullname = req.body.em_fullname
    const email = req.body.em_email
    const st = req.body.status
    const oid = req.body.ongranization_id
    const password = crypto.createHash("sha1").update(req.body.em_pass).digest("hex")



   // console.log(fullname + " " + email + " " + password +" " +" "+st +" "+ oid)

    const sql = `INSERT INTO  employee(em_email , em_fullname , em_icon , em_pass , status , organization_id) VALUES(?,?,?,?,?,?);  `
    db.query(sql,[email , fullname ,"/pandaA.png" , password , st , oid ] , (err, result) => {
        res.send('OK')
    })
    //res.send("ok")

})


// get user Team ID
app.post('/api/getorId/', (req, res) => {
    const orid = req.body.data
   // console.log(orid)
    const sql = `SELECT * FROM employee WHERE organization_id	= ${orid}  `
    db.query(sql,(err, result) =>{
      //  console.log(result)
        res.send(result)
    })
})

// get user Admin or S
app.get('/api/getuserAs/', (req, res) => {

    const sql = `SELECT * FROM employee WHERE status = "A" OR status = "S"  `
    db.query(sql,(err, result) =>{
      //  console.log(result)
        res.send(result)
    })
})

// delete user by addmin or S
app.post('/api/deluserAS' , (req , res) => {
    const no = req.body.data
   // console.log(no)

    const sql = 'DELETE FROM `employee` WHERE no = ' + no
    db.query(sql,(err, result) =>{
        //console.log(result)
        res.send(result)
    })
})


app.post('/api/searchAll', (req,res) => {
    //SELECT * FROM chemical WHERE
    //bodypart LIKE '%skin%'
    //OR bodypart LIKE '%face%' OR bodypart LIKE '%body%' OR bodypart LIKE '%powder%' OR bodypart LIKE '%hand%';
    //console.log("........")
    let bodypart = ""
    let sql = "SELECT * FROM chemical  "
    db.query(sql, (err , result) => {
       // console.log(result);
        res.send(result)
    })

})

//send Notification Index Page
app.post('/api/sendNotification' , (req,res) => {
    //console.log("send Notification")

   //console.log(req.body)
   const orid = req.body.orid
   if(orid === "-"){
    res.status(200).send('Notthing' );
   }
   else {
   // console.log("that else")
   const sql = 'SELECT email , fda_license,expdate FROM product WHERE expdate <= CURDATE() + INTERVAL 1 MONTH AND organization_id = ?';

    db.query(sql , [orid], (err , result) => {
        if (err){
           // console.log("go that now")
          //  console.log("Error " , err)
        }
        else {
            console.log(result)
            res.status(200).send( result );
           // res.send(result)
        }
    })
   }
 
}
)



const chcekFdaExp = async (e) => {
    let num = []


    try {
        const response = await fetch('http://pertento.fda.moph.go.th/FDA_SEARCH_CENTER/PRODUCT/export_cmt_detail.aspx?regnos='+fda);
        const data = await response.text();
         // console.log(data)
        //console.log(data)
        const $ = cheerio.load(data);
     
          const  dataAll =[]
  
  
      //dd is list of strings from data response
      const dd = ["ContentPlaceHolder1_lb_status",'ContentPlaceHolder1_lb_status_lct',"ContentPlaceHolder1_lb_no_regnos","ContentPlaceHolder1_lb_type" , "ContentPlaceHolder1_lb_format_regnos" ,"ContentPlaceHolder1_lb_trade_Tpop",
          "ContentPlaceHolder1_lb_cosnm_Tpop","ContentPlaceHolder1_lb_appdate" ,"ContentPlaceHolder1_lb_expdate" , "ContentPlaceHolder1_lb_mode","ContentPlaceHolder1_lb_applicability_name" , "ContentPlaceHolder1_lb_application_name",
      "ContentPlaceHolder1_lb_condition" ,"ContentPlaceHolder1_lb_usernm_pop" , "ContentPlaceHolder1_lb_fac_pop"]
      for(let i =0 ; i<dd.length ;i++){
         let  txt = dd[i]
         let st = data.indexOf(txt)
         if(st > -1){
          let a = data.substring(st+1)
          let st2 = a.indexOf('</span>')
         let c = data.substring(st+txt.length+2 , st2+st+1).replace("<br />", ' ')
         let b = c.replace("<br/>"," ")
         dataAll.push(b)
         }
         else {
          dataAll.push("N/A")
         }
      }
      //console.log(dataAll)
  res.send(dataAll);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }



}




// getproduct Info by Team id
app.post('/api/productData' , (req, res) => {
    console.log("PifData")
    console.log(req.body.data)
    const id = req.body.data.trim()

    if(id){
        const sql = 'SELECT no,fda_license, cosnameC , cosname , expdate , img_path ,status FROM product WHERE organization_id = ?';

        db.query(sql, [id], (err, result) => {
            if (err) {
              //  console.log(err);
                res.status(500).json({ error: 'Internal Server Error' });
            } else {
               // console.log('Query Result:', result);
                res.send(result)
            }
        });
    }
   else {
    res.send(0)
   }


})

// upload and set id === organization_id  if not set organization_id  = en_email
app.post('/api/pifDataEmail' , (req, res) => {
   // console.log("PifData")
   // console.log(req.body.data)
    const id = req.body.data.trim()

    if(id){
        const sql = 'SELECT reportname, fda_license, reportdate FROM pif_storage WHERE organization_id = ?';

        db.query(sql, [id], (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).json({ error: 'Internal Server Error' });
            } else {
                console.log('Query Result:', result);
                res.send(result)
            }
        });
    }
   else {
    res.sendStatus(0)
   }


})


//Add min call USER INFO
app.get("/api/AddminManageUser" , (req , res) => {

    const sql = 'SELECT em_fullname , 	organization_id	, status FROM employee  '
    db.query(sql , (err , result)=>{
        if(err){
            console.log(err)
        }
        else {
            res.send(result)
        }
    })
})

// Send Exp Date to user by Email
const sendEmailNotifications=() => {
    const sql = 'SELECT fda_license , email, expdate  FROM product WHERE expdate <= CURDATE() + INTERVAL 1 MONTH ';

    db.query(sql , (err , result) => {
        if(err) {
            console.error("Error ", err)
           // res.status(500).send("SomeTingWorng")
        }

        else if (result.length > 0 ){
            //console.log('Result from database :', result);
           // console.log("Ok")

                //console.log(result[0].em_email)
                //console.log(result.length)
                for(let i = 0 ; i<result.length ; i++){
                     let   message = { 
                        from: EMAIL,
                        to: result[i].em_email,
                        subject: "ใบอนุญาต อย. ใกล้หมดอายุแล้ว",
                        text: "วันหมดอายุ คือ " + result[i].expdate,
                        html: "เรียนท่านผู้ใช้ขณะนี้ระบบได้ตรวจพบว่าเลขจดแจ้งที่ "+result[i].fda_license +" หมดอายุวันที่ " + result[i].expdate,
                    };

                 sendEmail(message)
                  // console.log(message)
                }


        }
        else {
            //console.log("No expDate")
        }
    })
//})
}

const sendEmail = (message) => {

    let config = {
        host: 'smtp.gmail.com',
        port: 587 ,
        secure: false ,
        auth: {
            user: EMAIL,
            pass: PASSWORD
        }
    };

    let transporter = nodemailer.createTransport(config);

    transporter.sendMail(message)
                    .then(() => {

                        // Sending response after email is sent
                       // return res.status(201).json({ msg: "Email has been sent, and signup was successful" });
                    })
                    .catch(error => {
                       // console.error(error);
                       // return res.status(500).json({ error: "Error sending email" });
                    });
}

 //sendEmailNotifications()

// cron.schedule(' 20 9 * * *' , () => {
//     console.log("IS RUN CRON")
//     try {

//         sendEmailNotifications()

//         console.log('Email sent successfully');
//     } catch (error) {
//         console.error('Error:', error);
//     }

//     console.log('Cron job executed at:', new Date());
//     axios.get('http://localhost:3001/api/sendNotification')
//     .then((response)=>{
//         console.log("is server say :" + response.data)
//     }).catch((error) => {
//         console.error(error)
//     })
// })




app.post("/api/pifInfo" , (req , res) => {
    const email = req.body.email
    //console.log("pifInfo =>")
     //console.log(req.body.email)
     const sql = 'SELECT em_email FROM pif_storage WHERE em_email = ?'
     db.query(sql ,[email], (err , result) => {
         if(err){
            /// console.log(err)
         }
         else {
             res.send(result)
         }
     })
 })



// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, 'uploads/');
//     }, filename: function (req, file, cb) {
//         cb(null, file.originalname);
//       },
//     });
//     const upload = multer({ storage: storage });

// app.post('/api/upload-pdf' , (req , res) => {
//     const file = req.body
//     console.log(file)
// })



// io.on('connection', (socket) => {
//     console.log('User connected:', socket.id);

//     socket.on('mousemove', (data) => {
//       // Broadcast the cursor position to all connected clients
//       socket.broadcast.emit('mousemove', data);
//     });

//     socket.on('disconnect', () => {
//       console.log('User disconnected:', socket.id);
//     });
//   });


// get user Admin or S
app.get('/api/getuserTeam/', (req, res) => {

    const sql = `SELECT * FROM employee WHERE status = "U"  && organization_id = "-" `
    db.query(sql,(err, result) =>{
        //console.log(result)
        res.send(result)
    })
})

app.get('/api/getuserTeamName/', (req, res) => {

    const sql = `SELECT  no FROM employee WHERE organization_id != "" `
    db.query(sql,(err, result) =>{
        //console.log(result)
        res.send(result)
    })
})

//update S and team
app.post('/api/updateteam', (req, res) => {
    const team = req.body.data;
    const email = req.body.email;

    //console.log(team);
   // console.log(email)
    // const sql = 'UPDATE employee SET organization_id = ? , status = ?  WHERE em_email = ?';
    // db.query(sql, [team, email , "S"], (err, result) => {
    //     if (err) {
    //         console.log(err);
    //         res.status(500).send('Internal Server Error');
    //     } else {
    //         console.log(result)
    //         res.send(result);
    //     }
    // });

//     const sql = 'INSERT INTO employee organization_id = ? , status = ?  WHERE em_email = ?  ';
// db.query(sql, [ team, "S" , email], (err, result) => {
//     if (err) {
//         console.log(err);
//         res.status(500).send('Internal Server Error');
//     } else {
//         console.log(result)
//         res.send(result);
//     }
// });


const sql = 'UPDATE employee SET organization_id = ?, status = ? WHERE em_email = ?';
db.query(sql, [team, "S", email], (err, result) => {
    if (err) {
       // console.log(err);
        res.status(500).send('Internal Server Error');
    } else {
       // console.log(result);
        res.send(result);
    }
});

});

app.post('/api/updateStutus', (req, res) => {
    console.log(req.body)

    const st = req.body.st
    const no = req.body.no
    const team = req.body.team

    for(let i = 0 ; i< no.length ; i++){
        const sql = 'UPDATE employee SET organization_id = ? , status = ? WHERE no = ?';
        db.query(sql, [team,st[i] , no[i]], (err, result) => {
                if (err) {
                   // console.log(err);
                    res.status(500).send('Internal Server Error');
                } else {
                    res.send(result);
                }
             });
    }
    // console.log(team);
    // const sql = 'UPDATE employee SET organization_id = ? WHERE em_email = ?';
    // db.query(sql, [team, email], (err, result) => {
    //     if (err) {
    //         console.log(err);
    //         res.status(500).send('Internal Server Error');
    //     } else {
    //         res.send(result);
    //     }
    // });
});


app.post('/api/updateManageUser', (req, res) => {
    console.log(req.body)

    const st = req.body.st
    const no = req.body.no
    const team = req.body.team


        const sql = 'UPDATE employee SET organization_id = ? , status = ? WHERE no = ?';
        db.query(sql, [team,st , no], (err, result) => {
                if (err) {
                  //  console.log(err);
                    res.status(500).send('Internal Server Error');
                } else {
                    res.send(result);
                }
             });


});

app.post('/api/updateManageUserAdmin', (req, res) => {
    console.log(req.body)

    const st = req.body.st
    const no = req.body.no
    const team = req.body.team


        const sql = 'UPDATE employee SET organization_id = ? , status = ? WHERE no = ?';
        db.query(sql, ["-",st , no], (err, result) => {
                if (err) {
                  //  console.log(err);
                    res.status(500).send('Internal Server Error');
                } else {
                    res.send(result);
                }
             });


});





app.post('/api/getuserTeamManage', (req, res) => {
    console.log("A getTeammanage")
    //console.log(req.body.data)
    const id = req.body.data
    let ida = ""

       // console.log("is "+id[i])
        ida += id[0].organization_id

   // console.log("is a New ida : "+ida)

 // console.log(id)
    const sql = `SELECT em_fullname , no ,status FROM employee WHERE  organization_id = ? `
    db.query(sql,[ida],(err, result) =>{
      //  console.log(id)
        //console.log(result)
        res.send(result)
    })
});



app.post('/api/getuserTeamMangeByemail', (req, res) => {
   // console.log("A Email getTeammanage")
    const email = req.body.data
   // console.log(email)
    const sql = `SELECT  organization_id  FROM employee WHERE  em_email = ? `
    db.query(sql,[email],(err, result) =>{
       // console.log(result)
        res.send(result)
    })
});





//Manage User for Delete from user group and Pif
app.post('/api/getuserDelete', (req, res) => {
    //console.log("A getTeammanageDeltete")
    const id = req.body.id
    const no = req.body.data
    //console.log(req.body.data)
  // console.log(id)
   const sql = `UPDATE employee SET organization_id  = NULL , status = ?  WHERE no = ?`;
    db.query(sql , ["U",no ] ,(err , result) => {
        if(err){
            console.log(err)
        }
        else {
            console.log(result)
            res.status(200).send('delete')
        }

    })

    // const sql1 = `UPDATE pif_storage SET organization_id = NULL WHERE no = ?`;
    // db.query(sql1 , [no] , (err , result) => {
    //     if(err){
    //         console.log(err)
    //     }
    //     else {
    //         console.log(result)
    //         res.status(200).send('delete')
    //     }
    // })
});

app.post('/api/getuserDeleteAdmin', (req, res) => {
    //console.log("A getTeammanageDelteteAdmin")
    const id = req.body.id
    const no = req.body.data
   // console.log(req.body.data)
   //console.log(id)
   const sql = `DELETE FROM employee WHERE no = ?`;
    db.query(sql , [no ] ,(err , result) => {
        if(err){
            console.log(err)
        }
        else {
            console.log(result)
            res.status(200).send('delete')
        }

    })

    // const sql1 = `UPDATE pif_storage SET organization_id = NULL WHERE no = ?`;
    // db.query(sql1 , [no] , (err , result) => {
    //     if(err){
    //         console.log(err)
    //     }
    //     else {
    //         console.log(result)
    //         res.status(200).send('delete')
    //     }
    // })
});

app.post('/api/changeNameTeam' , (req , res) => {
    //console.log("changeNaem na Ja")
  //  const teamS = req.session.orid = req.body.data;
    const team = req.body.data
    const id = req.body.id

    const sql = `UPDATE employee SET organization_id = ? WHERE organization_id = ?`;
    db.query(sql , [team , id ] ,  (err , result) => {
        if(err){
            //console.log(err)
        }
        else {
            res.status(200).send('update')
        }

    })

    const sql1 = `UPDATE pif SET organization_id = ? WHERE organization_id = ?`;
    db.query(sql1 , [team , id ] ,  (err , result) => {
        if(err){
            //console.log(err)
        }
    })

    const sql2 = `UPDATE product SET organization_id = ? WHERE organization_id = ?`;
    db.query(sql2 , [team , id ] ,  (err , result) => {
        if(err){
            //console.log(err)
        }
    })

})




const storage = multer.diskStorage({
    destination:  (req, file, cb) => {
      cb(null, 'uploads/'); // Destination folder for uploaded files
    },
    filename:  (req, file, cb) => {
      // Use Date.now() to make sure the filename is unique
     
      cb(null, file.originalname+path.extname(file.originalname));
    },
  });

  const upload = multer({storage:storage})

  app.post('/upload', upload.single('image'), (req, res) => {
    res.send('File uploaded!');
  });
  




//Add product
app.post('/api/storageProduct',(req,res)=>{
    //console.log("Product")
   // console.log(req.body)

    for(let i=0 ;i<req.body.length ; i++){
        if(req.body[i]==="N/A"){
            req.body[i] === "-"
        }
    }
    const status = req.body.status
    const locationStatus = req.body.locationstatus
    const type = req.body.type
    const typeOfGoods = req.body.typeOfGoods
    const cosnameC = req.body.cosnameC
    const cosname = req.body.cosname
    const expdate = req.body.expdate
    const bodyPart = req.body.bodyPart
    const company = req.body.company
    const fcompany = req.body.fcompany
    const fda_num = req.body.fda_num
    let photo = req.body.photo
    const id = req.body.ordid
    const email = req.body.email



    //console.log(id)

    //console.log(fda_num)

    if(photo === null){
        photo = "-"
    }

    
    
    let arr = []
    const str = expdate
    arr.push(str.split("/"))
    console.log(arr)
    let year1 = parseInt(arr[0][2])-543
    let month1 = parseInt(arr[0][1])-1 
    let date1 = parseInt(arr[0][0])

    let exp = new Date(year1,month1,date1)

    console.log(exp)

    const sql = 'INSERT INTO  product (locationstatus, type, typeOfGoods, cosnameC, cosname, expdate, bodyPart, company, fcompany, fda_license, img_path , organization_id ,status , email ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)'
    db.query(sql , [locationStatus,type,typeOfGoods,cosnameC,cosname,exp,bodyPart,company,fcompany,fda_num,"-",id,"0" , email] ,(err , result)=>{
        if(err) {
            //console.log(err)
        }
        else {
            res.send("OK")
        }
    })
  
      
})

//Delete Product from Productlist
app.post('/api/userDeleteProduct' , (req,res)=>{
    //console.log("No...")
    const id = req.body.id
    const no =req.body.data
    const fda = req.body.fda_num
    const status = req.body.status
    console.log("is all data from userdeleteProduct",req.body)

    const sql = 'DELETE FROM product WHERE fda_license = ? AND organization_id = ? '
    db.query(sql,[fda , id],(error , result)=>{
        if(error){
            //console.log(error)
        }
        else{
            res.status(200).send("DELETEED")
        }
    })

    if(status === "1"){
        const sql1 = 'DELETE FROM pif WHERE fda_license = ?'
        db.query(sql1,[fda] ,(error , result) =>{
            if(error){
                //console.log(error)
            }
            else{
                res.status(200).send("DELETEED")
            }
        } )

    }

   
})

app.post('/api/DeleteGroupName', (req, res) => {
    const email = req.body.email;
    const groupName = req.body.groupName;

    const sql = 'DELETE FROM chemicalgroup WHERE email = ? AND groupname = ?';
    db.query(sql, [email, groupName], (err, result) => {
        if (err) {
            //console.log(err);
            res.status(500).send("Internal Server Error");
        } else {
            //console.log(result);
            res.send("Delete");
        }
    });
});

app.post('/api/sort', (req , res) => {
    const id = req.body.id
    const con = req.body.con

    if(con === "1"){
        const sql = 'SELECT * FROM product WHERE organization_id = ? ORDER BY expdate DESC'
        db.query(sql , [id], (err , result) => {
            if (err){
                //console.log("Error " , err)
            }
            else {
                //console.log(result)
                res.send(result)
            }
        })
    }

    if(con === "2"){
        const sql = 'SELECT * FROM product WHERE organization_id = ? ORDER BY expdate ASC'
        db.query(sql , [id], (err , result) => {
            if (err){
                //console.log("Error " , err)
            }
            else {
                //console.log(result)
                res.send(result)
            }
        })
    }

    if(con === "3"){
        const sql = 'SELECT * FROM product WHERE organization_id = ? ORDER BY cosname ASC'
        db.query(sql , [id], (err , result) => {
            if (err){
              //console.log("Error " , err)
            }
            else {
                //console.log(result)
                res.send(result)
            }
        })
    }

    if(con === "4"){
        const sql = 'SELECT * FROM product WHERE organization_id = ? ORDER BY cosname DESC'
        db.query(sql , [id], (err , result) => {
            if (err){
                //console.log("Error " , err)
            }
            else {
               // console.log(result)
                res.send(result)
            }
        })
    }
})


app.post('/api/getnotficationPIF' , (req , res) => {
    const id = req.body.data

    
})


app.listen(3001, () => {
    console.log('Running node at port 3001');
})
