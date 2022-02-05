
import React, { FC, useState } from "react";

import { v4 as uuidv4 } from 'uuid';

import "./CommentBox.css";
import Card from "../Card/Card";

const PostBox:FC = ({ userPosts, setUserPosts, posts, createPosts, loggedInComments }) => {

    
    const [ newPost, setNewPost ] = useState({

        commentBox:""

    })

    const oninputChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        e.preventDefault()
        
        if(e === null){
            return
        }
        console.log("test", e.target.value);
        setNewPost(prev => ({ ...prev, [e.target.name]: e.target.value }))

    }

    const handleKeyDown = (e: React.ChangeEvent<HTMLInputElement>) => {

        if (e.key === "Tab") {
            e.preventDefault();

            let tabAdded = e.target.value + "\t"; 

            setNewPost(prev => ({ ...prev, [e.target.name]: tabAdded }))
        
            console.log("tab");
          }

        if (e.key === "Enter") {
            e.preventDefault();

            let tabAdded = e.target.value + "\n"; 

            setNewPost(prev => ({ ...prev, [e.target.name]: tabAdded }))
        
            console.log("test", e.target.value);
          }
    }

    const clearInput = (targetName, setFunction) => {

        setFunction({[targetName]:""})
    }

    const addPostToList = () => {

        let ui_id = uuidv4();   

        const currTime = new Date().getTime()
        
        const readableDate:String = (new Date(currTime).toString());

        setUserPosts(user => ( { [ui_id]: {
            "date_made":`${readableDate}`,

            "text_content":` ${newPost.commentBox}`,
            
            "like": "0",
            "replies": []
        } , ...user}))


        posts = createPosts(loggedInComments)

        clearInput("commentBox", setNewPost);

    }


    return(

        <Card classes="content content__commentBox">

            <textarea id="commentBox" name="commentBox" value={newPost.commentBox} onChange={oninputChange} onKeyDown={handleKeyDown} className="commentBox__commentInput" placeholder="Have something to say?" maxLength={920} cols={92} rows={10}></textarea>

            <div className="commentBox__buttonArea">
                
                <em className="buttonArea__charsLeft">Characters Left: 920</em>
                <div className="buttonArea__buttons">
                    <button className="button primary" onClick={() => addPostToList()}>Submit</button>
                    <button className="button red">Cancel</button>

                </div>
            </div>
        </Card>
)

}

export default PostBox;



