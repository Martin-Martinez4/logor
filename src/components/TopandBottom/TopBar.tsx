
import { FC } from "react";
import Logo from "../../assets/Logo3.svg";
import SearchBar from "../SearchBar/SearchBar";

import Signout from "../svg/Signout/Signout";


import "./Nav.css";

const TopBar: FC = () => {


    

    return(
        <>
        <nav className="topBar topBar2">
            <img src={Logo} className="topBar__logo"  alt="site logo"></img>

           <SearchBar></SearchBar>  

           {/* <span className="option_dots on_750px" onClick={toggleDropDownVisible} > */}
          
            
        </nav>

        {/* dropdown menu under the  top nav bar 600 Height 770 width */}
        {/* dots .5rem width and height background color uiBlack */}
         <span>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>

       
        </span>        
        </>
        
    );
}

export default TopBar;
