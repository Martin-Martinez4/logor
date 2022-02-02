
import { FC, useContext, useState, useEffect } from "react";

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

    const [loggedInUser, setloggedInUser] = useContext(UserInfoContext);

    const {username, tag, id, profile_pic_url}: {username:string; tag:string; id:string; profile_pic_url:string } = loggedInUser;

    let loggedInComments = sortedComments[id];

    const [userPosts, setUserPosts] = useState(loggedInComments);

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

                    if(loggedInComments[key]["status"] === "Deleted"){

                        console.log("should  have worked")
    
                        posts.push(<DeletedPost uuid={key} />);
    
                    }
                
                }else{

                    posts.push( <Post key={key} uuid={key} userName={username} tag={tag} date_posted = {date} user_profile={profile_pic_url} text_content={text} userPosts={userPosts} setUserPosts={setUserPosts} loggedInComments={loggedInComments} createPosts={createPosts} posts={posts} /> );
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

