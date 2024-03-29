let express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require("axios");
require('dotenv').config()

let app = express();
app.use(bodyParser.json());
app.use(cors());
const port = process.env.PORT || 4003;
const baseURL = process.env.BASE_URL;
app.post('/events',(req,res)=>{
    const event = req.body;
    console.log("events",event)
     axios.post(baseURL+":4000/events",event);
    axios.post(baseURL+":4001/events",event);
    console.log("events 02",event)
    axios.post(baseURL+":4002/events",event);

    res.send({status:"ok"});
})
app.listen(port,function(req,res){
    console.log("app is running "+port)
})