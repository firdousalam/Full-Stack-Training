let express = require("express");
const cors = require('cors');
const {randomBytes} = require('crypto');
const bodyParser = require('body-parser');
let app = express();
app.use(bodyParser.json());
app.use(cors());

const commentByPostId = {};

app.get("/post/:id/comment",(req,res)=>{

    res.send(commentByPostId[req.params.id]);
});

app.post("/post/:id/comment",(req,res)=>{
    const id = randomBytes(4).toString('hex');
    const content = req.body;
    const comment = commentByPostId[req.params.id] || [];
    //if(comment !== '' && typeof commentByPostId[req.params.id] != 'undefined'){
    comment.push({id : id,content : content});
    commentByPostId[req.params.id] = comment;
    

    res.status(201).send(comment);
});
app.listen(4001,function(req,res){
    console.log("app is running 4001")
})