const express = require("express")
const app = express()

const userRouter = require("./routes/User")
const postRouter = require("./routes/Post")

const database = require("./config/database")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const { cloudinaryConnect } = require("./config/cloudinary")
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");

dotenv.config();

const PORT = process.env.PORT || 5000;

database.connect();

app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin:"*",
        credentials:true,
    })
)
app.use(
    fileUpload({
        useTempFiles:true,
        tempFileDir:"/tmp",
    })
)

//cloudinary connect
cloudinaryConnect();

app.use("/api/v1/auth",userRouter);
app.use("/api/v1/post",postRouter);

app.get("/",(req,res) =>{
    return res.json({
        success:true,
        message:"your server is running at port no.."
    })
})

app.listen(PORT, () =>{
    console.log(`app is running at port no ${PORT}`)
})