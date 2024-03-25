import React from 'react';
export default function CommentList({comments}) {
    let renderValue = comments.map(eachComment =>{
            return <>
                <li key={eachComment.id}> {eachComment.content.content}</li>
            </>
        })
  return (
    <ul>
       {renderValue}
    </ul>
  );
}
