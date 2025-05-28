const express = require("express")
const app = express()
const cors = require("cors")
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");

const bodyParser = require("body-parser");
connectDB();
app.use(cookieParser(   ));

app.use(
    cors({
        origin: "*",
    })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "5mb", extended: true }));
const dotenv = require("dotenv");
app.use("/api/auth", require("./routes/auth"));
const server = app.listen(5000, () => {
    console.log(`server is running on ${5000}`);
})