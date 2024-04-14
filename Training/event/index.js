let express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require("axios");
require('dotenv').config()

let app = express();
app.use(bodyParser.json());
app.use(cors());
// Add headers before the routes are defined
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
//  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  //res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});
const port = process.env.PORT || 4003;
const baseURL = process.env.BASE_URL;
let events = [];
app.post('/events',(req,res)=>{
    const event = req.body;
    events.push(event);
    console.log("event service being called");
    axios.post("http://post-clusterip-srv:4000/events",event).then(function (response) {
        // handle success
        console.log("post service response",response);
      })
      .catch(function (error) {
        // handle error
        console.log("post service error",error);
      })
    axios.post("http://comment-srv:4001/events",event).then(function (response) {
        // handle success
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
    axios.post("http://query-srv:4002/events",event).then(function (response) {
        // handle success
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
    axios.post("http://moderation-srv:4003/events",event).then(function (response) {
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