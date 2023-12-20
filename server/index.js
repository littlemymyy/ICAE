const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const fs = require('fs').promises;
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
const {EMAIL , PASSWORD} = require('./env.js')
const PDFMerger = require('pdf-merger-js');
const jwt = require('jsonwebtoken');
const cron = require('node-cron');
const { error } = require('console');

const app = express();
const secret = 'sirirat';

app.use(bodyParser.json({limit: '35mb'}));
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true , limit : "35mb" , parameterLimit : 50000 }));
app.use('/uploads', express.static('uploads'));

// create PDF FOR PIF
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'cosmetic'
});
// const db = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'cosmetic'
// });

const pdfStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename:  ( req, file, cb ) => {
        console.log(file)
        cb( null, Date.now() + '-' + file.originalname);
    }
});

const pdfUpload = multer({ storage: pdfStorage });

//unused
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
app.post('/api/mergePdf_old', pdfUpload.any(), (req, res) => {
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

app.post('/api/savePdf', pdfUpload.any(), (req, res) => {
    const merger = new PDFMerger();

    //for file
    const files = req.files;
    console.log(files);
    let pdfPath = [];
    console.log("\n\n")

    for (let i = 0; i < 14; i++) {
        files.forEach(file => {
            if (file.fieldname.toString() === `file${i+1}`) {
                pdfPath.push(file.path.toString());
        }});

        if (pdfPath[i] === undefined) {
            pdfPath.push(null);
        }
    }

    let img_path = null;
    let pdf_path = null;

    for (let i = 0; i < files.length; i++){
        if (files[i].mimetype === 'image/jpeg' || files[i].mimetype === 'image/png') {
            console.log("photo")
            console.log(files[i].path.toString())
            img_path = files[i].path.toString();
        }
    }

    let bodyData = JSON.parse(req.body.data);

    console.log("start execute")
    db.execute(
        'SELECT COUNT(*) FROM pif WHERE product_id = ?',
        [bodyData.product_id],
        (err, result) => {
            if(err) {
                res.status(500).send('Internal Server Error');
                console.log('err-1' + err);
                return;
            }
            if(result[0]['COUNT(*)'] === 0) {
                console.log("RUN ON IT")
                console.log (bodyData.product_id, bodyData.email,bodyData.file_name, img_path, pdf_path, bodyData.expdate, new Date())
                db.execute(
                    `INSERT INTO pif (product_id, email, file_name, img_path, pdf_path, expdate, create_when,
                        file1_path, file2_path, file3_path, file4_path, file5_path, file6_path, file7_path, file8_path,
                        file9_path, file10_path, file11_path, file12_path, file13_path, file14_path,file1_exp,
                        file2_exp, file3_exp, file4_exp, file5_exp, file6_exp, file7_exp, file8_exp, file9_exp, file10_exp,
                        file11_exp, file12_exp, file13_exp, file14_exp)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
                    , [bodyData.product_id, bodyData.email,bodyData.file_name, img_path || null, pdf_path, bodyData.expdate,  new Date(),
                        pdfPath[0] || null, pdfPath[1]|| null, pdfPath[2]|| null, pdfPath[3]|| null, pdfPath[4]|| null, pdfPath[5]|| null, pdfPath[6]|| null, pdfPath[7]|| null,
                        pdfPath[8]|| null, pdfPath[9]|| null, pdfPath[10]|| null, pdfPath[11]|| null, pdfPath[12]|| null, pdfPath[13]|| null, bodyData.file1_exp|| null,
                        bodyData.file2_exp|| null, bodyData.file3_exp|| null, bodyData.file4_exp|| null, bodyData.file5_exp|| null, bodyData.file6_exp|| null,
                        bodyData.file7_exp|| null, bodyData.file8_exp|| null, bodyData.file9_exp|| null, bodyData.file10_exp|| null, bodyData.file11_exp|| null,
                        bodyData.file12_exp|| null, bodyData.file13_exp||null, bodyData.file14_exp|| null],
                    (err, result) => {
                        if(err) {
                            console.log('err-2 ' + err);
                            res.status(500).send('Internal Server Error');
                            return;
                        }
                        else {
                            db.execute(
                                'UPDATE pif_product SET pif_status = ?, fda_license = ? , product_name = ?, cosmetic_name = ?, cosmetic_type = ?, create_date = ?, expire_date = ?, cosmetic_reason = ?, cosmetic_physical = ?, company_name = ?, company_eng_name = ?, more_info = ? WHERE id = ?',
                                [bodyData.pif_status, bodyData.fda_license, bodyData.product_name, bodyData.cosmetic_name, bodyData.cosmetic_type, bodyData.create_date, bodyData.expire_date, bodyData.cosmetic_reason, bodyData.cosmetic_physical, bodyData.company_name, bodyData.company_eng_name, bodyData.more_info, bodyData.product_id],
                                (err, result) => {
                                    if(err) {
                                        res.status(500).send('Internal Server Error');
                                        console.log('err-3 ' + err);
                                        console.log(bodyData.pif_status, bodyData.fda_license, bodyData.product_name, bodyData.cosmetic_name, bodyData.cosmetic_type, bodyData.create_date, bodyData.expire_date, bodyData.cosmetic_reason, bodyData.cosmetic_physical, bodyData.company_name, bodyData.company_eng_name, bodyData.more_info, bodyData.product_id)
                                        return;
                                    }
                                    else {
                                        console.log("THIS NEW LATEST")
                                        res.status(200).send('latest_ok');
                                    }
                                }
                            )
                        }
                    }
                )
            }
            else {
                //set new expdate
                for (let i = 0; i < 14; i++) {
                    if (bodyData[`file${i+1}_exp`] !== "") {
                        db.execute(
                            `UPDATE pif SET file${i+1}_exp = ? WHERE product_id = ?`,
                            [bodyData[`file${i+1}_exp`], bodyData.product_id],
                            (err, result) => {
                                if(err) {
                                    res.status(500).send('Internal Server Error');
                                    console.log('err-4 ' + err);
                                    return;
                                }
                            }
                        )
                    }
                }
                //remove old file
                for (let i = 0; i < 14; i++) {
                    if (bodyData[`pdfFile${i+1}`] === "") {
                        db.execute(
                            `UPDATE pif SET file${i+1}_path = null, file${i+1}_exp = null WHERE product_id = ?`,
                            [bodyData.product_id],
                            (err, result) => {
                                if(err) {
                                    res.status(500).send('Internal Server Error');
                                    console.log('err-5 ' + err);
                                    return;
                                }
                            }
                        )
                    }
                }
                //img_path
                if (img_path !== null) {
                    db.execute(
                        'UPDATE pif SET img_path = ? WHERE product_id = ?',
                        [img_path, bodyData.product_id],
                        (err, result) => {
                            if(err) {
                                res.status(500).send('Internal Server Error');
                                console.log('err-6 ' + err);
                                return;
                            }
                            else{
                                console.log("added img_path")
                                console.log(img_path)
                            }
                        }
                    )
                }
                db.execute(
                    'UPDATE pif SET file_name = ?, expdate = ? WHERE product_id = ?',
                    [bodyData.file_name, bodyData.expdate, bodyData.product_id],
                    (err, result) => {
                        if(err) {
                            res.status(500).send('Internal Server Error');
                            console.log('err-5 ' + err);
                            return;
                        } else{
                            console.log("added img_path")
                            console.log(img_path)
                        }
                    }
                )
                db.execute(
                    'UPDATE pif_product SET pif_status = ?, fda_license = ? , product_name = ?, cosmetic_name = ?, cosmetic_type = ?, create_date = ?, expire_date = ?, cosmetic_reason = ?, cosmetic_physical = ?, company_name = ?, company_eng_name = ?, more_info = ? WHERE id = ?',
                    [bodyData.pif_status, bodyData.fda_license, bodyData.product_name, bodyData.cosmetic_name, bodyData.cosmetic_type, bodyData.create_date, bodyData.expire_date, bodyData.cosmetic_reason, bodyData.cosmetic_physical, bodyData.company_name, bodyData.company_eng_name, bodyData.more_info, bodyData.product_id],
                    (err, result) => {
                        if(err) {
                            res.status(500).send('Internal Server Error');
                            console.log('err-6 ' + err);
                            return;
                        }
                    }
                )
                files.forEach(file => {
                    if (file.mimetype === 'application/pdf') {
                        let fileExp = file.fieldname.toString() + '_exp';
                        console.log(bodyData.expdate, new Date(), file.path.toString(),fileExp, bodyData.product_id)
                        db.execute(
                            `UPDATE pif SET ${file.fieldname.toString()}_path = '${file.path.toString()}' WHERE product_id = ?`,
                            [bodyData.product_id],
                            (err, result) => {
                                if(err) {
                                    res.status(500).send('Internal Server Error');
                                    console.log('err-7 ' + err);
                                    return;
                                }
                                else {
                                    console.log("added pdf_path")
                                }
                            }
                        )
                    }
                })
                res.status(200).send('latest_ok');
            }
        });

    console.log(pdfPath);
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


            db.query('INSERT INTO pif (email, file_name, img_path, pdf_path, expdate, rec_create_when) VALUES (?,?,?,?,?,?)',
                [data.email, data.filename, img_path, pdf_path, data.expdate, new Date()],
                (err, result) => {
                if(err) {
                    console.log(err)
                    res.json({status: "error", message: err});
                    return;
                }
                else {
                    res.json({status: "ok", pdf_path: pdf_path, img_path: img_path});
                }
            })
        })()
    } catch (error) {
        console.error('Error merging PDFs:', error);
        res.status(500).send('Internal Server Error');
    }
})


//// for now i not have Edit that this /api/submitPifEdit
app.post('/api/submitPifEdit', pdfUpload.any(), (req, res) => {
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


app.get('/api/getPifByID', jsonParser, (req, res) => {
    db.execute(
        'SELECT * FROM pif WHERE product_id = ?',
        [req.query.product_id],
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







app.post('/api/pifData', (req, res) => {

    const id = req.body.id
    const fda = req.body.fda
    const sql = 'SELECT * FROM pif WHERE organization_id = ? AND fda_license = ?';
    const values = [id, fda];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error(err);
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
        console.log(i + " " + data[i].cas);
        const sql = 'INSERT INTO chemical(cas, cname, per, st, info, eff, img) VALUES(?,?,?,?,?,?,?);'
        db.query(sql,[data[i].cas, data[i].cname, data[i].per, data[i].st, data[i].info, data[i].eff , data[i].img] , (err, result)=>{
            console.log(result)
        })
    }
    res.send('OK');
})


/////////////////////////////////////////////////////////////////
// ADMIN / USER LOGING

app.post('/api/authen', jsonParser , function (req, res, next) {
    try {
        var checktoken = req.headers.authorization.split(' ')[1];
        var decoded = jwt.verify(checktoken, secret);
        res.json({status:'ok', decoded});
    } catch(err){
        res.json({status:'error', message: err.message});
    }
})

app.post('/api/getUser/', jsonParser, (req, res) => {
    const email = req.body.email;
    const password = crypto.createHash("sha1").update(req.body.password).digest("hex")
    console.log(email + " " + password)
    const sql = `SELECT em_fullname,em_icon , status , organization_id , em_email FROM employee WHERE em_email = '${email}' AND em_pass = '${password}' `
    db.query(sql,(err, result) =>{
        if(err) {
            console.log(err)
        }
        else if(result.length === 0){
            console.log("Login failed")
            res.json({status: 'error' , message: 'login failed'});
        }
        else {
            console.log(result)
            var token = jwt.sign({ userid: result[0].em_email }, secret , { expiresIn: '3h'}); //create token
            res.json({status: 'ok' , message: 'login success', result: result, token: token });
        }

        // if(result.length>0){
        //     try{
        //     let config = {
        //         host: 'smtp.gmail.com',
        //         port: 587 ,
        //         secure: false ,
        //         auth: {
        //             user: EMAIL,
        //             pass: PASSWORD
        //         }
        //     };

        //     let transporter = nodemailer.createTransport(config);

        //     let message = {
        //         from: EMAIL,
        //         to: email,
        //         subject: "ICAE LOGIN ",
        //         text: "LOING",
        //         html: "",
        //     };

        //     transporter.sendMail(message)
        //         .then(() => {
        //             // Sending response after email is sent
        //            // return res.status(201).json({ msg: "Email has been sent, and signup was successful" });
        //         })
        //         .catch(error => {
        //             console.error(error);
        //            /// return res.status(500).json({ error: "Error sending email" });
        //         });
        //     }catch(err){
        //         console.log(err)
        //     }
        // }

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

// Addmin upload data to database by hand
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

// user singUp
app.post('/api/setsignUp' , jsonParser, async (req , res ) => {
    const firstName = req.body.firstname
    const lastName = req.body.lastname
    const email = req.body.email
    console.log(req.body)
    const password = crypto.createHash("sha1").update(req.body.password).digest("hex")
    const repassword = req.body.repassword
    const fullname = firstName +" "+lastName

    console.log(fullname + " " + email + " " + password +" " + repassword)

    const sql = `INSERT INTO  employee(em_email , em_fullname , em_icon , em_pass , status ) VALUES(?,?,?,?,?);  `
    db.query(sql,[email , fullname ,"/pandaU.png" , password , "U" ] , (err, result) => {
       console.log("singup :")
       console.log(result)
       if(err) {
        console.error(err)
        return res.status(500).json({error: "have someing worng"})
       }
       else {
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
            subject: "Welcome to ICAE",
            text: "Welcome to ICAE,\n\n Thank you for registering with us.",
            html: `
            <body style="font-family: 'Arial', sans-serif; background-color: #f4f4f4; color: #333; text-align: center; padding: 20px;">
                <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
                    <h1 style="color: #007bff;">Welcome to ICAE</h1>
                    <p style="font-size: 16px;">Thank you for registering with us.</p><br><br><br>
                    <p style="font-size: 14px; color: #555;">Regards,</p>
                    <p style="font-size: 14px; color: #555;">ICAE Team</p>
                </div>
            </body>
            `,
        };

        transporter.sendMail(message)
         res.status(200).json({message: "signIn OK"})
       }
    })
})

//Check sign up Email dupicate
app.post('/api/checkMail',(req,res)=>{
    const email = req.body.email

    const sql = "SELECT em_email FROM employee WHERE em_email = ?"
    db.query(sql , [email] , (err , result)=>{
        if(err) {
            console.log(err)
        }
        else {
            if(result.length > 0 ){
                res.send("Dupicate")
            }
            else if(result.length <=0) {
                res.send("not-Dupicate")
            }
            console.log(result)

        }
    })


})

app.get('/api/getChemicalByGroup', jsonParser, (req, res) => {
    db.execute(
        `select
        G.groupname,
        G.per1,
        G.email,
        G.udate,
        G.uname,
        G.fillterg,
        C.*
        from
            chemicalgroup G
        LEFT JOIN chemical C ON G.cname = C.cname AND G.cmname = C.cmname
        WHERE G.groupname = ?`,
        [req.query.groupname], (err, result) => {
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
        }

    )}
);

app.get('/api/getAllChemical', jsonParser, (req, res) => {
    db.execute(
        'SELECT * FROM chemical',
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

app.get('/api/getChemicalByCas', jsonParser, (req, res) => {
    db.execute(
        'SELECT * FROM chemical WHERE cas = ?',
        [req.query.cas],
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

//Show data by fillter data
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

app.get('/api/get_history', jsonParser, (req, res) => {
    db.execute(
        'SELECT * FROM chemicalgroup WHERE groupname = ? AND email = ?',
        [req.query.groupname, req.query.email],
        (err, result) => {
            if(err) {
                res.json({status:'error',message:err});
                return;
            }
            if(result.length > 0) {
                res.json({status:'ok',message:'haveData'})
            }
            else {
                res.json({status:'error',message:'noData'});
            }
        })
})

// save file from user check
app.post('/api/savefile' , (req , res) => {
    console.log("saveFile from data ")
     console.log(req.body)
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
    console.log(req.body.email)
    let str = ""
    for(let i = 0 ; i< fillterg.length ; i++){
        str+=fillterg[i]+","

    }

    let newstr = str.substring(0,str.length-1)

    console.log(newstr)

    db.execute(
        `DELETE FROM chemicalgroup WHERE groupname = ?`,
        [gname],
        (err, result) => {
            if(err) {
                res.json({status:'error',message:err});
                return;
            }
            else {
                console.log("delete")
                for( let i = 0 ; i < dd.length ; i++ ){
                    console.log("DATA")
                    console.log (dd[i].cas , dd[i].cname , dd[i].cmname , dd[i].per , dd[i].st , "-" , "-" , dd[i].bodypart , dd[i].color , gname , dd[i].per1 , uname , date , newstr , email)
                    db.execute(
                        `INSERT INTO chemicalgroup (cas , cname , cmname , per , st , img , des, bodypart , color , groupname , per1 , uname , udate , fillterg , email) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`
                        , [dd[i].cas , dd[i].cname , dd[i].cmname , dd[i].per , dd[i].st , "-" , "-" , dd[i].bodypart , dd[i].color , gname , dd[i].per1 , uname , date , newstr , email],
                        (err, result) => {
                            if(err) {
                                res.json({status:'error',message:err});
                                return;
                            }
                            else {
                                console.log("inserted : " + dd[i].cas)
                            }
                        }
                    )
                }
                res.json({status:'ok',message:'inserted'});
            }
    })
})

// get user file name
app.post('/api/getGroupName',(req,res)=>{
    console.log(req.body)
    const email = req.body.email
    const sql = 'SELECT DISTINCT groupname, udate FROM chemicalgroup WHERE email = ? ORDER BY udate ASC';
    // Assuming you're using a database library with support for parameterized queries
    db.query(sql, [email], (err, result) => {
      if (err) throw err;
      // Process the query result
      else {
        res.send(result)
      }
      console.log(result);
    });
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
        console.log(result);
        res.send(result)
    })

})

//get data for admin edit
app.post('/api/getalldataAddminEdit' , (req , res ) => {
    const no = req.body.no
    const sql =  'SELECT * FROM chemical WHERE no ='+ no
    db.query(sql , (err , result) => {
        console.log(result);
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
    console.log( [cas , cmname , per , st , des , no ] );
    //            UPDATE chemical SET cas=?,cmname=?,per=?,st=?,des=? WHERE no = ?
    const sql =  'UPDATE chemical set cas = ? , cmname = ? , per = ? , st = ? , des = ? WHERE no = ? '

    db.query(sql , [cas , cmname , per , st , des , no ] , (err , result) => {
        console.log(result);
        res.send(result)
     })

})

//change annex when admin chose
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
          console.log(result.affectedRows + " record(s) updated");
        });

    }
    res.json({status:'ok'})

})

// show annex
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

// Get data from FDA
app.get('/api/fetchData', async (req, res) => {
    const fda = req.query.data;

    try {
      const response = await fetch('http://pertento.fda.moph.go.th/FDA_SEARCH_CENTER/PRODUCT/export_cmt_detail.aspx?regnos='+fda);
      const data = await response.text();
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
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
    }
});

// get user Admin or S
app.get('/api/getuserAs/', (req, res) => {

    const sql = `SELECT * FROM employee WHERE status = "A" OR status = "S"  `
    db.query(sql,(err, result) =>{
        console.log(result)
        res.send(result)
    })
})

// delete user by addmin or S
app.post('/api/deluserAS' , (req , res) => {
    const no = req.body.data
    console.log(no)

    const sql = 'DELETE FROM `employee` WHERE no = ' + no
    db.query(sql,(err, result) =>{
        console.log(result)
        res.send(result)
    })
})

//send Notification Index Page
app.post('/api/sendNotification' , (req,res) => {
    console.log("send Notification")

   console.log(req.body)
   const orid = req.body.orid
   if(orid === "-" || orid === null){
    res.status(200).send('Notthing' );
   }
   else {
    console.log("that else")
   const sql = 'SELECT  fda_license, expire_date FROM pif_product WHERE expire_date <= CURDATE() + INTERVAL 1 MONTH AND organization_id = ?';

    db.query(sql , [orid], (err , result) => {
        if (err){
            console.log("go that now")
            console.log("Error " , err)
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
          console.log(data)
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
                console.log(err);
                res.status(500).json({ error: 'Internal Server Error' });
            } else {
                console.log('Query Result:', result);
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
    console.log("PifData")
    console.log(req.body.data)
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

    const sql = 'SELECT em_fullname ,em_email, 	organization_id	, status FROM employee  '
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
    const sql0 = 'SELECT organization_id ,fda_license,expire_date FROM pif_product WHERE expire_date <= CURDATE() + INTERVAL 1 MONTH '
    //const sql = 'SELECT fda_license ,email, expdate  FROM pif_product WHERE expdate <= CURDATE() + INTERVAL 1 MONTH ';
    const sql1 = 'SELECT em_email FROM employee WHERE organization_id = ?';

    let organization_id = []
    let email = []
    db.query (sql0, (err, result) => {
        if (err) {
          console.log(err);
        } else if (result.length > 0) {
          console.log("Organization IDs =>", result);

          // Extract and store organization_ids
          organization_id = result.map(row => row.organization_id);

          console.log(organization_id , "orid send Email")

          // Iterate through organization_ids and query emails
          organization_id.forEach(orgId => {
            db.query(sql1, [orgId], (err, emailResult) => {
              if (err) {
                console.log("Error", err);
              } else if  (emailResult.length > 0) {
                 email = emailResult.map(row => row.em_email);

                 email.forEach(mail =>{
                    db.query(sql0, (err , result) => {
                        if(err) {
                            console.error("Error ", err)
                           // res.status(500).send("SomeTingWorng")
                        }
                
                        else if (result.length > 0 ){
                            console.log('Result from database :', result);
                            console.log("Ok")
                
                                //console.log(result[0].em_email)
                                //console.log(result.length)
                                for(let i = 0 ; i<result.length ; i++){
                                     let   message = {
                                        from: EMAIL,
                                        to: mail,
                                        subject: "ใบอนุญาต อย. ใกล้หมดอายุแล้ว วันหมดอายุ คือ " + result[i].expire_date ,
                                        text: "วันหมดอายุ คือ " + result[i].expire_date,
                                        html: `
                                        <body style="font-family: 'Arial', sans-serif; background-color: #f4f4f4; color: #333; text-align: center; padding: 20px;">
                                            <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
                                                <h1 style="color: #007bff;">ICAE Alert</h1>
                                                <p style="font-size: 16px;">เรียนท่านผู้ใช้ขณะนี้ระบบได้ตรวจพบว่าเลขจดแจ้งที่ ${result[i].fda_license} </p><br><br><br>
                                               <p style="font-size: 16px;">จะหมดอายุภายในวันที่ ${result[i].expire_date} </p><br>
                                               <a href="https://privus.fda.moph.go.th/" style="color: #007bff; text-decoration: none;">
                                               คลิกที่นี่เพิ่อไปยังเว็บ อย. เพื่อต่ออายุเครื่องสำอางของท่าน
                                             </a>
                                             <br/>
                                             <a href="https://privus.fda.moph.go.th/" style="color: #007bff; text-decoration: none;">
                                             คลิกที่นี่เพิ่อไปยังเว็บ ICAE เพื่อจัดรายการเอกสาร PIF ของท่าน
                                           </a>
                                               <br><br>
                                               <p style="font-size: 14px; color: #555;">Regards,</p>
                                                <p style="font-size: 14px; color: #555;">ICAE Team</p>
                                            </div>
                                        </body>`
                
                                       // emailBody
                                        ,
                                    };
                
                
                                 sendEmail(message)
                                   console.log(message)
                                }
                
                        }
                        else {
                            console.log("No expDate")
                        }
                    })
                 })
                console.log("Emails =>", email);
               email.push(email);
              }
            });
          });
        }
      });

  console.log(email,"email")

    // db.query(sql, (err , result) => {
    //     if(err) {
    //         console.error("Error ", err)
    //        // res.status(500).send("SomeTingWorng")
    //     }

    //     else if (result.length > 0 ){
    //         console.log('Result from database :', result);
    //         console.log("Ok")

    //             //console.log(result[0].em_email)
    //             //console.log(result.length)
    //             for(let i = 0 ; i<result.length ; i++){
    //                  let   message = {
    //                     from: EMAIL,
    //                     to: email[i],
    //                     subject: "ใบอนุญาต อย. ใกล้หมดอายุแล้ว วันหมดอายุ คือ " + result[i].expdate ,
    //                     text: "วันหมดอายุ คือ " + result[i].expdate,
    //                     html: `
    //                     <body style="font-family: 'Arial', sans-serif; background-color: #f4f4f4; color: #333; text-align: center; padding: 20px;">
    //                         <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
    //                             <h1 style="color: #007bff;">ICAE Alert</h1>
    //                             <p style="font-size: 16px;">เรียนท่านผู้ใช้ขณะนี้ระบบได้ตรวจพบว่าเลขจดแจ้งที่ ${result[i].fda_license} </p><br><br><br>
    //                            <p style="font-size: 16px;">จะหมดอายุภายในวันที่ ${result[i].expdate} </p><br>
    //                            <a href="https://privus.fda.moph.go.th/" style="color: #007bff; text-decoration: none;">
    //                            คลิกที่นี่เพิ่อไปยังเว็บ อย. เพื่อต่ออายุเครื่องสำอางของท่าน
    //                          </a>
    //                          <br/>
    //                          <a href="https://privus.fda.moph.go.th/" style="color: #007bff; text-decoration: none;">
    //                          คลิกที่นี่เพิ่อไปยังเว็บ ICAE เพื่อจัดรายการเอกสาร PIF ของท่าน
    //                        </a>
    //                            <br><br>
    //                            <p style="font-size: 14px; color: #555;">Regards,</p>
    //                             <p style="font-size: 14px; color: #555;">ICAE Team</p>
    //                         </div>
    //                     </body>`

    //                    // emailBody
    //                     ,
    //                 };


    //              sendEmail(message)
    //                console.log(message)
    //             }

    //     }
    //     else {
    //         console.log("No expDate")
    //     }
    // })
//})
}

const sendEmailNotificationsFile=() => {
    const sql0 = 'SELECT organization_id FROM product WHERE expdate <= CURDATE() + INTERVAL 1 MONTH '
    const sql = 'SELECT fda_license ,email, expdate  FROM pif WHERE file1_exp <= CURDATE() + INTERVAL 1 MONTH OR file2_exp <= CURDATE() + INTERVAL 1 MONTH OR file3_exp <= CURDATE() + INTERVAL 1 MONTH OR file4_exp <= CURDATE() + INTERVAL 1 MONTH OR file5_exp <= CURDATE() + INTERVAL 1 MONTH OR file6_exp <= CURDATE() + INTERVAL 1 MONTH OR file7_exp <= CURDATE() + INTERVAL 1 MONTH OR file8_exp OR file9_exp <= CURDATE() + INTERVAL 1 MONTH OR file10_exp <= CURDATE() + INTERVAL 1 MONTH OR file11_exp <= CURDATE() + INTERVAL 1 MONTH file12_exp <= CURDATE() + INTERVAL 1 MONTH OR file13_exp <= CURDATE() + INTERVAL 1 MONTH OR file14_exp <= CURDATE() + INTERVAL 1 MONTH  ';
    const sql1 =  'SELECT  em_email FROM employee WHERE organization_id = ?';

    let organization_id = []
    let email = []
    db.query (sql0, (err, result) => {
        if (err) {
          console.log(err);
        } else if (result.length > 0) {
          console.log("Organization IDs =>", result);

          // Extract and store organization_ids
          organization_id = result.map(row => row.organization_id);

          // Iterate through organization_ids and query emails
          organization_id.forEach(orgId => {
            db.query(sql1, [orgId], (err, emailResult) => {
              if (err) {
                console.log("Error", err);
              } else if  (emailResult.length > 0) {
                 email = emailResult.map(row => row.em_email);
                console.log("Emails =>", email);
               
              }
            });
          });
        }
      });

  console.log(email,"email")

    db.query(sql, (err , result) => {
        if(err) {
            console.error("Error ", err)
           // res.status(500).send("SomeTingWorng")
        }

        else if (result.length > 0 ){
            console.log('Result from database :', result);
            console.log("Ok")

                //console.log(result[0].em_email)
                //console.log(result.length)
                for(let i = 0 ; i<result.length ; i++){
                     let   message = {
                        from: EMAIL,
                        to: email[i],
                        subject: "เอกสารบางอย่างใน PIF จะหมดอายุวันหมดอายุในอีก 30 วัน "  ,
                        text: "โปรตรวจสอบเอกสาร PIF ของคุณ",
                        html: `
                        <body style="font-family: 'Arial', sans-serif; background-color: #f4f4f4; color: #333; text-align: center; padding: 20px;">
                            <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
                                <h1 style="color: #007bff;">ICAE Alert</h1>
                                <p style="font-size: 16px;">เรียนท่านผู้ใช้ขณะนี้ระบบได้ตรวจพบว่ามีเอกสารหมดอายุขอให้ท่านไปแก้ไขเอกสารด้วยค่ะ  </p><br><br><br>

                             <br/>
                             <a href="https://privus.fda.moph.go.th/" style="color: #007bff; text-decoration: none;">
                             คลิกที่นี่เพิ่อไปยังเว็บ ICAE เพื่อจัดรายการเอกสาร PIF ของท่าน
                           </a>
                               <br><br>
                               <p style="font-size: 14px; color: #555;">Regards,</p>
                                <p style="font-size: 14px; color: #555;">ICAE Team</p>
                            </div>
                        </body>`

                       // emailBody
                        ,
                    };


                 sendEmail(message)
                   console.log(message)
                }

        }
        else {
            console.log("No expDate")
        }
    })
//})
}

//send Email Function
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
                        console.error(error);
                       // return res.status(500).json({ error: "Error sending email" });
                    });
}

//sendEmailNotifications()
 cron.schedule(' 07 15 * * *' , () => {
    try {
         sendEmailNotifications()
        // sendEmailNotificationsFile()

     } catch (error) {
         console.error('Error:', error);
      }

//     console.log('Cron job executed at:', new Date());
//     axios.get(process.env.NEXT_PUBLIC_API_BASE_URL+'/sendNotification')
//     .then((response)=>{
//         console.log("is server say :" + response.data)
//     }).catch((error) => {
//         console.error(error)
//     })
 })

    


app.post("/api/pifInfo" , (req , res) => {
    const email = req.body.email
    //console.log("pifInfo =>")
     //console.log(req.body.email)
     const sql = 'SELECT em_email FROM pif_storage WHERE em_email = ?'
     db.query(sql ,[email], (err , result) => {
         if(err){
             console.log(err)
         }
         else {
             res.send(result)
         }
     })
 })

 app.post("/getnotficationPIF" , (req , res)=>{
    const sql = 'SELECT fda_license ,email, expdate  FROM product WHERE file1_exp <= CURDATE() + INTERVAL 1 MONTH OR file2_exp <= CURDATE() + INTERVAL 1 MONTH OR file3_exp <= CURDATE() + INTERVAL 1 MONTH OR file4_exp <= CURDATE() + INTERVAL 1 MONTH OR file5_exp <= CURDATE() + INTERVAL 1 MONTH OR file6_exp <= CURDATE() + INTERVAL 1 MONTH OR file7_exp <= CURDATE() + INTERVAL 1 MONTH OR file8_exp OR file9_exp <= CURDATE() + INTERVAL 1 MONTH OR file10_exp <= CURDATE() + INTERVAL 1 MONTH OR file11_exp <= CURDATE() + INTERVAL 1 MONTH file12_exp <= CURDATE() + INTERVAL 1 MONTH OR file13_exp <= CURDATE() + INTERVAL 1 MONTH OR file14_exp <= CURDATE() + INTERVAL 1 MONTH  ';


 })


app.get('/api/getTeam/', (req, res) => {
    try{
        const sql = `SELECT DISTINCT organization_id FROM employee WHERE organization_id != ''`
        db.query(sql,(err, result) =>{
            //console.log(result)
            res.send(result)
        })
    }
    catch(err){
        console.log(err)
    }
})


//update S and team
app.post('/api/updateteam', (req, res) => {
    const team = req.body.data;
    const email = req.body.email;

    console.log(team);
    console.log(email)

const sql = 'UPDATE employee SET organization_id = ?, status = ? WHERE em_email = ?';
db.query(sql, [team, "S", email], (err, result) => {
    if (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    } else {
        console.log(result);
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
                    console.log(err);
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
                    console.log(err);
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
                    console.log(err);
                    res.status(500).send('Internal Server Error');
                } else {
                    res.send(result);
                }
             });


});

app.get('/api/getStatusByEmail', (req, res) => {
    db.execute(
        `SELECT no, status FROM employee WHERE em_email = ?`,
        [req.query.email],
        (err, result) => {
            if(err) {
                console.log(err);
                res.json({status:'error',message: err});
            }
            else {
                res.json({status:'ok',message: result})
            }
        }
    )
});

app.get('/api/getStatusByNo', (req, res) => {
    db.execute(
        `SELECT status FROM employee WHERE no = ?`,
        [req.query.no],
        (err, result) => {
            if(err) {
                console.log(err);
                res.json({status:'error',message: err});
            }
            else {
                res.json({status:'ok',message: result})
            }
        }
    )
});

app.get('/api/getuserTeamManage', (req, res) => {
    db.execute(
        `SELECT em_fullname , no ,status FROM employee WHERE  organization_id = ?`,
        [req.query.id],
        (err, result) => {
            if(err) {
                console.log(err);
                res.json({status:'error',message: err});
            }
            else {
                res.json({status:'ok',message: result})
            }
        }
    )
});

app.get('/api/getCountOwner', (req, res) => {
    db.execute(
        `SELECT COUNT(*) as num FROM employee WHERE status = 'S' AND organization_id = ?`,
        [req.query.id],
        (err, result) => {
            if(err) {
                console.log(err);
                res.json({status:'error',message: err});
            }
            else {
                res.json({status:'ok',message: result})
            }
        }
    )
});

app.get('/api/getCountTeam', jsonParser, (req, res) => {
    db.execute(
        `SELECT COUNT(*) as num FROM employee WHERE organization_id = ?`,
        [req.query.team],
        (err, result) => {
            if(err) {
                console.log(err);
                res.json({status:'error',message: err});
            }
            else {
                res.json({status:'ok',message: result})
            }
        }
    )
});

app.get('/api/getuserTeamMangeByemail', (req, res) => {
   db.execute(
    `SELECT  organization_id FROM employee WHERE em_email = ?`,
    [req.query.email],
    (err, result) => {
        if(err) {
            console.log(err);
            res.json({status:'error',message: err});
        }
        else {
            res.json({status:'ok',message: result})
        }
    }
   )
});

app.get('/api/getUserNoTeam', (req, res) => {
    db.execute(
        `SELECT em_fullname , no ,status FROM employee WHERE  organization_id IS NULL`,
        (err, result) => {
            if(err) {
                console.log(err);
                res.json({status:'error',message: err});
            }
            else {
                res.json({status:'ok',message: result})
            }
        }
    )
});

app.post('/api/addUserToTeam', (req, res) => {
    console.log(req.body)
    db.execute(
        `UPDATE employee SET organization_id = ?, status = 'U2' WHERE no = ?`,
        [req.body.team, req.body.no],
        (err, result) => {
            if(err) {
                console.log(err);
                res.json({status:'error',message: err});
            }
            else {
                res.json({status:'ok',message: result})
            }
        }
    )}
);

app.post('/api/getuserDelete', (req, res) => {
    console.log("A getTeammanageDeltete")
    const id = req.body.id
    const no = req.body.data
    console.log(req.body.data)
   console.log(id)
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
});

app.post('/api/deleteTeam', jsonParser, (req, res) => {
    db.execute(
        `UPDATE employee SET organization_id  = NULL , status = 'U'  WHERE organization_id = ?`,
        [req.body.data],
        (err, result) => {
            if(err) {
                console.log(err);
                res.json({status:'error',message: err});
            }
            else {
                db.execute(
                    `DELETE FROM pif_product WHERE organization_id = ?`,
                    [req.body.data],
                    (err, result) => {
                        if(err) {
                            console.log(err);
                            res.json({status:'error',message: err});
                        }
                        else {
                            res.json({status:'ok',message: result})
                        }
                    }
                )
            }
        }
    )
});

app.post('/api/getuserDeleteAdmin', (req, res) => {
    console.log(req.body.data)
    db.execute(
        `UPDATE employee SET organization_id  = null , status = 'U'  WHERE no = ?`,
        [req.body.data],
        (err, result) => {
            if(err) {
                console.log(err);
                res.json({status:'error',message: err});
            }
            else {
                res.json({status:'ok',message: result})
            }
        }
    );
});

app.post('/api/changeNameTeam', jsonParser , (req , res) => {
    console.log ("team =>" + new_team)
    console.log ("id =>" + old_team)
    db.execute(
        `SELECT organization_id FROM employee WHERE organization_id = ?`,
        [new_team],
        (err, result) => {
            if(err) {
                console.log(err);
                res.json({status:'error',message: err});
            }
            else {
                console.log('Query Result:', result);
                if(result.length > 0) {
                    res.json({status:'error',message: 'Duplicate Team Name'});
                }
                else {
                    db.execute(
                        `UPDATE employee SET organization_id = ? WHERE organization_id = ?`,
                        [new_team , old_team],
                        (err, result) => {
                            if(err) {
                                console.log(err);
                                res.json({status:'error',message: err});
                            }
                            else {
                                db.execute(
                                    `UPDATE pif_product SET organization_id = ? WHERE organization_id = ?`,
                                    [new_team , old_team],
                                    (err, result) => {
                                        if(err) {
                                            console.log(err);
                                            res.json({status:'error',message: err});
                                        }
                                        else {
                                            res.json({status:'ok',message: result})
                                        }
                                    }
                                )
                            }
                        }
                    );
                }
            }
        }

    )
})

app.post('/api/insertPifProduct' , jsonParser , (req , res) => {
    console.log("insertPifProduct")
    db.execute(
        `INSERT INTO pif_product (organization_id, created_by, created_when, pif_status, fda_license, product_name,
            cosmetic_name, cosmetic_type, create_date, expire_date, cosmetic_reason, cosmetic_physical,
            company_name, company_eng_name, more_info ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
            [req.body.organization_id, req.body.created_by, req.body.created_when, req.body.pif_status, req.body.fda_license, req.body.product_name,
                req.body.cosmetic_name, req.body.cosmetic_type, req.body.create_date, req.body.expire_date, req.body.cosmetic_reason, req.body.cosmetic_physical,
                req.body.company_name, req.body.company_eng_name, req.body.more_info],
        (err, result) => {
            if(err) {
                console.log(err);
                res.json({status:'error',message: err});
            }
            else {
                res.json({status:'ok',message: result})
            }
        }
    )
});

app.get('/api/getPifProductByOrganiztion', jsonParser, (req, res) => {
    db.execute(
        'SELECT * FROM pif_product WHERE organization_id = ?',
        [req.query.organization_id],
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
});

app.get('/api/getPifProductByID', jsonParser, (req, res) => {
    db.execute(
        'SELECT * FROM pif_product WHERE id = ?',
        [req.query.id],
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
});

app.post('/api/pifProductRemoveById', jsonParser, (req, res) => {
    db.execute(
        'DELETE FROM pif_product WHERE id = ?',
        [req.query.id],
        (err, result) => {
            if(err) {
                res.json({status:'error',message:err});
                return;
            }
            else {
               db.execute(
                'SELECT product_id FROM pif WHERE product_id = ?',
                [req.query.id],
                (err, result) => {
                    if(err) {
                        res.json({status:'error',message:err});
                        return;
                    }
                    if(result.length > 0) {
                        db.execute(
                            'DELETE FROM pif WHERE product_id = ?',
                            [req.query.id],
                            (err, result) => {
                                if(err) {
                                    res.json({status:'error',message:err});
                                    return;
                                }
                                else {
                                    res.json({status:'ok',message:result})
                                }
                            }
                        )
                    }
                    else {
                        res.json({status:'ok',message:result})
                    }
                })
            }
        })
});

app.post('/api/DeleteGroupName', (req, res) => {
    const email = req.body.email;
    const groupName = req.body.groupName;

    const sql = 'DELETE FROM chemicalgroup WHERE email = ? AND groupname = ?';
    db.query(sql, [email, groupName], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Internal Server Error");
        } else {
            console.log(result);
            res.send("Delete");
        }
    });
});

app.post('/api/getNoficationFile', (req, res) => {
    const orid = req.body.organization_id;

    const sql = "SELECT id FROM pif_product WHERE organization_id = ?";
    const sql1 = "SELECT product_id FROM pif WHERE product_id = ? AND (expdate <= CURDATE() + INTERVAL 1 MONTH OR file1_exp <= CURDATE() + INTERVAL 1 MONTH OR file2_exp <= CURDATE() + INTERVAL 1 MONTH OR file3_exp <= CURDATE() + INTERVAL 1 MONTH OR file4_exp <= CURDATE() + INTERVAL 1 MONTH OR file5_exp <= CURDATE() + INTERVAL 1 MONTH OR file6_exp <= CURDATE() + INTERVAL 1 MONTH OR file7_exp <= CURDATE() + INTERVAL 1 MONTH OR file8_exp <= CURDATE() + INTERVAL 1 MONTH OR file9_exp <= CURDATE() + INTERVAL 1 MONTH OR file10_exp <= CURDATE() + INTERVAL 1 MONTH OR file11_exp <= CURDATE() + INTERVAL 1 MONTH OR file12_exp <= CURDATE() + INTERVAL 1 MONTH OR file13_exp <= CURDATE() + INTERVAL 1 MONTH OR file14_exp <= CURDATE() + INTERVAL 1 MONTH);";


    db.query(sql, [orid], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Internal Server Error");
        }

        if (result.length > 0) {
           
            for (let i = 0; i < result.length; i++) {
                console.log(result[i].id)
                db.query(sql1, [result[i].id], (err, result1) => {
                    if (err) {
                        console.error(err);
                        return res.status(500).send("Internal Server Error");
                    }

                    if (result1.length > 0) {
                        res.status(200).send(result1)
                        console.log("exo", result1);
                    }
                });
            }
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
                console.log("Error " , err)
            }
            else {
                console.log(result)
                res.send(result)
            }
        })
    }

    if(con === "2"){
        const sql = 'SELECT * FROM product WHERE organization_id = ? ORDER BY expdate ASC'
        db.query(sql , [id], (err , result) => {
            if (err){
                console.log("Error " , err)
            }
            else {
                console.log(result)
                res.send(result)
            }
        })
    }

    if(con === "3"){
        const sql = 'SELECT * FROM product WHERE organization_id = ? ORDER BY cosname ASC'
        db.query(sql , [id], (err , result) => {
            if (err){
                console.log("Error " , err)
            }
            else {
                console.log(result)
                res.send(result)
            }
        })
    }

    if(con === "4"){
        const sql = 'SELECT * FROM product WHERE organization_id = ? ORDER BY cosname DESC'
        db.query(sql , [id], (err , result) => {
            if (err){
                console.log("Error " , err)
            }
            else {
                console.log(result)
                res.send(result)
            }
        })
    }

})


app.listen(3001, () => {
    console.log('Running node at port 3001');
})
