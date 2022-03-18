import { FC } from "react";
import Logo from "../../assets/Logo3.svg";
import SearchBar from "../SearchBar/SearchBar";


import "./Nav.css";

const TopBar: FC = () => {


    

    return(
        <nav className="topBar">
            <img src={Logo} className="topBar__logo"  alt="site logo"></img>

           <SearchBar></SearchBar>
            
               
            {/* <div className="option_dots">
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
            </div> */}
        </nav>
    );
}

export default TopBar;
