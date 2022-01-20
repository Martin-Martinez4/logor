
import React, { FC } from "react";

import SideCard from "../SideCards/SideCard";
import PostList from "../PostList/PostList";
import ProfileIcon from "../../assets/ProfileIcon.svg";
import GearIcon from "../../assets/GearIcon.svg";
import ShareIcon from "../../assets/ShareIcon.svg";
import PoundSign from "../../assets/PoundSign.svg";
import HeartIcon from "../../assets/HeartIcon.svg";

import ProfileHeader from "../ProfileHeader/ProfileHeader";
import"./contentArea.css";

const ContentArea:FC = () => {

    return (
        <div className="contentArea">
            <SideCard side="leftSide">
                <div className="side_icon">
                    <img 
                        src={ProfileIcon} alt="profile image" className="sidebar_icon">
                    </img>
                    <span className="sidebar_text"><strong>Profile</strong></span>
                </div>
                <div className="side_icon">
                    <img 
                        src={GearIcon} alt="profile image" className="sidebar_icon">
                    </img>
                    <span className="sidebar_text"><strong>Settings</strong></span>
                </div>
                <div className="side_icon">
                    <img 
                        src={ShareIcon} alt="profile image" className="sidebar_icon">
                    </img>
                    <span className="sidebar_text"><strong>Lists</strong></span>
                </div>
                <div className="side_icon">
                    <img 
                        src={PoundSign} alt="profile image" className="sidebar_icon">
                    </img>
                    <span className="sidebar_text"><strong>Trends</strong></span>
                </div>
                <div className="side_icon">
                    <img 
                        src={HeartIcon} alt="profile image" className="sidebar_icon">
                    </img>
                    <span className="sidebar_text"><strong>Favorites</strong></span>
                </div>
            </SideCard>
            <div>
                <PostList />
            </div>
            <SideCard side="rightSide" >
                Test
                Test
            </SideCard> 
        </div>

    );


}

export default ContentArea;


