
import  { createContext, useState } from  "react";

const UserInfoContext = createContext([{}, () => {}]);

const  UserInfoProvider = ({ children }) => {

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
    });
  

    return (
        <UserInfoContext.Provider value={[loggedInUser, setloggedInUser]}>
            { children }
        </UserInfoContext.Provider>

    )
}

export { UserInfoContext, UserInfoProvider }


