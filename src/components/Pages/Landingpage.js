
import React from "react";
import TopBar from "../TopandBottom/TopBar";
import BottomBar from "../TopandBottom/BottomBar";
import Signin from "../Siginin/Signin";
import landingImage from "../../assets/Unsplash.jpg"

const Landingpage = () => {
    // Photo by <a href="https://unsplash.com/@ryunosuke_kikuno?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Ryunosuke Kikuno</a> on <a href="https://unsplash.com/s/photos/green?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>

    return(
  
        <React.Fragment>

            <TopBar />
            <div>
                <img src={landingImage} alt="Green and Grey Cube Pattern" style={{width:"10vw", height:"10vh"}} />

                <Signin />

            </div>
            <BottomBar />

        </React.Fragment>


    );

}

export default Landingpage;

