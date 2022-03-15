
import  { createContext, useState } from  "react";

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

    const loadUser = (data) => {

        // const [id, username, joined, nickname, profile_pic_url, description, header_img_url, location, links] = data;
    
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
        })
    
      }


  

    return (
        <UserInfoContext.Provider value={{loggedInUser, setloggedInUser, loadUser}}>
            { children }
        </UserInfoContext.Provider>

    )
}

export default UserInfoContext;


