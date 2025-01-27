require('dotenv').config()
const express = require("express")
const connectDB=require('./utils/db');
const app = express()
const multer = require('multer')
const authRoute = require('./routers/auth-router')
const uploadRoute = require('./routers/upload-router')
const userRoute = require('./routers/user-router')
const cors = require('cors');
const path = require('path');


// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'uploads/'); // Specify destination folder
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.originalname); // Save file with original name
//     },
// });

const corsOption = {
    origin: "*",
    method: "GET,POST,PUT,DELETE,PATCH,HEAD",
    credentials: true,
}

app.use(cors(corsOption));
app.use(express.json())
app.use('/api/auth',authRoute)
app.use('/api',uploadRoute)
app.use('/api',userRoute)
app.use('/uploads', express.static(path.join(__dirname, './uploads')));

app.use('/',(req,res)=>{
    res.send("Server is running")
})



const PORT=process.env.PORT || 5000;
connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log("server is running at port ",PORT);
    })
})