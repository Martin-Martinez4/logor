
import React, { FC } from "react";

import Scroll from "../Scroll/Scroll";

import Post from "../Posts/Post";
import ProfileHeader from "../ProfileHeader/ProfileHeader";

import "./postlist.css"

const PostList: FC = () => {

        return(
            // style={{ display:"flex", flexDirection: "column" }}
            <div className="postlist_horizontal" >
            <Scroll>
                <ProfileHeader/>

                <Post /> 
                <Post /> 
                <Post /> 
                <Post /> 
                <Post /> 
                <Post /> 
                <Post /> 
            </Scroll>
              
            </div>
        );
}

export default PostList

