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
   // console.log("details",req.body);
    const {type,data} = req.body;
    if(type == 'PostCreated'){
        const {id,title} = data;
        post[id] = {id,title,comments:[]};
      //  console.log(post);
    }
    if(type == 'CommentCreated'){
        const {id,content,postId,status} = data;
        console.log("comment created",data);
        post[postId].comments.push({id,content,status});
        console.log("new data created",post[postId]);
    }
    if(type == 'CommentModerated'){
        const {id,content,postId,status} = data;
        console.log("comment Moderated",data);
        const UpdatedPost = post[postId].comments;
   
        var commentIndex = -1;
        var messageId = id;
        var filteredRes = UpdatedPost.find(function(item, i){
            if(item.id === messageId){
                commentIndex = i;
            return i;
            }
        });

        console.log("commentIndex",commentIndex);
      
        post[postId].comments[commentIndex].status = status;
        
        console.log("comment details",post[postId])
    }
   
    res.send({"msg" : "event Process"});
})
app.listen(4002,function(req,res){
    console.log("app is running 4002");
})