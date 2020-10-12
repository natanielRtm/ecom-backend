const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require ("body-parser"); 
const cors = require("cors");
const cookieParser = require("cookie-parser");
const expressValidator = require("express-validator");
require("dotenv").config();

//import routes
const authRoutes = require("./routes/auth")
const userRoutes = require("./routes/user")
const categoryRoutes = require("./routes/category")
const productRoutes = require("./routes/product")
const braintreeRoutes = require("./routes/braintree")
const orderRoutes = require("./routes/order")

//app
const app = express();

//db
/* mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex : true
}).then(() => console.log("DB Connected")); */

mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
 }).then(()=>{
     console.log(`connection to database established`)
 }).catch(err=>{
     console.log(`db error ${err.message}`);
     process.exit(-1)
 })

//middlewares
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());

//routes middleware
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", braintreeRoutes);
app.use("/api", orderRoutes);

 

const port = process.env.PORT || 8000;

app.listen(port, ()=> {
    console.log(`Server is Runnning on port  ${port}`);
});

