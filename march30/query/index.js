let express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');
let app = express();
app.use(bodyParser.json());
app.use(cors());
const post = {};
app.get('/post',(req,res)=>{
   res.send(post);
   
})

app.post('/events',(req,res)=>{
    console.log("details",req.body);
    const {type,data} = req.body;
    if(type == 'PostCreated'){
        const {id,title} = data;
        post[id] = {id,title,comments:[]};
        console.log(post);
    }
    if(type == 'CommentCreated'){
        const {id,content,postId} = data;
        post[postId].comments.push({id,content});
    }
   
    res.send({"msg" : "event Process"});
})
app.listen(4002,function(req,res){
    console.log("app is running 4002");
})