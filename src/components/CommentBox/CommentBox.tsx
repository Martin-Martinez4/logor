
import React, { FC, useState } from "react";

import { v4 as uuidv4 } from 'uuid';

import "./CommentBox.css";
import Card from "../Card/Card";

const PostBox:FC = ({ userPosts, setUserPosts, posts, createPosts, loggedInComments }) => {

    
    const [ newPost, setNewPost ] = useState({

        commentBox:""

    })

    const oninputChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        if(e === null){
            return
        }

        setNewPost(prev => ({ ...prev, [e.target.name]: e.target.value }))

        e.preventDefault()
    }

    const addPostToList = () => {

        let ui_id = uuidv4();

        let test = "test"
        

        setUserPosts(user => ( { [ui_id]: {
            "date_made":`Mon Dec 13 2021 21:50:40 GMT-0700 (Mountain Standard Time)`,

            "text_content":` ${newPost.commentBox}`,
            
            "like": "0",
            "replies": []
        } , ...user}))


        posts = createPosts(loggedInComments)


    }


    return(

        <Card classes="content content__commentBox">

            <textarea id="commentBox" name="commentBox" value={newPost.commentBox} onChange={oninputChange} className="commentBox__commentInput" placeholder="Have something to say?" maxLength={920} cols={92} rows={10}></textarea>

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



