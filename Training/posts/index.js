let express = require("express");
const cors = require('cors');
const axios = require('axios');
const {randomBytes} = require('crypto');
const bodyParser = require('body-parser');
let app = express();
app.use(bodyParser.json());
app.use(cors());
const posts = {};

app.get("/post",(req,res)=>{
// db call get data
    res.send(posts);
});

app.post("/post",async (req,res)=>{
    const id = randomBytes(4).toString('hex');
    const {title} = req.body;
    posts[id] ={id,title};
    console.log(posts);
   
    await axios.post('http://localhost:4005/events',{
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
    console.log("app is running 4000")
})