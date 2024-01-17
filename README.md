# ICAE Web Application

## Installation Guide
#### Require software
1. XAMPP (for run MariaDB and PhpMyAdmin)
2. NodeJS (version 20.11)  

#### How to install
1. Download XAMPP from offical website [https://www.apachefriends.org/download.html]
2. Install XAMPP
3. Download NodeJS **(Version 20.11)** from offical website [https://nodejs.org/en/download/]
4. Install NodeJS
5. Download ICAE Project

#### How to setup and run project
1. Open XAMPP and **run MariaDB Database (some version is MySQL Database)** and **run Apache Web Server**
2. Go to [http://localhost/phpmyadmin]
3. Create new database with name [cosmetic]
4. Go to database cosmetic and import database from file **ICAE/sql/cosmetic.sql**
5. Go to ICAE folder
6. Open terminal in **ICAE/frontend** and **ICAE/server**
   
   2.1. for ICAE/fontend run with this command
   ```
   npm install
   npm run dev
   ```
   2.2. for ICAE/server run with this command
   ```
   npm install
   ```
   - After you type npm install, it will have folder node_module in ICAE/server
   - Copy file [vfs_fonts.js] from **ICAE/server** and pase in **ICAE/server/node_modules/pdfmake/build/**  
   and then back to **ICAE/server** and run this command
   ```
   npm start
   ```
7. Now is running go to [http://localhost:3000] for using ICAE Web application !!   

**NOTE: Please make sure the folder ICAE/server/uploads have permission to write file.**
   
## Directory Tree
```
.
├── frontend
│   ├── README.md
│   ├── api
│   │   └── hello.js
│   ├── components
│   │   ├── Footer.js
│   │   ├── PdfViewer.js
│   │   └── layout
│   │       ├── Modal
│   │       │   ├── Fail.js
│   │       │   └── Success.js
│   │       ├── Navbar.js
│   │       └── _Navbar.js
│   ├── jsconfig.json
│   ├── next.config.js
│   ├── package-lock.json
│   ├── package.json
│   ├── pages
│   │   ├── Add
│   │   │   ├── GetCsv.js
│   │   │   ├── Home.js
│   │   │   ├── ReadCSVToMysql.js
│   │   │   ├── index1.js
│   │   │   ├── index2.js
│   │   │   ├── index3.js
│   │   │   └── index4.js
│   │   ├── Adddata.js
│   │   ├── AdddataAn2.js
│   │   ├── AdddataAn4.js
│   │   ├── Knowledge
│   │   │   ├── Info.js
│   │   │   ├── annex2.js
│   │   │   ├── annex3.js
│   │   │   ├── annex4.js
│   │   │   ├── annex5.js
│   │   │   ├── annex6.js
│   │   │   ├── annex_search.js
│   │   │   └── home.js
│   │   ├── SignUp
│   │   │   └── SignUp.js
│   │   ├── _app.js
│   │   ├── _document.js
│   │   ├── admin
│   │   │   ├── Add.js
│   │   │   ├── Changegroup.js
│   │   │   ├── Edit.js
│   │   │   ├── Home.js
│   │   │   ├── Showch.js
│   │   │   ├── UserManage.js
│   │   │   └── userinfo.js
│   │   ├── examine
│   │   │   ├── check.js
│   │   │   ├── history.js
│   │   │   ├── record.js
│   │   │   └── result.js
│   │   ├── index.js
│   │   ├── login
│   │   │   └── SignIn.js
│   │   ├── notification.jsx
│   │   ├── pif
│   │   │   ├── Notification.js
│   │   │   ├── createByfda.js
│   │   │   ├── groupname.js
│   │   │   ├── manage.js
│   │   │   ├── no-img.png
│   │   │   ├── productslist.js
│   │   │   ├── record.jsx
│   │   │   ├── showpif.js
│   │   │   └── upload.js
│   │   └── team
│   │       ├── manage.js
│   │       └── team.js
│   ├── public
│   │   ├── Grosser_Panda.JPG
│   │   ├── Kanit-Black.ttf
│   │   ├── Kanit-BlackItalic.ttf
│   │   ├── Kanit-Bold.ttf
│   │   ├── Kanit-BoldItalic.ttf
│   │   ├── Kanit-ExtraBold.ttf
│   │   ├── Kanit-ExtraBoldItalic.ttf
│   │   ├── Kanit-ExtraLight.ttf
│   │   ├── Kanit-ExtraLightItalic.ttf
│   │   ├── Kanit-Italic.ttf
│   │   ├── Kanit-Light.ttf
│   │   ├── Kanit-LightItalic.ttf
│   │   ├── Kanit-Medium.ttf
│   │   ├── Kanit-MediumItalic.ttf
│   │   ├── Kanit-Regular.ttf
│   │   ├── Kanit-SemiBold.ttf
│   │   ├── Kanit-SemiBoldItalic.ttf
│   │   ├── Kanit-Thin.ttf
│   │   ├── Kanit-ThinItalic.ttf
│   │   ├── NotoSansThai-Regular.ttf
│   │   ├── OFL.txt
│   │   ├── ability.png
│   │   ├── adven.png
│   │   ├── adven1.png
│   │   ├── adven2.png
│   │   ├── adven3.png
│   │   ├── annex1.png
│   │   ├── annex2.png
│   │   ├── annex3.png
│   │   ├── annex4.png
│   │   ├── annex5.png
│   │   ├── annex6.png
│   │   ├── csvfile.png
│   │   ├── edit.png
│   │   ├── favicon.ico
│   │   ├── favicon.png
│   │   ├── favicon1.ico
│   │   ├── fomula-ex.png
│   │   ├── icae_logo.png
│   │   ├── know_home.png
│   │   ├── new-product.png
│   │   ├── news1.jpeg
│   │   ├── news2.jpeg
│   │   ├── news3.jpg
│   │   ├── next.svg
│   │   ├── pandaA.png
│   │   ├── pandaU.png
│   │   ├── preview.png
│   │   ├── preview1.png
│   │   ├── preview2.png
│   │   ├── preview3.png
│   │   ├── secret-file.png
│   │   ├── test01.png
│   │   ├── test02.png
│   │   ├── upload.jpg
│   │   ├── upload1.png
│   │   ├── vercel.svg
│   │   ├── xml
│   │   │   ├── aa.xml
│   │   │   └── cosmetic-products-regulation--annex-iii---restricted-substances-export.xml
│   │   └── ไม่มีชื่อ (แบนเนอร์ (แนวนอน)).png
│   ├── spec.js
│   ├── styles
│   │   ├── Home.module.css
│   │   ├── Preview.css
│   │   ├── footer.css
│   │   ├── globals.css
│   │   ├── knowledge.css
│   │   ├── navbar.css
│   │   ├── nofi.css
│   │   ├── notification.css
│   │   ├── style.css
│   │   └── test.css
│   ├── tempCodeRunnerFile.js
│   └── yarn.lock
├── server
│   ├── env.js
│   ├── fonts.sh
│   ├── index.js
│   ├── package-lock.json
│   ├── package.json
│   ├── spec.js
│   ├── uploads
│   └── vfs_fonts.js
└── sql
    └── cosmetic.sql

21 directories, 139 files
```
