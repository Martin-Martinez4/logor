
import React, { FC } from "react";
import Card from "../Card/Card";
import "./ProfileHeader.css";
import ProfileImage from "../../assets/Monkey_1.svg";

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
                    <p>Location: City, State; City2</p>
                    <p><a>Link: </a>Lorem ipsum dolor sit amet consectetur.</p>
                    <p>Joined: Month, Year</p>

                </div>

            </div>

        </Card>

    )

}

export default ProfileHeader

