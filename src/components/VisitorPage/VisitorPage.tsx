

import React, { FC } from "react";
import {
    Routes,
    Route,
    Navigate,
    useParams
  } from "react-router-dom";
import TopBar from "../TopandBottom/TopBar";
import VisitorContentArea from "../ContentArea/VisitorContentArea";

const Homepage:FC = () => {

    const {id} = useParams();

    return(
        <React.Fragment>
            {console.log(id)}
            <TopBar />
            <VisitorContentArea visiteeID={id?.toString()} />
        </React.Fragment>
    );

}

export default Homepage



