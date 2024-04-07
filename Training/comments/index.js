let express = require("express");
const cors = require('cors');
const {randomBytes} = require('crypto');
const bodyParser = require('body-parser');
const axios = require('axios');
let app = express();
app.use(bodyParser.json());
app.use(cors());

const commentByPostId = {};

app.get("/post/:id/comment",(req,res)=>{

    res.send(commentByPostId[req.params.id]);
});

app.post("/post/:id/comment",async (req,res)=>{
    const id = randomBytes(4).toString('hex');
    const data = req.body;
    const comment = commentByPostId[req.params.id] || [];
   
    //if(comment !== '' && typeof commentByPostId[req.params.id] != 'undefined'){
    comment.push({id : id,content : data.content,status:'pending'});
    commentByPostId[req.params.id] = comment;
    console.log("api called",commentByPostId);
    await axios.post('http://event-bus-srv:4005/events',{
        'type' : 'CommentCreated',
        'data' : {id : id, content : data.content,postId : req.params.id,status:'pending'}
    })
    

    res.status(201).send(comment);
});
app.post('/events',async (req,res)=>{
    console.log("event recieve of type",req.body.type);
    const {type,data} = req.body;
    if(type == 'CommentModerated'){
        const {id,postId,status} = data;
        const comments = commentByPostId[postId];
        const comment = comments.find(comment =>{
            return comment.id = id;
        });
        comment.status = status
        await axios.post('http://event-bus-srv:4005/events',{
            'type' : 'CommentUpdated',
            'data' : {id : id,content : data,postId : postId,status:status}
        })

    }
    res.send({"msg" : "event receive"});
})
app.listen(4001,function(req,res){
    console.log("app is running 4001")
})