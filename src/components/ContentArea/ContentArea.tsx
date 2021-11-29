
import React, { FC } from "react";

import SideCard from "../SideCards/SideCard";
import PostList from "../PostList/PostList";
import ProfileHeader from "../ProfileHeader/ProfileHeader";
import"./contentArea.css";

const ContentArea:FC = () => {

    return (
        <div className="contentArea">
            <SideCard side="leftSide" /> 
            <div>
                <PostList />
            </div>
            <SideCard side="rightSide"  /> 
        </div>

    );


}

export default ContentArea;


