
import React, { FC, useContext, useEffect, useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";
import Card from "../Card/Card";
import "./ProfileHeader.css";

import { UserInfoContext } from "../userContext/userContext";
import PageNotFound from "../404Page/PageNotFound";

import UserNotFound from "../UserNotFound/UserNotFound";

import { getUserIdByNickname } from "../utils/fetchUserData";

import { getFollowersCount, getFollowingCount } from "../utils/fetchFollowers";


// import ProfileImage from "../../assets/Monkey_1.svg";
import LocationIcon from "../../assets/LocationIcon.svg"
import LinkIcon from "../../assets/LinkIcon.svg"
import CalenderIcon from "../../assets/CalenderIcon.svg"


const VisitorProfileHeader:FC = ({ userOrTagID }) =>{

    const location = useLocation();

    const navigate = useNavigate();

    const navigate404 = () => {
        navigate('/404');
        }

    const [undefUser, setUndefUser] = useState(false)
    
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
        links:"",
        followers:"",
        following:""


    })

    useEffect(() => {

        const fetchUserData = async (userOrTagID, setVisiteeUser) => {


        if(location.pathname.includes("/users/nickname/")){
            
            console.log("header by nickname")

            console.log("header", userOrTagID)
            try{

                await fetch(`http://localhost:3001/usersInfo/byNickname/${userOrTagID}`, {
                    method: "get",
                    headers: { "Content-Type": "application/json"},
                }).then(response => response.json())
                .then(userInfo => {
        
                    console.log("userIfno", userInfo[0])

                    if(userInfo[0] === undefined){

                        setUndefUser(true)
                        
                    }else{

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
                    }
                 
                })

                const userID =  await getUserIdByNickname(userOrTagID)


                const followersCount =  await getFollowersCount(userID)
                const followingCount =  await getFollowingCount(userID)

                // console.log("followers: ", followersCount, " Following: ", followingCount)

                setVisiteeUser((prev) => 
                        ({...prev, 
                      followers: followersCount,
                      following: followingCount
                }))

                


            }
            catch{

                return <PageNotFound />;
            }



        }
        else{

            console.log("byID")

            await fetch(`http://localhost:3001/usersInfo/${userOrTagID}`, {
                method: "get",
                headers: { "Content-Type": "application/json"},
            }).then(response => response.json())
            .then(userInfo => {
    
                console.log("userIfno", userInfo[0])
             
                if(userInfo[0] === undefined){

                    console.log("userInfo: ",userInfo[0])

                    setUndefUser(true)
                        
                }else{

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
                }
            })


            const followersCount =  await getFollowersCount(userOrTagID)
            const followingCount =  await getFollowingCount(userOrTagID)

            // console.log("followers: ", followersCount, " Following: ", followingCount)

            setVisiteeUser((prev) => 
                    ({...prev, 
                  followers: followersCount,
                  following: followingCount
            }))
        }

        
    }
    
    fetchUserData(userOrTagID, setVisiteeUser)

    },[])

    return(

        <Card classes="h_auto content profile_header">

            {undefUser? <UserNotFound />
            :
                <>
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

                    <div className="profile_other profile_following">
                        <p><a href="">Followers: </a><em>{visiteeUser.followers}</em></p> <p><a href="">Followers: </a><em>{visiteeUser.following}</em></p>
                        <div> 
                            <button type="button" className="button primary" title="Follow Status">Follow</button>
                            <button type="button" className="button red" title="Follow Status">Unfollow</button>
                        </div>
                    </div>


                </div>
                </>
            }
         

          

        </Card>

    )

}

export default VisitorProfileHeader;

