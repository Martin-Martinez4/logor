
import { FC, useEffect, useState, useContext } from "react";

import UserInfoContext from "../context/UserInfoProvider";

import { loggedIsFollower } from "../utils/fetchFollowers";

const Follow:FC = ({ visiteeUser }) => {

    const { loadUser, loggedInUser, setloggedInUser } = useContext( UserInfoContext);

    const [ isFollower, setIsFollower ] = useState();

    useEffect(() => {

        (async (user_id, setIsFollower) => {

            if(user_id){

                const isFollower = await loggedIsFollower(user_id);
    
                console.log("isFollower: ",isFollower)
    
                setIsFollower(isFollower)
            }else{

                console.error("error getting follow status")
                setIsFollower(false)

            }


        })(visiteeUser?.id, setIsFollower)
        

    },[loggedInUser, visiteeUser])

    return(

        <div className="profile_other profile_following">
            <p><a href="">Followers: </a><em>{visiteeUser?.followers? visiteeUser?.followers: " Error"}</em></p> <p><a href="">Followers: </a><em>{visiteeUser?.following? visiteeUser?.following: " Error"}</em></p>
            <div> 
                {isFollower
                    ?
                    < button type="button" className="button red" title="Click to follow">Unfollow</button>
                    : 
                    < button type="button" className="button primary" title="Click to follow">Follow</button>
                }
            </div>
        </div>
    )

}

export default Follow;
