
import React, { FC } from "react";

import Scroll from "../Scroll/Scroll";

import Post from "../Posts/Post";
import Card from "../Card/Card";
import ProfileHeader from "../ProfileHeader/ProfileHeader";
import MiniProfile from "../MiniProfile/MiniProfile";
import CommentBox from "../CommentBox/CommentBox";

import "./postlist.css"

const PostList: FC = () => {

        return(
            // style={{ display:"flex", flexDirection: "column" }}
            <div className="postlist_horizontal" >
            <Scroll>
                <ProfileHeader/>
                <Card classes="content med_suggestion">
                    <p>Suggestions</p>
                    <div className="suggestions">

                        <p>#DonkeyKong</p>
                        <p>#ApeEscape</p>
                        <p>#MelGibbonson</p>
                    </div>
                    <p>Featured</p>
                    <div className="features">
                        <MiniProfile></MiniProfile>

                        <MiniProfile></MiniProfile>
                        <MiniProfile></MiniProfile>

                        <MiniProfile></MiniProfile>

                    </div>
                </Card>
                
                <CommentBox></CommentBox>

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

