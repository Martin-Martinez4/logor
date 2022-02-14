
import { FC, useContext, useState, useEffect } from "react";

import { Location, useLocation } from "react-router-dom";

import Scroll from "../Scroll/Scroll";

import Card from "../Card/Card";
import Post from "../Posts/Post";
import DeletedPost from "../Posts/DeletedPost";
import ProfileHeader from "../ProfileHeader/ProfileHeader";
import MiniProfile from "../MiniProfile/MiniProfile";
import CommentBox from "../CommentBox/CommentBox";

import { UserInfoContext } from "../userContext/userContext";

import sortedComments from "../../tempStaticData/sortedComments.json";


import "./postlist.css"

const PostList: FC = () => {

    const location = useLocation();

    console.log(location.pathname);

    // eslint-disable-next-line
    const [loggedInUser, setloggedInUser] = useContext(UserInfoContext);

    const {username, nickname, id, profile_pic_url}: {username:string; nickname:string; id:string; profile_pic_url:string } = loggedInUser;

    let loggedInComments = sortedComments[id];

    const [userPosts, setUserPosts] = useState(loggedInComments);

    useEffect(() => {

        // console.log("effect: ",userPosts)

        console.log("Stuff")

    },[userPosts])

    console.log(loggedInComments)

    
    const createPosts = (loggedInComments) => {
        
        let posts = []

        
        for(let key in loggedInComments){
            
            let text = loggedInComments[key]["text_content"];
            let date = loggedInComments[key]["date_made"];
            
            if(loggedInComments.hasOwnProperty(key)){


                if(loggedInComments[key].hasOwnProperty("status")){
                    

                    if(loggedInComments[key]["status"][0] === "Deleted"){

                        // console.log("should have worked")
    
                        posts.push(<DeletedPost  key={key} uuid={key} />);
    
                    }
                    else if (loggedInComments[key]["status"][0] === "Edited"){

                        posts.push( <Post key={key} uuid={key} userName={username} nickname={nickname} date_posted = {date} user_profile={profile_pic_url} text_content={text} userPosts={userPosts} setUserPosts={setUserPosts} loggedInComments={loggedInComments} createPosts={createPosts} posts={posts} status={loggedInComments[key]["status"]}/> );
    
                    }
                    else{

                        posts.push( <Post key={key} uuid={key} userName={username} nickname={nickname} date_posted = {date} user_profile={profile_pic_url} text_content={text} userPosts={userPosts} setUserPosts={setUserPosts} loggedInComments={loggedInComments} createPosts={createPosts} posts={posts} status={ ["", 0]} /> );
                    }
                
                }else{

                    // console.log("key: ",key);

                    posts.push( <Post key={key} uuid={key} userName={username} nickname={nickname} date_posted = {date} user_profile={profile_pic_url} text_content={text} userPosts={userPosts} setUserPosts={setUserPosts} loggedInComments={loggedInComments} createPosts={createPosts} posts={posts} status={ ["", 0]} /> );
                }

                
            }
        }
        
        return posts
    }

    let posts = createPosts(userPosts)
    
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
                
                <CommentBox userPosts={userPosts} setUserPosts={setUserPosts} posts={posts} createPosts={createPosts} loggedInComments={loggedInComments} ></CommentBox>
              
                {posts}
               
                {/* White  space at the end of the scroll section */}
                <div className="empty"></div>
            </Scroll>
              
            </div>
        );
}

export default PostList

