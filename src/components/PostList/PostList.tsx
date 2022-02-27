
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



import "./postlist.css"

const PostList: FC = () => {

    // let posts = []

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

        // console.log(commentsArray)

        for(let i = 0; i < commentsArray.length; i++ ){

            let loggedInComments = commentsArray[i] 
            
            const {comment_id, text_content, created_at, status, likes, user_id} = loggedInComments
                
                
            if(loggedInComments.hasOwnProperty("comment_id")){


                    posts.push( <Post key={comment_id} uuid={comment_id} userName={username} nickname={nickname} date_posted = {created_at} user_profile={profile_pic_url} text_content={text_content === null? 0: text_content} userPosts={userPosts} setUserPosts={setUserPosts} loggedInComments={commentsArray} createPosts={createPosts} posts={posts} status={ status} likes={likes} /> );

                
            }
            
        }


        return posts
    }
    
    useEffect(() => {

        fetch(`http://localhost:3001/home/${id}`, {
                method: "get",
                headers: { "Content-Type": "application/json"},
            }).then(response => response.json())
            .then(comments => {

                console.log(comments)
                console.log("running")
                setUserPosts(createPosts(comments))
            })

    }, [])

    
    let posts = userPosts
    

    
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
                
                <CommentBox userPosts={userPosts} setUserPosts={setUserPosts} posts={posts} createPosts={createPosts}  ></CommentBox>
              
                {userPosts}
               
                {/* White  space at the end of the scroll section */}
                <div className="empty"></div>
            </Scroll>
              
            </div>
        );
}

export default PostList

