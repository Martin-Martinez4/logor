import React, { FC, useState } from "react";
import Logo from "../../assets/Logo3.svg";

import MiniProfile from "../MiniProfile/MiniProfile";

import "./Nav.css";

const TopBar: FC = () => {

    const [searchState, setSearchState] = useState({

        topBarSearch:""
    });

    const oninputChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        if(e === null){
            return
        }

        setSearchState(prev => ({ ...prev, [e.target.name]: e.target.value }))

        console.log(searchState.topBarSearch)

        e.preventDefault()
    }
    

    return(
        <nav className="topBar">
            <img src={Logo} className="topBar__logo"  alt="site logo"></img>

            <div className="searchBar_container relative">

                <input type="search" id="topBarSearch" name="topBarSearch" value={searchState.topBarSearch} onChange={oninputChange} placeholder="Search..." className="topBar__search contained" >
                    
                </input>
                {/* <div className="autocom-box">
                    <p>Test</p>
                    <p>
                        <MiniProfile></MiniProfile>
                    </p>
                    <p>
                        <MiniProfile></MiniProfile>
                        
                    </p>
                    <p>
                        <MiniProfile></MiniProfile>

                    </p> 
                    <p>Test</p>
                    <p>Test</p>

                </div> */}

            </div>
            
               
            {/* <div className="option_dots">
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
            </div> */}
        </nav>
    );
}

export default TopBar;
