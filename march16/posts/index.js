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

app.post("/post",async (req,res)=>{
    const id = randomBytes(4).toString('hex');
    const {title} = req.body;
    posts[id] ={id,title};
   
    await axios.post('http://localhost:4005/event',{
        'type' : 'PostCreated',
        'data' : {id,title}
    });
    res.status(201).send(posts[id]);
});
app.listen(4000,function(req,res){
    console.log("app is running 4000")
})