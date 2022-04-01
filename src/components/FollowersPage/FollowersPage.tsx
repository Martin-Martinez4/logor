
import Card from "../Card/Card";
import LoaderHOC from "../LoaderHOC/LoaderHOC";


import { createMiniProfiles } from "../utils/createMiniprofilesArray";

import { getFollowers, getFollowees } from "../utils/fetchFollowers";

import { FC, useEffect, useState } from "react"

const FollowersPage: FC = ({ user_id }) => {

    const [ followersPageIsLoading, setFollowersPageIsLoading ] = useState(false);

    const [ followersFollowees, setFollowersFollowees ] = useState({

        followers:[],
        followees:[]
    });


    useEffect(() => {

        ( async(user_id, setFollowersPageIsLoading, getFollowers, getFollowees, createMiniProfiles) => {

            let isMounted = true;

            if(isMounted){

                setFollowersPageIsLoading(true);
    
                const followersArray = await getFollowers(user_id);
    
                const followersMiniProfiles = createMiniProfiles(followersArray)
    
                const followeesArray = await getFollowees(user_id);
    
                const followeesMiniProfiles = createMiniProfiles(followeesArray)
    
                setFollowersFollowees(prev => ({...prev, followees: followersMiniProfiles, followers: followeesMiniProfiles }))
    
                setFollowersPageIsLoading(false);
            }
            return () => { isMounted = false };




        })(user_id, setFollowersPageIsLoading, getFollowers, getFollowees, createMiniProfiles)


    }, [ user_id, ])

    return (

        <div className="postlist_horizontal" >
        {/* <Scroll> */}
            
            <Card classes="content med_suggestion">
                <p>Suggestions</p>
                <div className="suggestions">

                    <p>#DonkeyKong</p>
                    <p>#ApeEscape</p>
                    <p>#MelGibbonson</p>
                </div>
                <p>Featured</p>
                <div className="features">
              

                </div>
            </Card>
                
            <LoaderHOC loading={followersPageIsLoading}>


                <div>
                    <p>Followers</p>
                    {followersFollowees.followers}

                </div>
                <div>
                    <p>Following</p>
                    {followersFollowees.followees}

                </div>


            </LoaderHOC>
           
            <div className="empty"></div>
        {/* </Scroll> */}
          
        </div>

    )

}

export default FollowersPage;

