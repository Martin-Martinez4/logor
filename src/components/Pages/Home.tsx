
import React, { FC } from "react";
import TopBar from "../TopandBottom/TopBar";
import BottomBar from "../TopandBottom/BottomBar";
import ContentArea from "../ContentArea/ContentArea";

const Homepage:FC = () => {

    return(
        <React.Fragment>
            <TopBar />
            <ContentArea />
            <BottomBar /> 
        </React.Fragment>
    );

}

export default Homepage

