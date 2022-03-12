
import React, { FC, useState, useContext } from "react";

import { v4 as uuidv4 } from 'uuid';

import "./CommentBox.css";
import Card from "../Card/Card";
import { refreshTokenBool } from "../utils/tokenRefreshedBool";

import useModal from "../hooks/useModal";
// import SigininModal from "../SigninModal/SigninModal";
import useAuth from "../hooks/useAuth";

import useSigninModal from "../hooks/useModal";


import { tagsMentionsCreate } from "../utils/tagMentions";
import { UserInfoContext } from "../context/userContext";

const PostBox:FC = ({ userPosts, setUserPosts, posts, createPosts, loggedInComments }) => {

    const [loggedInUser, setloggedInUser] = useContext(UserInfoContext);

    const {id}: {id:string; profile_pic_url:string } = loggedInUser;

    const maxChars = 920;

    const { auth, setAuth } = useAuth();

    const { showModal, toggleModal } = useSigninModal();

    // const { showModal, toggleModal } = useModal();
    
    const [ newPost, setNewPost ] = useState({

        commentBox:""

    });

    const [charsLeft, setCharsLeft] = useState(maxChars)

    const oninputChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        e.preventDefault()
        
        if(e === null){
            return
        }


        setCharsLeft(maxChars - e.target.value.length)

        setNewPost(prev => ({ ...prev, [e.target.name]: e.target.value }))


    }

    const handleKeyDown = (e: React.ChangeEvent<HTMLInputElement>) => {

        if (e.key === "Tab") {
            e.preventDefault();

            let tabAdded = e.target.value + "\t"; 

            setNewPost(prev => ({ ...prev, [e.target.name]: tabAdded }))
        
          }

        if (e.key === "Enter") {
            e.preventDefault();

            let tabAdded = e.target.value + "\n"; 

            setNewPost(prev => ({ ...prev, [e.target.name]: tabAdded }))
        
          }
    }

    const clearInput = (targetName, setFunction) => {

        setFunction({[targetName]:""})
    }

    const addPostToList = async () => {

        try{

            if(await refreshTokenBool(auth, setAuth)){
        
                const comment_id = uuidv4();
        
                fetch(`http://localhost:3001/home/${id}`, {
        
                    method: "post",
                    headers: { "Content-Type": "application/json"},
                    body: JSON.stringify({
                        user_id: id,
                        text_content: newPost.commentBox,
                        newComment_id: comment_id
                    })
                })
                .then((response) => {
        
                    tagsMentionsCreate(comment_id, newPost["commentBox"])
                    return response.json()
        
        
        
                }).then((comments) => {
        
                    setUserPosts(createPosts(comments))
                })
        
        
        
                clearInput("commentBox", setNewPost);
        
                setCharsLeft(maxChars);



            }else{

                toggleModal()
                // setShowModal(true)


            }
            

        }
        catch{

            toggleModal()
            // setShowModal(true)



        }

    }

    const handleCancelCommentBox = () => {

        clearInput("commentBox", setNewPost);
        setCharsLeft(maxChars);

    }


    return(

        <Card classes="content content__commentBox">


            <textarea id="commentBox" name="commentBox" value={newPost.commentBox} onChange={oninputChange} onKeyDown={handleKeyDown} className="commentBox__commentInput" placeholder="Have something to say?" maxLength={maxChars} cols={92} rows={10}></textarea>

            <div className="commentBox__buttonArea">
                
                <em className="buttonArea__charsLeft">Characters Left: {charsLeft}</em>
                <div className="buttonArea__buttons">
                    <button className="button primary" onClick={() => addPostToList()}>Submit</button>
                    <button className="button red" onClick={() => handleCancelCommentBox()}>Cancel</button>

                </div>
            </div>
        </Card>
)

}

export default PostBox;



