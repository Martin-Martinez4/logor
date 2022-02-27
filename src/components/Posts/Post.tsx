
import React, { FC, useEffect, useState, useContext } from "react";
import { Link, Route, BrowserRouter } from 'react-router-dom';


import { UserInfoContext } from "../userContext/userContext";

import Card from "../Card/Card";
import "./Posts.css";
import formatDate, { formatDateAgo } from "../utils/formatDate";

import HeartIcon from "../../assets/svg/HeartIcon/HeartIcon2";
import CheckmarkIcon from "../../assets/svg/CheckmarkIcon/CheckmarkIcon";
import ShareIcon2 from "../../assets/svg/ShareIcon2/ShareIcon2";

const Post: FC = ({ uuid, userName, nickname, user_profile, date_posted, text_content, userPosts, posts, status, setUserPosts, createPosts, loggedInComments }) => {

    const maxChars = 920;

    // const [loggedInUser, setloggedInUser] = useContext(UserInfoContext);

    const [postInformation, setPostInfomration] = useState({

        text_content: text_content,
        status: status
    });


    const [charsLeft, setCharsLeft] = useState(maxChars - postInformation.text_content.length);


    useEffect(() => {

        treatedText = addLinkTags(getTagsAtsLinks(postInformation.text_content))

        // console.log("treated" ,treatedText)
    }, [postInformation.status, postInformation.text_content])


    const getTags = (text_string) => {

        if(text_string === null || text_string === undefined){
            text_string = "";
        }

        // console.log("triuggered")

        //eslint-disable-next-line
        const pattern = /(#)[a-zA-Z]{1}[\-a-zA-Z0-9]{1,14}/g;

        let match;

        let tempArray = [];

        // let startOfText = true;

        let tempPrevIndex;

        while(match = pattern.exec(text_string)){

            // tempArray.push([text_string.substring(tempPrevIndex, match.index)])
            tempArray.push([text_string.substring(match.index, pattern.lastIndex)])

            tempPrevIndex = pattern.lastIndex;

        }

        // if(tempPrevIndex !== text_string.length){

        //     // console.log("last index:",  tempPrevIndex)

            
        //     tempArray.push([text_string.substring(tempPrevIndex, text_string.length)])
        // }

        // console.log(tempArray)

        return tempArray;
    }

    const getMentions = (text_string) => {

        if(text_string === null || text_string === undefined){
            text_string = "";
        }

        // console.log("triuggered")

        //eslint-disable-next-line
        const pattern = /(@)[a-zA-Z]{1}[\-a-zA-Z0-9]{1,}/g;

        let match;

        let tempArray = [];

        // let startOfText = true;

        let tempPrevIndex;

        while(match = pattern.exec(text_string)){

            // tempArray.push([text_string.substring(tempPrevIndex, match.index)])
            tempArray.push([text_string.substring(match.index, pattern.lastIndex)])

            tempPrevIndex = pattern.lastIndex;

        }

        // if(tempPrevIndex !== text_string.length){

        //     // console.log("last index:",  tempPrevIndex)

            
        //     tempArray.push([text_string.substring(tempPrevIndex, text_string.length)])
        // }

        // console.log(tempArray)

        return tempArray;
    }

    const getTagsAtsLinks = (text_string) => {

        if(text_string === null || text_string === undefined){
            text_string = "";
        }

        // console.log("triuggered")

        //eslint-disable-next-line
        const pattern = /(#|@)[a-zA-Z]{1}[\-a-zA-Z0-9]{1,14}|((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/g;

        let match;

        let tempArray = [];

        // let startOfText = true;

        let tempPrevIndex;

        while(match = pattern.exec(text_string)){

            tempArray.push([text_string.substring(tempPrevIndex, match.index)])
            tempArray.push([text_string.substring(match.index, pattern.lastIndex)])

            tempPrevIndex = pattern.lastIndex;

        }

        if(tempPrevIndex !== text_string.length){

            // console.log("last index:",  tempPrevIndex)

            
            tempArray.push([text_string.substring(tempPrevIndex, text_string.length)])
        }

        // console.log(tempArray)

        return tempArray;
    }

    const addLinkTags = (treatedArray) => {

        let linkTagsAdded = [];

        //eslint-disable-next-line
        const pattern = /(#|@)[a-zA-Z]{1}[\-a-zA-Z0-9]{1,14}|((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/g;
        
        for(let i = 0; i < treatedArray.length; i++){


            if(pattern.test(treatedArray[i][0])){

                if(treatedArray[i][0].startsWith("#")){

                    linkTagsAdded.push(<a href={`/tags/name/${treatedArray[i][0].substring(1)}`}>{treatedArray[i]}</a>)
                    
                }
                else if (treatedArray[i][0].startsWith("@")){
                    
                    console.log("hash: ", treatedArray[i][0]);
                    linkTagsAdded.push(<a href={`/users/nickname/${treatedArray[i][0].substring(1)}`}>{treatedArray[i]}</a>)
                }
                else{

                    console.log("link: ", treatedArray[i][0]);
                    // need to check for https:// at the begining or else ad it 
                    linkTagsAdded.push(<a target="_blank" href={`${treatedArray[i][0]}`}>{treatedArray[i]}</a>)
                }

                
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

    const toggleDeleteConfirmationVisible = () => {

        
        setDeleteConfirmationVisible(!deleteConfirmationVisible);

        if(editMode.visible){

            let tempVisible:boolean = false;
    
            setEdiMode(prevEditMode => ({ ...prevEditMode, "visible":tempVisible }))

            // setCharsLeft(maxChars - postInformation.text_content.length);
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

    const fetchTagNameByComment = async (comment_id) => {
        const test = await fetch(`http://localhost:3001/tags/byName/comment/${comment_id}`, {
    
            method: "get",
            headers: { "Content-Type": "application/json"},

        })
        .then(data =>  {
            
            return data.json()
        });

        return test
       
    }

    const fetchMentionsByComment = async (comment_id) => {
        const test = await fetch(`http://localhost:3001/mentions/byName/comment/${comment_id}`, {
    
            method: "get",
            headers: { "Content-Type": "application/json"},

        })
        .then(data =>  {
            
            return data.json()
        });

        return test
       
    }
 

    const insertTagIfNotExist = async (tagname) => {


            await fetch('http://localhost:3001/create/tag/', {
    
                method: "post",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify({
                    tag_name: tagname, 
                   
                })
    
            })
            

        return "Done"

    }


    // Need To Change !!!!!!!!!!!!!!!!!
    
    const insertTagCommentRelation  = async (tagName) => {


            await fetch('http://localhost:3001/comment/addTag/', {
    
                method: "post",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify({
                    tag_name: tagName,
                    comment_id: uuid
                   
                })
    
            })
            .then((response) => response.json())

            // Add tag_id, comment_id pair to tag_comment
            
        return "Done"

    }

    
     // Need To Change !!!!!!!!!!!!!!!!!
    const insertMentionRelation  = async (mentioned_nickname) => {


            await fetch('http://localhost:3001/comment/addMention/', {
    
                method: "post",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify({
                    nickname: mentioned_nickname,
                    comment_id: uuid
                   
                })
    
            })
            .then((response) => response.json())

            // Add tag_id, comment_id pair to tag_comment
            
        return "Done"

    }

    const deleteTagCommentRelation  = async (tagName) => {

        await fetch('http://localhost:3001/comment/deleteTag/', {

            method: "delete",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({
                tag_name: tagName,
                comment_id: uuid
                
            })

        })
        .then((response) => response.json())
        

        return "Done"
            
    }

    // Need To Change !!!!!!!!!!!!!!!!!
    const deleteMentionRelation  = async (mentioned_nickname) => {

        await fetch('http://localhost:3001/comment/deleteMention/', {

            method: "delete",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({
                nickname: mentioned_nickname,
                comment_id: uuid
                
            })

        })
        .then((response) => response.json())
        

        return "Done"
            
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

        // getTagsAtsLinks(postInformation.tex_content)

        let oldTagsNameObject = await fetchTagNameByComment(uuid)
        let oldMentionsNameObject = await fetchMentionsByComment(uuid)
        console.log("olTags: ", oldTagsNameObject)
        console.log("olMentions: ", oldMentionsNameObject)

        let oldTags = oldTagsNameObject.map((object) => {

            return object.tag_name

        })


        let oldMentions = oldMentionsNameObject.map((object) => {

            return object.nickname

        })

        console.log("oldTags: ", oldTags)
        console.log("oldMentions: ",oldMentions)


        let newTagsArrays = await getTags(editMode.textContent)
        let newMentionsArrays = await getMentions(editMode.textContent)
        
        let newTags = newTagsArrays.map((array) => {

            return array[0]
        })

        let newMentions = newMentionsArrays.map((array) => {

            return array[0]
        })
        console.log("newTags: ", newTags)
        console.log("newMentions: ", newMentions)
        // Loop through array and if starts  with # insert



        const tagsToDelete =  oldTags.filter(tag => !newTags.includes(tag))
        const tagsToAdd =  newTags.filter(tag => !oldTags.includes(tag))

        const mentionsToDelete =  oldMentions.filter(mention => !newMentions.includes(mention))
        const mentionsToAdd =  newMentions.filter(mention => !oldMentions.includes(mention))

        console.log("toAdd: ", tagsToAdd, " toDelete: ", tagsToDelete)

        for(let i = 0; i < tagsToAdd.length ; i++){

            console.log("tagsToAdd[i]: ", tagsToAdd[i])

            await insertTagIfNotExist(tagsToAdd[i]);
            await insertTagCommentRelation(tagsToAdd[i]);
        }

        for(let j = 0; j < tagsToDelete.length ; j++){

            console.log("test:", tagsToDelete[j])

            await deleteTagCommentRelation(tagsToDelete[j])
        }

        for(let i = 0; i < mentionsToAdd.length ; i++){

            console.log("mentionsToAdd[i]: ", mentionsToAdd[i])

            await insertMentionRelation(mentionsToAdd[i]);
        }

        for(let j = 0; j < mentionsToDelete.length ; j++){

            console.log("mentionsToDelete[j]:", mentionsToDelete[j])

            await deleteMentionRelation(mentionsToDelete[j])
        }


        
        
    }

    const exitEditMode = (e) => {

        toggleEditMode();

        setEdiMode(prev => ({ ...prev, "textContent": `${postInformation.text_content}` }))

        setCharsLeft(maxChars- postInformation.text_content.length);

        e.preventDefault()


    }

    let treatedText = addLinkTags(getTagsAtsLinks(postInformation.text_content))

 

        return(

            <>
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
                                <HeartIcon></HeartIcon>
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


