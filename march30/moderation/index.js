let express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require("axios");
require('dotenv').config()

let app = express();
app.use(bodyParser.json());
app.use(cors());
const port = process.env.PORT || 4003;
const baseURL = process.env.BASE_URL;
app.post('/events',async (req,res)=>{
    console.log("event recieve of type",req.body.type);
    const {type,data} = req.body;
    if(type == 'CommentCreated'){
        console.log(data,"comment Data");
        const status = data.content.content.include('orange')?'rejected':'approved';
        await axios.post('http://localhost:4005/events',{
            'type' : 'CommentModerated',
            'data' : {
                id : data.id,
                postId : data.postId,
                status,
                content: data.content
            }
        })
    }
   
    res.send({"msg" : "event receive"});
})
app.listen(port,function(req,res){
    console.log("app is running "+port)
})