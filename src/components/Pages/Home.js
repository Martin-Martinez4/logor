
import React from "react";
import TopBar from "../TopandBottom/TopBar";
import BottomBar from "../TopandBottom/BottomBar";
import ContentArea from "../ContentArea/ContentArea";

const Homepage  = () => {

    return(
        <React.Fragment>
            <TopBar />
            <ContentArea />
            <BottomBar /> 
        </React.Fragment>
    );

}

export default Homepage

