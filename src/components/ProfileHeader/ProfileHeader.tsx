
import React, { FC } from "react";
import Card from "../Card/Card";
import "./ProfileHeader.css";
import ProfileImage from "../../assets/Monkey_1.svg";
import LocationIcon from "../../assets/LocationIcon.svg"
import LinkIcon from "../../assets/LinkIcon.svg"
import CalenderIcon from "../../assets/CalenderIcon.svg"

const ProfileHeader:FC = () =>{

    return(

        <Card classes="h_auto content profile_header">
            <div className="profile_header_background">
                <img src={ProfileImage} alt="profile image" className="profile_header_image "></img>
            </div>
            <div className="profile_header_container">
                <h3 className="profile_name">Name</h3>
                <h4 className="profile_tag">@tag</h4>
                <p className="profile_description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque ab et eius facere obcaecati voluptate quibusdam enim aliquam culpa quas magnam nostrum itaque deserunt consequuntur iste, odio reprehenderit praesentium aspernatur.</p>

                <div className="profile_other">
                    <p><img src={LocationIcon} alt="profile image" className="profile_icon location_icon"></img> West Cityville, Utzonia; Quidno</p>

                    <p><img src={LinkIcon} alt="profile image" className="profile_icon link_icon"></img><a href="http://localhost:3000/home">localhost:3000/home</a></p>

                    <p><img src={CalenderIcon} alt="profile image" className="profile_icon"></img>Joined June 2013</p>

                </div>

            </div>

        </Card>

    )

}

export default ProfileHeader

