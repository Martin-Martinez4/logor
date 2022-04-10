
import { FC, useEffect, useState, useContext, useRef } from "react";

import "./MiniProfile.css";
import { serverAddressString } from "../utils/exportGetImage"; 

import UserInfoContext from "../context/UserInfoProvider";

import { getMiniProfileInfo } from "../utils/fetchMiniprofileInfo";
import { loggedIsFollower } from "../utils/fetchFollowers";

import LoaderHOC from "../LoaderHOC/LoaderHOC";

import Follow from "../Follow/Follow";


const MiniProfile:FC = ({ user_id }) => {

    const mountedRef = useRef(true)

    const [ miniProfileUser, setMiniProfileUser] = useState()

    const [followStatusLoading, setFollowStatus] = useState();

    const { loggedInUser } = useContext( UserInfoContext);

    const [ isFollower, setIsFollower ] = useState();

    useEffect(() => {

        (async (user_id, setIsFollower) => {

            setFollowStatus(true)

            const isFollower = await loggedIsFollower(user_id);

            setIsFollower(isFollower)

            setFollowStatus(false)


        })(user_id, setIsFollower)
        

        
    },[,loggedInUser])

    useEffect(() => {

        
        (async (setMiniProfileUser, user_id) => {

            setFollowStatus(true)


            if(mountedRef.current){

                const userMiniprofileInfo  = await getMiniProfileInfo(user_id)
    
                // console.log("userMiniprofileInfo22222222: ", userMiniprofileInfo )
    
                setMiniProfileUser(userMiniprofileInfo[0]);
            }
            else{

                return
            }

            setFollowStatus(false)



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

                <LoaderHOC loading={followStatusLoading}>

                    <Follow visiteeUser={{id: user_id}} buttonClasses={"profileName__button"} followCountClass={"hidden"}/>
                </LoaderHOC>
            </div>
            {/* < button type="button" className="button" title="Click to move to next Step">Follow</button> */}
        </div>
    )
}

export default MiniProfile



