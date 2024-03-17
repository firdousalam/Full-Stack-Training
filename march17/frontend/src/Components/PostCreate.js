import React, {useState} from 'react';
import axios from 'axios';

export default function PostCreate() {
    const [title,setTitle] = useState(""); // hook useContext props
    //title = "text"  // this 
    const onSubmit = async (event) =>{
        event.preventDefault();
        await axios.post('http://localhost:4000/post',{title});
        setTitle('');
    }
  return (
    <div >

        <form onSubmit={onSubmit}>
            <h1>Post Create</h1>
            <div className='form-group'>
                <label>
                    Title
                </label>
                <input className='form-control' value={title} onChange={e =>setTitle(e.target.value)}/>
            </div>
            <button className='btn btn-primary'>Submit</button>
        </form>
        
    </div>
  );
}
