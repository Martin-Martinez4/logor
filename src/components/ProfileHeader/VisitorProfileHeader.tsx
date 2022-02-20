
import React, { FC, useContext, useEffect, useState } from "react";

import { useLocation } from "react-router-dom";
import Card from "../Card/Card";
import "./ProfileHeader.css";

import { UserInfoContext } from "../userContext/userContext";


// import ProfileImage from "../../assets/Monkey_1.svg";
import LocationIcon from "../../assets/LocationIcon.svg"
import LinkIcon from "../../assets/LinkIcon.svg"
import CalenderIcon from "../../assets/CalenderIcon.svg"


const VisitorProfileHeader:FC = ({ userOrTagID }) =>{

    const location = useLocation();

    
     // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [loggedInUser, setloggedInUser] = useContext(UserInfoContext);

    const [visiteeUser, setVisiteeUser] = useState({
        username:"",
        nickname:"",
        profile_pic_url:"",
        header_img_url:"",
        joined_date:"",
        description:"",
        location:"",
        links:""


    })

    useEffect(() => {

        if(location.pathname.includes("/users/nickname/")){

            console.log("header by nickname")

            console.log("header", userOrTagID)

            fetch(`http://localhost:3001/usersInfo/byNickname/${userOrTagID}`, {
                method: "get",
                headers: { "Content-Type": "application/json"},
            }).then(response => response.json())
            .then(userInfo => {
    
                console.log("userIfno", userInfo[0])
             
                setVisiteeUser((prev) => 
                        ({...prev, 
                        username:userInfo[0].username,
                        nickname:userInfo[0].nickname,
                        profile_pic_url:userInfo[0].profile_pic_url,
                        header_img_url:userInfo[0].header_img_url,
                        joined_date:userInfo[0].joined_date,
                        description:userInfo[0].description,
                        location:userInfo[0].location,
                        links:userInfo[0].links
                }))
            })

        }
        else{

            fetch(`http://localhost:3001/usersInfo/${userOrTagID}`, {
                method: "get",
                headers: { "Content-Type": "application/json"},
            }).then(response => response.json())
            .then(userInfo => {
    
                console.log("userIfno", userInfo[0])
             
                setVisiteeUser((prev) => 
                        ({...prev, 
                        username:userInfo[0].username,
                        nickname:userInfo[0].nickname,
                        profile_pic_url:userInfo[0].profile_pic_url,
                        header_img_url:userInfo[0].header_img_url,
                        joined_date:userInfo[0].joined_date,
                        description:userInfo[0].description,
                        location:userInfo[0].location,
                        links:userInfo[0].links
                }))
            })
        }


    },[])

    return(

        <Card classes="h_auto content profile_header">
         

            <div className="profile_header_background" style={{backgroundImage: `url('${visiteeUser.header_img_url}')`}} >
                <img src={ visiteeUser.profile_pic_url } alt="profile" className="profile_header_image "></img>
            </div>

            <div className="profile_header_container">


                <h3 className="profile_name">{ visiteeUser.username }</h3>
                

                <h4 className="profile_tag"><em>{ visiteeUser.nickname }</em></h4>
                <p className="profile_description">{ visiteeUser.description }</p>

                <div className="profile_other">
                    {/* <p><img src={LocationIcon} alt="profile" className="profile_icon location_icon"></img> <em>{loggedInUser["location"]}</em></p> */}


                    {visiteeUser.location === ""
                        ?<p></p>
                        : 
                        <p><img src={LocationIcon} alt="profile" className="profile_icon location_icon"></img> <em>{ visiteeUser.location }</em></p>
                    }
                    { visiteeUser.links === ""
                        ?<p></p>
                        : 
                        <p><img src={LinkIcon} alt="profile" className="profile_icon link_icon"></img><a href={ visiteeUser.links }><em>{ visiteeUser.links}</em></a></p>
                    }

                    <p><img src={CalenderIcon} alt="profile" className="profile_icon"></img><em>{ visiteeUser.joined_date }</em></p>

                </div>

            </div>

        </Card>

    )

}

export default VisitorProfileHeader;

