
import React, { FC, useEffect, useContext } from "react";
import TopBar from "../TopandBottom/TopBar";
import SigninModalHOC from "../SigninModal/SigninModalHOC";
import ContentArea from "../ContentArea/ContentArea";
import useAuth from "../hooks/useAuth";
import { UserInfoContext } from "../context/UserInfoProvider";

import SigininModal from "../SigninModal/SigninModal";
import useModal from "../hooks/useModal";




const Homepage:FC = () => {


    return(
        <React.Fragment>
            <TopBar />
            <SigninModalHOC>

                <ContentArea />
            </SigninModalHOC>
        </React.Fragment>
    );

}

export default Homepage

