
import React, { FC, useEffect, useState, useContext } from "react";
import { Link, Route, BrowserRouter, Navigate, useLocation, useNavigate } from 'react-router-dom';


import { UserInfoContext } from "../context/userContext";

import Card from "../Card/Card";
import "./Posts.css";
import formatDate, { formatDateAgo } from "../utils/formatDate";

import getTagsMentionsLinks from "../utils/getTagsMentionsLinks";
import addLinkTags from "../utils/addLinkTags";


import { tagsMentionsEdit } from "../utils/tagMentions";
import useAuth from "../hooks/useAuth";
import useModal from "../hooks/useModal";
import SigininModal from "../SigninModal/SigninModal";
import { refreshTokenBool } from "../utils/tokenRefreshedBool";

import HeartIcon from "../svg/HeartIcon/HeartIcon2";
import CheckmarkIcon from "../svg/CheckmarkIcon/CheckmarkIcon";
import ShareIcon2 from "../svg/ShareIcon2/ShareIcon2";

const Post: FC = ({ uuid, userName, nickname, user_profile, date_posted, text_content, status }) => {

    
    
    const maxChars = 920;

    const { auth, setAuth } = useAuth();
    const { showModal, toggleModal } = useModal();
    const location = useLocation();  
    const navigate = useNavigate();

    
    const [loggedInUser, setloggedInUser] = useContext(UserInfoContext);

    const [postInformation, setPostInfomration] = useState({

        text_content: text_content,
        status: status
    });


    const [charsLeft, setCharsLeft] = useState(maxChars - postInformation.text_content.length);


    useEffect(() => {

        treatedText = addLinkTags(getTagsMentionsLinks(postInformation.text_content))

        // console.log("treated" ,treatedText)
    }, [postInformation.status, postInformation.text_content])


    

    // const readableDate:String = (new Date(date_posted).toString());

    let lastEditedReadable: String;
    
    if(postInformation.status[1] === ""){
        lastEditedReadable = "";
    }
    else{
        // lastEditedReadable = new Date(status[1]).toString();
        lastEditedReadable = formatDate(postInformation.status[1]);
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

    const toggleDeleteConfirmationVisible = async () => {

        try{

            if(await refreshTokenBool(auth, setAuth)){
    
                setDeleteConfirmationVisible(!deleteConfirmationVisible);
        
                if(editMode.visible){
        
                    let tempVisible:boolean = false;
            
                    setEdiMode(prevEditMode => ({ ...prevEditMode, "visible":tempVisible }))
        
                }
            }
            else{
    
                toggleModal()
                
                
            }
        }
        catch{
            
            toggleModal()
        }


    }

    const toggleEditMode = async () => {

        try{

            if(await refreshTokenBool(auth, setAuth)){
    
                
                        let tempVisible:boolean = !(editMode.visible);
                
                        setEdiMode(prevEditMode => ({ ...prevEditMode, "visible":tempVisible }))
                
                        if(deleteConfirmationVisible){
                
                            setDeleteConfirmationVisible(false);
                        }
                    }else{
                
                        // alert("please sign in to Edit post")
                        
                        // navigate("/", { replace: true });
                
                        toggleModal()
                    }
        }
        catch{

            toggleModal()
                    
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

    const handleDelete = (e) => {

        e.preventDefault();

        fetch(`http://localhost:3001/home/delete/${uuid}`, {
    
            method: "post",
            headers: { "Content-Type": "application/json"},

        })
        .then(res => res.json()
        )
        .then( (comment) => {

            // setUser(user => ({ ...user, [pictureType]:src }))
            // console.log("comment", comment["status"])
            setPostInfomration(prev => ({...prev, status: comment["status"], text_content: comment["text_content"]}))
        })
        .catch(console.log)

    }


    const oninputChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        if(e === null){
            return
        }

        setEdiMode(prev => ({ ...prev, [e.target.name]: e.target.value }))

        setCharsLeft(maxChars - e.target.value.length)

        e.preventDefault()
    }

    
    const handleEdit = async (e: React.ChangeEvent<HTMLInputElement>) => {

        e.preventDefault();

        toggleEditMode()

        // console.log(editMode.textContent)

        fetch(`http://localhost:3001/home/update/${uuid}`, {
    
            method: "post",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({
                text_content: editMode.textContent
            })

        })
        .then(res => res.json()
        )
        .then( (comment) => {

            // setUser(user => ({ ...user, [pictureType]:src }))
            // console.log("edit comment", comment["status"], " ", comment["text_content"])
            setPostInfomration(prev => ({...prev, status: comment["status"], text_content: comment["text_content"]}))
        })
        .catch(console.log)


        await tagsMentionsEdit(uuid, editMode["textContent"])


    }

    const exitEditMode = (e) => {

        toggleEditMode();

        setEdiMode(prev => ({ ...prev, "textContent": `${postInformation.text_content}` }))

        setCharsLeft(maxChars- postInformation.text_content.length);

        e.preventDefault()


    }

    let treatedText = addLinkTags(getTagsMentionsLinks(postInformation.text_content))

 

        return(

            <>

                <SigininModal
                    showModal={showModal}
                    hide={toggleModal}
                />

            {postInformation.status[0] === "Deleted"?
            <Card classes="content post deleted">
                    
            <p className="post_body_text">This Post was Deleted by the user</p>
            
       
            </Card>
            :

        
            <Card classes="content post">

                {
                status[0] === "Deleted"
                ?
                <>
                {/* {console.log(status[0])} */}
                <p className="post_body_text">This Post was Deleted by the user</p>
                </> 
                :
                <>
                {/* {console.log(status[0])} */}
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
                            <em>{nickname}</em>
                            <span className="user_info__pipe on_Gthan750px"> | </span>
                            <em className="datePosted on_Gthan750px"> {formatDateAgo(new Date(new Date(date_posted).toUTCString()).getTime())}</em>
                            
                            <span className="user_info__pipe on_750px"><em className="datePosted"> ○ {formatDateAgo(date_posted)}</em></span>
                            

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

                           {/* {addLinkTags(getTags(postInformation.text_content))} */}
                           {treatedText}
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
                                <HeartIcon comment_id={uuid} loggedInId={loggedInUser.id}></HeartIcon>
                                <CheckmarkIcon></CheckmarkIcon>
                                <ShareIcon2></ShareIcon2>
                                <ShareIcon2></ShareIcon2>
                            </div>
                            <div className="post__lastEdited">
                            {postInformation.status[0] === "Edited"? (<React.Fragment><p>Lasted Edited on: </p><p> {lastEditedReadable}</p></React.Fragment>):<p></p>}
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
                </>
         }
            </Card>
        }
            </>
        );
}

export default Post


