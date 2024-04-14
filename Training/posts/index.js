let express = require("express");
const cors = require('cors');
const axios = require('axios');
const {randomBytes} = require('crypto');
const bodyParser = require('body-parser');
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
const posts = {};

app.get("/post",(req,res)=>{
// db call get data
    console.log("getting post call")
    res.send({"from" : "docker","data":posts});
});

app.post("/post/create",async (req,res)=>{
    const id = randomBytes(4).toString('hex');
    const {title} = req.body;
    posts[id] ={id,title};
    console.log(posts);
   console.log("event service being called");
    await axios.post('http://event-bus-srv:4005/events',{
        'type' : 'PostCreated',
        'data' : {id,title}
    })
    /*
     axios.post("http://localhost:4003/events", event).catch((err) => {
    console.log(err.message);
  });
  */
    
    res.status(201).send(posts[id]);
});
app.post('/events',(req,res)=>{
    console.log("event recieve of type",req.body.type);
    res.send({"msg" : "event receive"});
})
app.listen(4000,function(req,res){
    console.log("app is running 4009 by docker v1 latest" )
})