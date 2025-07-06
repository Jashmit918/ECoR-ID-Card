require('dotenv').config();

const express = require("express");
const app = express();

const cors = require('cors');
const corsOptions = {
  origin: "*", 
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: "*",
  credentials: true 
};
app.use(cors(corsOptions));


const dotenv = require("dotenv");
dotenv.config();

const connectToDb = require('./db/db')
connectToDb();

const cookieParser = require('cookie-parser')


const userRoutes = require('./routes/user.routes')
const nonGazUserRoutes = require('./routes/nonGazUser.routes')
const gazUserRoutes = require('./routes/gazUser.routes')

app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cookieParser())

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use('/users',userRoutes)
app.use('/nonGaz', nonGazUserRoutes)
app.use('/gaz', gazUserRoutes)


module.exports = app;