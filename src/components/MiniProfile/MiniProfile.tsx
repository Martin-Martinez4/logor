
import { FC, useEffect, useState } from "react";

import "./MiniProfile.css";
// import Monkey2 from "../../assets/Monkey_2.svg";

import { getMiniProfileInfo } from "../utils/fetchMiniprofileInfo";


const MiniProfile:FC = ({ user_id }) => {

    const [ miniProfileUser, setMiniProfileUser] = useState()

    useEffect(() => {

        
        (async (setMiniProfileUser, user_id) => {
            console.log(": ",user_id)
            
            const userMiniprofileInfo  = await getMiniProfileInfo(user_id)

            console.log("userMiniprofileInfo22222222: ", userMiniprofileInfo )

            setMiniProfileUser(userMiniprofileInfo[0]);

        })(setMiniProfileUser, user_id)

    }, [])

    useEffect(() => {

   
        console.log("miniProfileUser: ", miniProfileUser)

    }, [miniProfileUser])


    return(
        <div className="miniProfile">
            <img src={miniProfileUser?.profile_pic_url} alt="Monkey 2" className="profilePicture" />
            <div className="profileName">
                <p><strong>{miniProfileUser?.username}</strong></p>
                <p><em>{miniProfileUser?.nickname}</em></p>
                < button type="button" className="button" title="Click to move to next Step">Follow</button>
            </div>
            {/* < button type="button" className="button" title="Click to move to next Step">Follow</button> */}
        </div>
    )
}

export default MiniProfile



