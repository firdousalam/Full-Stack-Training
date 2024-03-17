let express = require("express");
const cors = require('cors');
const {randomBytes} = require('crypto');
const bodyParser = require('body-parser');
const axios = require("axios");
require('dotenv').config()

let app = express();
app.use(bodyParser.json());

const port = process.env.PORT || 4003;
const baseURL = process.env.BASE_URL;
app.post('event',(req,res)=>{
    const event = req.body;
    axios.post('baseURL'+":4000/event",event);
    axios.post('baseURL'+":4001/event",event);
  //  axios.post('baseURL'+":4002/event",event);

    res.send({status:"ok"});
})
app.listen(port,function(req,res){
    console.log("app is running "+port)
})