import React from 'react';
export default function CommentList({comments}) {
    let renderValue = comments.map(eachComment =>{
        console.log("each data",eachComment)
        let content ;
        if(eachComment.status === 'approved'){
            content = eachComment.content
        }
        if(eachComment.status === 'pending'){
          content = "this content is awaiting moderation";
        }
        if(eachComment.status === 'rejected'){
          content = "this content got rejected";
      }
            return <li key={eachComment.id}>{content}</li>
           
        })
  return (
    <ul>
       {renderValue}
    </ul>
  );
}
