import React, { useState ,useEffect} from 'react';
import axios from 'axios';
import CommentCreate from './CommentCreate';
import CommentList from './CommentList';

export default function PostList() {
    const [posts , setPost] = useState({});
    const fetchPost = async () =>{
        const res = await axios.get('http://localhost:4000/post');
        setPost(res.data);
       
    }
    //fetchPost();
    useEffect(()=>{
        fetchPost();
    },[])
    const renderValue = Object.values(posts).map(post =>{
        return <>
            <div className='card' style={{width : '30%' ,marginBottom:'20px'}} key={post.id}>
                <div className='card-body'>
                    <h3>{post.title}</h3>
                    <CommentList postId = {post.id} />
                    <CommentCreate postId = {post.id} title={post.title}/>
                   
                </div>
            </div>
        </>
    })
  return (
    <div className='d-flex flex-row flex-wrap justify-content-between'>
        {renderValue}
    </div>
  );
}
