let express = require("express");
//const cors = require('cors');
const {randomBytes} = require('crypto');
const bodyParser = require('body-parser');
let app = express();
app.use(bodyParser.json());
//app.use(cors());
const posts = {};

app.get("/post",(req,res)=>{
// db call get data
    res.send(posts);
});

app.post("/post",(req,res)=>{
    const id = randomBytes(4).toString('hex');
    //id = "gdvgsdgjgdsjgjdsgjds"
    console.log("test",req.body);
    const {title} = req.body;
    // read data from my api post call title : post1
    console.log("title",title);
    posts[id] ={id,title};
   
    res.status(201).send(posts[id]);
});
app.listen(4000,function(req,res){
    console.log("app is running")
})