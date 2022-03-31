
import { FC, useContext, useState, useEffect } from "react";

import { Location, useLocation } from "react-router-dom";

import Scroll from "../Scroll/Scroll";

import Card from "../Card/Card";
import Post from "../Posts/Post";
import ProfileHeader from "../ProfileHeader/ProfileHeader";
import MiniProfile from "../MiniProfile/MiniProfile";
import CommentBox from "../CommentBox/CommentBox";

import { getRandomUserIDs } from "../utils/fetchRandomUserIDs";

import { createMiniProfiles } from "../utils/createMiniprofilesArray";

import SigninModalHOC from "../SigninModal/SigninModalHOC";
import UserInfoContext from "../context/UserInfoProvider";

import LoaderHOC from "../LoaderHOC/LoaderHOC";

import useUserInfo from "../hooks/useUserInfo";


import useAuth from "../hooks/useAuth";




import "./postlist.css"

const PostList: FC = () => {

    // let posts = []
    const { auth, setAuth } = useAuth();

    const [ postlistLoading, setPostlistLoading ] = useState();


    // eslint-disable-next-line
    // const [loggedInUser, setloggedInUser] = useContext(UserInfoContext);
    const { loggedInUser } = useContext( UserInfoContext);


    const [userPosts, setUserPosts] = useState();

    const [postsArray, setPostsArray] = useState();

    const [lastPostShown , setLastPostShown] = useState(10)

    // Get user comments
    const createPosts = (commentsArray) => {
        
        let posts = []

        // console.log(commentsArray)

        for(let i = 0; i < commentsArray.length; i++ ){

            let loggedInComments = commentsArray[i] 
            
            const {comment_id, text_content, created_at, status, likes, user_id, username, nickname, profile_pic_url} = loggedInComments;
            // const {username, nickname, id, profile_pic_url}: {username:string; nickname:string; id:string; profile_pic_url:string } = loggedInUser;
                
                
            if(loggedInComments.hasOwnProperty("comment_id")){


                    posts.push( <Post key={comment_id} uuid={comment_id} userName={username} nickname={nickname} date_posted = {created_at} user_profile={profile_pic_url} text_content={text_content === null? 0: text_content} userPosts={userPosts} setUserPosts={setUserPosts} loggedInComments={commentsArray} createPosts={createPosts} posts={posts} status={ status} likes={likes} /> );

                
            }
            
        }


        return posts
    }
    
    useEffect(() => {

        const setInitPosts = async() => {

            setPostlistLoading(true)
    
            await fetch(`http://localhost:3001/home/`, {
                    method: "get",
                    credentials:'include',
                        cache:'no-cache',
                        headers: {
                            
                            'Content-Type': 'application/json',
                          },
                }).then(response => response.json())
                .then(comments => {
    
                    // console.log(comments)
                    // console.log("running")

                    console.log("comments: ", comments)
    
                    setPostsArray(createPosts(comments))

                    console.log("postArray: ", postsArray)
    
                    let start = 0;
                    let howMany = 10;
    
                    let extractedArr = postsArray?.filter((item, index)=>{
                        return index >= start && index < howMany + start ;
                    })

                    console.log("extrated: ",extractedArr)
    
                    setUserPosts(extractedArr)
                    setLastPostShown(10)
    
                    setPostlistLoading(false)
                })
        }

        setInitPosts()




    }, [loggedInUser])

    
    let posts = userPosts

    useEffect(() => {

        setPostlistLoading(true)

        return (() => { setPostlistLoading(false)})


    }, [auth.user_id])

    const [ suggestedProfiles, setSuggestedProfiles ] = useState();

    let miniprofilesArray = [];

    // get three random user_ids
    useEffect(() => {

        (async (setSuggestedProfiles) => {

            const featuredUsers = await getRandomUserIDs(4);

            // console.log("featueredUsers: ", featuredUsers)

            setSuggestedProfiles(featuredUsers)

            // console.log("setSuggestedProfiles: ", suggestedProfiles)
            
        })(setSuggestedProfiles)
        
        // console.log("setSuggestedProfiles: ", suggestedProfiles)
        
    }, [])
    
    useEffect(() => {
        
        // console.log("setSuggestedProfiles 2: ", suggestedProfiles)
        // create the miniProfile  element list here

        miniprofilesArray = createMiniProfiles(suggestedProfiles);

        // console.log("miniprofilesArray2: ", miniprofilesArray)



    }, [suggestedProfiles])

    miniprofilesArray = createMiniProfiles(suggestedProfiles);

    const seeMorePosts = async () => {

        await fetch(`http://localhost:3001/home/`, {
            method: "get",
            credentials:'include',
                cache:'no-cache',
                headers: {
                    
                    'Content-Type': 'application/json',
                  },
        }).then(response => response.json())
        .then(comments => {

            // console.log("running")
            setPostsArray(createPosts(comments))

            // console.log(postsArray)

            if(lastPostShown < postsArray?.length ){
                const increment = 10;
        
                const lastNewPostIndex = lastPostShown? lastPostShown + increment: increment

                console.log(lastNewPostIndex)
        

                setLastPostShown(lastNewPostIndex)
        
                setUserPosts(postsArray?.slice(0,lastNewPostIndex))

            
        }
            else{
                
                
                
            }
            setPostlistLoading(false)
        })

        



    }

    useEffect(() => {

    
        // setUserPosts(postsArray?.slice(0,lastPostShown))

        console.log("postsArray: ",postsArray)
        setUserPosts(postsArray?.slice(0,lastPostShown))



    }, [postsArray])

    // console.log("miniprofilesArray: ", miniprofilesArray)

    
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
                        {miniprofilesArray}
                        {/* <MiniProfile></MiniProfile>

                        <MiniProfile></MiniProfile>
                        <MiniProfile></MiniProfile>

                        <MiniProfile></MiniProfile> */}

                    </div>
                </Card>
                
                <SigninModalHOC>

                    <CommentBox userPosts={userPosts} setUserPosts={setUserPosts} posts={posts} createPosts={createPosts} setPostsArray={setPostsArray} ></CommentBox>
                </SigninModalHOC>
                    
                <LoaderHOC loading={postlistLoading}>
                    <>
                        {userPosts}
                        <div onClick={seeMorePosts}className={lastPostShown >= postsArray?.length? "hidden" : "posts-see_more"}>See More &#8658;</div>
                    </>
                </LoaderHOC>

               
                {/* White  space at the end of the scroll section */}
                <div className="empty"></div>
            </Scroll>
              
            </div>
        );
}

export default PostList

