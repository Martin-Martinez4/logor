
import { FC, useContext, useState, useEffect } from "react";

import { Location, useLocation } from "react-router-dom";

import { createMiniProfiles } from "../utils/createMiniprofilesArray";
import { getRandomUserIDs } from "../utils/fetchRandomUserIDs";

import Scroll from "../Scroll/Scroll";

import UserNotFound from "../UserNotFound/UserNotFound";

import Card from "../Card/Card";
import VisitorPost from "../Posts/VisitorPost";

import VisitorProfileHeader from "../ProfileHeader/VisitorProfileHeader";

import NoPosts from "../NoPosts/NoPosts";

import UserInfoContext from "../context/UserInfoProvider";


import "./postlist.css"

const VisitorPostList: FC = ({ userOrTagID }) => {


     const location = useLocation();

 
     // eslint-disable-next-line
     const { loadUser, loggedInUser, setloggedInUser } = useContext( UserInfoContext);

     useEffect(() => {


    }, [loggedInUser])

 
     const {username, nickname, id, profile_pic_url}: {username:string; nickname:string; id:string; profile_pic_url:string } = loggedInUser;
 
     // let loggedInComments = sortedComments[id];
 
     const [userPosts, setUserPosts] = useState();
 
     // Get user comments
     const createPosts = (commentsArray) => {
         
         let posts = []
 
 
         for(let i = 0; i < commentsArray.length; i++ ){
 
             let loggedInComments = commentsArray[i] 

             
             const {username, comment_id, text_content, created_at, status, likes, nickname, profile_pic_url} = loggedInComments

                 
                 
             if(loggedInComments.hasOwnProperty("comment_id")){
 
 
                     posts.push( <VisitorPost key={comment_id} uuid={comment_id} userName={username} nickname={nickname} date_posted = {created_at} user_profile={profile_pic_url} text_content={text_content === null? 0: text_content} userPosts={userPosts} setUserPosts={setUserPosts} loggedInComments={commentsArray} createPosts={createPosts} posts={posts} status={status}  /> );
 
                 
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


            fetch(`http://localhost:3001/tags/byName/${userOrTagID}`, {
                method: "get",
                headers:  {"Content-Type": "application/json"},
            }).then(response => response.json())
            .then(comments => {
                if (isMounted){

                    setUserPosts(createPosts(comments))
                }
            })
        }

    
        else if(location.pathname.includes("/users/nickname/")){


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
                if (isMounted){

                    setUserPosts(createPosts(comments))
                }
            })


        }
        else if (location.pathname.includes("/tags/")){

            // fetch data from tags table with id after /tags/
            //  SELECT * FROM tag_comment JOIN comments ON comments.comment_id = tag_comment.comment_id jOIN user_headers ON comments.user_id = user_headers.user_id WHERE tag_id = '849998ef-e4b6-48ce-aa0d-7bbef2ee1995' ORDER BY comments.created_at;


            fetch(`http://localhost:3001/tags/${userOrTagID}`, {
                method: "get",
                headers:  {"Content-Type": "application/json"},
            }).then(response => response.json())
            .then(comments => {
                if (isMounted){

                    setUserPosts(createPosts(comments))
                }
            })


        }
        else if (location.pathname.includes("/comment/thread/")){

            // recursive fetch
            // .then => setUserpost(createPosts(comments))

            

        }
 
        return () => { isMounted = false };
 
     }, [])

     const [ suggestedProfiles, setSuggestedProfiles ] = useState();

     let miniprofilesArray = [];
 
     // get three random user_ids
     useEffect(() => {
 
         (async (setSuggestedProfiles) => {
 
             const featuredUsers = await getRandomUserIDs(4);
 
 
             setSuggestedProfiles(featuredUsers)
 
             
         })(setSuggestedProfiles)
         
         
     }, [])
     
     useEffect(() => {
         
         // create the miniProfile  element list here
 
         miniprofilesArray = createMiniProfiles(suggestedProfiles);
 
 
 
 
     }, [suggestedProfiles])
 
     miniprofilesArray = createMiniProfiles(suggestedProfiles);
 
 
     
    //  let posts = userPosts
    
        return(
            
            <div className="postlist_horizontal" >
            <Scroll>

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
                        {miniprofilesArray}

                    </div>
                </Card>
                {userPosts === undefined?<UserNotFound/>:userPosts.length > 0?userPosts: <NoPosts />}
               
                {/* White  space at the end of the scroll section */}
                <div className="empty"></div>
            </Scroll>
              
            </div>
        );
}

export default VisitorPostList;

