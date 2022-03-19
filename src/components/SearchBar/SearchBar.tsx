
import React, { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MiniProfile from "../MiniProfile/MiniProfile";

import { userSearch, tagSearch } from "../utils/fetchSearchQuery";

import "./searchbar.css";

// Make autocom appear only after something has been typed into the search bar

const SearchBar = () => {

    const [searchState, setSearchState] = useState({

        topBarSearch:""
    });

    const [searchResults, setSearchResults] = useState({

        tagsResult: [],
        usersResult: []
    })

    // let usersResult = []
    // let tagsResult = []

    const [throttle, setThrottle] = useState(false);

    const oninputChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        if(e === null){
            return
        }

        setSearchState(prev => ({ ...prev, [e.target.name]: e.target.value }))


        e.preventDefault()
    }

    useEffect(() => {

        
        // console.log(searchState.topBarSearch)
        // in timeout, set throttle true api call
        

            setThrottle(true)

            setTimeout(async () => {
    
                setThrottle(false);

                let usersResult = []
                let tagsResult = []
    
                const searchQuery = searchState.topBarSearch
    
                // console.log("searchQuery: ", searchQuery)
                const usersSearchResults = await userSearch(searchQuery) 
                const tagsSearchResults = await tagSearch(searchQuery)
    
                // console.log("users search result: ", usersSearchResults)
                // console.log("tags search result: ", tagsSearchResults)

                for(let i = 0; i < usersSearchResults.length; i++){

                    console.log("sersSearchResults[i][id]: ", usersSearchResults[i]["id"])

                    usersResult.push( usersSearchResults[i]["id"])
                }

                for(let i = 0; i < tagsSearchResults.length; i++){

                    const tag_name = tagsSearchResults[i]["tag_name"].substring(1,)

                    tagsResult.push( {
                        tag_name: tag_name,
                        toLink: `/tags/name/${tag_name}`
                    })
                }

                console.log("userResult:  ",usersResult)
                console.log("tagResult:  ",tagsResult)

                setSearchResults({usersResult:usersResult, tagsResult:tagsResult})
                // setSearchResults({usersResult:usersResult, tagsResult:tagsResult})
    
    
    
    
            }, 400)

        
    },[searchState])

    useEffect(()=> {
        console.log(searchResults.tagsResult, searchResults.usersResult)

    }, [searchResults.usersResult, searchResults.tagsResult])


    return (

        <div className="searchBar_container relative">

        <input type="search" id="topBarSearch" name="topBarSearch" value={searchState.topBarSearch} onChange={oninputChange} placeholder="Search..." className="topBar__search contained" >
            
        </input>
        <div className="autocom-box">
            <p>Users</p>
            {/* {searchResults.usersResult}
            {console.log("inside return: ",searchResults.usersResult)} */}
            {searchResults.usersResult.map((id) => (
                <MiniProfile key={`miniProfile${id}`} user_id={id}/>
            ))}
            {/* <div>

                <p>
                    <MiniProfile></MiniProfile>
                </p>
                <p>
                    <MiniProfile></MiniProfile>
                    
                </p>
                <p>
                    <MiniProfile></MiniProfile>

                </p> 
            </div> */}

            <p>Tags</p>
            <div>

              {searchResults.tagsResult.map((tag_name) => (
                //   console.log("tag_name, render: ",tag_name)
                    <p>
                
                        <a href={tag_name.toLink} >{tag_name.tag_name}</a>
                    </p>
              ))}
            </div>

        </div>

    </div>

    )


}

export default SearchBar

