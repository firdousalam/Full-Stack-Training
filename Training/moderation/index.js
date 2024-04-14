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
app.post('/events',async (req,res)=>{
    console.log("event recieve of type mod",req.body.type);
    const {type,data} = req.body;
    if(type == 'CommentCreated'){
        console.log(data,"comment Data");
        const status = data.content.includes('orange')?'rejected':'approved';
        await axios.post('http://event-bus-srv:4005/events',{
            'type' : 'CommentModerated',
            'data' : {
                id : data.id,
                postId : data.postId,
                status:status,
                content: data.content
            }
        })
        console.log("data from moderation",{
            id : data.id,
            postId : data.postId,
            status:status,
            content: data.content
        })
    }
   
    res.send({"msg" : "event receive"});
})
app.listen(port,function(req,res){
    console.log("app is running "+port)
})