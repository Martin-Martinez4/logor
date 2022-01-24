import React, { FC } from "react";
import Logo from "../../assets/Logo3.svg";

import "./Nav.css";

const TopBar: FC = () => {

    return(
        <nav className="topBar">
            <img src={Logo} className="topBar__logo"></img>
            <input type="search" id="topBarSearch" name="topBarSearch" className="topBar__search"></input>
            <div>
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
            </div>
        </nav>
    );
}

export default TopBar;
