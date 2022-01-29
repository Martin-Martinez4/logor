
import React, { FC, useContext } from "react";
import Card from "../Card/Card";
import "./ProfileHeader.css";

import { UserInfoContext } from "../userContext/userContext";

// import ProfileImage from "../../assets/Monkey_1.svg";
import LocationIcon from "../../assets/LocationIcon.svg"
import LinkIcon from "../../assets/LinkIcon.svg"
import CalenderIcon from "../../assets/CalenderIcon.svg"


const ProfileHeader:FC = () =>{
    
    const [loggedInUser, setloggedInUser] = useContext(UserInfoContext);




    return(

        <Card classes="h_auto content profile_header">
         

            <div className="profile_header_background" style={{backgroundImage: `url('./unsplash_GBEHjsPQbEQ.png')`}} >
                <img src={ loggedInUser["profile_pic_url"] } alt="profile image" className="profile_header_image "></img>
            </div>

            <div className="profile_header_container">


                <h3 className="profile_name">{loggedInUser["username"]}</h3>
                

                <h4 className="profile_tag"><em>{loggedInUser["tag"]}</em></h4>
                <p className="profile_description">{loggedInUser["description"]}</p>

                <div className="profile_other">
                    <p><img src={LocationIcon} alt="profile image" className="profile_icon location_icon"></img> <em>{loggedInUser["location"]}</em></p>

                    <p><img src={LinkIcon} alt="profile image" className="profile_icon link_icon"></img><a href={loggedInUser["links"]}><em>{loggedInUser["links"]}</em></a></p>

                    <p><img src={CalenderIcon} alt="profile image" className="profile_icon"></img><em>{loggedInUser["joined_date"]}</em></p>

                </div>

            </div>

        </Card>

    )

}

export default ProfileHeader

