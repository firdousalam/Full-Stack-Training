import React , {useState} from 'react';
import axios from 'axios'

export default function CommentCreate({postId,title}) {
    const [content,setContent] = useState();
    const onSubmit = async (event) =>{
        event.preventDefault();
        await axios.post('http://technophilefirdous.com/post/'+postId+'/comment',{content});
        setContent('');
    }
  return (
    <>
        <form onSubmit={onSubmit}>
            <div className='form-group'>
                <label>
                    New Comment for 
                </label>
                <input className='form-control' value={content} onChange={e =>setContent(e.target.value)}/>
            </div>
            <button className='btn btn-primary'>Submit</button>
        </form>
        
    </>
  );
}
