import React, { useState ,useEffect} from 'react';
import axios from 'axios';


export default function CommentList({postId}) {
    const [comment , setComment] = useState([]);
    const fetchComment = async () =>{
        const res = await axios.get('http://localhost:4001/post/'+postId+'/comment');
        setComment(res.data);
    }
    useEffect(()=>{
        fetchComment();
    },[]);
    console.log("dattttaaa",comment);
    let renderValue = '';
    if(comment){
        renderValue = comment.map(eachComment =>{
            return <>
                <li key={eachComment.id}> {eachComment.content.content}</li>
                
            </>
        })
    }
    
  return (
    <ul>
       {renderValue}
    </ul>
  );
}
