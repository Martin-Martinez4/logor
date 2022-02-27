
import { FC, useContext, useState, useEffect } from "react";

import { Location, useLocation } from "react-router-dom";

import Scroll from "../Scroll/Scroll";

import UserNotFound from "../UserNotFound/UserNotFound";

import Card from "../Card/Card";
import VisitorPost from "../Posts/VisitorPost";
import DeletedPost from "../Posts/DeletedPost";

import VisitorProfileHeader from "../ProfileHeader/VisitorProfileHeader";
import MiniProfile from "../MiniProfile/MiniProfile";

import NoPosts from "../NoPosts/NoPosts";

import { UserInfoContext } from "../userContext/userContext";

import sortedComments from "../../tempStaticData/sortedComments.json";


import "./postlist.css"
import ProfileHeader from "../ProfileHeader/ProfileHeader";

const VisitorPostList: FC = ({ userOrTagID }) => {

    console.log("postlist: ", userOrTagID  )

     const location = useLocation();

     console.log(location.pathname);
 
     // eslint-disable-next-line
     const [loggedInUser, setloggedInUser] = useContext(UserInfoContext);
 
     const {username, nickname, id, profile_pic_url}: {username:string; nickname:string; id:string; profile_pic_url:string } = loggedInUser;
 
     // let loggedInComments = sortedComments[id];
 
     const [userPosts, setUserPosts] = useState();
 
     // Get user comments
     const createPosts = (commentsArray) => {
         
         let posts = []
 
        //  console.log(commentsArray)
 
         for(let i = 0; i < commentsArray.length; i++ ){
 
             let loggedInComments = commentsArray[i] 

            //  console.log(loggedInComments)
             
             const {comment_id, text_content, created_at, status, likes, nickname, profile_pic_url} = loggedInComments
                 
                 
             if(loggedInComments.hasOwnProperty("comment_id")){
 
 
                     posts.push( <VisitorPost key={comment_id} uuid={comment_id} userName={username} nickname={nickname} date_posted = {created_at} user_profile={profile_pic_url} text_content={text_content === null? 0: text_content} userPosts={userPosts} setUserPosts={setUserPosts} loggedInComments={commentsArray} createPosts={createPosts} posts={posts} status={status} likes={likes} /> );
 
                 
             }
             
         }
 
 
         return posts
     }

     useEffect(() => {

        setUserPosts(undefined)

        let isMounted = true;   
        
        if (location.pathname.includes("/tags/name/")){

            // fetch data from tags table with id after /tags/
            //  SELECT * FROM tag_comment JOIN comments ON comments.comment_id = tag_comment.comment_id jOIN user_headers ON comments.user_id = user_headers.user_id WHERE tag_id = '849998ef-e4b6-48ce-aa0d-7bbef2ee1995' ORDER BY comments.created_at;

            console.log("tags/name: ", userOrTagID)

            fetch(`http://localhost:3001/tags/byName/${userOrTagID}`, {
                method: "get",
                headers:  {"Content-Type": "application/json"},
            }).then(response => response.json())
            .then(comments => {
                console.log("comments tags/name: ",  comments)
                if (isMounted){

                    setUserPosts(createPosts(comments))
                }
            })
        }

        // if(location.pathname.includes("/users/nickname/")){

        //     console.log("by nickname")

        //     fetch(`http://localhost:3001/users/byNickname/${userOrTagID}`, {
        //         method: "get",
        //         headers:  {"Content-Type": "application/json"},
        //     }).then(response => response.json())
        //     .then(comments => {
        //         console.log("comments: ",  comments)
        //         if (isMounted){

        //             setUserPosts(createPosts(comments))
        //         }
        //     })

            

        // }
        else if(location.pathname.includes("/users/nickname/")){

            console.log("by nickname")

            fetch(`http://localhost:3001/users/byNickname/${userOrTagID}`, {
                method: "get",
                headers:  {"Content-Type": "application/json"},
            }).then(response => response.json())
            .then(comments => {
             

                    setUserPosts(createPosts(comments))
            })
        }
        else if(location.pathname.includes("/users/")){

         

            fetch(`http://localhost:3001/users/${userOrTagID}`, {
                method: "get",
                headers:  {"Content-Type": "application/json"},
            }).then(response => response.json())
            .then(comments => {
                console.log("comments: ",  comments)
                if (isMounted){

                    setUserPosts(createPosts(comments))
                }
            })


        }
        else if (location.pathname.includes("/tags/id/")){

            // fetch data from tags table with id after /tags/
            //  SELECT * FROM tag_comment JOIN comments ON comments.comment_id = tag_comment.comment_id jOIN user_headers ON comments.user_id = user_headers.user_id WHERE tag_id = '849998ef-e4b6-48ce-aa0d-7bbef2ee1995' ORDER BY comments.created_at;

            console.log("/tags/id")

            fetch(`http://localhost:3001/tags/${userOrTagID}`, {
                method: "get",
                headers:  {"Content-Type": "application/json"},
            }).then(response => response.json())
            .then(comments => {
                console.log("comments: ",  comments)
                if (isMounted){

                    setUserPosts(createPosts(comments))
                }
            })


        }
 
        return () => { isMounted = false };
 
     }, [])
 
     
    //  let posts = userPosts
    
        return(
            
            <div className="postlist_horizontal" >
                {console.log(userOrTagID)}
            <Scroll>

                {console.log("userpost: ",userPosts)}
                {location.pathname.includes("/users/")?
                <VisitorProfileHeader userOrTagID={userOrTagID} />:""
                }
                
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
                {console.log("undef: ", userPosts === undefined?"undef:":userPosts.length)}
                {userPosts === undefined?<UserNotFound/>:userPosts.length > 0?userPosts: <NoPosts />}
               
                {/* White  space at the end of the scroll section */}
                <div className="empty"></div>
            </Scroll>
              
            </div>
        );
}

export default VisitorPostList;

