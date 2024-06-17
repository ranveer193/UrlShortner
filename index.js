const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const {checkForAuthuntication,restrictTo} = require("./middlewares/auth");

const app = express();
const urlroute = require("./routes/url");
const staticroute = require("./routes/staticrouter");
const userroute = require("./routes/user");

const { connectMongoose } = require("./connection");    
const URL = require("./models/url");
const newUser = require("./models/user"); 
const PORT = 8001;

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthuntication);

connectMongoose("mongodb://localhost:27017/myurl")
    .then(() => console.log("mongoDb Started"))
    .catch((err) => console.log("Error", err));

app.use("/url", restrictTo(["NORMAL","ADMIN"]), urlroute);
app.use("/", staticroute);
app.use("/user",userroute);


app.listen(PORT, () => {
    console.log("Server Started at Port:", PORT);
})