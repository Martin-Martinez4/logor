
import React, { FC, useState } from "react";
import MiniProfile from "../MiniProfile/MiniProfile";

import "./searchbar.css";

// Make autocom appear only after something has been typed into the search bar

const SearchBar = () => {

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


    return (

        <div className="searchBar_container relative">

        <input type="search" id="topBarSearch" name="topBarSearch" value={searchState.topBarSearch} onChange={oninputChange} placeholder="Search..." className="topBar__search contained" >
            
        </input>
        {/* <div className="autocom-box">
            <p>Users</p>
            <div>

                <p>
                    <MiniProfile></MiniProfile>
                </p>
                <p>
                    <MiniProfile></MiniProfile>
                    
                </p>
                <p>
                    <MiniProfile></MiniProfile>

                </p> 
            </div>

            <p>Tags</p>
            <div>

                <p>Test</p>
                <p>Test</p>
            </div>

        </div> */}

    </div>

    )


}

export default SearchBar

