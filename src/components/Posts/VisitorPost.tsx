
import React, { FC, useEffect, useState } from "react";
import { Link, Route, BrowserRouter } from 'react-router-dom';

import Card from "../Card/Card";
import "./Posts.css";
import formatDate, { formatDateAgo } from "../utils/formatDate";

import HeartIcon from "../../assets/svg/HeartIcon/HeartIcon2";
import CheckmarkIcon from "../../assets/svg/CheckmarkIcon/CheckmarkIcon";
import ShareIcon2 from "../../assets/svg/ShareIcon2/ShareIcon2";
const VisitorPost: FC = ({ uuid, userName, tag, user_profile, date_posted, text_content, userPosts, posts, status, setUserPosts, createPosts, loggedInComments }) => {

    const maxChars = 920;

    const [charsLeft, setCharsLeft] = useState(maxChars- text_content.length);

    // let subTest = ([<span>paratgraosd</span>, <a>test</a>, <p>asdasdasd</p>])

    const getTags = (text_string) => {

        //eslint-disable-next-line
        const pattern = /(#|@)[a-zA-Z]{1}[a-zA-Z0-9]{1,14}|((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/g;

        let match;

        let tempArray = [];

        // let startOfText = true;

        let tempPrevIndex;

        while(match = pattern.exec(text_content)){

            tempArray.push([text_string.substring(tempPrevIndex, match.index)])
            tempArray.push([text_string.substring(match.index, pattern.lastIndex)])

            tempPrevIndex = pattern.lastIndex;

        }

        if(tempPrevIndex !== text_content.length){

            
            tempArray.push([text_string.substring(tempPrevIndex, text_content.length)])
        }

        // console.log(tempArray)

        return tempArray;
    }

    const addLinkTags = (treatedArray) => {

        let linkTagsAdded = [];

        //eslint-disable-next-line
        const pattern = /(#|@)[a-zA-Z]{1}[a-zA-Z0-9]{1,14}|((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/g;

        for(let i = 0; i < treatedArray.length; i++){

            if(pattern.test(treatedArray[i][0])){

                linkTagsAdded.push(<a href="/user">{treatedArray[i]}</a>)
            }
            else if(treatedArray[i][0][0] === undefined){

                linkTagsAdded.push(" ");
            }
            else{
                
                // console.log(pattern.test(treatedArray[i][0]))
                linkTagsAdded.push(<span>{treatedArray[i]}</span>);
            }
        }

        // console.log("linkTagsAdded: ",linkTagsAdded)

        return linkTagsAdded;


    }


    const readableDate:String = (new Date(date_posted).toString());

    let lastEditedReadable: String;
    
    if(status[1] === 0){
        lastEditedReadable = "";
    }
    else{
        // lastEditedReadable = new Date(status[1]).toString();
        lastEditedReadable = formatDate(status[1]);
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

    // const handleDelete = (e) => {

    //     // When session token implemented, check for token

    //     console.log(uuid)
    //     // update the database
    //     loggedInComments[uuid]["text_content"] = "";
    //     loggedInComments[uuid]["status"] = "Deleted";

    //     // console.log(loggedInComments[uuid])

    //     // Update  the front end state

    //     const tempStatus = ["Deleted", new Date().getTime()]

    //     const deletedPost = {[uuid]: {
    //         "date_made":`${date_posted}`,

    //         "text_content":``,
            
    //         "like": "0",
    //         "status":tempStatus,
    //         "replies": []
    //     }}

    //     const newUsers = Object.assign({}, userPosts, deletedPost)

    //     setUserPosts(newUsers)



    // }

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
                                </span>
                            </span>
                        </div>
                            <em>@{tag}</em>
                            <span className="user_info__pipe on_Gthan750px"> | </span>
                            <em className="datePosted on_Gthan750px"> {formatDateAgo(date_posted)}</em>
                            
                            <span className="user_info__pipe on_750px"><em className="datePosted"> ○  {formatDateAgo(date_posted)}</em></span>
                            

                </div>
                   <div>

                       
                            <p className="post_body_text">
                           {addLinkTags(getTags(text_content))}
                            </p>
                    </div>

                  

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
                
                    </span>
                </span> 
            </Card>
        );
}

export default VisitorPost;

