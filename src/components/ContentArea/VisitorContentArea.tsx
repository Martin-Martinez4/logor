
import React, { FC, useEffect, useState } from "react";

import {
    Routes,
    Route,
    Navigate,
    useParams
  } from "react-router-dom";

import SideCard from "../SideCards/SideCard";
import VisitorPostList from "../PostList/VisitorPostList";
import MiniProfile from "../MiniProfile/MiniProfile";
import ProfileIcon from "../../assets/ProfileIcon.svg";
import GearIcon from "../../assets/GearIcon.svg";
import ShareIcon from "../../assets/ShareIcon.svg";
import PoundSign from "../../assets/PoundSign.svg";
import HeartIcon from "../../assets/HeartIcon.svg";

import { getRandomUserIDs } from "../utils/fetchRandomUserIDs";
import { createMiniProfiles } from "../utils/createMiniprofilesArray";

import"./contentArea.css";

const VisitorContentArea:FC = ({ userOrTagID }) => {

    const [ suggestedProfiles, setSuggestedProfiles ] = useState();

    let miniprofilesArray = [];

    // get three random user_ids
    useEffect(() => {

        (async (setSuggestedProfiles) => {

            const featuredUsers = await getRandomUserIDs(3);

            // console.log("featueredUsers: ", featuredUsers)

            setSuggestedProfiles(featuredUsers)

            // console.log("setSuggestedProfiles: ", suggestedProfiles)
            
        })(setSuggestedProfiles)
        
        // console.log("setSuggestedProfiles: ", suggestedProfiles)
        
    }, [])
    
    useEffect(() => {
        
        // console.log("setSuggestedProfiles 2: ", suggestedProfiles)

        miniprofilesArray = createMiniProfiles(suggestedProfiles);

        // console.log("miniprofilesArray2: ", miniprofilesArray)



    }, [suggestedProfiles])


    miniprofilesArray = createMiniProfiles(suggestedProfiles);


    return (

        <div className="contentArea">

            {console.log(userOrTagID)}
  
            <SideCard side="leftSide">
                <div className="side_icon">
                    <img 
                        src={ProfileIcon} alt="profile" className="sidebar_icon">
                    </img>
                    <span className="sidebar_text"><strong>Profile</strong></span>
                </div>
                <div className="side_icon">
                    <img 
                        src={GearIcon} alt="profile" className="sidebar_icon">
                    </img>
                    <span className="sidebar_text"><strong>Settings</strong></span>
                </div>

                <div className="side_icon">
                    <img 
                        src={ShareIcon} alt="profile" className="sidebar_icon">
                    </img>
                    <span className="sidebar_text"><strong>Lists</strong></span>
                </div>

                <div className="side_icon">
                    <img 
                        src={PoundSign} alt="profile " className="sidebar_icon">
                    </img>
                    <span className="sidebar_text"><strong>Trends</strong></span>
                </div>
                <div className="side_icon">
                    <img 
                        src={HeartIcon} alt="profile" className="sidebar_icon">
                    </img>
                    <span className="sidebar_text"><strong>Favorites</strong></span>
                </div>
            </SideCard>
            <div>
                <VisitorPostList userOrTagID={ userOrTagID }/>
            </div>
            <SideCard side="rightSide" >
                <h3 className="header">Suggestions</h3>
                <p className="rightSide_content suggestion_content">#returnToMonkey</p>
                <p className="rightSide_content suggestion_content">#DonkeyKong</p>

                <h3 className="header">Featured</h3>

               
                <div className="rightSide_content featured_content">
                    
                    {miniprofilesArray}
                </div>
                       
            </SideCard> 
        </div>

    );


}

export default VisitorContentArea;