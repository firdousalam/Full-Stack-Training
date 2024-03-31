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
let events = [];
app.post('/events',(req,res)=>{
    const event = req.body;
    events.push(event);
    axios.post(baseURL+":4000/events",event).then(function (response) {
        // handle success
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
    axios.post(baseURL+":4001/events",event).then(function (response) {
        // handle success
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
    axios.post(baseURL+":4002/events",event).then(function (response) {
        // handle success
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
    axios.post(baseURL+":4003/events",event).then(function (response) {
        // handle success
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })

    res.send({status:"ok"});
})
app.get('/events',(req,res)=>{
    res.send({data : events});
});
app.listen(port,function(req,res){
    console.log("app is running "+port)
})