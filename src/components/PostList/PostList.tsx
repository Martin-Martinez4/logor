
import { FC, useContext, useState, useEffect } from "react";

import { v4 as uuidv4 } from 'uuid';

import Scroll from "../Scroll/Scroll";

import Post from "../Posts/Post";
import Card from "../Card/Card";
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

        console.log("effect: ",userPosts)

    },[userPosts])

    
    let postsList = (loggedInComments) => {
        
        let posts = []
        
        for(let key in loggedInComments){
            
            let text = loggedInComments[key]["text_content"];
            let date = loggedInComments[key]["date_made"];
            
            if(loggedInComments.hasOwnProperty(key)){
                
                posts.push( <Post key={key} uuid={key}userName={username} tag={tag} date_posted = {date} user_profile={profile_pic_url} text_content={text} /> );
            }
        }
        
        return posts
    }

    let posts = postsList(userPosts)
    
    // On create a post set(old => {new, ...old}),then 
    const addPostToList = () => {

        let ui_id = uuidv4();

        let test = "test"
        

    

        setUserPosts(user => ( { [ui_id]: {
            "date_made":`${test}Mon Dec 13 2021 21:50:40 GMT-0700 (Mountain Standard Time)`,

            "text_content": "The Apollotec B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design Cross-group 3rd generation frame",
            
            "like": "0",
            "replies": []
        } , ...user}))


        posts = postsList(loggedInComments)


    }
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
                
                {/* <CommentBox userPosts={userPosts} setUserPosts={setUserPosts} addPostToList={addPostToList} ></CommentBox> */}
                {/* comment box area was changed from being a component to being part of this component to simplify the post creation function */}
                <Card classes="content content__commentBox">

                    <textarea id="commentBox" name="commentBox" className="commentBox__commentInput" placeholder="Have something to say?" maxLength={920} cols={92} rows={10}></textarea>

                    <div className="commentBox__buttonArea">
                        
                        <em className="buttonArea__charsLeft">Characters Left: 920</em>
                        <div className="buttonArea__buttons">
                            <button className="button primary" onClick={() => addPostToList()}>Submit</button>
                            <button className="button red">Cancel</button>

                        </div>
                    </div>
                </Card>

                {posts}
                <button onClick={() => addPostToList()}>Test</button>
               
                {/* White  space at the end of the scroll section */}
                <div className="empty"></div>
            </Scroll>
              
            </div>
        );
}

export default PostList

