
import React from "react";
import TopBar from "../TopandBottom/TopBar";
import BottomBar from "../TopandBottom/BottomBar";
import Signin from "../Siginin/Signin";
import landingImage from "../../assets/ryunosuke-kikuno-RKwivgSTXVI-unsplash.jpg"
import "./landingPage.css";

const Landingpage = () => {
    // Photo by <a href="https://unsplash.com/@ryunosuke_kikuno?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Ryunosuke Kikuno</a> on <a href="https://unsplash.com/s/photos/green?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>

    return(
  
        <React.Fragment>

            <TopBar />
            <div className="landingPage">
                <img src={landingImage} alt="Green and Grey Cube Pattern" className="image landingImage"/>

                <Signin />

            </div>
            <BottomBar />

        </React.Fragment>


    );

}

export default Landingpage;

