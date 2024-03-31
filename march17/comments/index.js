let express = require("express");
const cors = require('cors');
const {randomBytes} = require('crypto');
const bodyParser = require('body-parser');
let app = express();
const axios = require("axios");
app.use(bodyParser.json());
app.use(cors());

const commentByPostId = {};

app.get("/post/:id/comment",(req,res)=>{

    res.send(commentByPostId[req.params.id]);
});

app.post("/post/:id/comment",async (req,res)=>{
    const id = randomBytes(4).toString('hex');
    const content = req.body;
    content.status = 'pending'
    const comment = commentByPostId[req.params.id] || [];
    //if(comment !== '' && typeof commentByPostId[req.params.id] != 'undefined'){
    comment.push({id : id,content : content});
    commentByPostId[req.params.id] = comment;
    // we will fire event 
    await axios.post('http://localhost:4005/events',{
        'type' : 'CommentCreated',
        'data' : {id : id,content : content,postId : req.params.id}
    })

    res.status(201).send(comment);
});
app.post('/events',(req,res)=>{
    res.send({"msg" : "event recieve"});
});
app.listen(4001,function(req,res){
    console.log("app is running 4001")
})