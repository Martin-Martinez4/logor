
import { FC, useContext, useState, useEffect } from "react";

import { Location, useLocation } from "react-router-dom";

import Scroll from "../Scroll/Scroll";

import Card from "../Card/Card";
import VisitorPost from "../Posts/VisitorPost";
import DeletedPost from "../Posts/DeletedPost";
import TestData from "../../tempStaticData/testData.json";

import NameTagID from "../../tempStaticData/NameTagID.json";
import CommentIDUserID from "../../tempStaticData/CommentIdUserID.json";
import UserIDCommentID from "../../tempStaticData/UserIdCommentID.json";
import TagIDCommentID from "../../tempStaticData/TagIDCommentID.json";

import VisitorProfileHeader from "../ProfileHeader/VisitorProfileHeader";
import MiniProfile from "../MiniProfile/MiniProfile";

import { UserInfoContext } from "../userContext/userContext";

import sortedComments from "../../tempStaticData/sortedComments.json";


import "./postlist.css"

const VisitorPostList: FC = ({ userOrTagID }) => {

    const [loggedInUser, setloggedInUser] = useContext(UserInfoContext);

    const location = useLocation();

    console.log(location.pathname);

    let pathName = location.pathname;
    let postsArray;

    console.log(TagIDCommentID)

    if(pathName.includes("/users/")){

        // const {username, nickname, profile_pic_url}: {username:string; nickname:string; profile_pic_url:string } = TestData["users"][visiteeID];

        postsArray =  Object.keys(CommentIDUserID).filter((key)=> {

        if(CommentIDUserID[key] === "1")
           return key
       }).map( key => key);


    }

    // eslint-disable-next-line



    const [userPosts, setUserPosts] = useState();

    useEffect(() => {

        // console.log("effect: ",userPosts)

        console.log("Stuff")

    },[userPosts])

    
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

                        posts.push( <VisitorPost key={key} uuid={key} userName={username} nickname={nickname} date_posted = {date} user_profile={profile_pic_url} text_content={text} userPosts={userPosts} setUserPosts={setUserPosts} loggedInComments={loggedInComments} createPosts={createPosts} posts={posts} status={loggedInComments[key]["status"]}/> );
    
                    }
                    else{

                        posts.push( <VisitorPost key={key} uuid={key} userName={username} nickname={nickname} date_posted = {date} user_profile={profile_pic_url} text_content={text} userPosts={userPosts} setUserPosts={setUserPosts} loggedInComments={loggedInComments} createPosts={createPosts} posts={posts} status={ ["", 0]} /> );
                    }
                
                }else{

                    // console.log("key: ",key);

                    posts.push( <VisitorPost key={key} uuid={key} userName={username} nickname={nickname} date_posted = {date} user_profile={profile_pic_url} text_content={text} userPosts={userPosts} setUserPosts={setUserPosts} loggedInComments={loggedInComments} createPosts={createPosts} posts={posts} status={ ["", 0]} /> );
                }

                
            }
        }
        
        return posts
    }

    let posts = createPosts(userPosts)
    
        return(
            
            <div className="postlist_horizontal" >
                {console.log(userOrTagID)}
            <Scroll>
{/* 
                {location.pathname.includes("/users/")?
                <VisitorProfileHeader userOrTagID={userOrTagID} />:
                ""
                } */}
                
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
              
                {posts}
               
                {/* White  space at the end of the scroll section */}
                <div className="empty"></div>
            </Scroll>
              
            </div>
        );
}

export default VisitorPostList;

