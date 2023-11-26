const sendEmailNotifications=() => {
    const sql = 'SELECT expdate FROM pif_storage WHERE expdate <= CURDATE() + INTERVAL 30 DAY';

    db.query(sql , (err , result) => {
        if(err) {
            console.error("Error ", err)
           // res.status(500).send("SomeTingWorng")
        }
        else if (result.length > 0 ){
            console.log('Result from database :', result);
            console.log("Ok")
            result.forEach((pif_storage) => {
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
                    to: ".........@gmail.com",
                    subject: "ใบอนุญาต อย ใกล้ หมด อายุแล้ว",
                    text: "วันหมดอายุ คือ ${expdate}",
                    html: "EXP DATE IS COMING",
                };

                transporter.sendMail(message)
                    .then(() => {
                        console.log('Sending email to .......@gmail.com');
                        // Sending response after email is sent
                       // return res.status(201).json({ msg: "Email has been sent, and signup was successful" });
                    })
                    .catch(error => {
                        console.error(error);
                       // return res.status(500).json({ error: "Error sending email" });
                    });


            })
        }
        else {
            console.log("No expDate")
        }
    })
//})
}
sendEmailNotifications() 
