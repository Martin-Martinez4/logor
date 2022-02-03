
import React, { FC, useEffect, useState } from "react";

import Card from "../Card/Card";
import "./Posts.css";

import HeartIcon from "../../assets/svg/HeartIcon/HeartIcon2";
import CheckmarkIcon from "../../assets/CheckmarkIcon.svg";
import ShareIcon from "../../assets/ShareIcon2.svg";

const Post: FC = ({ uuid, userName, tag, user_profile, date_posted, text_content, userPosts, posts, setUserPosts, createPosts, loggedInComments }) => {


    const dropdownContainer = React.createRef();
    const cancelButton = React.createRef();
    
    const [dropdownVisible, setDropdownVisible] = useState(false);

    const [deleteConfirmationVisible, setDeleteConfirmationVisible] = useState(false);

    const [editMode, setEdiMode] = useState({

        visible: false,
        textContent: text_content
    });

    const toggleDropDownVisible = () => {

        setDropdownVisible(!dropdownVisible);

    }

    const toggleDeleteConfirmationVisible = () => {

        
        setDeleteConfirmationVisible(!deleteConfirmationVisible);

        if(editMode.visible){

            let tempVisible:boolean = false;
    
            setEdiMode(prevEditMode => ({ ...prevEditMode, ["visible"]:tempVisible }))
        }

    }

    const toggleEditMode = () => {
        

        let tempVisible:boolean = !(editMode.visible);

        setEdiMode(prevEditMode => ({ ...prevEditMode, ["visible"]:tempVisible }))

        if(deleteConfirmationVisible){

            setDeleteConfirmationVisible(false);
        }
    }


    useEffect(() => {

        document.addEventListener("mouseup", handleClickOutside);


        return () => {

            document.removeEventListener("mouseup", handleClickOutside);
        }
    }, [dropdownVisible, deleteConfirmationVisible, editMode]);

    const handleClickOutside = (e) => {
       
        if (
            dropdownContainer.current &&
            !dropdownContainer?.current?.contains(e.target)
            ) {
                setDropdownVisible(false);
            }
 
        if (
            cancelButton.current &&
            !cancelButton?.current?.contains(e.target)
            ) {
                setDeleteConfirmationVisible(false);
            }
 
 
    };

    const handleDelete = (e) => {

        // When session token implemented, check for token

        console.log(uuid)
        // update the database
        loggedInComments[uuid]["text_content"] = "";
        loggedInComments[uuid]["status"] = "Deleted";

        // console.log(loggedInComments[uuid])

        // Update  the front end state

        const deletedPost = {[uuid]: {
            "date_made":`${date_posted}`,

            "text_content":``,
            
            "like": "0",
            "status":"Deleted",
            "replies": []
        }}

        const newUsers = Object.assign({}, userPosts, deletedPost)

        setUserPosts(newUsers)



    }

    const oninputChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        if(e === null){
            return
        }

        setEdiMode(prev => ({ ...prev, [e.target.name]: e.target.value }))

        e.preventDefault()
    }

    const handleEdit = () => {

        loggedInComments[uuid]["text_content"] = editMode.textContent;

        toggleEditMode()

        const editedPost = {
            [uuid]:
            {
            "date_made":`${date_posted}`,

            "text_content":`${ editMode.textContent}`,
            
            "like": "0",
            "status":"Edited",
            "replies": []
        }}

        
        const editedUsers = Object.assign({}, userPosts, editedPost)
        
        setUserPosts(editedUsers)

        
    }

    const exitEditMode = (e) => {

        toggleEditMode();

        setEdiMode(prev => ({ ...prev, ["textContent"]: `${text_content}` }))

        e.preventDefault()


    }

 

        return(
            <Card classes="content post">
                <div className="post user_image">
                    <img src={user_profile} alt="profile" className="post_user_image "></img>
                   
                </div>
                <div className="post user_content">
                   <div className="post user_info">
                        <strong>{userName}</strong>
                        <em>@{tag}</em>
                        <span className="user_info__pipe"> | </span>
                        <em>{date_posted}</em>

                   </div>
                   <div>

                        {editMode.visible? 
                            (
                                <div>
                                    <textarea id="commentBox" name="textContent" value={editMode.textContent} onChange={oninputChange} className="commentBox__commentInput" placeholder="Have something to say?" maxLength={920} cols={92} rows={10}></textarea>

                                    <div className="commentBox__buttonArea">
                                        
                                        <em className="buttonArea__charsLeft">Characters Left: 920</em>
                                        <div className="buttonArea__buttons">
                                            <button className="button primary" onClick={handleEdit}>Submit</button>
                                            <button className="button red" onClick={exitEditMode} >Cancel</button>

                                        </div>
                                    </div>
                                </div>
                            ) 
                            :
                            <p className="post_body_text">
                           { text_content}
                            </p>
                            }
                    </div>

                    <span className={`dropdown ${deleteConfirmationVisible?"visible":"invisible"}`} >
                        <p>Are you sure you want to delete this post</p>
                        <div>
                            <button className="button red" onClick={toggleDeleteConfirmationVisible} ref={cancelButton}>No</button>
                            <button className="button primary" onClick={handleDelete} >Yes</button>

                        </div>
                    </span>

                    <div className="post__icons">
                        <HeartIcon></HeartIcon>
                        <img src={CheckmarkIcon}></img>
                        <img src={ShareIcon}></img>
                        <p>Lasted Edited on MM-DD-YYYY-HH:MM</p>
                    </div>
                </div>
                <span className="option_dots" onClick={toggleDropDownVisible}>
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <span className={`dropdown ${dropdownVisible?"visible":"invisible"}`} ref={dropdownContainer}>
                        <p>Embed</p>
                        <p onClick={toggleEditMode}>Edit</p>
                        <p onClick={toggleDeleteConfirmationVisible}>Delete</p>
                    </span>
                </span>
            </Card>
        );
}

export default Post


