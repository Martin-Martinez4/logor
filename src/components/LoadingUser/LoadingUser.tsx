

import React, { FC, useEffect, useContext } from "react";
import TopBar from "../TopandBottom/TopBar";
import ContentArea from "../ContentArea/ContentArea";
import { UserInfoContext } from "../context/userContext";

import { useNavigate, Link, useLocation } from "react-router-dom";

import useAuth from "../hooks/useAuth";




const LoadingUser:FC = ({ loadUser}) => {

      // eslint-disable-next-line
      const [loggedInUser, setloggedInUser] = useContext(UserInfoContext);

      const { auth, setAuth } = useAuth();

      const navigate = useNavigate();
      const location = useLocation();

    
    useEffect(() => {
        
       ( async (user_id) => {

           await fetch(`http://localhost:3001/usersInfo/${user_id}`, {
           
                method: "get",
                headers: {
                    
                    'Content-Type': 'application/json',
                  },
            })
            .then(res => res.json())
            .then(user => {
                console.log("user:",user[0])
    
                try{
    
                    loadUser(user[0]) 
                    
                    // const from = location.state?.from?.pathname || `/home/${user[0].id}`;
                    
                    const from = location.state?.from?.pathname || `/home/${user_id}`;
                    navigate(from, { replace:true });
                }
                catch(err){
    
                    console.error(err)
                }
            }
            )


                
            
            }
            )(auth.user_id);
    


    }, [])



    return(
        <React.Fragment>
            <TopBar />
            <ContentArea />
        </React.Fragment>
    );

}

export default LoadingUser



