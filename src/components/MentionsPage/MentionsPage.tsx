
import { FC, useEffect, useState, useContext } from 'react';

import UserInfoContext from '../context/UserInfoProvider';

import VisitorPost from '../Posts/VisitorPost';
const MentionsPage:FC = ({ user }) => {

    const [mentionsArray, setMentionsArray] = useState();

    const { loggedInUser } = useContext( UserInfoContext);
    
    const [ postlistLoading, setPostlistLoading ] = useState();


    const [userMentions, setUserMentions] = useState();


    const [lastMentionShown , setLastMentionShown] = useState(10)

    const createPosts = (commentsArray) => {
        
        let posts = []

        for(let i = 0; i < commentsArray.length; i++ ){

            let loggedInComments = commentsArray[i] 
            
            const {comment_id, text_content, created_at, status, likes, user_id, username, nickname, profile_pic_url} = loggedInComments;                
                
            if(loggedInComments.hasOwnProperty("comment_id")){

                posts.push( <VisitorPost key={comment_id} uuid={comment_id} userName={username} nickname={nickname} date_posted = {created_at} user_profile={profile_pic_url} text_content={text_content === null? 0: text_content} loggedInComments={commentsArray} createPosts={createPosts} posts={posts} status={ status} likes={likes} /> );

                
            }
            
        }


        return posts
    }

    useEffect(() => {

        const getMentionPost = async () => {

            await fetch(`http://localhost:3001/home/posts/mentions/`, {
                method: "get",
                credentials:'include',
                    cache:'no-cache',
                    headers: {
                        
                        'Content-Type': 'application/json',
                      },
            }).then(response => response.json())
            .then(comments => {

                setMentionsArray(createPosts(comments))


                let start = 0;
                let howMany = 10;

                let extractedArr = mentionsArray?.filter((item, index)=>{
                    return index >= start && index < howMany + start ;
                })
                
                console.log("thing: ",mentionsArray)

                setUserMentions(extractedArr)
                setLastMentionShown(10)

                setPostlistLoading(false)
            })
        }

        getMentionPost()

    }, [loggedInUser.id])

    useEffect(() => {

        console.log("mentionsArray: ",mentionsArray)
        setUserMentions(mentionsArray?.slice(0,lastMentionShown))


    }, [mentionsArray])


    return(
        <>
            <div>Mentions Go Here</div>
            {userMentions}
        </>
    )
    

}

export default MentionsPage;


