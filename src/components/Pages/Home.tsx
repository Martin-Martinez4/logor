
import React, { FC, useEffect, useContext } from "react";
import TopBar from "../TopandBottom/TopBar";
import SigninModalHOC from "../SigninModal/SigninModalHOC";
import ContentArea from "../ContentArea/ContentArea";
import useAuth from "../hooks/useAuth";
import { UserInfoContext } from "../context/userContext";

import SigininModal from "../SigninModal/SigninModal";
import useModal from "../hooks/useModal";




const Homepage:FC = ({  loadUser}) => {

    // const { auth, setAuth } = useAuth();
      // eslint-disable-next-line
    //   const [loggedInUser, setloggedInUser] = useContext(UserInfoContext);


    // useEffect(() => {

    //     console.log()

    // }, [loggedInUser])

    const { showModal, toggleModal } = useModal();



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

