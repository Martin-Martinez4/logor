
import { React } from "react";

import Card from "../Card/Card";
import Post from "../Posts/Post";

// width 904 height 224

const PostList = () => {


        return(
            <div style={{ display:"flex", flexDirection: "column" }}>
                <Post /> 
                <Post /> 
                <Post /> 
              

            </div>
        );
}

export default PostList

