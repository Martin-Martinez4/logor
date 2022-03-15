
import  { createContext, useState } from  "react";

import { getFollowersCount, getFollowingCount } from "../utils/fetchFollowers";

const UserInfoContext = createContext({});

export const UserInfoProvider = ({ children }) => {

    const [loggedInUser, setloggedInUser] = useState({
        id:"",
        username:"",
        joined_date:"",
        tag:"",
        profile_pic_url:"",
        description:"",
        header_img_url:"",
        location:"",
        links:"",
        followers:"",
        following:""
    });

    const loadUser = async (data) => {

        // const [id, username, joined, nickname, profile_pic_url, description, header_img_url, location, links] = data;

        if(data?.id){

            const followersCount =  await getFollowersCount(data.id)
            const followingCount =  await getFollowingCount(data.id)

                // console.log("followers: ", followersCount, " Following: ", followingCount)

                // setVisiteeUser((prev) => 
                //         ({...prev, 
                //       followers: followersCount,
                //       following: followingCount
                // }))

            setloggedInUser({
                
                    id: data.id,
                    username: data.username,
                    joined_date: data.joined_date,
                    nickname: data.nickname,
                    profile_pic_url: data.profile_pic_url,
                    description: data.description,
                    header_img_url: data.header_img_url,
                    location: data.location,
                    links: data.links,
                    followers: followersCount,
                    following: followingCount
            })
        }
        else{
            return
        }
    
    
      }


  

    return (
        <UserInfoContext.Provider value={{loggedInUser, setloggedInUser, loadUser}}>
            { children }
        </UserInfoContext.Provider>

    )
}

export default UserInfoContext;


