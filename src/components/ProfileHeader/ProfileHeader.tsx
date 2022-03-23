
import React, { FC, useContext, useEffect, useState } from "react";
import Card from "../Card/Card";
import "./ProfileHeader.css";
import { getImageString, serverAddressString } from "../utils/exportGetImage"; 
import UserInfoContext from "../context/UserInfoProvider";



import useUserInfo from "../hooks/useUserInfo";


import { formatDateMonthDayYear } from "../utils/formatDate";


// import ProfileImage from "../../assets/Monkey_1.svg";
import LocationIcon from "../../assets/LocationIcon.svg"
import LinkIcon from "../../assets/LinkIcon.svg"
import CalenderIcon from "../../assets/CalenderIcon.svg"


const ProfileHeader:FC = () =>{
    
     // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // const [loggedInUser, setloggedInUser] = useContext(UserInfoContext);
    const { loadUser, loggedInUser, setloggedInUser } = useContext( UserInfoContext);

    // const [pictures, setPictures] = useState({

    //     headerImage:"",
    //     profileImage:""
    // })

    useEffect(() => {

        // console.log(getProfileImage(loggedInUser["profile_pic_url"]))
    //    ( async (getProfileImage, setPictures) => {

    //         const profileBlob = await getProfileImage(loggedInUser["profile_pic_url"])

    //         console.log("profileBlob: ", profileBlob)
    //         setPictures(prev => ({...prev, profileImage: profileBlob}))
    //     })(getProfileImage, setPictures)
        
    }, [loggedInUser])

    const backgroundImageStyle = {
        background: `url(${serverAddressString}${loggedInUser["header_img_url"]}) no-repeat cover center`
    }


    return(

        <Card classes="h_auto content profile_header">
         

         {/* <div className="profile_header_background" style={{backgroundImage: `url('${getImageString}${loggedInUser["header_img_url"]}')`}} >
                <img src={ `${getImageString}${loggedInUser["profile_pic_url"]}` } alt="profile" className="profile_header_image "></img>
            </div> */}
         <div className="profile_header_background" style={{
        background: `url(${serverAddressString}${loggedInUser["header_img_url"]}) no-repeat center`
    }} >
                <img src={ `${serverAddressString}${loggedInUser["profile_pic_url"]}`} alt="profile" className="profile_header_image "></img>
            </div>

            <div className="profile_header_container">


                <h3 className="profile_name">{loggedInUser["username"]}</h3>
                

                <h4 className="profile_tag"><em>{loggedInUser["nickname"]}</em></h4>
                <p className="profile_description">{loggedInUser["description"]}</p>

                <div className="profile_other">
                    {/* <p><img src={LocationIcon} alt="profile" className="profile_icon location_icon"></img> <em>{loggedInUser["location"]}</em></p> */}


                    {loggedInUser["location"] === ""
                        ?<p></p>
                        : 
                        <p><img src={LocationIcon} alt="profile" className="profile_icon location_icon"></img> <em>{loggedInUser["location"]}</em></p>
                    }
                    {loggedInUser["links"] === ""
                        ?<p></p>
                        : 
                        <p><img src={LinkIcon} alt="profile" className="profile_icon link_icon"></img><a href={loggedInUser["links"]}><em>{loggedInUser["links"]}</em></a></p>
                    }

                    <p><img src={CalenderIcon} alt="profile" className="profile_icon"></img><em>{formatDateMonthDayYear(loggedInUser["joined_date"])}</em></p>

                </div>

                <div className="profile_other profile_following">
                    <p>Followers: <em>{loggedInUser.followers}</em></p> <p>Following: <em>{loggedInUser.following}</em></p>
                </div>

            </div>

        </Card>

    )

}

export default ProfileHeader

