let express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');
let app = express();
const axios = require("axios");
app.use(bodyParser.json());
app.use(cors());
const post = {};
const handleEvent=(type,data)=>{
    if(type == 'PostCreated'){
        const {id,title} = data;
        post[id] = {id,title,comments:[]};
    }
    if(type == 'CommentCreated'){
        const {id,content,postId,status} = data;
        post[postId].comments.push({id,content,status});
    }
    if(type == 'CommentModerated'){
        const {id,content,postId,status} = data;
        const UpdatedPost = post[postId].comments;
        var commentIndex = -1;
        var messageId = id;
        var filteredRes = UpdatedPost.find(function(item, i){
            if(item.id === messageId){
                commentIndex = i;
            return i;
            }
        });
        post[postId].comments[commentIndex].status = status;
    }
}
app.get('/post',(req,res)=>{
   res.send(post);
   
})

app.post('/events',(req,res)=>{
    const {type,data} = req.body;
    handleEvent(type,data);
    res.send({"msg" : "event Process"});
})
app.listen(4002,async function(req,res){
    console.log("app is running 4002");
    const previousEvent = await axios.get("http://event-bus-srv:4005/events");
    console.log("previos data ",previousEvent)
    for(let event of previousEvent.data.data){
        console.log("processing event",event.type);
        handleEvent(event.type,event.data);
    }
})