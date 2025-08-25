import React from "react";
import { useState } from "react";

const CreatePost = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState(null);


    return(
        <div>
            <form>
                <input 
                    type="text" 
                    placeholder="Title" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                />
                <textarea 
                    placeholder="Content" 
                    value={content} 
                    onChange={(e) => setContent(e.target.value)} 
                />
                <input 
                    type="file" 
                    onChange={(e) => setImage(e.target.files[0])} 
                />
                <button type="submit">Create Post</button>
            </form>
        </div>
    )
}

export default CreatePost;