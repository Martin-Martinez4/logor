
import React, { FC, useEffect, useState } from "react";

import Card from "../Card/Card";
import "./Posts.css";

import HeartIcon from "../../assets/svg/HeartIcon/HeartIcon2";
import CheckmarkIcon from "../../assets/svg/CheckmarkIcon/CheckmarkIcon";
import ShareIcon2 from "../../assets/svg/ShareIcon2/ShareIcon2";
const Post: FC = ({ uuid, userName, tag, user_profile, date_posted, text_content, userPosts, posts, status, setUserPosts, createPosts, loggedInComments }) => {

    const maxChars = 920;

    const [charsLeft, setCharsLeft] = useState(maxChars- text_content.length);


    const readableDate:String = (new Date(date_posted).toString());

    let lastEditedReadable: String;
    
    if(status[1] === 0){
        lastEditedReadable = "";
    }
    else{
        lastEditedReadable = new Date(status[1]).toString();
    }

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
    
            setEdiMode(prevEditMode => ({ ...prevEditMode, "visible":tempVisible }))

            setCharsLeft(maxChars - text_content.length);
        }

    }

    const toggleEditMode = () => {
        

        let tempVisible:boolean = !(editMode.visible);

        setEdiMode(prevEditMode => ({ ...prevEditMode, "visible":tempVisible }))

        if(deleteConfirmationVisible){

            setDeleteConfirmationVisible(false);
        }
    }

    
    // const handleClickOutside = (e) => {
        
    //     if (
    //         dropdownContainer.current &&
    //         !dropdownContainer?.current?.contains(e.target)
    //         ) {
    //             setDropdownVisible(false);
    //         }
            
    //     if (
    //         cancelButton.current &&
    //         !cancelButton?.current?.contains(e.target)
    //         ){
    //             setDeleteConfirmationVisible(false);
    //         }
                
            
    // };
        
    useEffect(() => {

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
                ){
                    setDeleteConfirmationVisible(false);
                }
                    
                
        };

        document.addEventListener("mouseup", handleClickOutside);


        return () => {

            document.removeEventListener("mouseup", handleClickOutside);
        }
      

    }, [dropdownVisible, deleteConfirmationVisible, editMode, status,  cancelButton, dropdownContainer]);

    const handleDelete = (e) => {

        // When session token implemented, check for token

        console.log(uuid)
        // update the database
        loggedInComments[uuid]["text_content"] = "";
        loggedInComments[uuid]["status"] = "Deleted";

        // console.log(loggedInComments[uuid])

        // Update  the front end state

        const tempStatus = ["Deleted", new Date().getTime()]

        const deletedPost = {[uuid]: {
            "date_made":`${date_posted}`,

            "text_content":``,
            
            "like": "0",
            "status":tempStatus,
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

        setCharsLeft(maxChars - e.target.value.length)

        e.preventDefault()
    }

    const handleEdit = (e: React.ChangeEvent<HTMLInputElement>) => {

        


        loggedInComments[uuid]["text_content"] = editMode.textContent;

        toggleEditMode()

        const currTime = new Date().getTime();
        // text_content === editMode.textContent? status =="Edited"? "Edited":"":"Edited";

        
        let statusToSet:[String, number] = ["", 0];

        if(text_content === editMode.textContent){

            if(status[0] === ""){

                statusToSet =  ["", 0];
            
            }
            
            else if(status[0] === "Edited"){
    
                statusToSet = ["Edited", currTime]
            }


        }
        else{
            statusToSet = ["Edited", currTime];
        }


        const editedPost = {
            [uuid]:
            {
            "date_made":`${date_posted}`,

            "text_content":`${editMode.textContent}`,
            
            "like": "0",
            "status":statusToSet,
            "replies": []
        }}

        
        const editedUsers = Object.assign({}, userPosts, editedPost)
        
        setUserPosts(editedUsers)

        
    }

    const exitEditMode = (e) => {

        toggleEditMode();

        setEdiMode(prev => ({ ...prev, "textContent": `${text_content}` }))

        setCharsLeft(maxChars- text_content.length);

        e.preventDefault()


    }

 

        return(
            <Card classes="content post">
                <div className="post user_image">
                    <img src={user_profile} alt="profile" className="post_user_image "></img>
                   
                </div>
                <div className="post user_content">
                    <div className="post user_info">
                        <div className="userNameArea">

                            <strong>{userName} </strong>

                            {/* Small Screen option dots */}
                            <span className="option_dots on_750px" onClick={toggleDropDownVisible} >
                                <div className="dot"></div>
                                <div className="dot"></div>
                                <div className="dot"></div>
                                <span className={`dropdown ${dropdownVisible?"visible":"invisible"}`} ref={dropdownContainer}>

                                    <p>Embed</p>
                                    <p onClick={toggleEditMode}>Edit</p>
                                    <p onClick={toggleDeleteConfirmationVisible}>Delete</p>
                                </span>
                            </span>
                        </div>
                            <em>@{tag}</em>
                            <span className="user_info__pipe on_Gthan750px"> | </span>
                            <em className="datePosted on_Gthan750px"> {readableDate}</em>
                            
                            <span className="user_info__pipe on_750px"><em className="datePosted"> ○ {readableDate}</em></span>

                            {/* <span className="option_dots on_Gthan750px" onClick={toggleDropDownVisible}>
                                <div className="dot"></div>
                                <div className="dot"></div>
                                <div className="dot"></div>
                                <span className={`dropdown ${dropdownVisible?"visible":"invisible"}`} ref={dropdownContainer}>
                                    <p>Embed</p>
                                    <p onClick={toggleEditMode}>Edit</p>
                                    <p onClick={toggleDeleteConfirmationVisible}>Delete</p>
                                </span>
                            </span>  */}
                            

                </div>
                   <div>

                        {editMode.visible? 
                            (
                                <div>
                                    <textarea id="commentBox" name="textContent" value={editMode.textContent} onChange={oninputChange} className="commentBox__commentInput" placeholder="Have something to say?" maxLength={maxChars} cols={92} rows={10}></textarea>

                                    <div className="commentBox__buttonArea">
                                        
                                        <em className="buttonArea__charsLeft">Characters Left: {charsLeft}</em>
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

                    <div className="post__bottomArea">
                        {
                            (deleteConfirmationVisible|| editMode.visible)? 
                            <div> </div> :
                            <React.Fragment>
                               <div className="post__icons">
                                <HeartIcon></HeartIcon>
                                <CheckmarkIcon></CheckmarkIcon>
                                <ShareIcon2></ShareIcon2>
                                <ShareIcon2></ShareIcon2>
                            </div>
                            <div className="post__lastEdited">
                            {status[0] === ""?<p></p>: (<React.Fragment><p>Lasted Edited on: </p><p> {lastEditedReadable}</p></React.Fragment>)}
                            </div>

                            </React.Fragment>
                        }

                    </div>
                </div>
                <span className="option_dots on_Gthan750px" onClick={toggleDropDownVisible}>
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


