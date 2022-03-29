
import { FC, useEffect, useState, useContext, useRef } from "react";

import "./MiniProfile.css";
import { serverAddressString } from "../utils/exportGetImage"; 

import UserInfoContext from "../context/UserInfoProvider";

import { getMiniProfileInfo } from "../utils/fetchMiniprofileInfo";
import { loggedIsFollower } from "../utils/fetchFollowers";

import Follow from "../Follow/Follow";


const MiniProfile:FC = ({ user_id }) => {

    const mountedRef = useRef(true)

    const [ miniProfileUser, setMiniProfileUser] = useState()

    const { loggedInUser } = useContext( UserInfoContext);

    const [ isFollower, setIsFollower ] = useState();

    useEffect(() => {

        (async (user_id, setIsFollower) => {

            const isFollower = await loggedIsFollower(user_id);

            setIsFollower(isFollower)

        })(user_id, setIsFollower)
        

        
    },[,loggedInUser])

    useEffect(() => {

        
        (async (setMiniProfileUser, user_id) => {

            if(mountedRef.current){

                const userMiniprofileInfo  = await getMiniProfileInfo(user_id)
    
                // console.log("userMiniprofileInfo22222222: ", userMiniprofileInfo )
    
                setMiniProfileUser(userMiniprofileInfo[0]);
            }
            else{

                return
            }


        //    setMiniProfileUser(prev => ({...prev, toLink: "/users/nickname/" + userMiniprofileInfo[0]?.nickname})) 
        })(setMiniProfileUser, user_id)

    }, [user_id])

   
    useEffect(() => {
        return () => { 
          mountedRef.current = false
        }
      }, [])

    return(
        <div className="miniProfile">
            <img src={`${serverAddressString}${miniProfileUser?.profile_pic_url}`} alt="Monkey 2" className="profilePicture" />
            <div className="profileName">
                <a className="miniProfile_link" href={`/users/nickname/` + (miniProfileUser?.nickname? miniProfileUser?.nickname.substring(1,): "")}>
                    <p><strong>{miniProfileUser?.username}</strong></p>
                    <p><em>{miniProfileUser?.nickname}</em></p>
                </a>
                {/* {isFollower
                    ?
                    < button type="button" className="button red" title="Click to follow">Unfollow</button>
                    : 
                    < button type="button" className="button primary" title="Click to follow">Follow</button>
                } */}

                <Follow visiteeUser={{id: user_id}} buttonClasses={"profileName__button"} followCountClass={"hidden"}/>
            </div>
            {/* < button type="button" className="button" title="Click to move to next Step">Follow</button> */}
        </div>
    )
}

export default MiniProfile



