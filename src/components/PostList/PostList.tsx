
import React, { FC } from "react";

import Scroll from "../Scroll/Scroll";

import Post from "../Posts/Post";
import ProfileHeader from "../ProfileHeader/ProfileHeader";

const PostList: FC = () => {

        return(
            <div style={{ display:"flex", flexDirection: "column" }}>
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

