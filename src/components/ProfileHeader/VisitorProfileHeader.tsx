
import React, { FC, useContext } from "react";
import Card from "../Card/Card";
import "./ProfileHeader.css";

import { UserInfoContext } from "../userContext/userContext";
import TestData from "../../tempStaticData/testData.json";


// import ProfileImage from "../../assets/Monkey_1.svg";
import LocationIcon from "../../assets/LocationIcon.svg"
import LinkIcon from "../../assets/LinkIcon.svg"
import CalenderIcon from "../../assets/CalenderIcon.svg"


const VisitorProfileHeader:FC = ({ visiteeID }) =>{
    
     // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [loggedInUser, setloggedInUser] = useContext(UserInfoContext);

    const visiteeUser = TestData["users"][visiteeID];
    const visiteHeaderInfo = TestData["headers"][visiteeID];

    return(

        <Card classes="h_auto content profile_header">
         

            <div className="profile_header_background" style={{backgroundImage: `url('${visiteHeaderInfo["header_img_url"]}')`}} >
                <img src={ visiteeUser["profile_pic_url"] } alt="profile" className="profile_header_image "></img>
            </div>

            <div className="profile_header_container">


                <h3 className="profile_name">{visiteeUser["username"]}</h3>
                

                <h4 className="profile_tag"><em>{visiteeUser["tag"]}</em></h4>
                <p className="profile_description">{visiteHeaderInfo["description"]}</p>

                <div className="profile_other">
                    {/* <p><img src={LocationIcon} alt="profile" className="profile_icon location_icon"></img> <em>{loggedInUser["location"]}</em></p> */}


                    {visiteHeaderInfo["location"] === ""
                        ?<p></p>
                        : 
                        <p><img src={LocationIcon} alt="profile" className="profile_icon location_icon"></img> <em>{visiteHeaderInfo["location"]}</em></p>
                    }
                    {visiteHeaderInfo["links"] === ""
                        ?<p></p>
                        : 
                        <p><img src={LinkIcon} alt="profile" className="profile_icon link_icon"></img><a href={visiteHeaderInfo["links"]}><em>{visiteHeaderInfo["links"]}</em></a></p>
                    }

                    <p><img src={CalenderIcon} alt="profile" className="profile_icon"></img><em>{visiteHeaderInfo["joined_date"]}</em></p>

                </div>

            </div>

        </Card>

    )

}

export default VisitorProfileHeader;

