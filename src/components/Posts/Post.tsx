
import React, { FC, useEffect, useState } from "react";

import Card from "../Card/Card";
import "./Posts.css";

const Post: FC = ({ uuid, userName, tag, user_profile, date_posted, text_content, userPosts, posts, setUserPosts, createPosts, loggedInComments }) => {


    const container = React.createRef();
    const cancelButton = React.createRef();
    
    const [dropdownVisible, setDropdownVisible] = useState(false);

    const [deleteConfirmationVisible, setDeleteConfirmationVisible] = useState(false);

    const toggleDropDownVisible = () => {

        setDropdownVisible(!dropdownVisible);

    }

    const toggleDeleteConfirmationVisible = () => {

        
        setDeleteConfirmationVisible(!deleteConfirmationVisible);
        console.log(deleteConfirmationVisible)

    }


      useEffect(() => {

        document.addEventListener("mouseup", handleClickOutside);


        return () => {

            document.removeEventListener("mouseup", handleClickOutside);
        }
    }, [dropdownVisible, deleteConfirmationVisible]);

    const handleClickOutside = (e) => {
       
        if (
            container.current &&
            !container?.current?.contains(e.target)
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

        console.log(uuid)
        loggedInComments[uuid]["text_content"] = "";
        loggedInComments[uuid]["status"] = "Deleted";

        // console.log(loggedInComments[uuid])

        setUserPosts(user => ( { [uuid]: {
            "date_made":`Mon Dec 13 2021`,

            "text_content":``,
            
            "like": "0",
            "status":"Deleted",
            "replies": []
        } , ...user}))

        console.log( loggedInComments[uuid])

        posts = createPosts(userPosts)

        console.log(posts)


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
                    <p className="post_body_text">{text_content}</p>
                    <span className={`dropdown ${deleteConfirmationVisible?"visible":"invisible"}`} >
                        <p>Are you sure you want to delete this post</p>
                        <div>
                            <button className="button red" onClick={toggleDeleteConfirmationVisible} ref={cancelButton}>No</button>
                            <button className="button primary" onClick={handleDelete} >Yes</button>

                        </div>
                    </span>
                </div>
                <span className="option_dots" onClick={toggleDropDownVisible}>
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <span className={`dropdown ${dropdownVisible?"visible":"invisible"}`} ref={container}>
                        <p>Embed</p>
                        <p>Edit</p>
                        <p onClick={toggleDeleteConfirmationVisible}>Delete</p>
                    </span>
                </span>
            </Card>
        );
}

export default Post


