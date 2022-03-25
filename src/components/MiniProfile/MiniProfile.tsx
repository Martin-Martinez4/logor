
import { FC, useEffect, useState } from "react";

import "./MiniProfile.css";
import { getImageString, serverAddressString } from "../utils/exportGetImage"; 
// import Monkey2 from "../../assets/Monkey_2.svg";

import { getMiniProfileInfo } from "../utils/fetchMiniprofileInfo";


const MiniProfile:FC = ({ user_id }) => {

    const [ miniProfileUser, setMiniProfileUser] = useState()

    useEffect(() => {

        
        (async (setMiniProfileUser, user_id) => {

            const userMiniprofileInfo  = await getMiniProfileInfo(user_id)

            // console.log("userMiniprofileInfo22222222: ", userMiniprofileInfo )

            setMiniProfileUser(userMiniprofileInfo[0]);

        //    setMiniProfileUser(prev => ({...prev, toLink: "/users/nickname/" + userMiniprofileInfo[0]?.nickname})) 
        })(setMiniProfileUser, user_id)

    }, [])

    useEffect(() => {

   
        // console.log("miniProfileUser: ", miniProfileUser)


    }, [miniProfileUser])

    return(
        <div className="miniProfile">
            <img src={`${serverAddressString}${miniProfileUser?.profile_pic_url}`} alt="Monkey 2" className="profilePicture" />
            <div className="profileName">
                <a className="miniProfile_link" href={`/users/nickname/` + miniProfileUser?.nickname.substring(1,)}>
                    <p><strong>{miniProfileUser?.username}</strong></p>
                    <p><em>{miniProfileUser?.nickname}</em></p>
                </a>
                < button type="button" className="button" title="Click to follow">Follow</button>
            </div>
            {/* < button type="button" className="button" title="Click to move to next Step">Follow</button> */}
        </div>
    )
}

export default MiniProfile



