

import React from "react";

import SideCard from "../SideCards/SideCard";
import PostList from "../PostList/PostList";
import"./contentArea.css";

const ContentArea = () => {

    return (
        <div className="contentArea">
            <SideCard side="leftSide" /> 
            <PostList />
            <SideCard side="rightSide"  /> 
        </div>

    );


}

export default ContentArea;


